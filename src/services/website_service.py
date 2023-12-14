import os
from src.core.logger import get_logger
from src.utils import read_json, write_json

logger = get_logger(logger_name=__name__)

class WebsiteService:
    def __init__(self, database_dir=None):
        if database_dir is None:
            database_dir = os.getenv("DATABASE_DIR")
        self.database_dir = database_dir
        
    def read_footer(self):
        return read_json(os.path.join(self.database_dir, "website/global/footer.json"))

    def write_footer(self, footer):
        write_json(os.path.join(self.database_dir, "website/global/footer.json"), footer)

    def read_header(self):
        return read_json(os.path.join(self.database_dir, "website/global/header.json"))
    
    def write_header(self, header):
        write_json(os.path.join(self.database_dir, "website/global/header.json"), header)
        
    def read_theme(self):
        return read_json(os.path.join(self.database_dir, "website/global/theme.json"))
    
    def write_theme(self, theme):
        write_json(os.path.join(self.database_dir, "website/global/theme.json"), theme)

    def read_page(self, page_name):
        return read_json(os.path.join(self.database_dir, f"website/pages/{page_name}/page.json"))
    
    def write_page(self, page_name, page):
        write_json(os.path.join(self.database_dir, f"website/pages/{page_name}/page.json"), page)
