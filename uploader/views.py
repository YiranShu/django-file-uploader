import os
from django.shortcuts import render
from django.http import HttpResponse
from . import models
from .serializers import *
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


@api_view(['GET'])
def upload(request):
    return render(request, 'uploader/upload.html', {})


@api_view(['POST'])
def save_to_database(request):
    if request.method == "POST":
        myFile = request.FILES.get("myfile", None)
        if not myFile:
            return HttpResponse("no files for upload!")

        models.Scene(
            file=myFile, 
            file_name=myFile.name,
            user=request.POST.get('user_name'),
            scene_name=request.POST.get("scene_name"),
            description=request.POST.get("description"),
            category=request.POST.get("category"),
            tag=request.POST.get("tag"),
        ).save()

        return HttpResponse(myFile.name + " upload over!")


@api_view(['GET'])
def retrieve_from_database(request, scene_id):
    scenes = models.Scene.objects(file_name=scene_id)

    for scene in scenes:
        file = scene.file

        destination = open(os.path.join("/Users/lewislin/Downloads/", scene.file_name), 'wb+')
        chunk = file.read(size=4000)

        while chunk:
            destination.write(chunk)
            chunk = file.read(size=4000)

        destination.close()
        output = scene.scene_name + " " + scene.description + " " + scene.category + " " +scene.tag + " " + str(scene.date_created)
        
    return HttpResponse(scene_id + " has been saved! " + output)


@api_view(['GET', 'POST'])
def scenes_list(request):
    if request.method == 'GET':
        data = models.Scene.objects.all()

        serializer = SceneSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = SceneSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'DELETE'])
def scene_detail(request, file_name):
    try:
        scene = models.Scene.objects.get(file_name=file_name)
    except models.Scene.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = SceneSerializer(scene, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        scene.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

