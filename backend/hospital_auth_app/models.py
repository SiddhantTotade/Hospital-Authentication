from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from .user_manager import UserManager

# Create your models here.

USER_PROVIDER = {1: "Admin", 2: "Doctor", 3: "Patient"}


class User(AbstractBaseUser):
    user_type = models.CharField(
        max_length=10, blank=False, default=USER_PROVIDER.get(3))
    user_name = models.CharField(max_length=20, null=True, blank=True)
    first_name = models.CharField(max_length=20, null=True, blank=True)
    last_name = models.CharField(max_length=20, null=True, blank=True)
    email = models.EmailField(
        verbose_name="Email Field", max_length=255, unique=True)
    profile_pic = models.ImageField(
        upload_to="profile_pic/", null=True, blank=True)
    address = models.TextField(null=True, blank=True)
    city = models.CharField(max_length=20, null=True, blank=True)
    state = models.CharField(max_length=20, null=True, blank=True)
    pincode = models.IntegerField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    is_admin = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['user_name', 'first_name',
                       'last_name', 'user_type']

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        return self.is_admin

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        return self.is_admin
