from django.urls import path
from rest_framework_simplejwt.views import TokenBlacklistView
from .views import *

urlpatterns = [
    path('login/', UserLoginView.as_view(), name='login'),
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('generate_token/', DoctorRegistrationCode.as_view(),
         name='doctor-registration-code'),
    path('logout/', TokenBlacklistView.as_view(), name='logout'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('email_verify/', VerifyEmailView.as_view(), name='email-verify'),
    path('resend_email_verify/', ResendVerifyEmailView.as_view(),
         name='resend-email-verify'),
    path('change-password/', UserChangePasswordView.as_view(),
         name='change_password'),
    path('reset-password/', SendPasswordResetEmailView.as_view(),
         name='send_reset_email_password'),
    path('reset-password/<uid>/<token>/', UserPasswordResetView.as_view(),
         name='reset_password'),
]
