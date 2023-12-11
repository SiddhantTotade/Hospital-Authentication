from .models import *
from rest_framework.serializers import ModelSerializer


class BlogSerializer(ModelSerializer):

    class Meta:
        model = Blog
        fields = "__all__"


class BlogCategorySerializer(ModelSerializer):

    class Meta:
        model = BlogCategories
        fields = "__all__"
