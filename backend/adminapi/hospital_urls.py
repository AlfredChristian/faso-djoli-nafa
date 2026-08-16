from django.urls import path
from . import views

urlpatterns = [
    path("register/", views.hospital_register, name="hospital-register"),
    path("login/", views.hospital_login, name="hospital-login"),
    path("me/", views.hospital_me, name="hospital-me"),
    path("me/needs/", views.hospital_my_needs, name="hospital-my-needs"),
]