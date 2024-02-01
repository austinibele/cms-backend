import os
import shutil
from src.core.logger import get_logger
from src.utils import read_json, write_json
from fastapi import HTTPException

logger = get_logger(logger_name=__name__)

class ContentService:
    def __init__(self, database_dir=None):
        if database_dir is None:
            database_dir = os.getenv("DATABASE_DIR")
        self.database_dir = database_dir
        
    def get_slugs(self):
        return os.listdir(os.path.join(self.database_dir, "content"))
   
    def create_slug(self, slug):
        slug_path = os.path.join(self.database_dir, f"content/{slug}")
        if os.path.exists(slug_path):
            raise HTTPException(status_code=500, detail="Slug already exists.")
        os.mkdir(slug_path)
        return True

    def delete_slug(self, slug):
        slug_path = os.path.join(self.database_dir, f"content/{slug}")
        if not os.path.exists(slug_path):
            raise HTTPException(status_code=404, detail="Slug not found.")
        shutil.rmtree(slug_path)
        return True
    
    def get_content_files(self, slug):
        content_files = os.listdir(os.path.join(self.database_dir, f"content/{slug}"))
        return [file.split(".")[0] for file in content_files]

    def read_content_file(self, slug, filename):
        return read_json(os.path.join(self.database_dir, f"content/{slug}/{filename}.json"))

    def write_content_file(self, slug, filename, content):
        file_path = os.path.join(self.database_dir, f"content/{slug}/{filename}.json")
        try:
            write_json(file_path, content)
            return True
        except Exception as e:
            logger.error(f"Failed to write content file: {e}")
            raise HTTPException(status_code=500, detail="Internal server error.")
        
    def delete_content_file(self, slug, filename):
        file_path = os.path.join(self.database_dir, f"content/{slug}/{filename}.json")
        try:
            os.remove(file_path)
            return True
        except Exception as e:
            logger.error(f"Failed to delete content file: {e}")
            raise HTTPException(status_code=500, detail="Internal server error.")

