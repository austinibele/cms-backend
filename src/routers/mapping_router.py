from fastapi import APIRouter, HTTPException, Path, Body, Query
from src.services.mapping_service import MappingService
import traceback

mapping_service = MappingService()

router = APIRouter()

    
@router.get("/mapping", status_code=200, operation_id="read_mapping")
async def read_mapping():
    try:
        mapping = mapping_service.read_mapping()
        return {"success": True, "data": mapping}
    except FileNotFoundError as e:
        print(e)
        traceback.print_exc()
        raise HTTPException(status_code=404, detail="Mapping file not found.")
    except Exception as e:
        print(e)
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/mapping", status_code=200, operation_id="save_mapping")
async def save_mapping(mapping: dict = Body(...)):
    try:
        mapping_service.save_mapping(mapping)
        return {"success": True, "message": "Mapping updated successfully."}
    except HTTPException as e:
        raise e
    except Exception as e:
        print(e)
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))
     