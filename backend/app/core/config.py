"""
Core Configuration
TODO: Implement settings using Pydantic BaseSettings
"""
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings - to be configured"""
    
    # TODO: Add environment variables
    # SUPABASE_URL: str
    # SUPABASE_KEY: str
    # DATABASE_URL: str
    
    class Config:
        env_file = ".env"


# settings = Settings()
