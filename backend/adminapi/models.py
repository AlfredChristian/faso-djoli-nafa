import secrets
from django.db import models
from django.contrib.auth.models import User


class Hospital(models.Model):
    STATUT_CHOICES = [
        ("en_attente", "En attente"),
        ("valide", "Validé"),
        ("rejete", "Rejeté"),
    ]

    nom = models.CharField(max_length=200)
    ville = models.CharField(max_length=150)
    telephone = models.CharField(max_length=20, blank=True)
    email = models.EmailField(blank=True, unique=True, null=True)
    password = models.CharField(max_length=128, blank=True)
    auth_token = models.CharField(max_length=64, blank=True, null=True, unique=True)
    statut = models.CharField(max_length=10, choices=STATUT_CHOICES, default="en_attente")
    date_creation = models.DateTimeField(auto_now_add=True)

    def set_password(self, raw_password):
        from django.contrib.auth.hashers import make_password
        self.password = make_password(raw_password)

    def check_password(self, raw_password):
        from django.contrib.auth.hashers import check_password
        return check_password(raw_password, self.password)

    def generate_token(self):
        self.auth_token = secrets.token_hex(32)
        self.save(update_fields=["auth_token"])
        return self.auth_token

    def __str__(self):
        return f"{self.nom} ({self.get_statut_display()})"


class AdminToken(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="admin_token")
    token = models.CharField(max_length=64, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    @staticmethod
    def generate_for(user):
        token = secrets.token_hex(32)
        obj, _ = AdminToken.objects.update_or_create(user=user, defaults={"token": token})
        return obj.token

    def __str__(self):
        return f"Token de {self.user.username}"