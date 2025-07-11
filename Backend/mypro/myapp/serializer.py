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
    users=MyReg_Serializer(source="user",read_only =True,many=False)
    class Meta:
        model = ClaimItem
        fields = '__all__'
        read_only_fields = ['status', 'created_at', 'updated_at', 'user']

class PaymentSerializer(serializers.ModelSerializer):
    users=MyReg_Serializer(source="user",read_only =True,many=False)
    class Meta:
        model = Payment
        fields = '__all__'

# .........................................................
class SimpleLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()