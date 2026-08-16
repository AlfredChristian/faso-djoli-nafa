from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import timedelta
from donors.models import Donor


class Command(BaseCommand):
    help = "Crée des donneurs de test variés pour tester le moteur de matching."

    def handle(self, *args, **options):
        today = timezone.now().date()

        donneurs_test = [
            # nom, telephone, groupe, ville, jours depuis dernier don (None = jamais donné = éligible)
            ("Test O- Proche Éligible", "70000010", "O-", "Ouagadougou", 180),
            ("Test A+ Proche Éligible", "70000011", "A+", "Ouagadougou", 200),
            ("Test O+ Loin Éligible", "70000012", "O+", "Bobo-Dioulasso", 150),
            ("Test AB+ Proche Éligible", "70000013", "AB+", "Ouagadougou", 300),
            ("Test O- Proche PAS Éligible", "70000014", "O-", "Ouagadougou", 10),
            ("Test B- Proche Éligible Jamais Donné", "70000015", "B-", "Ouagadougou", None),
            ("Test A- Proche Éligible", "70000016", "A-", "Ouagadougou", 400),
            ("Test B+ Loin Éligible", "70000017", "B+", "Koudougou", 250),
        ]

        created = 0
        for nom, telephone, groupe, ville, jours in donneurs_test:
            dernier_don = today - timedelta(days=jours) if jours is not None else None
            donor, was_created = Donor.objects.update_or_create(
                telephone=telephone,
                defaults={
                    "nom": nom,
                    "groupe": groupe,
                    "ville": ville,
                    "dernier_don": dernier_don,
                },
            )
            if was_created:
                created += 1

        self.stdout.write(self.style.SUCCESS(f"{created} nouveaux donneurs de test créés ({len(donneurs_test)} au total, existants mis à jour)."))