from fastapi import APIRouter, HTTPException
from src.services.auth_service import AuthService

router = APIRouter()
auth_service = AuthService()

@router.get("/login", status_code=200, operation_id="login")
async def login(username: str, password: str):
    try:
        result = auth_service.login(username=username, password=password)
        return {"success": True, "data": result}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))
