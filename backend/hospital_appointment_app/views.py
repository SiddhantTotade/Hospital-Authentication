from hospital_auth_app.models import DoctorDetail
from datetime import datetime, timedelta
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Appointment
from .serializers import AppointmentSerializer

# Create your views here.


class AppointmentListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = AppointmentSerializer

    def get(self, request):
        user = self.request.user
        if user.is_authenticated:
            if user.user_type == "2":
                appointment_list = []
                for data in Appointment.objects.filter(doctor=user.id):
                    new_data = {"patient_name": data.patient.first_name + " " + data.patient.last_name,
                                "date_of_appointment": data.date_of_appointment, "start_time": data.start_time, "end_time": data.end_time}
                    appointment_list.append(new_data)
                return Response(appointment_list, status=status.HTTP_200_OK)
            elif user.user_type == "3":
                appointment_list = []
                for data in Appointment.objects.filter(patient=user.id):
                    new_data = {"speciality": str(
                        data.doctor.speciality), "doctor_name": data.doctor.doctor.first_name + " " + data.doctor.doctor.last_name, "date_of_appointment": data.date_of_appointment, "start_time": data.start_time, "end_time": data.end_time}
                    appointment_list.append(new_data)
                return Response(appointment_list, status=status.HTTP_200_OK)
        return Appointment.objects.none()

    def create(self, request, *args, **kwargs):
        date_str = request.data.get('date_of_appointment')
        doctor_id = request.data.get('doctor')
        patient_id = request.data.get('patient')

        try:
            doctor_timings = DoctorDetail.objects.get(doctor=doctor_id)

            if doctor_id == doctor_timings.id:
                appointment_detail = Appointment.objects.filter(
                    date_of_appointment=date_str, doctor=doctor_id)
            else:
                appointment_detail = Appointment.objects.filter(
                    date_of_appointment=date_str, doctor=doctor_timings.id)

            if appointment_detail.exists():
                last_appointment_time = appointment_detail.order_by(
                    "-end_time")[0].end_time
            else:
                last_appointment_time = doctor_timings.from_time

            new_appoint_end_time = (datetime.combine(datetime.min, last_appointment_time) +
                                    timedelta(minutes=45)).time()

            if doctor_timings.from_time <= new_appoint_end_time <= doctor_timings.to_time:
                appointment_data = {
                    "doctor": doctor_id if doctor_id == doctor_timings.id else doctor_timings.id,
                    "patient": patient_id,
                    "date_of_appointment": date_str,
                    "start_time": last_appointment_time,
                    "end_time": new_appoint_end_time
                }

                appointment_serializer = self.get_serializer(
                    data=appointment_data)
                appointment_serializer.is_valid(raise_exception=True)
                appointment_serializer.save()

                return Response({"data": appointment_serializer.data, "doctor_data": {"speciality": str(doctor_timings.speciality), "first_name": str(doctor_timings.doctor.first_name), "last_name": str(doctor_timings.doctor.last_name)}}, status=status.HTTP_201_CREATED)
            else:
                return Response({"error": "No slots available on this date"}, status=status.HTTP_400_BAD_REQUEST)

        except DoctorDetail.DoesNotExist:
            return Response({"error": "Doctor details not found."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class AppointmentDetailView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
