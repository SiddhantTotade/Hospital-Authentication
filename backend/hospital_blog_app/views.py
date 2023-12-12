from .models import *
from .serializers import *
from hospital_auth_app.renderers import UserRenderer
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import ListCreateAPIView, RetrieveAPIView

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
