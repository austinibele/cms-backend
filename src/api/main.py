# src/main.py
from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
import logging

from src.core.security import setup_cors

from src.routers.device_router import router as device_router
from src.routers.pi_router import router as pi_router

logging.basicConfig(level=logging.WARN)
logger = logging.getLogger(__name__)

app = FastAPI()

app.include_router(device_router, prefix="/api/device", tags=["Device"])
app.include_router(pi_router, prefix="/api/pi", tags=["pi"])

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    # Log the error details
    logger.error(f"Validation error: {exc.errors()}", exc_info=True)
    # You can customize the error response if needed
    return JSONResponse(
        status_code=422,
        content={"detail": exc.errors()},
    )

setup_cors(app)
