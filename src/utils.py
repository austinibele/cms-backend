import json
import os
from fastapi.responses import JSONResponse
import traceback
from src.core.logger import get_logger

logger = get_logger(logger_name=__name__)

use_mock = os.getenv("USE_MOCK_SERVICES") == "true"

def get_console_output(std_out, command):
    return std_out.split(command)[-1].split("pi@sigma-sensors-data-logger")[0].strip().replace("\x1b]0;", "")

def handle_error(service, e):
    if use_mock:
        print(f"Error in {service} :  {e}")
        traceback.print_exc()
    else:
        logger.error(f"Error in {service} :  {e}")
        logger.error(traceback.format_exc())

def common_error_handler(service: str, e: Exception):
    handle_error(service, e)
    return JSONResponse(
        status_code=400,
        content={"error": str(e)},
    )

def read_json(file_path):
    with open(file_path) as json_file:
        return json.load(json_file)
    
def write_json(file_path, data):
    with open(file_path, 'w') as outfile:
        json.dump(data, outfile, indent=4)
