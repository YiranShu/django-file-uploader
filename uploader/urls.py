from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from django.views.static import serve


from . import views

app_name = 'uploader'
urlpatterns = [
    path('', views.upload, name='upload'),
    path('writeFile/', views.write_file, name='write'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
