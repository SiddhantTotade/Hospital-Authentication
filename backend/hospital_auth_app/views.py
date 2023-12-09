from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from django.core.exceptions import ObjectDoesNotExist
from django.conf import settings
from django.urls import reverse_lazy
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from uuid import uuid4
import jwt
import environ
from .serializers import *
from .renderers import *

env = environ.Env(
    # set casting, default value
    DEBUG=(bool, False)
)
# Create your views here.


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


class DoctorRegistrationCode(APIView):
    renderer_classes = [UserRenderer]

    def post(self, request):
        token = uuid4()
        DoctorsToken.objects.create(token=token)

        email_body = f"Hi..., Use the code below to register yourself.\nToken - {
            token}"
        data = {"email_body": email_body, "to_email": request.data["email"],
                "email_subject": "Registration Code"}

        Util.send_email(data)

        return Response({"msg": "Code generated and sended successfully"}, status=status.HTTP_200_OK)


class UserRegistrationView(APIView):
    renderer_classes = [UserRenderer]

    def post(self, request, format=None):
        try:
            if request.data.get("doctorRegistrationCode"):
                if DoctorsToken.objects.get(token=request.data.get("doctorRegistrationCode")):
                    DoctorsToken.objects.get(
                        token=request.data.get("doctorRegistrationCode")).delete()
                    serializer = UserRegistrationSerializer(
                        data=request.data)
            else:
                serializer = UserRegistrationSerializer(data=request.data)

            serializer.is_valid(raise_exception=True)
            serializer.save()

            user_data = serializer.data
            user_email = user_data['email']

            try:
                user = User.objects.get(email=user_email)
            except ObjectDoesNotExist:
                return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)

            token = get_tokens_for_user(user)

            relative_link = reverse_lazy("email-verify")
            abs_url = f"http://localhost:5173{
                relative_link}?token={token['access']}"

            email_body = f"Hi, {
                user.first_name}. Use the link below to verify your email.\n{abs_url}"
            data = {"email_body": email_body, "to_email": user_email,
                    "email_subject": "Verify your email"}

            Util.send_email(data)

            return Response({
                'token': token,
                'msg': 'User Registered Successfully. Verification link has been sent to your email.'
            }, status=status.HTTP_201_CREATED)

        except Exception as e:
            print(e)
            return Response({'error': 'Internal Server Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class VerifyEmailView(APIView):
    def get(self, request):
        token = request.GET.get("token")
        try:
            payload = jwt.decode(
                token, settings.SECRET_KEY, algorithms=["HS256"])
            user = User.objects.get(id=payload["user_id"])
            if not user.is_verified:
                user.is_verified = True
                user.save()

            return Response({"msg": "Successfully verified"}, status=status.HTTP_200_OK)
        except jwt.ExpiredSignatureError as identifier:
            return Response({"error": "Verification link expired"}, status=status.HTTP_400_BAD_REQUEST)
        except jwt.exceptions.DecodeError as identifier:
            return Response({"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)


class UserLoginView(APIView):
    renderer_classes = [UserRenderer]

    def post(self, request, format=None):
        try:
            serializer = UserLoginSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            email = serializer.validated_data.get('email')
            password = serializer.validated_data.get('password')

            user = self.authenticate_user(email, password)

            if user is not None:
                token = self.get_tokens_for_user(user)
                return Response({'token': token, 'msg': 'Login Success'}, status=status.HTTP_200_OK)
            else:
                return Response({'errors': {'non_field_errors': ['Email or Password is not valid.']}}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            print(e)
            return Response({'error': 'Internal Server Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def authenticate_user(self, email, password):
        return authenticate(email=email, password=password)

    def get_tokens_for_user(self, user):
        refresh = RefreshToken.for_user(user)
        return {'refresh': str(refresh), 'access': str(refresh.access_token)}


class UserProfileView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        try:
            serializer = UserProfileSerializer(request.user)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': 'Internal Server Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
