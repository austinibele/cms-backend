# tests/test_device_router.py
import pytest
from httpx import AsyncClient

BASE_URL = "http://localhost:8080/api/device"

@pytest.mark.asyncio
async def test_find_device():
    async with AsyncClient() as client:
        response = await client.get(f"{BASE_URL}/find_device")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, dict)
        assert data["success"] == True
        assert isinstance(data["data"]["ip"], str)
        
@pytest.mark.asyncio
async def test_is_connected():
    async with AsyncClient() as client:
        response = await client.get(f"{BASE_URL}/is_connected?ip=192.168.2.139")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, dict)
        assert data["data"] == True
