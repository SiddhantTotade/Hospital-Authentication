from django.db import models
from hospital_auth_app.models import User

# Create your models here.


class BlogCategories(models.Model):
    category = models.CharField(max_length=50, null=True, blank=True)

    def __str__(self):
        return self.category


class Blog(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100, null=True, blank=True)
    image = models.TextField()
    category = models.ForeignKey(BlogCategories, on_delete=models.CASCADE)
    summary = models.TextField()
    content = models.TextField()

    def __str__(self):
        return self.title
