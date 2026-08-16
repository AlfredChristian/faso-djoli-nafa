from django.urls import path
from . import views

urlpatterns = [
    path("", views.needs_list_create, name="needs-list-create"),
    path("match/", views.match_donors, name="needs-match"),
]