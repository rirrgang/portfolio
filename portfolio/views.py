from django.shortcuts import render
from django.template import loader
from django.http import HttpResponse


def home(request):
   return render(request, 'portfolio/html/home.html', {'nav': 'home'})

def about(request):
   return render(request, 'portfolio/html/about.html', {'nav': 'about'})

def contact(request):
   return render(request, 'portfolio/html/contact.html', {'nav': 'contact'})

def projects(request):
   return render(request, 'portfolio/html/projects.html', {'nav': 'projects'})

def videos(request):
   return render(request, 'portfolio/html/videos.html', {'nav': 'videos'})

def modelling(request):

   context = {
      'nav' : 'modelling',
      'models' : [
         {'dataName': 'Swiss Knife'  , 'dataModelSource' : '/static/portfolio/models/Swiss_Knife.gltf', 'imgSrc': '/static/portfolio/models/Swiss_Knife.png'},
         {'dataName': 'Combat Knife' , 'dataModelSource' : '/static/portfolio/models/Combat_Knife.gltf','imgSrc': '/static/portfolio/models/Combat_Knife.png'},
         {'dataName': 'City House'   , 'dataModelSource' : '/static/portfolio/models/city_house.gltf',  'imgSrc': '/static/portfolio/pictures/logo3.png'},
         
      ]
   }

   return render(request, 'portfolio/html/modelling.html', context)

def games(request):
   return render(request, 'portfolio/html/games.html', {'nav': 'games'})

def coding(request):
   return render(request, 'portfolio/html/coding.html', {'nav': 'coding'})


# ------------------------CUSTOM ERROR PAGES ---------------------
def handler400(request, exception):
    return render(request, 'portfolio/html/errors/400.html', status=400)

def handler403(request, exception):
    return render(request, 'portfolio/html/errors/403.html', status=403)

def handler404(request, exception):
    return render(request, 'portfolio/html/errors/404.html', status=404)

def handler500(request):
    return render(request, 'portfolio/html/errors/500.html', status=500)



