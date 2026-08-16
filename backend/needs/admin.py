from django.contrib import admin
from .models import BloodRequest


@admin.register(BloodRequest)
class BloodRequestAdmin(admin.ModelAdmin):
    list_display = ["hopital", "groupe", "quantite", "urgence", "lieu", "statut", "date_publication"]
    list_filter = ["urgence", "statut", "groupe"]
    search_fields = ["hopital", "lieu"]
