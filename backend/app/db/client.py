"""
Supabase Database Client
Handles database connections and queries
"""
import os
from supabase import create_client, Client
from typing import Optional


def get_supabase_client(use_service_role: bool = False) -> Client:
    """
    Create and return a Supabase client instance
    
    Args:
        use_service_role: If True, use service_role key (bypasses RLS).
                         If False, use anon key (subject to RLS).
    
    Returns:
        Supabase client configured with environment variables
        
    Raises:
        ValueError: If required environment variables are missing
    """
    supabase_url = os.getenv("SUPABASE_URL")
    
    if use_service_role:
        # Use service role key for admin operations (bypasses RLS)
        supabase_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
        if not supabase_key:
            raise ValueError(
                "Missing SUPABASE_SERVICE_ROLE_KEY. Required for admin operations."
            )
    else:
        # Use anon key for public operations (subject to RLS)
        supabase_key = os.getenv("SUPABASE_KEY")
    
    if not supabase_url or not supabase_key:
        if use_service_role:
            raise ValueError(
                "Missing Supabase credentials. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables."
            )
        else:
            raise ValueError(
                "Missing Supabase credentials. Set SUPABASE_URL and SUPABASE_KEY environment variables."
            )
    
    return create_client(supabase_url, supabase_key)


# Singleton instances
_supabase_client: Optional[Client] = None
_admin_client: Optional[Client] = None


def get_db(admin: bool = False) -> Client:
    """
    Get or create Supabase client singleton
    
    Args:
        admin: If True, returns client with service_role key (bypasses RLS).
               If False, returns client with anon key (subject to RLS).
    
    Returns:
        Supabase client instance
    """
    global _supabase_client, _admin_client
    
    if admin:
        if _admin_client is None:
            _admin_client = get_supabase_client(use_service_role=True)
        return _admin_client
    else:
        if _supabase_client is None:
            _supabase_client = get_supabase_client(use_service_role=False)
        return _supabase_client

