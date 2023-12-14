import os
from src.core.logger import get_logger
from src.utils import read_json, write_json

logger = get_logger(logger_name=__name__)

class ContentService:
    def __init__(self, database_dir=None):
        if database_dir is None:
            database_dir = os.getenv("DATABASE_DIR")
        self.database_dir = database_dir
        
    def get_slugs(self):
        return os.listdir(os.path.join(self.database_dir, "content"))
    
    def read_content_file(self, slug, filename):
        return read_json(os.path.join(self.database_dir, f"content/{slug}/{filename}.json"))
    
    def write_content_file(self, slug, filename, content):
        write_json(os.path.join(self.database_dir, f"content/{slug}/{filename}.json"), content)
        
    