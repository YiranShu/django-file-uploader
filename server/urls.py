from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from django.views.static import serve


from . import views

app_name = 'server'
urlpatterns = [
    path('', views.upload, name='upload'),
    path('scenes/', views.scenes_list, name='scenes_list'),
    path('scenes/<str:_id>/', views.scene_detail, name='scene_detail'),
    path('scenes/search/<str:scene_name>/', views.scene_filter, name='scene_filter'),
    path('scenes/<str:_id>/json', views.scene_json, name='scene_json')
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
