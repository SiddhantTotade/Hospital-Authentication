from django.contrib.auth.models import BaseUserManager


class UserManager(BaseUserManager):
    def create_user(self, email, user_name, first_name, last_name, address, city, state, pincode, user_type, password=None, password2=None):
        if not email:
            raise ValueError("Email address is required")

        user = self.model(email=self.normalize_email(email),
                          user_name=user_name, first_name=first_name, last_name=last_name, user_type=user_type, address=address, city=city, state=state, pincode=pincode)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, user_name, first_name, last_name, user_type, password=None, password2=None):
        user = self.create_user(
            email, user_name=user_name, first_name=first_name, last_name=last_name, user_type=user_type, password=password)
        user.is_admin = True
        user.save(using=self._db)
        return user
