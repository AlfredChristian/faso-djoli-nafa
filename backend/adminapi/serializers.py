from rest_framework import serializers
from .models import Hospital
from donors.models import Donor
from needs.models import BloodRequest


class HospitalPendingSerializer(serializers.ModelSerializer):
    date = serializers.DateTimeField(source="date_creation", format="%Y-%m-%d")

    class Meta:
        model = Hospital
        fields = ["id", "nom", "ville", "date"]


class HospitalRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=4)

    class Meta:
        model = Hospital
        fields = ["nom", "ville", "telephone", "email", "password"]

    def create(self, validated_data):
        password = validated_data.pop("password")
        hospital = Hospital(**validated_data)
        hospital.set_password(password)
        hospital.save()
        return hospital


class HospitalProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hospital
        fields = ["id", "nom", "ville", "telephone", "email", "statut"]


class HospitalOwnNeedSerializer(serializers.ModelSerializer):
    class Meta:
        model = BloodRequest
        fields = ["id", "hopital", "groupe", "quantite", "urgence", "lieu", "statut", "date_publication"]


class DonorAdminListSerializer(serializers.ModelSerializer):
    dernierDon = serializers.DateField(source="dernier_don")
    dons = serializers.IntegerField(source="nombre_dons")

    class Meta:
        model = Donor
        fields = ["id", "nom", "groupe", "ville", "dernierDon", "dons"]