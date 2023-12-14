# src/services/local_state_service.py
import os
import json
from datetime import datetime
import shutil

def create_initial_state(cold=False, hot=False):
    if cold and not hot:
        mode = "cold"
    elif hot and not cold:
        mode = "hot"
    elif cold and hot:
        mode = "wide_range"
    else:
        raise ValueError("Either cold or hot must be specified")
   
    resistance_calibration_step = [{"type": "resistance_calibration", "status": "not_started"}] 
    cold_steps = [{"type": "calibration_cold", "status": "not_started"}, 
                  {"type": "verification_cold", "status": "not_started"}]
    hot_steps = [{"type": "calibration_hot", "status": "not_started"}, 
                 {"type": "verification_hot", "status": "not_started"}]
    finals_steps = [{"type": "final_offsets", "status": "not_started"}, 
                 {"type": "transfer_calibration_data", "status": "not_started"}]
    steps = resistance_calibration_step
    steps += cold_steps if mode == "cold" else hot_steps if mode == "hot" else cold_steps + hot_steps
    steps += finals_steps
    
    state = {
        "mode": mode,
        "steps": steps,
        "start_time": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "data_pushed_to_cloud": False,
    }
    return state


class CalibrationRunService:
    def __init__(self, base_directory='calibration_runs/'):
        self.base_directory = base_directory
        os.makedirs(self.base_directory, exist_ok=True)

    def list_calibration_runs_by_uid(self):
        return [name for name in os.listdir(self.base_directory)
                if os.path.exists(os.path.join(self.base_directory, name, 'state.json'))]

    def create_new_calibration_run(self, uid, cold, hot):
        calibration_run_directory = os.path.join(self.base_directory, uid)
        os.makedirs(calibration_run_directory, exist_ok=True)
        state = create_initial_state(cold, hot)
        with open(os.path.join(calibration_run_directory, 'state.json'), 'w') as f:
            json.dump(state, f)
        success = os.path.exists(os.path.join(calibration_run_directory, 'state.json'))
        return success

    def delete_calibration_run(self, uid):
        calibration_run_directory = os.path.join(self.base_directory, uid)
        shutil.rmtree(calibration_run_directory, ignore_errors=True)
        success = not os.path.exists(calibration_run_directory)
        return success

    def get_calibration_run_state(self, uid):
        calibration_run_directory = os.path.join(self.base_directory, uid)
        with open(os.path.join(calibration_run_directory, 'state.json'), 'r') as f:
            state = json.load(f)
        return state

    def update_calibration_run_state(self, uid, state):
        calibration_run_directory = os.path.join(self.base_directory, uid)
        with open(os.path.join(calibration_run_directory, 'state.json'), 'w') as f:
            json.dump(state, f)
        success = os.path.exists(os.path.join(calibration_run_directory, 'state.json'))
        return success
