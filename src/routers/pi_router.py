from fastapi import APIRouter, Query, HTTPException, Body
from src.models.response_models import ResponseModel
from src.core.logger import get_logger
from pydantic import BaseModel

class CreateCalibrationRunRequest(BaseModel):
    uid: str
    hot: bool
    cold: bool

from src.services.pi_service import PiService 

router = APIRouter()
logger = get_logger(logger_name=__name__)

@router.post("/run_resistance_calibration", response_model=ResponseModel[bool], operation_id="run_resistance_calibration")
async def run_resistance_calibration(data: dict = Body(...)):
    try:
        result = PiService(ip=data["ip"]).calibrate_resistance()
        return ResponseModel(data=result, success=result)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@router.post("/run_cold_calibration", response_model=ResponseModel[bool], operation_id="run_cold_calibration")
async def run_cold_calibration(data: dict = Body(...)):
    try:
        result = PiService(ip=data["ip"]).calibrate_cold()
        return ResponseModel(data=result, success=result)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@router.post("/run_hot_calibration", response_model=ResponseModel[bool], operation_id="run_hot_calibration")
async def run_hot_calibration(data: dict = Body(...)):
    try:
        result = PiService(ip=data["ip"]).calibrate_hot()
        return ResponseModel(data=result, success=result)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@router.post("/run_hot_calibration_step_1", response_model=ResponseModel[bool], operation_id="run_hot_calibration_step_1")
async def run_hot_calibration_step_1(data: dict = Body(...)):
    try:
        result = PiService(ip=data["ip"]).calibrate_hot_step_1()
        return ResponseModel(data=result, success=result)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@router.post("/run_final_cold", response_model=ResponseModel[bool], operation_id="run_final_cold")
async def run_final_cold(data: dict = Body(...)):
    try:
        result = PiService(ip=data["ip"]).final_cold()
        return ResponseModel(data=result, success=result)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/run_final_hot", response_model=ResponseModel[bool], operation_id="run_final_hot")
async def run_final_hot(data: dict = Body(...)):
    try:
        result = PiService(ip=data["ip"]).final_hot()
        return ResponseModel(data=result, success=result)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@router.post("/run_final_both", response_model=ResponseModel[bool], operation_id="run_final_both")
async def run_final_both(data: dict = Body(...)):
    try:
        result = PiService(ip=data["ip"]).final_both()
        return ResponseModel(data=result, success=result)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@router.post("/cancel_calibration", response_model=ResponseModel[bool], operation_id="cancel_calibration")
async def cancel_calibration(data: dict = Body(...)):
    try:
        result = PiService(ip=data["ip"]).cancel()
        return ResponseModel(data=result, success=result)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/get_state", response_model=ResponseModel[str], operation_id="get_state")
async def get_state(ip: str = Query(...)):
    try:
        result = PiService(ip=ip).get_state()
        return ResponseModel(data=result, success=True)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
   
@router.post("/remove_calibration_data", response_model=ResponseModel[bool], operation_id="remove_calibration_data")
async def remove_calibration_data(data: dict = Body(...)):
    try:
        result = PiService(ip=data["ip"]).remove_calibration_data()
        return ResponseModel(data=result, success=result)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    