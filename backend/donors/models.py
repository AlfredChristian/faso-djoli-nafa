import secrets
import random
from django.db import models
from django.utils import timezone
from datetime import date, timedelta


class Donor(models.Model):
    GROUPE_CHOICES = [
        ("O-", "O-"), ("O+", "O+"),
        ("A-", "A-"), ("A+", "A+"),
        ("B-", "B-"), ("B+", "B+"),
        ("AB-", "AB-"), ("AB+", "AB+"),
    ]

    nom = models.CharField(max_length=150)
    telephone = models.CharField(max_length=20, unique=True)
    groupe = models.CharField(max_length=3, choices=GROUPE_CHOICES)
    ville = models.CharField(max_length=150)
    dernier_don = models.DateField(null=True, blank=True)
    nombre_dons = models.PositiveIntegerField(default=0)
    vies_aidees = models.PositiveIntegerField(default=0)
    date_inscription = models.DateTimeField(auto_now_add=True)

    auth_token = models.CharField(max_length=64, blank=True, null=True, unique=True)
    last_alerted_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.nom} ({self.groupe})"

    @property
    def eligible(self):
        if not self.dernier_don:
            return True
        return date.today() >= self.dernier_don + timedelta(days=90)

    @property
    def prochaine_eligibilite(self):
        if not self.dernier_don:
            return None
        return self.dernier_don + timedelta(days=90)

    def generate_token(self):
        self.auth_token = secrets.token_hex(32)
        self.save(update_fields=["auth_token"])
        return self.auth_token


class Donation(models.Model):
    donor = models.ForeignKey(Donor, on_delete=models.CASCADE, related_name="donations")
    date = models.DateField()
    centre = models.CharField(max_length=200)
    ville = models.CharField(max_length=150)
    quantite = models.PositiveIntegerField(default=1)

    class Meta:
        ordering = ["-date"]

    def __str__(self):
        return f"{self.donor.nom} - {self.centre} ({self.date})"


class PhoneOTP(models.Model):
    telephone = models.CharField(max_length=20)
    code = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    is_used = models.BooleanField(default=False)

    def is_valid(self):
        expiration = self.created_at + timedelta(minutes=5)
        return not self.is_used and timezone.now() <= expiration

    @staticmethod
    def generate_code():
        return f"{random.randint(0, 9999):04d}"

    def __str__(self):
        return f"{self.telephone} - {self.code}"