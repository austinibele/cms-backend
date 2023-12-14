import pytest
from src.services.device_service import DeviceService

@pytest.mark.asyncio
async def test_find_device():
    result = await DeviceService.find_device()
    print("TEST FIND DEVICE")
    print(result)
    print("END TEST FIND DEVICE")
    print('********************')
    assert isinstance(result, dict)
    assert "ip" in result.keys()
    assert "uid" in result.keys()

@pytest.mark.asyncio
async def test_is_connected():
    result = await DeviceService.is_connected("192.168.2.139")
    assert result == True
