from .models import *
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer


class BlogSerializer(ModelSerializer):
    user_email = serializers.EmailField(source='user.email')
    user_first_name = serializers.CharField(source='user.first_name')
    user_id = serializers.IntegerField(source='user.id', read_only=True)

    class Meta:
        model = Blog
        fields = "__all__"


class BlogCategorySerializer(ModelSerializer):

    class Meta:
        model = BlogCategories
        fields = "__all__"
