from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

# Product Schemas
class ProductBase(BaseModel):
    name: str
    category: str
    price: float
    description: str
    emoji: Optional[str] = None
    original_price: Optional[float] = None
    badge: Optional[str] = None

class ProductCreate(ProductBase):
    image_url: Optional[str] = None
    stock: int = 100

class ProductResponse(ProductBase):
    id: int
    image_url: Optional[str] = None
    stock: int
    created_at: datetime
    
    class Config:
        from_attributes = True

# Order Schemas
class CartItem(BaseModel):
    product_id: int
    quantity: int
    price: float

class CustomerDetails(BaseModel):
    name: str
    email: str
    phone: str
    address: str
    city: str
    state: str
    pincode: str
    special_instructions: Optional[str] = None

class OrderCreate(BaseModel):
    items: List[CartItem]
    customer: CustomerDetails

class OrderItemResponse(BaseModel):
    product_id: int
    quantity: int
    price: float
    product: ProductResponse
    
    class Config:
        from_attributes = True

class OrderTrackingResponse(BaseModel):
    status: str
    message: Optional[str] = None
    created_at: datetime
    
    class Config:
        from_attributes = True

class OrderResponse(BaseModel):
    id: int
    order_number: str
    name: str
    email: str
    phone: str
    address: str
    total_price: float
    status: str
    created_at: datetime
    items: List[OrderItemResponse]
    tracking: List[OrderTrackingResponse]
    
    class Config:
        from_attributes = True

class OrderDetailResponse(OrderResponse):
    pass

# Tracking Schema
class TrackingResponse(BaseModel):
    order_number: str
    customer_name: str
    total_price: float
    status: str
    items: List[OrderItemResponse]
    tracking_history: List[OrderTrackingResponse]
    created_at: datetime
    
    class Config:
        from_attributes = True
