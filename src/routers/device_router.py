# src/routers/device_router.py
from fastapi import APIRouter, HTTPException
from src.models.response_models import ResponseModel
from src.core.logger import get_logger

from src.services.device_service import DeviceService

router = APIRouter()

device_service = DeviceService()
logger = get_logger(logger_name=__name__)

@router.get("/find_device", response_model=ResponseModel[str], operation_id="find_device")
async def find_device():
    try:
        result = await device_service.find_device()
        return ResponseModel(data=result, success=True)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@router.get("/is_connected", response_model=ResponseModel[bool], operation_id="is_connected")
async def is_connected(ip: str):
    try:
        result = await device_service.is_connected(ip)
        return ResponseModel(data=result, success=True)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))