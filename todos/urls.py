from django.urls import path, include
from todos import views

urlpatterns = [
    path('api/tasks/categories/add/', views.AddCategorieAPIView.as_view()),
    path('api/tasks/categories/', views.CategoriesAPIView.as_view()),
    path('api/tasks/categories/<pk>/', views.CategoryAPIView.as_view()),
    path('api/category_tasks/<cat_id>/', views.TasksByCategoryAPIView.as_view()),
    path('api/tasks/user_tasks/', views.TasksAPIView.as_view()),
    path('api/tasks/<pk>/', views.TaskDetailAPIView.as_view()),
    path('api/add_task/', views.AddTaskAPIView.as_view()),
    path('api/tasks/<task_id>/delete/', views.DeleteTaskAPIView.as_view()),
    path('api/tasks/<task_id>/update/', views.UpdateTaskAPIView.as_view()),
    path('api/today_tasks/', views.TodayTasksAPIView.as_view()),
    path('api/alerts/', views.AlertTasksAPIView.as_view()),
    path('api/done_tasks/', views.DoneTasksAPIView.as_view()),
    path('api/mark_as_done/<task_id>/', views.MarkAsDoneAPIView.as_view()),
    path('api/mark_as_not_done/<task_id>/', views.MarkAsNotDoneAPIView.as_view())
]
