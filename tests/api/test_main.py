import httpx
import pytest
from httpx import AsyncClient

BASE_URL = "http://localhost:8080/api"

@pytest.fixture
def device_ip():
    return "192.168.2.139"

@pytest.fixture
def mock_uid():
    return "test_uid_1"

@pytest.mark.asyncio
async def test_find_device():
    async with AsyncClient() as client:
        response = await client.get(f"{BASE_URL}/find_device")
        # assert that we receive a dictionary
        data = response.json()
        assert isinstance(data, dict)
        assert response.status_code == 200
        # Additional assertions if needed

@pytest.mark.asyncio
async def test_is_connected(device_ip):
    params = {"device_ip": device_ip}
    async with AsyncClient() as client:
        response = await client.get(f"{BASE_URL}/pi/is_connected", params=params)
        assert response.status_code == 200
        # Additional assertions if needed
