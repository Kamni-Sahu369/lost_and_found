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
from django.urls import path
from myapp.views import *
from rest_framework_simplejwt.views import ( TokenObtainPairView,TokenRefreshView,)
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('PracticeList/', PracticeList.as_view()),
    path('PracticeList/<int:pk>/', PracticeList.as_view(), name='practice-detail'),
    path('login/', LoginAPIView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('LostItemCreateView/',LostItemCreateView.as_view()),
    path('LostItemCreateView/<int:id>/',LostItemCreateView.as_view()),
    path('FoundItemCreateView/',FoundItemCreateView.as_view()),
    path('FoundItemCreateView/<int:pk>/',FoundItemCreateView.as_view()),
    path('CraeteProfile/',CraeteProfile.as_view()),
    path('FeedbackView/',FeedbackView.as_view()),
    path('varify_otp/',VerifyOtp.as_view()),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)