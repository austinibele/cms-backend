import jwt
from datetime import datetime, timedelta
from src.core.config import settings

class AuthService:
    def login(self, username, password):
        if username == settings.USERNAME and password == settings.PASSWORD:
            pass
        else:
            raise ValueError('Invalid credentials')
        
        payload = {
            'user_id': settings.USERNAME,
            'is_admin': True,
            'exp': datetime.utcnow() + timedelta(hours=3)
        }
        token = self.generate_token(payload)

        return {
            'is_admin': True,
            'token': token
        }

    def generate_token(self, payload):
        secret_or_private_key = settings.JWT_SECRET_KEY
        # In pyjwt, the encode method returns a byte string, so we need to decode it to utf-8 to get a string.
        return jwt.encode(payload, secret_or_private_key, algorithm='HS256')
    
# import jwt
# import bcrypt
# from datetime import datetime, timedelta
# from src.repository.user_repository import UserRepository
# from src.core.config import settings

# class AuthService:
#     def __init__(self):
#         self.user_repository = UserRepository()

#     def authenticate_user(self, phone_number=None, email=None, password=None):
#         # Normalize email
#         email = email.lower() if email else ''
        
#         # Check if user exists
#         if email and not phone_number:
#             user = self.user_repository.find_user_by_email(email)
#         elif not email and phone_number:
#             user = self.user_repository.find_user_by_phone_number(phone_number)
#         elif email and phone_number:
#             raise ValueError("Please enter either an email or a phone number, not both")
#         else:
#             raise ValueError("Please enter either an email or a phone number")

#         if not user:
#             raise ValueError('User not found')

#         # Compare the password
#         password = password + (settings.SALT_STRING or 'default_salt')
#         valid_password = bcrypt.checkpw(password.encode('utf-8'), user.passhash.encode('utf-8'))

#         if not valid_password:
#             raise ValueError('Invalid password')

#         # Determine if the user is an admin
#         is_admin = bool(user.admin)

#         # Generate a new token
#         payload = {
#             'user_id': user.user_id,
#             'email': user.email,
#             'paid': user.paid,
#             'is_admin': is_admin,
#             'exp': datetime.utcnow() + timedelta(hours=3)
#         }

#         token = self.generate_token(payload)

#         return {
#             'user_id': user.user_id,
#             'email': user.email,
#             'paid': user.paid,
#             'is_admin': is_admin,
#             'token': token
#         }

#     def generate_token(self, payload):
#         secret_or_private_key = settings.JWT_SECRET_KEY or 'default_jwt_secret_key'
#         return jwt.encode(payload, secret_or_private_key, algorithm='HS256')