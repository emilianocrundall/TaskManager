from django.db import models
from django.contrib.auth.models import User

class Category(models.Model):
    name = models.CharField(max_length=200)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

class Task(models.Model):
    description = models.CharField(max_length=500)
    date = models.DateTimeField(auto_now_add=False)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    done = models.BooleanField(default=False, editable=True)
