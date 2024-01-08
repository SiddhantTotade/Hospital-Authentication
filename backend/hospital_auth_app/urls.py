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
    path('speciality/', SpecialityOfDoctorsView.as_view(),
         name='doctor-speciality'),
    path('doctor_details/', DoctorDetailView.as_view(),
         name='doctor-detail'),
    path('all_doctor/', AllDoctorsView.as_view(),
         name='doctor-detail'),
]
