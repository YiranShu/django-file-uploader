from django.urls import path

from . import views

app_name = 'uploader'
urlpatterns = [
    path('', views.upload, name='upload'),
    path('writeFile/', views.write_file, name='write'),
]