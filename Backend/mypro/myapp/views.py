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






# Registration
class PracticeList(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data.copy()
        data['password'] = make_password(data.get('password'))

        serializer = MyReg_Serializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Data saved successfully'}, status=status.HTTP_201_CREATED)
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
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            
            refresh = RefreshToken.for_user(user)
            
            return Response({
                "status": True,
                "message": "Login successful",
                "access_token": str(refresh.access_token),
                "refresh_token": str(refresh),
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

