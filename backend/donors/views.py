from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Donor, Donation, PhoneOTP
from .serializers import (
    DonorRegisterSerializer,
    DonorProfileSerializer,
    DonorUpdateSerializer,
    DonationSerializer,
)


def get_donor_from_token(request):
    auth = request.headers.get("Authorization", "")
    if not auth.startswith("Token "):
        return None
    token = auth.split(" ", 1)[1].strip()
    return Donor.objects.filter(auth_token=token).first()


@api_view(["POST"])
def register_donor(request):
    serializer = DonorRegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"success": True}, status=status.HTTP_201_CREATED)
    return Response({"success": False, "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def send_otp(request):
    telephone = request.data.get("telephone", "").strip()
    if not telephone:
        return Response({"success": False, "error": "Téléphone requis."}, status=status.HTTP_400_BAD_REQUEST)

    code = PhoneOTP.generate_code()
    PhoneOTP.objects.create(telephone=telephone, code=code)
    print(f"[SMS SIMULÉ] Code de connexion pour {telephone} : {code}")

    return Response({"success": True})


@api_view(["POST"])
def verify_otp(request):
    telephone = request.data.get("telephone", "").strip()
    code = request.data.get("code", "").strip()

    otp = (
        PhoneOTP.objects.filter(telephone=telephone, code=code, is_used=False)
        .order_by("-created_at")
        .first()
    )
    if not otp or not otp.is_valid():
        return Response({"success": False, "error": "Code incorrect ou expiré."}, status=status.HTTP_400_BAD_REQUEST)

    donor = Donor.objects.filter(telephone=telephone).first()
    if not donor:
        return Response(
            {"success": False, "error": "Aucun compte donneur pour ce numéro."},
            status=status.HTTP_404_NOT_FOUND,
        )

    otp.is_used = True
    otp.save(update_fields=["is_used"])

    token = donor.generate_token()
    return Response({"success": True, "token": token})


@api_view(["GET", "PATCH"])
def my_profile(request):
    donor = get_donor_from_token(request)
    if not donor:
        return Response({"detail": "Non authentifié."}, status=status.HTTP_401_UNAUTHORIZED)

    if request.method == "GET":
        return Response(DonorProfileSerializer(donor).data)

    serializer = DonorUpdateSerializer(donor, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response({"success": True})
    return Response({"success": False, "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def my_donations(request):
    donor = get_donor_from_token(request)
    if not donor:
        return Response({"detail": "Non authentifié."}, status=status.HTTP_401_UNAUTHORIZED)

    donations = donor.donations.all()
    return Response(DonationSerializer(donations, many=True).data)