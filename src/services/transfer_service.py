import os
from src.services.ssh_service import SSHService
from src.services.calibration_run_service import CalibrationRunService

use_mock = os.getenv("USE_MOCK_SERVICES") == "true"

class TransferService:
    def __init__(self, ip):
        self.ssh_service = SSHService(ip)
        self.prefix = "fake_" if use_mock else ""
        
    def transfer_calibration_data(self, uid):
        source = f"pi_data_logger/calibration_data/"
        
        try:
            self.ssh_service.transfer_from_remote(f"calibration_runs/{uid}", source, recursive=True)
        except Exception as e:
            print("Warning: Failed to transfer calibration data")
            print(e)
            
        local_contents = self.ssh_service.list_local_files(f"calibration_runs/{uid}/calibration_data")
        success = "offsets.csv" in local_contents
        
        if success:
            state = CalibrationRunService().get_calibration_run_state(uid)
            state["steps"][-1]["status"] = "finished"
            CalibrationRunService().update_calibration_run_state(uid, state)
        
        return success
        
 