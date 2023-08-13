from django.shortcuts import render

def home(request):
    return render(request, 'simpleNavigation/home.html', {'title': 'Basic HTML Page'})

def page1(request):
    return render(request, 'simpleNavigation/page1.html', {'title': 'Page 1'})

def page2(request):
    return render(request, 'simpleNavigation/page2.html', {'title': 'Page 2'})