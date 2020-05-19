import os
from django.shortcuts import render
from django.http import HttpResponse


def upload(request):
    return render(request, 'uploader/upload.html', {})


def write_file(request):
    if request.method == "POST":
        myFile = request.FILES.get("myfile", None)
        if not myFile:
            return HttpResponse("no files for upload!")
        destination = open(os.path.join("/home/yiran/", myFile.name), 'wb+')
        for chunk in myFile.chunks():
            destination.write(chunk)
        destination.close()
        return HttpResponse(myFile.name + " upload over!")

