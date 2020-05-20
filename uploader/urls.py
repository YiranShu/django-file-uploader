from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from django.views.static import serve


from . import views

app_name = 'uploader'
urlpatterns = [
    path('', views.upload, name='upload'),
    path('save_to_database/', views.save_to_database, name='save_to_database'),
    path('<str:scene_id>/retrieve_from_database/', views.retrieve_from_database, name='retrieve_from_database'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
