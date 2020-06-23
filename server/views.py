import os
from django.shortcuts import render
from django.http import HttpResponse
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from . import models
from .serializers import SceneSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


@api_view(['GET'])
def upload(request):
    return render(request, 'server/server.html', {})


# @api_view(['POST'])
# def save_to_database(request):
#     if request.method == "POST":
#         myFile = request.FILES.get("myfile", None)
#         if not myFile:
#             return HttpResponse("no files for upload!")

#         models.Scene(
#             file=myFile, 
#             file_name=myFile.name,
#             user=request.POST.get('user_name'),
#             scene_name=request.POST.get("scene_name"),
#             description=request.POST.get("description"),
#             category=request.POST.get("category"),
#             tag=request.POST.get("tag"),
#         ).save()

#         return HttpResponse(myFile.name + " upload over!")


# @api_view(['GET'])
# def retrieve_from_database(request, scene_id):
#     scenes = models.Scene.objects(file_name=scene_id)

#     for scene in scenes:
#         file = scene.file

#         destination = open(os.path.join("/Users/lewislin/Downloads/", scene.file_name), 'wb+')
#         chunk = file.read(size=4000)

#         while chunk:
#             destination.write(chunk)
#             chunk = file.read(size=4000)

#         destination.close()
#         output = scene.scene_name + " " + scene.description + " " + scene.category + " " +scene.tag + " " + str(scene.date_created)
        
#     return HttpResponse(scene_id + " has been saved! " + output)


@api_view(['GET', 'POST', 'DELETE'])
def scenes_list(request):
    if request.method == 'GET':
        data = models.Scene.objects.all()

        serializer = SceneSerializer(data, context={'request': request}, many=True)

        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        scene_data = JSONParser().parse(request)
        serializer = SceneSerializer(data=scene_data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)

        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        count = models.Scene.objects.all().delete()
        return JsonResponse({'message': '{} Scenes were deleted successfully!'.format(count)}, status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'PUT', 'DELETE'])
def scene_detail(request, _id):
    try:
        scene = models.Scene.objects.get(_id=_id)
    except models.Scene.DoesNotExist:
        return JsonResponse({'message': 'The scene does not exist'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = SceneSerializer(scene)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':               #need a trailing slash / in url
        scene_data = JSONParser().parse(request)
        serializer = SceneSerializer(scene, data=scene_data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':           #need a trailing slash / in url
        models.Scene.objects.filter(_id=_id).delete()
        return JsonResponse({'message': 'Scene was deleted successfully!'},status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def scene_filter(request, scene_name):
    try:
        scene = models.Scene.objects.get(scene_name=scene_name)
    except models.Scene.DoesNotExist:
        return JsonResponse({'message': 'The scene does not exist'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = SceneSerializer(scene)
        return JsonResponse(serializer.data)
