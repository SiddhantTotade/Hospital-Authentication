from datetime import timedelta, datetime
from django.db import models
from hospital_auth_app.models import User, DoctorDetail

# Create your models here.


class Appointment(models.Model):
    doctor = models.ForeignKey(
        DoctorDetail, on_delete=models.CASCADE, related_name="appointments")
    patient = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="appointments")
    date_of_appointment = models.DateField(null=True, blank=True)
    start_time = models.TimeField(null=True, blank=True)
    end_time = models.TimeField(null=True, blank=True)

    def __str__(self) -> str:
        return str(self.doctor) + " - " + str(self.patient)

    def save(self, *args, **kwargs):
        if self.start_time and not self.end_time:
            start_datetime = datetime.combine(
                self.date_of_appointment, self.start_time)
            end_datetime = start_datetime + timedelta(minutes=45)
            self.end_time = end_datetime.time()

        super().save(*args, **kwargs)
