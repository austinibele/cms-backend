from fastapi import APIRouter, HTTPException, UploadFile, File
from src.services.media_service import MediaService

router = APIRouter()
media_service = MediaService()

@router.post("/images/upload", status_code=201, operation_id="upload_image")
async def upload_image(image_bytes: bytes = File(...)):
    try:
        # Upload the image and get the path
        image_path = media_service.upload_image(image_bytes)
        return {"success": True, "message": "Image uploaded successfully.", "data": image_path}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/images/{filename}", status_code=200, operation_id="get_image")
async def get_image(filename: str):
    try:
        # Retrieve the image bytes
        image_bytes = media_service.get_image(filename)
        return {"success": True, "data": image_bytes}
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Image not found.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))