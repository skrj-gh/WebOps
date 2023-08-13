from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='nav-home'),
    path('page1', views.page1, name='nav-page1'),
    path('page2', views.page2, name='nav-page2'),
]