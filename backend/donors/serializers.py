from rest_framework import serializers
from .models import Donor, Donation


class DonorRegisterSerializer(serializers.ModelSerializer):
    dernierDon = serializers.DateField(source="dernier_don", required=False, allow_null=True)

    class Meta:
        model = Donor
        fields = ["nom", "telephone", "groupe", "ville", "dernierDon"]


class DonorProfileSerializer(serializers.ModelSerializer):
    dernierDon = serializers.DateField(source="dernier_don")
    nombreDons = serializers.IntegerField(source="nombre_dons")
    viesAidees = serializers.IntegerField(source="vies_aidees")

    class Meta:
        model = Donor
        fields = ["nom", "telephone", "groupe", "ville", "dernierDon", "nombreDons", "viesAidees"]


class DonorUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donor
        fields = ["nom", "telephone", "ville"]


class DonationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donation
        fields = ["id", "date", "centre", "ville", "quantite"]