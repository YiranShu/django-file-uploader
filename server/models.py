# from django_mongodb_engine.storage import GridFSStorage
# from django.db import models
import mongoengine
import datetime


# gridfs_storage = GridFSStorage()

from mongoengine import connect
connect('test3')


class Scene(mongoengine.Document):
    # created_on = models.DateTimeField(auto_now_add=True)
    # file = mongoengine.FileField()
    file_name = mongoengine.StringField()
    user = mongoengine.StringField()
    _id = mongoengine.ObjectIdField()
    # date_created = mongoengine.DateTimeField(default=datetime.datetime.utcnow)
    scene_name = mongoengine.StringField()
    description = mongoengine.StringField()
    category = mongoengine.StringField()
    tag = mongoengine.StringField()
    dataset = mongoengine.StringField()



