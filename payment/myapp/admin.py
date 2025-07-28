# from django.contrib import admin
# from myapp.models import *

# admin.site.register(My_Reg)


# # Register your models here.


from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import *

class My_RegAdmin(UserAdmin):
    model = My_Reg
    list_display = ('email', 'name', 'country', 'phone', 'is_staff', 'is_active')
    list_filter = ('is_staff', 'is_active', 'country')
    
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal Info', {'fields': ('name', 'country', 'phone')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'is_superuser', 'groups', 'user_permissions')}),
        # ('Important Dates', {'fields': ('last_login',)}),
    )
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'name', 'country', 'phone', 'password1', 'password2', 'is_staff', 'is_active')}
        ),
    )
    
    search_fields = ('email', 'name', 'phone')
    ordering = ('email',)

admin.site.register(My_Reg, My_RegAdmin)
admin.site.register(LostItem)
admin.site.register(CreateUserProfile)
# admin.site.register(CreateUserProfile)
admin.site.register(Payment)
admin.site.register(ClaimItem)
