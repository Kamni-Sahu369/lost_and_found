from rest_framework import serializers
from .models import *
from django.contrib.auth import authenticate



class MyReg_Serializer(serializers.ModelSerializer):
    class Meta:
        model = My_Reg
        fields = '__all__'

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(email=data['email'], password=data['password'])
        if not user:
            raise serializers.ValidationError("Invalid credentials")
        data['user'] = user
        
        return data




class LostItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = LostItem
        fields = '__all__'
        extra_kwargs = {
            'user': {'required': False}
        }


class FoundItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoundItem
        fields = '__all__'
        extra_kwargs = {
            'user': {'required': False}
        }


class CreateUserProfileSerializer(serializers.ModelSerializer):
    users=MyReg_Serializer(source="user",read_only =True,many=False)
    class Meta:
        model = CreateUserProfile
        fields = '__all__'  

#Feedback=================================================================

class FeedbackSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Feedback
        fields = ['id', 'user', 'feedback', 'rating', 'created_at']

    def get_user(self, obj):
        if obj.user is not None:
            return {
                "id": obj.user.id,
                "email": obj.user.email,
                "name": obj.user.name,
            }
        return None
    
#Suggestion=================================================================

class SuggestionSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Suggestion
        fields = ['id', 'user', 'type', 'subject', 'message', 'created_at']

    def get_user(self, obj):
        return {
            "id": obj.user.id,
            "name": obj.user.name,
            "email": obj.user.email,
        }
    
#==================================================================
class ClaimItemSerializer(serializers.ModelSerializer):
    users = MyReg_Serializer(source="user", read_only=True)
    lost_item_detail = LostItemSerializer(source="lost_item", read_only=True)
    found_item_detail = FoundItemSerializer(source="found_item", read_only=True)
 
    class Meta:
        model = ClaimItem
        fields = '__all__'
        read_only_fields = ['status', 'created_at', 'updated_at', 'user']

# class PaymentSerializer(serializers.ModelSerializer):
#     users=MyReg_Serializer(source="user",read_only =True,many=False)
#     lost_item=LostItemSerializer(source="lost_item.name",read_only =True,many=False)
#     class Meta:
#         model = Payment
#         fields = '__all__'

# ...
class PaymentSerializer(serializers.ModelSerializer):
    lost_item_detail = LostItemSerializer(source="lost_item", read_only=True)
    found_item_detail = FoundItemSerializer(source="found_item", read_only=True)
    payer_detail = MyReg_Serializer(source="payer", read_only=True)

    class Meta:
        model = Payment
        fields = '__all__'
class SimpleLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()



#Razorpay..........................................

# myapp/serializer.py

import razorpay
from django.conf import settings
from rest_framework import serializers
from .models import Payment, My_Reg, LostItem, FoundItem

from rest_framework import serializers
from .models import Payment, My_Reg, LostItem, FoundItem
import razorpay
from django.conf import settings

class PaymentCreateSerializer(serializers.ModelSerializer):
    payer_id = serializers.IntegerField(write_only=True)
    lost_item_id = serializers.IntegerField(write_only=True, required=False)
    found_item_id = serializers.IntegerField(write_only=True, required=False)

    class Meta:
        model = Payment
        fields = ['id', 'payer_id', 'amount', 'lost_item_id', 'found_item_id']

    def create(self, validated_data):
        payer_id = validated_data.pop('payer_id')
        lost_item_id = validated_data.pop('lost_item_id', None)
        found_item_id = validated_data.pop('found_item_id', None)

        payer = My_Reg.objects.get(id=payer_id)
        lost_item = LostItem.objects.get(id=lost_item_id) if lost_item_id else None
        found_item = FoundItem.objects.get(id=found_item_id) if found_item_id else None

        amount = validated_data.get('amount')

        # ✅ Check if payment already exists (prevent duplicate rows)
        existing_payment = Payment.objects.filter(
            payer=payer,
            lost_item=lost_item,
            found_item=found_item,
            amount=amount,
            status='pending'
        ).first()

        if existing_payment:
            return existing_payment

        # ✅ Create Razorpay Order
        client = razorpay.Client(auth=(settings.RAZORPAY_API_KEY, settings.RAZORPAY_API_SECRET))
        razorpay_order = client.order.create({
            "amount": int(amount * 100),
            "currency": "INR",
            "payment_capture": 1
        })

        # ✅ Create new Payment entry in DB
        payment = Payment.objects.create(
            payer=payer,
            amount=amount,
            lost_item=lost_item,
            found_item=found_item,
            transaction_id=razorpay_order['id'],
            status='pending'
        )

        return payment

# ......................category.............................
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
