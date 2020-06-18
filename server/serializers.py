# from rest_framework import serializers
from rest_framework_mongoengine.serializers import DocumentSerializer
from .models import Scene


class SceneSerializer(DocumentSerializer):

    class Meta:
        model = Scene
        fields = ['file_name', 'user', '_id', 'scene_name', 'description', 'category', 'tag', 'dataset']