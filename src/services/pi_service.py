import os
import time
from src.services.ssh_service import SSHService

use_mock = os.getenv("USE_MOCK_SERVICES") == "true"

class PiService(SSHService):
    def __init__(self, ip):
        super().__init__(ip)
        self.resistance_command = "cd pi_data_logger && bin/calibrate_pt100s_at_0c.sh"
        self.cold_command = "cd pi_data_logger && bin/cold/cold_step_1_test.sh" if use_mock else "cd pi_data_logger && bin/cold/cold_step_1.sh"
        self.hot_command_step_1 = "cd pi_data_logger && bin/hot/hot_step_1_test.sh" if use_mock else "cd pi_data_logger && bin/hot/hot_step_1.sh"
        self.hot_command = "cd pi_data_logger && bin/hot/hot_test.sh" if use_mock else "cd pi_data_logger && bin/hot/hot.sh"
        self.final_cold_command = "cd pi_data_logger && bin/final/cold.sh"
        self.final_hot_command = "cd pi_data_logger && bin/final/hot.sh"
        self.final_both_command = "cd pi_data_logger && bin/final/both.sh"
       
    def calibrate_resistance(self):
        self.execute(self.resistance_command, background=True)
        time.sleep(2)
        files = self.list_remote_files("pi_data_logger/calibration_data").split("\n")
        return "sensor_resistance.json" in files
        
    def calibrate_cold(self):
        self.execute(self.cold_command, background=True)
        time.sleep(0.5)
        return "python3 -m pi_data_logger.pipeline" in self.execute('ps aux | grep python | grep -v sh')
        
    def calibrate_hot(self):
        self.execute(self.hot_command, background=True)
        time.sleep(0.5)
        return "python3 -m pi_data_logger.pipeline" in self.execute('ps aux | grep python | grep -v sh')
        
    def calibrate_hot_step_1(self):
        self.execute(self.hot_command_step_1, background=True)
        time.sleep(0.5)
        return "python3 -m pi_data_logger.pipeline" in self.execute('ps aux | grep python | grep -v sh')
        
    def final_cold(self):
        self.execute(self.final_cold_command, background=True)
        time.sleep(1)
        files = self.list_remote_files("pi_data_logger/calibration_data").split("\n")
        return "offsets.csv" in files
    
    def final_hot(self):
        self.execute(self.final_hot_command, background=True)
        time.sleep(1)
        files = self.list_remote_files("pi_data_logger/calibration_data").split("\n")
        return "offsets.csv" in files
    
    def final_both(self):
        self.execute(self.final_both_command, background=True)
        time.sleep(1)
        files = self.list_remote_files("pi_data_logger/calibration_data").split("\n")
        return "offsets.csv" in files
    
    def cancel(self):
        [self.execute(f"kill {process.split()[1]}") 
            for process in self.execute('ps aux | grep python | grep -v sh').split("\n") 
            if "python3 -m pi_data_logger" in process]
        time.sleep(0.5)
        return ("python3 -m pi_data_logger.pipeline" not in self.execute('ps aux | grep python | grep -v sh'))
    
    def get_state(self):
        return self.execute("cat pi_data_logger/state.json")
    
    def remove_calibration_data(self):
        self.execute("rm -rf pi_data_logger/calibration_data/*")
        self.execute("cat > pi_data_logger/state.json << EOF\n{}\nEOF")
        return self.list_remote_files("pi_data_logger/calibration_data") == "" and self.execute("cat pi_data_logger/state.json") == "{}"
