from django.urls import path
from .views import *

urlpatterns = [
    path("blogs/", BlogListView.as_view(), name="blogs"),
    path("category/", BlogCategoryView.as_view(), name="categories")
]
