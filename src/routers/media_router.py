from fastapi import APIRouter, HTTPException, UploadFile, File, Response
from fastapi.responses import JSONResponse
from src.services.media_service import MediaService

router = APIRouter()
media_service = MediaService()

@router.post("/images/upload", status_code=201)
async def upload_image(image: UploadFile = File(...)):
    try:
        # Read the image as bytes
        image_bytes = await image.read()

        # Upload the image and get the path
        image_path = media_service.upload_image(image_bytes)
        image_path = "http://localhost:8080/api/media/images/" + image_path.split("/")[-1]
        

        # Return the URL or path of the uploaded image
        return JSONResponse(
            status_code=200,
            content={
                "success": 1,
                "file": {
                    "url": image_path
                }
            }
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/images/{filename}", status_code=200, operation_id="get_image")
async def get_image(filename: str):
    try:
        # Retrieve the image bytes
        image_bytes = media_service.get_image(filename)
        if filename.endswith(".webp"):
            media_type = "image/webp"
        elif filename.endswith(".png"):
            media_type = "image/png"
        elif filename.endswith(".jpg") or filename.endswith(".jpeg"):
            media_type = "image/jpeg"
        else:
            raise HTTPException(status_code=400, detail="Unsupported image format.")
        return Response(content=image_bytes, media_type=media_type)
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Image not found.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))