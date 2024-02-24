import os
from collections import OrderedDict
from datetime import datetime
import shutil
from src.core.logger import get_logger
from src.utils import read_json, write_json
from fastapi import HTTPException

logger = get_logger(logger_name=__name__)

class ContentService:
    def __init__(self, database_dir=None, locale=None):
        if database_dir is None:
            database_dir = os.getenv("DATABASE_DIR")
        self.database_dir = database_dir
        self.content_dir = "content" if locale is None else f"content/{locale}"

    def get_slugs(self):
        return os.listdir(os.path.join(self.database_dir, self.content_dir))
   
    def create_slug(self, slug):
        slug_path = os.path.join(self.database_dir, self.content_dir, f"{slug}")
        if os.path.exists(slug_path):
            raise HTTPException(status_code=500, detail="Slug already exists.")
        os.mkdir(slug_path)
        return True

    def delete_slug(self, slug):
        slug_path = os.path.join(self.database_dir, self.content_dir, f"{slug}")
        if not os.path.exists(slug_path):
            raise HTTPException(status_code=404, detail="Slug not found.")
        shutil.rmtree(slug_path)
        return True
    
    def get_content_files(self, slug):
        content_dir_path = os.path.join(self.database_dir, self.content_dir, f"{slug}")
        content_files = os.listdir(content_dir_path)

        # A list to store dictionaries with file name and its modification time
        file_info_list = []
        
        for file in content_files:
            file_path = os.path.join(content_dir_path, file)
            # Using os.path.getmtime to get last modification time of the file
            mod_time = os.path.getmtime(file_path)
            mod_time_datetime = datetime.fromtimestamp(mod_time)
            mod_time_str = mod_time_datetime.strftime('%Y-%m-%d %H:%M')
            # Storing modification time and filename (without extension) in the list as dictionaries
            file_info_list.append({"name": file.split('.')[0], "modifiedTime": mod_time_str, "modifiedTimestamp": mod_time})
        
        # Sorting the list by modification timestamp in descending order (newest first)
        file_info_list_sorted = sorted(file_info_list, key=lambda x: x["modifiedTimestamp"], reverse=True)
        
        ordered_files_dict = OrderedDict((item['name'], item) for item in file_info_list_sorted)
        return ordered_files_dict

    def read_content_file(self, slug, filename):
        return read_json(os.path.join(self.database_dir, self.content_dir, f"{slug}/{filename}.json"))

    def write_content_file(self, slug, filename, content):
        file_path = os.path.join(self.database_dir, self.content_dir, f"{slug}/{filename}.json")
        try:
            write_json(file_path, content)
            return True
        except Exception as e:
            logger.error(f"Failed to write content file: {e}")
            raise HTTPException(status_code=500, detail="Internal server error.")
        
    def delete_content_file(self, slug, filename):
        file_path = os.path.join(self.database_dir, self.content_dir, f"{slug}/{filename}.json")
        try:
            os.remove(file_path)
            return True
        except Exception as e:
            logger.error(f"Failed to delete content file: {e}")
            raise HTTPException(status_code=500, detail="Internal server error.")
