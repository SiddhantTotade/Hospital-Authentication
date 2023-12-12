from .models import *
from .serializers import *
from hospital_auth_app.renderers import UserRenderer
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import ListCreateAPIView, RetrieveAPIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

# Create your views here.


class BlogListView(ListCreateAPIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]

    queryset = Blog.objects.all()
    serializer_class = BlogSerializer


class BlogCategoryView(ListCreateAPIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]

    queryset = BlogCategories.objects.all()
    serializer_class = BlogCategorySerializer


class BlogDetailView(RetrieveAPIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    lookup_field = 'blog_slug'


class MyBlogView(ListCreateAPIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]
    serializer_class = BlogSerializer

    def get_queryset(self):
        # Filter the queryset based on the current user
        return Blog.objects.filter(user=self.request.user)


class MarkAsDraftView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk, format=None):
        blog = get_object_or_404(Blog, pk=pk)
        blog.is_draft = not blog.is_draft
        blog.save()

        serializer = BlogSerializer(blog)
        return Response(serializer.data, status=status.HTTP_200_OK)
