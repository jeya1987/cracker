from fastapi import APIRouter, Depends, HTTPException, status
from jose import JWTError, jwt
from datetime import datetime, timedelta
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.database import get_db
from app.config import settings
import hashlib

router = APIRouter(prefix="/api/auth", tags=["auth"])

# Models
class LoginRequest(BaseModel):
    username: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    user: dict

# Admin credentials (hardcoded for simplicity - can be moved to database)
ADMIN_USERNAME = "admin"
ADMIN_PASSWORD = "admin123"  # In production, use hashed passwords

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return hash_password(plain_password) == hashed_password

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(days=7)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm="HS256")
    return encoded_jwt

def verify_token(token: str):
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        username = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        return payload
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

@router.post("/login", response_model=TokenResponse)
def login(credentials: LoginRequest):
    """Admin login endpoint"""
    
    # Verify credentials
    if credentials.username != ADMIN_USERNAME:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    
    # In production, use hashed password verification
    if credentials.password != ADMIN_PASSWORD:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    
    # Create access token
    access_token = create_access_token(
        data={"sub": credentials.username, "role": "admin"}
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "username": credentials.username,
            "role": "admin"
        }
    }

@router.get("/verify")
def verify_auth(token: str = None):
    """Verify if token is valid"""
    if not token:
        raise HTTPException(status_code=401, detail="No token provided")
    
    payload = verify_token(token)
    return {
        "valid": True,
        "user": payload.get("sub"),
        "role": payload.get("role")
    }

@router.post("/logout")
def logout():
    """Logout endpoint"""
    return {"message": "Logged out successfully"}
