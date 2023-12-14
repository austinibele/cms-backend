# src/services/device_service.py
import socket
import time
import paramiko
from uuid import uuid4
from src.services.ssh_service import SSHService

def find_device_ip() -> str:
    ips = socket.gethostbyname_ex("sigma-sensors-data-logger.local")
    ips = ips[2]
    
    device_ip = None
    for ip in ips:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(0.5)
        result = sock.connect_ex((ip, 22))
        if result == 0:
            device_ip = ip
            break
    return device_ip

class DeviceService:
    @staticmethod
    async def find_device():
        try:
            device_ip = find_device_ip()
            if device_ip is None:
                raise Exception("Device not found")
            else:
                uid = await DeviceService.read_create_device_id(ip=device_ip)
                return {"ip": device_ip, "uid": uid}
        except Exception as e:
            print("Error finding device: ", e)
            return None

    @staticmethod
    async def read_create_device_id(ip):
        ssh_service = SSHService(ip)
        if ".uid" not in ssh_service.list_remote_files("/home"):
            ssh_service.execute(f"sudo touch /home/{str(uuid4())}.uid")
            time.sleep(1)
        return next((item.split(".")[0] for item in (ssh_service.list_remote_files("/home")).split("\n") if ".uid" in item), None)
    
    @staticmethod
    async def is_connected(ip):
        ssh_service = SSHService(ip)
        try:
            return ssh_service.execute("echo 'Connection Test'", timeout=2).strip() == "Connection Test"
        except (paramiko.SSHException, EOFError):
            return False
    