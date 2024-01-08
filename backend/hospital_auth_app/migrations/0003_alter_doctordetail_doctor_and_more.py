# Generated by Django 5.0 on 2024-01-06 11:06

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("hospital_auth_app", "0002_specialityofdoctors_doctordetail"),
    ]

    operations = [
        migrations.AlterField(
            model_name="doctordetail",
            name="doctor",
            field=models.OneToOneField(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AlterField(
            model_name="doctordetail",
            name="speciality",
            field=models.OneToOneField(
                on_delete=django.db.models.deletion.CASCADE,
                to="hospital_auth_app.specialityofdoctors",
            ),
        ),
    ]