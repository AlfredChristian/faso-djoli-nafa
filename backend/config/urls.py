from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/donors/", include("donors.urls")),
    path("api/needs/", include("needs.urls")),
    path("api/hospitals/", include("adminapi.hospital_urls")),
    path("api/admin/", include("adminapi.urls")),
]