from rest_framework import serializers
from .models import BloodRequest


class BloodRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = BloodRequest
        fields = ["id", "hopital", "groupe", "quantite", "urgence", "lieu", "statut", "date_publication"]
        read_only_fields = ["id", "statut", "date_publication"]
