# Generated by Django 5.0 on 2024-01-06 06:11

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("hospital_appointment_app", "0002_alter_appointment_doctor"),
        ("hospital_auth_app", "0002_specialityofdoctors_doctordetail"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterField(
            model_name="appointment",
            name="date_of_appointment",
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name="appointment",
            name="doctor",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="appointments",
                to="hospital_auth_app.doctordetail",
            ),
        ),
        migrations.AlterField(
            model_name="appointment",
            name="patient",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="appointments",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
    ]
