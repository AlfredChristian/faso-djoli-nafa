from django.contrib import admin
from .models import Donor, Donation, PhoneOTP


@admin.register(Donor)
class DonorAdmin(admin.ModelAdmin):
    list_display = ["nom", "telephone", "groupe", "ville", "dernier_don", "eligible"]
    list_filter = ["groupe", "ville"]
    search_fields = ["nom", "telephone"]


@admin.register(Donation)
class DonationAdmin(admin.ModelAdmin):
    list_display = ["donor", "centre", "ville", "date", "quantite"]
    list_filter = ["ville"]
    search_fields = ["donor__nom", "centre"]


@admin.register(PhoneOTP)
class PhoneOTPAdmin(admin.ModelAdmin):
    list_display = ["telephone", "code", "created_at", "is_used"]
    list_filter = ["is_used"]
    search_fields = ["telephone"]