from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone
from datetime import timedelta
import random
from .models import BloodRequest
from .serializers import BloodRequestSerializer


COMPATIBLE_DONORS_FOR = {
    "O-":  ["O-"],
    "O+":  ["O-", "O+"],
    "A-":  ["O-", "A-"],
    "A+":  ["O-", "O+", "A-", "A+"],
    "B-":  ["O-", "B-"],
    "B+":  ["O-", "O+", "B-", "B+"],
    "AB-": ["O-", "A-", "B-", "AB-"],
    "AB+": ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"],
}

COOLDOWN_HOURS = 48


def get_hospital_from_token(request):
    from adminapi.models import Hospital
    auth = request.headers.get("Authorization", "")
    if not auth.startswith("Token "):
        return None
    token = auth.split(" ", 1)[1].strip()
    return Hospital.objects.filter(auth_token=token).first()


@api_view(["GET", "POST"])
def needs_list_create(request):
    if request.method == "GET":
        needs = BloodRequest.objects.filter(statut="en_cours")
        serializer = BloodRequestSerializer(needs, many=True)
        return Response(serializer.data)

    hospital = get_hospital_from_token(request)
    data = request.data.copy()
    if hospital:
        data["hopital"] = hospital.nom

    serializer = BloodRequestSerializer(data=data)
    if serializer.is_valid():
        instance = serializer.save()
        if hospital:
            instance.hopital_compte = hospital
            instance.save(update_fields=["hopital_compte"])
        return Response({"success": True}, status=status.HTTP_201_CREATED)
    return Response({"success": False, "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def match_donors(request):
    """POST /api/needs/match/  <- findMatchingDonors(groupe, lieu, urgence) côté front"""
    from donors.models import Donor

    groupe = request.data.get("groupe", "")
    lieu = (request.data.get("lieu") or "").strip().lower()
    urgence = request.data.get("urgence", "normal")

    groupes_compatibles = COMPATIBLE_DONORS_FOR.get(groupe, [])
    if not groupes_compatibles:
        return Response({"alerted": [], "skippedForCooldown": 0, "remainingEligible": 0})

    candidats = [d for d in Donor.objects.filter(groupe__in=groupes_compatibles) if d.eligible]

    def est_proche(donor):
        if not lieu:
            return True
        return lieu in donor.ville.lower() or donor.ville.lower() in lieu

    proches = [d for d in candidats if est_proche(donor=d)]
    autres = [d for d in candidats if d not in proches]
    candidats_ordonnes = proches + autres

    now = timezone.now()

    def en_cooldown(donor):
        if not donor.last_alerted_at:
            return False
        return (now - donor.last_alerted_at) < timedelta(hours=COOLDOWN_HOURS)

    if urgence == "critique":
        eligibles_cooldown = candidats_ordonnes
        skipped_for_cooldown = 0
        limit = 6
    else:
        eligibles_cooldown = [d for d in candidats_ordonnes if not en_cooldown(d)]
        skipped_for_cooldown = len([d for d in candidats_ordonnes if en_cooldown(d)])
        limit = 3

    selected = eligibles_cooldown[:limit]

    for donor in selected:
        donor.last_alerted_at = now
        donor.save(update_fields=["last_alerted_at"])

    alerted = [
        {
            "id": d.id,
            "prenom": d.nom.split(" ")[0],
            "distance": round(random.uniform(0.3, 4.0), 1),
        }
        for d in selected
    ]

    return Response({
        "alerted": alerted,
        "skippedForCooldown": skipped_for_cooldown,
        "remainingEligible": max(0, len(eligibles_cooldown) - len(selected)),
    })