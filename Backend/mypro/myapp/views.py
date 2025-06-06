from django.shortcuts import render, redirect
from .models import My_Reg
from .serializer import *
from django.contrib.auth.hashers import make_password, check_password
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from django.template.loader import render_to_string
from django.core.mail import EmailMultiAlternatives
from django.conf import settings
import random



class PracticeList(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data.copy()

        # 1. Hash the password
        data['password'] = make_password(data.get('password'))

        # 2. Generate a 6-digit OTP
        otp = random.randint(100000, 999999)
        data['otp'] = otp  # Save OTP in DB with user

        # 3. Validate and Save User
        serializer = MyReg_Serializer(data=data)
        if serializer.is_valid():
            user = serializer.save()

            # 4. Prepare and send the email
            subject = "Welcome to Our Platform – Your OTP Code"
            from_email = settings.EMAIL_HOST_USER
            to_email = user.email

            context = {
                'name': user.name,
                'otp': otp
            }

            html_content = render_to_string('email_template.html', context)
            email = EmailMultiAlternatives(subject, '', from_email, [to_email])
            email.attach_alternative(html_content, "text/html")
            email.send()

            return Response(
                {'message': 'Registration successful and OTP sent to email','data':serializer.data},
                status=status.HTTP_201_CREATED
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, pk=None):  # pk ko optional banaya
        if pk:
            try:
                user = My_Reg.objects.get(id=pk)
            except My_Reg.DoesNotExist:
                return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

            serializer = MyReg_Serializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)

        # Agar pk nahi hai toh sab users ki list bhej do
        lost_items = My_Reg.objects.all().order_by("-id")
        serializer = MyReg_Serializer(lost_items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request, pk=None):
        if not pk:
            return Response({"error": "User ID is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user_obj = My_Reg.objects.get(id=pk)
        except My_Reg.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        new_password = request.data.get('password')
        if not new_password:
            return Response({"error": "Password is required"}, status=status.HTTP_400_BAD_REQUEST)

        user_obj.password = make_password(new_password)
        user_obj.save()

        return Response({"message": "Password updated successfully"}, status=status.HTTP_200_OK)





# Login
class LoginAPIView(APIView):
    def post(self, request):
        # import pdb
        # pdb.set_trace()
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            # is_staff check karo directly
            role = "admin" if user.is_staff else "user"
            refresh = RefreshToken.for_user(user)
            
            return Response({
                "status": True,
                "message": "Login successful",
                "access_token": str(refresh.access_token),
                "refresh_token": str(refresh),
                "role": role
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Lost
class LostItemCreateView(APIView):
    parser_classes = [MultiPartParser, FormParser]  # 🔸 Required for file/image upload

    def post(self, request):
        serializer = LostItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        lost_items = LostItem.objects.all().order_by("-id")  # You can limit if needed
        serializer = LostItemSerializer(lost_items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)






# Found 
class FoundItemCreateView(APIView):
    parser_classes = [MultiPartParser, FormParser]  # 🔸 Required for file/image upload

    def post(self, request):
        serializer = FoundItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

    def get(self, request):
        lost_items = FoundItem.objects.all().order_by("-id")  # You can limit if needed
        serializer = FoundItemSerializer(lost_items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)



# createprofile
class CraeteProfile(APIView):
    # parser_classes = [MultiPartParser, FormParser]  # 🔸 Required for file/image upload

    def post(self, request):
        print(request.user.id)
        data=request.data
        data['user']=request.user.id
        serializer = CreateUserProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def get(self, request):
        lost_items = CreateUserProfile.objects.all().order_by("-id") 
        serializer = CreateUserProfileSerializer(lost_items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class FeedbackView(APIView):
    def post(self, request):
        serializer = FeedbackSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class VerifyOtp(APIView):
    def post(self, request):
        email = request.data.get('email')
        otp = request.data.get('otp')

        if not email or not otp:
            return Response({
                "status": False,
                "message": "Email and OTP are required."
            }, status=status.HTTP_400_BAD_REQUEST)

        user = My_Reg.objects.filter(email=email, otp=otp).first()

        if user:
            user.is_active = True
            user.save()
            return Response({
                "status": True,
                "message": "OTP verified. Account activated."
            }, status=status.HTTP_200_OK)

        return Response({
            "status": False,
            "message": "Invalid email or OTP."
        }, status=status.HTTP_400_BAD_REQUEST)