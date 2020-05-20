# from django_mongodb_engine.storage import GridFSStorage
# from django.db import models
import mongoengine


# gridfs_storage = GridFSStorage()

from mongoengine import connect
connect('test')


class Scene(mongoengine.Document):
    # created_on = models.DateTimeField(auto_now_add=True)
    file = mongoengine.FileField()
    file_name = mongoengine.StringField()


