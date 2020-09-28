from django.urls import path, include
from accounts import views
from knox import views as knox_views

urlpatterns = [
    path('api/auth', include('knox.urls')),
    path('api/auth/get_user', views.UserAPIView.as_view()),
    path('api/auth/register', views.RegisterAPIView.as_view()),
    path('api/auth/login', views.LoginAPIView.as_view()),
    path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout')
]
