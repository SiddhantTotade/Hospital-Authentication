from .models import *
from .serializers import *
from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView

# Create your views here.


class BlogListView(ListCreateAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer


class BlogCategoryView(ListCreateAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogCategorySerializer
