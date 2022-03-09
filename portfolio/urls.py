from django.urls import path

from . import views

urlpatterns = [
    path('', views.home, name=''),
    path('home', views.home, name='home'),
    path('about', views.about, name='about'),
    path('contact', views.contact, name='contact'),
    path('projects', views.projects, name='projects'),
    path('projects/videos', views.videos, name='videos'),
    path('projects/modelling', views.modelling, name='modelling'),
    path('projects/games', views.games, name='games'),
    path('projects/coding', views.coding, name='coding'),
]

