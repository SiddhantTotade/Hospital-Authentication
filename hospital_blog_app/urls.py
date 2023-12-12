from django.urls import path
from .views import *

urlpatterns = [
    path("blogs/", BlogListView.as_view(), name="blogs"),
    path("blogs/<str:blog_slug>", BlogDetailView.as_view(), name="blogs-detail"),
    path("my-blogs/", MyBlogView.as_view(), name="my-blogs-detail"),
    path("category/", BlogCategoryView.as_view(), name="categories"),
    path('update-draft/<int:pk>/', MarkAsDraftView.as_view(), name='draft-blog-list')
]
