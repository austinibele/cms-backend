# src/models/response_models.py
from pydantic import BaseModel
from typing import Generic, TypeVar, Optional

DataT = TypeVar('DataT')

class ResponseModel(Generic[DataT], BaseModel):
    data: Optional[DataT] = None
    error: Optional[str] = None
    success: bool