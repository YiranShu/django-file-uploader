# README: Scene Editor

## Description

Welcome to the Scene Editor! This repository holds the React.js web application built with a Django framework and the backend uploader connected to a MongoDB database. The Scene Editor Server is designed for easy interaction and storage of scenes built from the integrated Scene Toolkit. A built-in save functionality allows for the callback and updating of various scenes that can be accessed from the home page. Development setup information can be found below.

Currently, the most recent updates to the `scene-editor` can be found in this dev1.5 branch.

## Dev Setup

#### Django:
Ensure that the latest versions of [Python](https://www.python.org/downloads/) and [Django](https://www.djangoproject.com/download/) are installed on your local machine. You can verify completion by running `python3 --version` and `django-admin.py version`.

To ensure that the models are set up, in the root directory you must run `python3 manage.py makemigrations` and then `python3 manage.py migrate`

#### MongoDB:
Ensure that MongoDB is correctly installed and running for [Mac](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/), [Windows](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/), or [Linux](https://docs.mongodb.com/manual/administration/install-on-linux/). Running `Mongo` in your terminal to access the MongoDB Shell or downloading MongoDB Compass will allow you to view your local database of scenes.

#### Scene Toolkit Setup:
In order to access the Scene Toolkit within the scene editor web app, its server must be setup and running on the <http://localhost:8010> port.

#### Server Setup:
To connect the web application with the MongoDB database, run `python3 manage.py runserver 8080` in the root directory. Note that this must be run before the client side and must remain running in the background during use of the scene editor. 

#### Client Side Setup:
Setup and build for the interactive scene editor can be found within the `/client` file. It will eventually run on the <http://localhost:8081> port.

## Contributors
* [Lewis Lin](https://github.com/LewisLinn)
* [Yiran Shu](https://github.com/YiranShu)
* [David Han](https://github.com/davidfhan)

