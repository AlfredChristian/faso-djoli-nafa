from django.urls import path
from . import views

urlpatterns = [
    path("register/", views.register_donor, name="donor-register"),
    path("send-otp/", views.send_otp, name="donor-send-otp"),
    path("verify-otp/", views.verify_otp, name="donor-verify-otp"),
    path("me/", views.my_profile, name="donor-me"),
    path("me/donations/", views.my_donations, name="donor-donations"),
]