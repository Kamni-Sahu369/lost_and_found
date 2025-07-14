"""
URL configuration for mypro project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path , include
from myapp.views import *
from payment.views import *
from rest_framework_simplejwt.views import ( TokenObtainPairView,TokenRefreshView,)
from django.conf.urls.static import static
from django.conf import settings
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
urlpatterns = [
    path('admin/', admin.site.urls),
    path('PracticeList/', PracticeList.as_view()),
    path('PracticeList/<int:pk>/', PracticeList.as_view(), name='practice-detail'),
    path('login/', LoginAPIView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('LostItemCreateView/',LostItemCreateView.as_view()),
    path('LostItemCreateView/<int:pk>/',LostItemCreateView.as_view()),
    path('FoundItemCreateView/',FoundItemCreateView.as_view()),
    path('FoundItemCreateView/<int:pk>/', FoundItemCreateView.as_view()),  
     path('CreateProfile/', CreateProfile.as_view(), name='create-profile'),
    path('CreateProfile/<int:id>/',CreateProfile.as_view()),

    path('FeedbackView/', FeedbackView.as_view()),             # For GET all and POST
    path('FeedbackView/<int:pk>/', FeedbackView.as_view()),

    path('suggestions/', SuggestionView.as_view()),  # GET (list), POST
    path('suggestions/<int:pk>/', SuggestionView.as_view()),  # GET by ID, DELETE
    
    path('varify_otp/',VerifyOtp.as_view()),
    path('claim/', ClaimItemAPIView.as_view(), name='claim-item'),
    # ..............................
    path("login/", SimpleLoginAPIView.as_view(), name="simple_login"),
    path("payments/", PaymentAPIView.as_view(), name="payment"),
    path('payments/<int:id>/', PaymentAPIView.as_view()),
    # .....................................................................
    # payment
    path("create-checkout-session/", create_checkout_session),
    path("stripe_webhook", stripe_webhook),
    path("payment-details/", get_payment_details),  # ✅ Added
    path("api/stripe/session/<str:session_id>/", stripe_session_details),
    path("api/my-payments/", my_payments),
    path("api/my-payments/<int:id>/", my_payments),

    #category.................................................................
    

]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)