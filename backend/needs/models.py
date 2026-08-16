from django.db import models


class BloodRequest(models.Model):
    GROUPE_CHOICES = [
        ("O-", "O-"), ("O+", "O+"),
        ("A-", "A-"), ("A+", "A+"),
        ("B-", "B-"), ("B+", "B+"),
        ("AB-", "AB-"), ("AB+", "AB+"),
    ]
    URGENCE_CHOICES = [
        ("normal", "Normal"),
        ("urgent", "Urgent"),
        ("critique", "Critique"),
    ]
    STATUT_CHOICES = [
        ("en_cours", "En cours"),
        ("resolu", "Résolu"),
    ]

    hopital = models.CharField(max_length=200)
    hopital_compte = models.ForeignKey(
        "adminapi.Hospital", null=True, blank=True, on_delete=models.SET_NULL, related_name="besoins"
    )
    groupe = models.CharField(max_length=3, choices=GROUPE_CHOICES)
    quantite = models.PositiveIntegerField()
    urgence = models.CharField(max_length=10, choices=URGENCE_CHOICES)
    lieu = models.CharField(max_length=150)
    statut = models.CharField(max_length=10, choices=STATUT_CHOICES, default="en_cours")
    date_publication = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-date_publication"]

    def __str__(self):
        return f"{self.hopital} - {self.groupe} ({self.urgence})"