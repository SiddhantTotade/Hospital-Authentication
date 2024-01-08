import { useEffect, useState } from "react";

export const useGoogleCalendar = () => {
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem("access_token")
  );
  const [expiresIn, setExpiresIn] = useState<string | null>(
    localStorage.getItem("expires_in")
  );

  const [gapiInited, setGapiInited] = useState(false);
  const [gisInited, setGisInited] = useState(false);

  useEffect(() => {
    const loadGoogleAPI = async () => {
      const gapi = (window as any).gapi;
      await new Promise((resolve) => gapi.load("client", resolve));
      setGapiInited(true);
    };

    const initGoogleClient = async () => {
      const gapi = (window as any).gapi;
      await gapi.client.init({
        apiKey: import.meta.env.VITE_API_KEY,
        discoveryDocs: [
          "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
        ],
      });
      setGisInited(true);

      if (accessToken && expiresIn) {
        gapi.client.setToken({
          access_token: accessToken,
          expires_in: expiresIn,
        });
      }
    };

    loadGoogleAPI();
    initGoogleClient();
  }, [accessToken, expiresIn]);

  const handleAuthClick = async () => {
    const gapi = (window as any).gapi;
    const google = (window as any).google;
    const tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: import.meta.env.VITE_CLIENT_ID,
      scope: "https://www.googleapis.com/auth/calendar",
      callback: "",
    });

    tokenClient.callback = async (resp: any) => {
      if (resp.error) {
        throw resp;
      }

      await listUpcomingEvents();
      const { access_token, expires_in } = gapi.client.getToken();
      setAccessToken(access_token);
      setExpiresIn(expires_in);

      localStorage.setItem("access_token", access_token);
      localStorage.setItem("expires_in", expires_in);
    };

    if (!(accessToken && expiresIn)) {
      tokenClient.requestAccessToken({ prompt: "consent" });
    } else {
      tokenClient.requestAccessToken({ prompt: "" });
    }
  };

  const handleSignoutClick = () => {
    const gapi = (window as any).gapi;
    const token = gapi.client.getToken();

    if (token !== null) {
      (window as any).google.accounts.oauth2.revoke(token.access_token);
      gapi.client.setToken("");
      localStorage.removeItem("access_token");
      localStorage.removeItem("expires_in");
      setAccessToken(null);
      setExpiresIn(null);
    }
  };

  const listUpcomingEvents = async () => {
    const gapi = (window as any).gapi;

    try {
      const request = {
        calendarId: "primary",
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 10,
        orderBy: "startTime",
      };
      const response = await gapi.client.calendar.events.list(request);

      const events = response.result.items;
      if (!events || events.length === 0) {
        console.log("No events found.");
      } else {
        const output = events.reduce(
          (str, event) =>
            `${str}${event.summary} (${
              event.start.dateTime || event.start.date
            })\n`,
          "Events:\n"
        );
        console.log(output);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const addManualEvent = ({ data }: any) => {
    const gapi = (window as any).gapi;

    const event = {
      kind: "calendar#event",
      summary: `${data.doctor_data.speciality} Appointment.\nDr. ${data.doctor_data.first_name} ${data.doctor_data.last_name}`,
      location: "Raipur, Chhattisgarh",
      start: {
        dateTime: new Date(
          data.data.date_of_appointment + "T" + data.data.start_time
        ).toISOString(),
        timeZone: "UTC",
      },
      end: {
        dateTime: new Date(
          data.data.date_of_appointment + "T" + data.data.end_time
        ).toISOString(),
        timeZone: "UTC",
      },
      recurrence: ["RRULE:FREQ=DAILY;COUNT=1"],
      reminders: {
        useDefault: true,
      },
      guestsCanSeeOtherGuests: true,
    };

    const request = gapi.client.calendar.events.insert({
      calendarId: "primary",
      resource: event,
      sendUpdates: "all",
    });

    request.execute(
      (event) => {
        window.open(event.htmlLink);
      },
      (error) => {
        console.error(error);
      }
    );
  };

  return {
    gapiInited,
    gisInited,
    accessToken,
    expiresIn,
    handleAuthClick,
    handleSignoutClick,
    listUpcomingEvents,
    addManualEvent,
  };
};
