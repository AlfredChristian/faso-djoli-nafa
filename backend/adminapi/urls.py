from django.urls import path
from . import views

urlpatterns = [
    path("login/", views.admin_login, name="admin-login"),
    path("stats/", views.admin_stats, name="admin-stats"),
    path("hospitals/pending/", views.pending_hospitals, name="admin-hospitals-pending"),
    path("hospitals/<int:hospital_id>/validate/", views.validate_hospital, name="admin-hospital-validate"),
    path("hospitals/<int:hospital_id>/reject/", views.reject_hospital, name="admin-hospital-reject"),
    path("donors/", views.all_donors, name="admin-donors"),
    path("blood-distribution/", views.blood_group_distribution, name="admin-blood-distribution"),
]