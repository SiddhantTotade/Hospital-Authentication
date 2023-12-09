# Generated by Django 5.0 on 2023-12-07 15:04

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("hospital_auth_app", "0003_alter_user_user_type_delete_usertypes"),
    ]

    operations = [
        migrations.AddField(
            model_name="user",
            name="is_admin",
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name="user",
            name="is_verified",
            field=models.BooleanField(default=False),
        ),
    ]
