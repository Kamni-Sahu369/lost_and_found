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


class FoundItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoundItem
        fields = '__all__'


class CreateUserProfileSerializer(serializers.ModelSerializer):
    users=MyReg_Serializer(source="user",read_only =True,many=False)
    class Meta:
        model = CreateUserProfile
        fields = '__all__'  