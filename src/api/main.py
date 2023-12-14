# src/main.py
from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
import logging

from src.core.security import setup_cors

from src.routers.content_router import router as content_router
from src.routers.website_router import router as website_router

logging.basicConfig(level=logging.WARN)
logger = logging.getLogger(__name__)

app = FastAPI()

app.include_router(website_router, prefix="/api/website", tags=["website"])
app.include_router(content_router, prefix="/api/content", tags=["content"])

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    # Log the error details
    logger.error(f"Validation error: {exc.errors()}", exc_info=True)
    return JSONResponse(
        status_code=422,
        content={"detail": exc.errors()},
    )

setup_cors(app)
