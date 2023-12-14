import os
import paramiko
from scp import SCPClient

class SSHService:
    def __init__(self, ip):
        self.ip = ip

    async def is_connected(self):
        try:
            return self.execute("echo 'Connection Test'", timeout=2).strip() == "Connection Test"
        except (paramiko.SSHException, EOFError):
            return False

    def execute(self, command, background=False, timeout=None):
        with paramiko.SSHClient() as ssh:
            ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
            ssh.connect(self.ip, username='pi', password='sigmasensors', timeout=5)
            bg_cmd = f"nohup sh -c '{command}' > /dev/null 2>&1 &" if background else command
            stdin, stdout, stderr = ssh.exec_command(bg_cmd, timeout=timeout)
            out = stdout.read().decode('utf-8')
            err = stderr.read().decode('utf-8')
        if err:
            print(f"Warning: Error occured in SSHService: {err}")
        return "" if background else out

    def transfer_from_remote(self, local_path, remote_path, recursive=False):
        with paramiko.SSHClient() as ssh:
            ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
            ssh.connect(self.ip, username='pi', password='sigmasensors', timeout=5)
            with SCPClient(ssh.get_transport()) as scp:
                scp.get(remote_path, local_path, recursive=recursive)
            
    def transfer_to_remote(self, local_path, remote_path, recursive=False):
        with paramiko.SSHClient() as ssh:
            ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
            ssh.connect(self.ip, username='pi', password='sigmasensors', timeout=5)
            with SCPClient(ssh.get_transport()) as scp:
                scp.put(local_path, remote_path, recursive=recursive)
        if recursive:
            if remote_path[-1] != "/":
                destination = remote_path
            else:
                destination = os.path.join(remote_path, os.path.basename(local_path))
            success = self.exists(destination)
        else:
            success = self.execute(f"test -f {remote_path}") == ""
        if not success:
            raise Exception(f"Failed to transfer {local_path} to {remote_path}")
        return success
        
    def exists(self, path):
        return self.execute(f"test -e {path}") == ""
            
    def list_local_files(self, path):
        return os.listdir(path)
    
    def list_remote_files(self, path):
        return self.execute(f"ls {path}")

    def remove_dir_contents(self, dir):
        self.execute(f"rm -r {dir}/*")
        success = self.execute(f"ls {dir}") == ""
        if not success:
            raise Exception(f"Failed to remove contents of {dir}")
        return success