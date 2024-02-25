# src/core/config.py
import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    CORS_ORIGINS: str = "http://localhost:3000, http://localhost:3001"

    # Define other global settings here
    APP_NAME: str = "CMS Backend"
    DEBUG: bool = False

    # Auth User/Pw
    USERNAME: str = "mivisa"
    PASSWORD: str = "mivisa"
    
    # Undefined here but defined in .env
    JWT_SECRET_KEY: str
    NODE_ENV: str
    NEXT_PUBLIC_EDITOR_PATH: str
    NEXT_PUBLIC_SERVER_URL: str

    class Config:
        env_file = os.path.join(os.path.dirname(__file__)).replace("cms-backend/src/core", ".env")
        env_file_encoding = 'utf-8'

settings = Settings()
