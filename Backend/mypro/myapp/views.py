from django.shortcuts import render, redirect
from .models import My_Reg, LostItem, FoundItem, CreateUserProfile
from .serializer import *
from django.shortcuts import get_object_or_404
from django.contrib.auth.hashers import make_password
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.template.loader import render_to_string
from django.core.mail import EmailMultiAlternatives
from django.conf import settings
import random
from rest_framework import viewsets
from rest_framework.status import HTTP_401_UNAUTHORIZED

class PracticeList(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        data = request.data.copy()
        data['password'] = make_password(data.get('password'))
        otp = random.randint(100000, 999999)
        data['otp'] = otp

        serializer = MyReg_Serializer(data=data)
        if serializer.is_valid():
            user = serializer.save()

            subject = "Welcome to Our Platform – Your OTP Code"
            from_email = settings.EMAIL_HOST_USER
            to_email = user.email
            context = {'name': user.name, 'otp': otp}
            html_content = render_to_string('email_template.html', context)

            email = EmailMultiAlternatives(subject, '', from_email, [to_email])
            email.attach_alternative(html_content, "text/html")
            email.send()

            return Response({'message': 'Registration successful and OTP sent to email', 'data': serializer.data}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, pk=None):
        if pk:
            try:
                user = My_Reg.objects.get(id=pk)
            except My_Reg.DoesNotExist:
                return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
            serializer = MyReg_Serializer(user)
            return Response(serializer.data)
        
        users = My_Reg.objects.all().order_by("-id")
        serializer = MyReg_Serializer(users, many=True)

        total_users = users.count()
        active_users = users.filter(is_active=True).count()
        inactive_users = users.filter(is_active=False).count()
        admins = users.filter(is_staff=True).count()  # or your own admin logic

        # 👇 Return both count and user list
        return Response({
            "total_users": total_users,
            "active_users": active_users,
            "inactive_users": inactive_users,
            "admins": admins,
            "users": serializer.data,
            })

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
        return Response({"message": "Password updated successfully"})


# Authentication Login
class LoginAPIView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            role = "admin" if user.is_staff else "user"
            refresh = RefreshToken.for_user(user)
            return Response({
                "id": user.id,
                "email":user.email,
                "status": True,
                "message": "Login successful",
                "access_token": str(refresh.access_token),
                "refresh_token": str(refresh),
                "role": role
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class LostItemCreateView(APIView):
#     permission_classes = [AllowAny]

#     def post(self, request):
#         serializer = LostItemSerializer(data=request.data)
#         if serializer.is_valid():
#             if request.user and request.user.is_authenticated:
#                 serializer.save(user=request.user)
#             else:
#                 serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def get(self, request, pk=None):
#         category = request.GET.get("category")

#         if pk:
#             try:
#                 item = LostItem.objects.get(id=pk)
#                 serializer = LostItemSerializer(item)
#                 return Response(serializer.data)
#             except LostItem.DoesNotExist:
#                 return Response({"error": "Item not found"}, status=status.HTTP_404_NOT_FOUND)

#         if category:
#             items = LostItem.objects.filter(category__iexact=category).order_by("-id")
#         else:
#             items = LostItem.objects.all().order_by("-id")

#         serializer = LostItemSerializer(items, many=True)
#         return Response(serializer.data)


# class FoundItemCreateView(APIView):
#     permission_classes = [AllowAny]

#     def post(self, request):
#         serializer = FoundItemSerializer(data=request.data)
#         if serializer.is_valid():
#             if request.user and request.user.is_authenticated:
#                 serializer.save(user=request.user)
#             else:
#                 serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def get(self, request, pk=None):
#         category = request.GET.get("category")

#         if pk:
#             try:
#                 item = FoundItem.objects.get(id=pk)
#                 serializer = FoundItemSerializer(item)
#                 return Response(serializer.data)
#             except FoundItem.DoesNotExist:
#                 return Response({"error": "Item not found"}, status=status.HTTP_404_NOT_FOUND)

#         if category:
#             items = FoundItem.objects.filter(category__iexact=category).order_by("-id")
#         else:
#             items = FoundItem.objects.all().order_by("-id")

#         serializer = FoundItemSerializer(items, many=True)
#         return Response(serializer.data)





class LostItemCreateView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LostItemSerializer(data=request.data)
        if serializer.is_valid():
            if request.user and request.user.is_authenticated:
                serializer.save(user=request.user)
            else:
                serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, pk=None):
        category = request.GET.get("category")

        if pk:
            try:
                item = LostItem.objects.get(id=pk)
                serializer = LostItemSerializer(item)
                return Response(serializer.data)
            except LostItem.DoesNotExist:
                return Response({"error": "Item not found"}, status=status.HTTP_404_NOT_FOUND)

        if category:
            items = LostItem.objects.filter(category__iexact=category).order_by("-id")
        else:
            items = LostItem.objects.all().order_by("-id")

        serializer = LostItemSerializer(items, many=True)
        return Response(serializer.data)

    def patch(self, request, pk):
        try:
            item = LostItem.objects.get(id=pk)
        except LostItem.DoesNotExist:
            return Response({"error": "Item not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = LostItemSerializer(item, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            item = LostItem.objects.get(id=pk)
            item.delete()
            return Response({"message": "Item deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except LostItem.DoesNotExist:
            return Response({"error": "Item not found"}, status=status.HTTP_404_NOT_FOUND)


class FoundItemCreateView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = FoundItemSerializer(data=request.data)
        if serializer.is_valid():
            if request.user and request.user.is_authenticated:
                serializer.save(user=request.user)
            else:
                serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, pk=None):
        category = request.GET.get("category")

        if pk:
            try:
                item = FoundItem.objects.get(id=pk)
                serializer = FoundItemSerializer(item)
                return Response(serializer.data)
            except FoundItem.DoesNotExist:
                return Response({"error": "Item not found"}, status=status.HTTP_404_NOT_FOUND)

        if category:
            items = FoundItem.objects.filter(category__iexact=category).order_by("-id")
        else:
            items = FoundItem.objects.all().order_by("-id")

        serializer = FoundItemSerializer(items, many=True)
        return Response(serializer.data)

    def patch(self, request, pk):
        try:
            item = FoundItem.objects.get(id=pk)
        except FoundItem.DoesNotExist:
            return Response({"error": "Item not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = FoundItemSerializer(item, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            item = FoundItem.objects.get(id=pk)
            item.delete()
            return Response({"message": "Item deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except FoundItem.DoesNotExist:
            return Response({"error": "Item not found"}, status=status.HTTP_404_NOT_FOUND)



class CreateProfile(APIView):
    permission_classes = [IsAuthenticated]

    # def post(self, request):
    #     data = request.data.copy()
    #     data['user'] = request.user.id
    #     serializer = CreateUserProfileSerializer(data=data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors)

    def post(self, request):
        data = request.data.copy()
        data['user'] = request.user.id

        # Check if profile exists
        try:
            profile = CreateUserProfile.objects.get(user=request.user)
            # Update existing profile
            serializer = CreateUserProfileSerializer(profile, data=data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except CreateUserProfile.DoesNotExist:
            # Create new profile
            serializer = CreateUserProfileSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def get(self, request, id=None):  # ✅ id optional
        if id:
            try:
                profile = CreateUserProfile.objects.filter(user=id)
                serializer = CreateUserProfileSerializer(profile ,many = True)
                return Response(serializer.data)
            except CreateUserProfile.DoesNotExist:
                return Response({"error": "Profile not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            profiles = CreateUserProfile.objects.all().order_by("-id")
            serializer = CreateUserProfileSerializer(profiles, many=True)
            return Response(serializer.data)
        
#==========================#Feedback#================================================
class FeedbackView(APIView):
    def get(self, request, pk=None):
        if pk:
            try:
                feedback = Feedback.objects.get(pk=pk)
                serializer = FeedbackSerializer(feedback)
                return Response(serializer.data)
            except Feedback.DoesNotExist:
                return Response({"error": "Feedback not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            user_id = request.GET.get("user_id")

            if user_id:
                feedbacks = Feedback.objects.filter(user_id=user_id).order_by("-created_at")
            else:
                # ✅ No user_id → assume admin → return all feedback
                feedbacks = Feedback.objects.all().order_by("-created_at")

            serializer = FeedbackSerializer(feedbacks, many=True)
            return Response(serializer.data)


    def post(self, request):
        user_id = request.data.get("user")
        try:
            user = My_Reg.objects.get(id=user_id)
        except My_Reg.DoesNotExist:
            return Response({"error": "Invalid user ID"}, status=status.HTTP_400_BAD_REQUEST)

        data = request.data.copy()
        data["user"] = user.id  # Keep ID for serializer

        serializer = FeedbackSerializer(data=data)
        if serializer.is_valid():
            serializer.save(user=user)  # Pass user instance to .save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        feedback = get_object_or_404(Feedback, pk=pk)
        serializer = FeedbackSerializer(feedback, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk):
        feedback = get_object_or_404(Feedback, pk=pk)
        serializer = FeedbackSerializer(feedback, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        feedback = get_object_or_404(Feedback, pk=pk)
        feedback.delete()
        return Response({"message": "Feedback deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
    
#==========================#Suggestion#============================
class SuggestionView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, pk=None):
        if pk:
            try:
                feedback = Suggestion.objects.get(pk=pk)
                serializer = SuggestionSerializer(feedback)
                return Response(serializer.data)
            except Suggestion.DoesNotExist:
                return Response({"error": "Feedback not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            user_id = request.GET.get("user_id")

            if user_id:
                suggestions = Suggestion.objects.filter(user_id=user_id).order_by("-created_at")
            else:
                # ✅ No user_id → assume admin → return all feedback
                suggestions = Suggestion.objects.all().order_by("-created_at")

            serializer = SuggestionSerializer(suggestions, many=True)
            return Response(serializer.data)



    def post(self, request):
        user_id = request.data.get("user")
        try:
            user = My_Reg.objects.get(id=user_id)
        except My_Reg.DoesNotExist:
            return Response({"error": "Invalid user ID"}, status=status.HTTP_400_BAD_REQUEST)

        data = request.data.copy()
        data["user"] = user.id  # Keep ID for serializer

        serializer = SuggestionSerializer(data=data)
        if serializer.is_valid():
            serializer.save(user=user)  # Pass user instance to .save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def delete(self, request, pk):
        try:
            suggestion = Suggestion.objects.get(pk=pk)
            if request.user.is_staff or suggestion.user == request.user:
                suggestion.delete()
                return Response({"message": "Deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
            return Response({"error": "Permission denied"}, status=status.HTTP_403_FORBIDDEN)
        except Suggestion.DoesNotExist:
            return Response({"error": "Not found"}, status=status.HTTP_404_NOT_FOUND)

#============VerifyOtp=======================

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
            })
        return Response({
            "status": False,
            "message": "Invalid email or OTP."
        }, status=status.HTTP_400_BAD_REQUEST)

class ClaimItemAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ClaimItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)  # ✅ Set user manually here
            return Response({"message": "Claim submitted successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request):
        claim = ClaimItem.objects.all().order_by("-id")
        serializer = ClaimItemSerializer(claim, many=True)
        return Response(serializer.data)
    

class PaymentAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = PaymentSerializer(data=request.data)
        if serializer.is_valid():
            payment = serializer.save()  # ✅ Save and get instance

            # 🟢 Update related claim status
            claim_id = request.data.get("claim")
            # import pdb;
            # pdb.set_trace()
            if claim_id:
                try:
                    claim = ClaimItem.objects.get(id=claim_id)
                    claim.status = "Approved"  # or "paid", based on your logic
                    claim.save()
                except ClaimItem.DoesNotExist:
                    return Response({"error": "Claim not found"}, status=status.HTTP_404_NOT_FOUND)

            return Response({
                "message": "Payment & claim status updated",
                "claim_id": claim.id,
                "new_status": claim.status
                }, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def get(self, request, id=None):  
        if id:
            try:
                payment = Payment.objects.filter(user=int(id)).order_by('-id')
                serializer = PaymentSerializer(payment,many=True)
                return Response(serializer.data)
            except Payment.DoesNotExist:
                return Response({'error': 'Payment not found'}, status=404)
        else:
            payments = Payment.objects.all().order_by('-id')
            serializer = PaymentSerializer(payments, many=True)
            return Response(serializer.data)


# ..............................................................................
# Without Authentication login
class SimpleLoginAPIView(APIView):
    def post(self, request):
        serializer = SimpleLoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            try:
                user = user.objects.get(email=email)
                if user.check_password(password):
                    role = "admin" if user.is_staff else "user"
                    return Response({
                        "id": user.id,
                        "email": user.email,
                        "username": user.username,
                        "role": role,
                        "message": "Login successful"
                    })
                else:
                    return Response({"error": "Incorrect password"}, status=status.HTTP_401_UNAUTHORIZED)
            except user.DoesNotExist:
                return Response({"error": "User does not exist"}, status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)