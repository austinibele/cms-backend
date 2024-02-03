# src/core/config.py
from pydantic import BaseSettings

class Settings(BaseSettings):
    CORS_ORIGINS: str = "http://localhost:3000, http://localhost:3001"

    # Define other global settings here
    APP_NAME: str = "CMS Backend"
    DEBUG: bool = False

    class Config:
        # Tells Pydantic to read the variables from environment
        env_file = ".env"

settings = Settings()
