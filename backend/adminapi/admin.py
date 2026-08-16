from django.contrib import admin
from .models import Hospital, AdminToken


@admin.register(Hospital)
class HospitalAdmin(admin.ModelAdmin):
    list_display = ["nom", "ville", "email", "statut", "date_creation"]
    list_filter = ["statut"]
    search_fields = ["nom", "ville", "email"]


@admin.register(AdminToken)
class AdminTokenAdmin(admin.ModelAdmin):
    list_display = ["user", "created_at"]