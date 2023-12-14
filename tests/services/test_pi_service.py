import pytest
from src.services.pi_service import PiService

@pytest.fixture
def pi_service():
    return PiService("192.168.2.139")

def test_calibrate_resistance(pi_service):
    success = pi_service.calibrate_resistance()
    assert success == True

@pytest.mark.skip
def test_calibrate_cold(pi_service):
    success = pi_service.calibrate_cold()
    assert success == True

@pytest.mark.skip
def test_calibrate_hot(pi_service):
    success = pi_service.calibrate_hot()
    assert success == True

@pytest.mark.skip
def test_calibrate_hot_step_1(pi_service):
    success = pi_service.calibrate_hot_step_1()
    assert success == True

@pytest.mark.skip
def test_final_cold(pi_service):
    success = pi_service.final_cold()
    assert success == True

@pytest.mark.skip
def test_final_hot(pi_service):
    success = pi_service.final_hot()
    assert success == True
    
@pytest.mark.skip
def test_final_both(pi_service):
    success = pi_service.final_both()
    assert success == True

@pytest.mark.skip
def test_cancel(pi_service):
    success = pi_service.cancel()
    assert success == True
    
@pytest.mark.skip
def test_get_state(pi_service):
    state = pi_service.get_state()
    print(state)
