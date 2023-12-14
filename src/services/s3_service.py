import json
from src.aws.s3_utility import S3Utility

def get_calibration_run_start_time(device_id):
    with open(f"calibration_runs/{device_id}/state.json", "r") as f:
        calibration_run = json.load(f)
        return calibration_run["start_time"].replace(" ", "_").replace(":", "-")

class S3Service:
    def __init__(self):
        self.s3_utility = S3Utility()
        self.bucket_name = "sigma-sensors-calibration-data"

    def upload_calibration_run(self, device_id):
        start_time = get_calibration_run_start_time(device_id)
        local_dir = f"calibration_runs/{device_id}"
        local_dir_omit_prefix = f"calibration_runs/{device_id}"
        aws_dir = f"calibration_runs/{device_id}/{start_time}"
        self.s3_utility.upload_dir(bucket_name=self.bucket_name, 
                                   local_dir=local_dir, 
                                   local_dir_omit_prefix=local_dir_omit_prefix,
                                   aws_dir=aws_dir)
        return True

    def list_all_devices(self):
        subdirs = self.s3_utility.list_subdirs_in_dir(self.bucket_name, "calibration_runs/")
        devices = [subdir.split("/")[-2] for subdir in subdirs]
        return devices
    
    def list_all_calibration_runs_for_device(self, device_id):
        subdirs = self.s3_utility.list_subdirs_in_dir(self.bucket_name, f"calibration_runs/{device_id}/")
        calibration_runs = [subdir.split("/")[-2] for subdir in subdirs]
        return calibration_runs
        
    def download_calibration_run(self, device_id, calibration_run):
        local_dir = f"calibration_runs/{device_id}"
        aws_dir = f"calibration_runs/{device_id}/{calibration_run}"
        self.s3_utility.download_s3_folder(s3_folder=aws_dir, bucket_name=self.bucket_name, local_dir=local_dir)
        
    def download_most_recent_calibration_run(self, device_id):
        calibration_runs = self.list_all_calibration_runs_for_device(device_id)
        most_recent_calibration_run = max(calibration_runs)
        print(f"Downloading most recent calibration run: {most_recent_calibration_run}")
        self.download_calibration_run(device_id, most_recent_calibration_run)
        