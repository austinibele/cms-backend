from src.services.ssh_service import SSHService

class ConfigurationService(SSHService):
    """
    Updates the configuration of the device. Configuration is stored in files in the configuration/ directory in pi_data_logger.
    """
    def __init__(self, ip):
        super().__init__(ip)
   
    async def read_beamex_offsets_cold(self):
        string_result = self.execute("cat /home/pi/pi_data_logger/configuration/beamex_offsets_cold.csv")
        lines = string_result.split("\n")
        lines = [line.split(",") for line in lines]
        assert (lines[0][0]) == '' and (lines[0][1] == 'indicated_temperature') and (lines[0][2] == 'tref'), "beamex_offsets_cold.csv file is not formatted correctly"
        return {line[0]: {"indicated_temperature": float(line[1]), "tref": float(line[2])} for line in lines[1:] if line != ['']}
   
    async def update_beamex_offsets_cold(self, new_offsets):
        """
        new_offsets is a dict with form {"0": {"indicated_temperature": -45, "tref": -44.997}, "1": {"indicated_temperature": .., ..}}
        """
        new_offsets_string = "\n".join([f"{key},{value['indicated_temperature']},{value['tref']}" for key, value in new_offsets.items()])
        new_offsets_string = ",indicated_temperature,tref\n" + new_offsets_string
        self.execute(f"echo '{new_offsets_string}' > /home/pi/pi_data_logger/configuration/beamex_offsets_cold.csv")
        updated_offsets =  await self.read_beamex_offsets_cold()
        truth_list = [updated_offsets[key] == value for key, value in new_offsets.items()]
        return all(truth_list)

    async def read_beamex_offsets_hot(self):
        string_result = self.execute("cat /home/pi/pi_data_logger/configuration/beamex_offsets_hot.csv")
        lines = string_result.split("\n")
        lines = [line.split(",") for line in lines]
        assert (lines[0][0]) == '' and (lines[0][1] == 'indicated_temperature') and (lines[0][2] == 'tref'), "beamex_offsets_hot.csv file is not formatted correctly"
        return {line[0]: {"indicated_temperature": float(line[1]), "tref": float(line[2])} for line in lines[1:] if line != ['']}
   
    async def update_beamex_offsets_hot(self, new_offsets):
        """
        new_offsets is a dict with form {"0": {"indicated_temperature": -45, "tref": -44.997}, "1": {"indicated_temperature": .., ..}}
        """
        new_offsets_string = "\n".join([f"{key},{value['indicated_temperature']},{value['tref']}" for key, value in new_offsets.items()])
        new_offsets_string = ",indicated_temperature,tref\n" + new_offsets_string
        self.execute(f"echo '{new_offsets_string}' > /home/pi/pi_data_logger/configuration/beamex_offsets_hot.csv")
        updated_offsets =  await self.read_beamex_offsets_hot()
        truth_list = [updated_offsets[key] == value for key, value in new_offsets.items()]
        return all(truth_list)

    async def update_software(self, github_username, personal_access_token):
        escaped_token = personal_access_token.replace("'", "'\\''")
        command = f"cd pi_data_logger && bin/pull.sh '{github_username}' '{escaped_token}'"
        return "up to date" in self.execute(command) and "up to date" in self.execute(command)
 