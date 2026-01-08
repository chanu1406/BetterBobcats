"""
Admin Authentication Utilities
Centralized authentication logic for admin access
Credentials are hardcoded here (temporary for development only)
"""
# Admin credentials (TEMPORARY - for development only)
ADMIN_USERNAME = "TheBetterBobcat"
ADMIN_PASSWORD = "Bobcat1!"

# Session token constant
# In a production system, this would be a generated token, but for simplicity
# we use a constant token that the backend validates
ADMIN_SESSION_TOKEN = "admin_authenticated"


def validate_credentials(username: str, password: str) -> bool:
    """
    Validate admin credentials
    
    Args:
        username: Username to validate
        password: Password to validate
        
    Returns:
        True if credentials match, False otherwise
    """
    return username == ADMIN_USERNAME and password == ADMIN_PASSWORD


def is_valid_session(session_token: str) -> bool:
    """
    Validate session token
    
    Args:
        session_token: Session token to validate
        
    Returns:
        True if token is valid, False otherwise
    """
    return session_token == ADMIN_SESSION_TOKEN

