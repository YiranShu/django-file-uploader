# Scene Editor Server

Welcome to the Scene Editor Server Side!

## Description

This repository holds a React web application built with a Django framework and backed by a MongoDB database. The Scene Editor Server is designed to interact and store scenes built from the Scene Toolkit. A built-in save functionality allows for the callback and updating of various scenes that can be accessed from the home page. Development setup information can be found below.

Currently, the most recent updates to the scene-editor-server can be found in the dev1.5 branch.

## Setup

#### Django:
Ensure that the latest versions of [Python](https://www.python.org/downloads/) and [Django](https://www.djangoproject.com/download/) are installed on your local machine. You can verify completion by running `python3 --version` and `django-admin.py version`.

#### MongoDB:
Ensure that MongoDB is correctly installed and running for [Mac](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/), [Windows](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/), or [Linux](https://docs.mongodb.com/manual/administration/install-on-linux/). Running `Mongo` to access the MongoDB Shell or downloading MongoDB Compass will allow you to view your local database of scenes.

#### Server Setup:
To connect the web application with the MongoDB database, run `python3 manage.py runserver 8080` in the root directory. Ensure that this remains running in the background to correctly save scenes.

#### Scene Toolkit Setup:
In order to access the Scene Toolkit within the scene editor web app, its server must be setup and running on the <http://localhost:8010> port.

#### Web Application Setup:
Setup and build for the interactive scene editor can be found within the **scene-editor-server-fe** file.

## Contributors
* [Yiran Shu](https://github.com/YiranShu)
* Lewis Lin
* [David Han](https://github.com/davidfhan)

