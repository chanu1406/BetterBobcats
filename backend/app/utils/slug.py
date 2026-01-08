"""
Utility functions for slug generation
"""
import re
import unicodedata


def generate_slug(text: str) -> str:
    """
    Generate a URL-friendly slug from a string
    
    Args:
        text: The text to convert to a slug
        
    Returns:
        A URL-friendly slug (lowercase, hyphen-separated)
    
    Example:
        generate_slug("ACM (Association for Computing Machinery)")
        -> "acm-association-for-computing-machinery"
    """
    # Convert to lowercase and normalize unicode characters
    text = unicodedata.normalize("NFKD", text.lower())
    
    # Remove special characters, keep only alphanumeric, spaces, and hyphens
    text = re.sub(r"[^\w\s-]", "", text)
    
    # Replace spaces, underscores, and multiple hyphens with single hyphen
    text = re.sub(r"[\s_-]+", "-", text)
    
    # Remove leading and trailing hyphens
    text = text.strip("-")
    
    return text

