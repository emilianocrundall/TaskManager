from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions, status, generics
from .models import Task, Category
from .serializers import TaskSerializer, CategorySerializer
from django.utils import timezone

class AddCategorieAPIView(APIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    def post(self, request, format=None):
        current_user = self.request.user
        request.data.update({
            'owner': current_user.id
        })
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class CategoriesAPIView(generics.ListAPIView):
    serializer_class = CategorySerializer
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    def get_queryset(self):
        current_user = self.request.user
        queryset = Category.objects.filter(owner=current_user.id)
        return queryset

class CategoryAPIView(generics.RetrieveUpdateAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = CategorySerializer
    queryset = Category.objects.all()

class TasksByCategoryAPIView(generics.ListAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = TaskSerializer

    def get_queryset(self):
        cat_id = self.kwargs['cat_id']
        queryset = Task.objects.filter(category_id=cat_id)
        return queryset

class TasksAPIView(generics.ListAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = TaskSerializer

    def get_queryset(self):
        current_user = self.request.user
        queryset = Task.objects.filter(owner=current_user)
        return queryset

class TaskDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()

class AddTaskAPIView(APIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    def post(self, request, format=None):
        current_user = self.request.user
        request.data.update({
            'owner': current_user.id
        })
        serializer = TaskSerializer(data=request.data)
        
        if serializer.is_valid():
            cat = Category.objects.get(id=request.data['category'])
            serializer.save(category=cat)
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class DeleteTaskAPIView(APIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    def delete(self, request, task_id, format=None):
        try:
            task = Task.objects.get(id=task_id)
            task.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Task.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

class UpdateTaskAPIView(generics.RetrieveUpdateAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = TaskSerializer

    def update(self, request, *args, **kwargs):
        task = Task.objects.get(id=self.kwargs['task_id'])
        serializer = self.serializer_class(task, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        cat = Category.objects.get(id=request.data['category'])
        serializer.save(category=cat)
        return Response(data=serializer.data, status=status.HTTP_200_OK)


class TodayTasksAPIView(generics.ListAPIView):
    serializer_class = TaskSerializer
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    def get_queryset(self):
        current_user = self.request.user
        today = timezone.now().date()
        queryset = Task.objects.filter(date__date=today, owner=current_user.id)
        return queryset


class AlertTasksAPIView(generics.ListAPIView):
    serializer_class = TaskSerializer
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    def get_queryset(self):
        current_user = self.request.user
        queryset = Task.objects.filter(
            owner=current_user.id,
            date__lt=timezone.now(),
            done=False
        )
        return queryset

class MarkAsDoneAPIView(generics.RetrieveUpdateAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = TaskSerializer

    def update(self, request, *args, **kwargs):
        task = Task.objects.get(id=self.kwargs['task_id'])
        request.data.update({"done":True})
        serializer = self.serializer_class(task, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(data=serializer.data, status=status.HTTP_200_OK)

class MarkAsNotDoneAPIView(generics.RetrieveUpdateAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = TaskSerializer

    def update(self, request, *args, **kwargs):
        task = Task.objects.get(id=self.kwargs['task_id'])
        request.data.update({"done":False})
        serializer = self.serializer_class(task, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_200_OK)

class DoneTasksAPIView(generics.ListAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = TaskSerializer

    def get_queryset(self):
        current_user = self.request.user
        queryset = Task.objects.filter(owner=current_user.id, done=True)
        return queryset
