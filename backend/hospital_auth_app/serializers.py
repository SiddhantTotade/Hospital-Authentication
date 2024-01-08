from .models import *
from .utils import *
from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()


class UserRegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(
        style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = User
        fields = ['email', 'user_name', 'first_name',
                  'last_name', 'password', 'password2', 'address', 'city', 'state', 'pincode', 'user_type', 'profile_pic']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')

        if password != password2:
            raise serializers.ValidationError("Password does not matching.")
        return attrs

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class UserLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255)

    class Meta:
        model = User
        fields = ['email', 'password']


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'user_name', 'email',
                  'first_name', 'last_name', 'address', 'city', 'state', 'pincode', 'profile_pic', 'user_type', 'is_verified']


class SpecialityOfDoctorsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpecialityOfDoctors
        fields = "__all__"


class DoctorDetailsSerializer(serializers.ModelSerializer):
    speciality = SpecialityOfDoctorsSerializer()

    class Meta:
        model = DoctorDetail
        fields = "__all__"

    def create(self, validated_data):
        # Extract speciality data from validated_data
        speciality_data = validated_data.pop('speciality')

        # Create or retrieve the SpecialityOfDoctors instance
        speciality_instance, created = SpecialityOfDoctors.objects.get_or_create(
            **speciality_data)

        # Check if a DoctorDetail instance with the same doctor already exists
        existing_doctor_detail = DoctorDetail.objects.filter(
            doctor=self.context['request'].user)
        if existing_doctor_detail.exists():
            raise serializers.ValidationError(
                "Doctor already exists in the database.")

        # Create the DoctorDetail instance with the associated speciality
        doctor_detail_instance = DoctorDetail.objects.create(
            speciality=speciality_instance, **validated_data)

        return doctor_detail_instance


class AllDoctorsSerializer(serializers.ModelSerializer):
    doctor = serializers.CharField(source='doctor.id')
    user_name = serializers.CharField(source='doctor.user_name')
    first_name = serializers.CharField(source='doctor.first_name')
    last_name = serializers.CharField(source='doctor.last_name')
    user_type = serializers.CharField(source='doctor.user_type')
    profile_pic = serializers.CharField(source='doctor.profile_pic')

    speciality = SpecialityOfDoctorsSerializer()

    class Meta:
        model = DoctorDetail
        fields = ["id", "doctor", 'user_name', 'first_name', 'last_name', 'user_type', 'profile_pic',
                  'speciality', 'from_time', 'to_time']
