from django.db import models
from django.utils.text import slugify
from hospital_auth_app.models import User
import random
import string

# Create your models here.


def generate_random_string():
    str = "".join(random.choices(string.ascii_lowercase, k=20))
    return str


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
    is_draft = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    blog_slug = models.SlugField(max_length=50, null=True, blank=True)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        self.product_slug = slugify(
            self.title) + generate_random_string()
        return super().save(*args, **kwargs)
