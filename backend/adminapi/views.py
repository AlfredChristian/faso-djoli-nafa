from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.db.models import Count
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from donors.models import Donor
from needs.models import BloodRequest
from .models import Hospital, AdminToken
from .serializers import (
    HospitalPendingSerializer,
    HospitalRegisterSerializer,
    HospitalProfileSerializer,
    HospitalOwnNeedSerializer,
    DonorAdminListSerializer,
)


def get_hospital_from_token(request):
    auth = request.headers.get("Authorization", "")
    if not auth.startswith("Token "):
        return None
    token = auth.split(" ", 1)[1].strip()
    return Hospital.objects.filter(auth_token=token).first()


@api_view(["POST"])
def hospital_register(request):
    serializer = HospitalRegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"success": True}, status=status.HTTP_201_CREATED)
    return Response({"success": False, "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def hospital_login(request):
    email = request.data.get("email", "").strip()
    password = request.data.get("password", "")

    hospital = Hospital.objects.filter(email__iexact=email).first()
    if not hospital or not hospital.check_password(password):
        return Response({"success": False, "error": "Identifiants incorrects"}, status=status.HTTP_400_BAD_REQUEST)

    if hospital.statut != "valide":
        return Response(
            {"success": False, "error": "Compte en attente de validation par l'administrateur."},
            status=status.HTTP_403_FORBIDDEN,
        )

    token = hospital.generate_token()
    return Response({"success": True, "token": token})


@api_view(["GET"])
def hospital_me(request):
    hospital = get_hospital_from_token(request)
    if not hospital:
        return Response({"detail": "Non authentifié."}, status=status.HTTP_401_UNAUTHORIZED)
    return Response(HospitalProfileSerializer(hospital).data)


@api_view(["GET"])
def hospital_my_needs(request):
    hospital = get_hospital_from_token(request)
    if not hospital:
        return Response({"detail": "Non authentifié."}, status=status.HTTP_401_UNAUTHORIZED)
    needs = hospital.besoins.all()
    return Response(HospitalOwnNeedSerializer(needs, many=True).data)


def get_admin_from_token(request):
    auth = request.headers.get("Authorization", "")
    if not auth.startswith("Token "):
        return None
    token = auth.split(" ", 1)[1].strip()
    admin_token = AdminToken.objects.filter(token=token).select_related("user").first()
    return admin_token.user if admin_token else None


@api_view(["POST"])
def admin_login(request):
    email = request.data.get("email", "").strip()
    password = request.data.get("password", "")

    user = User.objects.filter(email__iexact=email, is_staff=True).first()
    if not user:
        return Response({"success": False, "error": "Identifiants incorrects"}, status=status.HTTP_400_BAD_REQUEST)

    authenticated = authenticate(username=user.username, password=password)
    if not authenticated:
        return Response({"success": False, "error": "Identifiants incorrects"}, status=status.HTTP_400_BAD_REQUEST)

    token = AdminToken.generate_for(authenticated)
    return Response({"success": True, "token": token})


@api_view(["GET"])
def admin_stats(request):
    if not get_admin_from_token(request):
        return Response({"detail": "Non authentifié."}, status=status.HTTP_401_UNAUTHORIZED)

    return Response({
        "donneurs": Donor.objects.count(),
        "hopitaux": Hospital.objects.filter(statut="valide").count(),
        "besoinsActifs": BloodRequest.objects.filter(statut="en_cours").count(),
        "besoinsResolus": BloodRequest.objects.filter(statut="resolu").count(),
    })


@api_view(["GET"])
def pending_hospitals(request):
    if not get_admin_from_token(request):
        return Response({"detail": "Non authentifié."}, status=status.HTTP_401_UNAUTHORIZED)

    hospitals = Hospital.objects.filter(statut="en_attente").order_by("-date_creation")
    return Response(HospitalPendingSerializer(hospitals, many=True).data)


@api_view(["POST"])
def validate_hospital(request, hospital_id):
    if not get_admin_from_token(request):
        return Response({"detail": "Non authentifié."}, status=status.HTTP_401_UNAUTHORIZED)

    hospital = Hospital.objects.filter(id=hospital_id).first()
    if not hospital:
        return Response({"success": False, "error": "Hôpital introuvable."}, status=status.HTTP_404_NOT_FOUND)

    hospital.statut = "valide"
    hospital.save(update_fields=["statut"])
    return Response({"success": True})


@api_view(["POST"])
def reject_hospital(request, hospital_id):
    if not get_admin_from_token(request):
        return Response({"detail": "Non authentifié."}, status=status.HTTP_401_UNAUTHORIZED)

    hospital = Hospital.objects.filter(id=hospital_id).first()
    if not hospital:
        return Response({"success": False, "error": "Hôpital introuvable."}, status=status.HTTP_404_NOT_FOUND)

    hospital.statut = "rejete"
    hospital.save(update_fields=["statut"])
    return Response({"success": True})


@api_view(["GET"])
def all_donors(request):
    if not get_admin_from_token(request):
        return Response({"detail": "Non authentifié."}, status=status.HTTP_401_UNAUTHORIZED)

    donors = Donor.objects.all().order_by("-date_inscription")
    return Response(DonorAdminListSerializer(donors, many=True).data)


@api_view(["GET"])
def blood_group_distribution(request):
    if not get_admin_from_token(request):
        return Response({"detail": "Non authentifié."}, status=status.HTTP_401_UNAUTHORIZED)

    data = (
        Donor.objects.values("groupe")
        .annotate(total=Count("id"))
        .order_by("groupe")
    )
    result = [{"groupe": row["groupe"], "total": row["total"]} for row in data]
    return Response(result)