
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from .choice import CATEGORY_CHOICES



class CustomUserManager(BaseUserManager):
    # Use for login
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    # superuser hai ya staff h btana ke liye
    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        if extra_fields.get('is_active') is not True:
            raise ValueError('Superuser must have is_active=True.')
        return self.create_user(email, password, **extra_fields)


# extrafield ko add krne ke liye

class My_Reg(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)  
    name = models.CharField(max_length=255)
    country = models.CharField(max_length=100)
    phone = models.CharField(max_length=15) 
    otp = models.CharField(max_length=6 , default='000000' , blank=True , null= True) 
    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    last_login = models.DateTimeField(null=True, blank=True)  
    
    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def __str__(self):
        return self.email


class LostItem(models.Model):
    user = models.ForeignKey(My_Reg, on_delete=models.SET_NULL, null=True, blank=True)
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=50 , choices=CATEGORY_CHOICES)  #
    date = models.DateField(null=True, blank=True)  # Optional
    time = models.TimeField(null=True, blank=True)  # Made optional to avoid errors
    location = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    item_image = models.ImageField(upload_to='lost_items/')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class FoundItem(models.Model):
    user = models.ForeignKey(My_Reg, on_delete=models.SET_NULL, null=True, blank=True)
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=50 , choices=CATEGORY_CHOICES)  
    date = models.DateField(null=True, blank=True)  # Optional
    time = models.TimeField(null=True, blank=True)  # Made optional to avoid errors
    location = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    item_image = models.ImageField(upload_to='lost_items/')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class CreateUserProfile(models.Model):
    user = models.ForeignKey(My_Reg, on_delete=models.CASCADE)
    alternate_phone = models.CharField(max_length=15, blank=True, null=True)
    gender = models.CharField(max_length=10, choices=[("male", "Male"), ("female", "Female"), ("other", "Other")], blank=True)
    dob = models.DateField(blank=True, null=True)
    profile_pic = models.ImageField(upload_to='profile_pics/', blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    state = models.CharField(max_length=100, blank=True, null=True)
    pincode = models.CharField(max_length=10, blank=True, null=True)
    agreement = models.BooleanField(default=False)

    def __str__(self):
        return self.user.email


# feedback
class Feedback(models.Model):
    feedback = models.TextField()
    rating = models.PositiveSmallIntegerField()


# Claim Item
class ClaimItem(models.Model):
    user = models.ForeignKey(My_Reg, on_delete=models.CASCADE, related_name="claims")
    
    description = models.TextField()
    location_info = models.CharField(max_length=255)
    receipt_bill = models.FileField(upload_to='media/', null=True, blank=True)

    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
        ('resolved', 'Resolved'),
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Claim by - {self.status}"
    
# payment
class Payment(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('paid', 'Paid'),
        ('failed', 'Failed'),
    ]

    claim = models.ForeignKey(ClaimItem, on_delete=models.CASCADE, related_name='payments')
    user = models.ForeignKey(My_Reg, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    transaction_id = models.CharField(max_length=100, blank=True, null=True)
    payment_time = models.DateTimeField(auto_now_add=True)
    method = models.CharField(max_length=50, blank=True, null=True)  # Optional: UPI, Card, Razorpay
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Payment ₹{self.amount} for {self.claim} by "