from django.contrib import admin
from .models import User
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
# Register your models here.


class UserAdmin(BaseUserAdmin):
    list_display = ('id', 'email', 'user_name',
                    'first_name', 'last_name', 'is_admin')
    list_filter = ('is_admin',)
    fieldsets = (
        ('User Credentials', {'fields': ('email', 'password',)}),
        ('Personal Info', {'fields': ('first_name', 'last_name',)}),
        ('Permissions', {'fields': ('is_admin',)}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'first_name', 'last_name', 'password', 'password2'),
        }),
    )
    search_fields = ('email',)
    ordering = ('email', 'id')
    filter_horizontal = ()


admin.site.register(User, UserAdmin)
