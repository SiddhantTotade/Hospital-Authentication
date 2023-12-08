const clientID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const callBackUri = "http://localhost:5173";

export const redirectToGoogle = () => {
  const google_url = `https://accounts.google.com/o/oauth2/auth?client_id=${clientID}&redirect_uri=${callBackUri}&state=IpMv9THwjcnYVk08j3krWpdPDvmDqpfW&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email+https://www.googleapis.com/auth/userinfo.profile+openid+openid+email+profile`;

  window.location.href = google_url;
};
