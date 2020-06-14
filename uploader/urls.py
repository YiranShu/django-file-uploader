from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from django.views.static import serve


from . import views

app_name = 'uploader'
urlpatterns = [
    path('', views.upload, name='upload'),
    path('scenes/', views.scenes_list, name='scenes_list'),
    # path('scenes/<str:scene_id>/', views.scene_detail, name='scene_detail'),
    path('scenes/<str:file_name>/', views.scene_detail, name='scene_detail'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
