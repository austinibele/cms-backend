import os
from fastapi import HTTPException
from src.core.logger import get_logger
from src.utils import read_json, write_json

logger = get_logger(logger_name=__name__)

class WebsiteService:
    def __init__(self, database_dir=None):
        if database_dir is None:
            database_dir = os.getenv("DATABASE_DIR")
        self.database_dir = database_dir

    def read_footer(self):
        try:
            return read_json(os.path.join(self.database_dir, "website/global/footer.json"))
        except FileNotFoundError:
            raise HTTPException(status_code=404, detail="Footer not found.")

    def write_footer(self, footer):
        try:
            write_json(os.path.join(self.database_dir, "website/global/footer.json"), footer)
            return True
        except Exception as e:
            logger.error(f"Failed to write footer: {e}")
            raise HTTPException(status_code=500, detail="Internal server error.")

    def read_header(self):
        try:
            return read_json(os.path.join(self.database_dir, "website/global/header.json"))
        except FileNotFoundError:
            raise HTTPException(status_code=404, detail="Header not found.")

    def write_header(self, header):
        try:
            write_json(os.path.join(self.database_dir, "website/global/header.json"), header)
            return True
        except Exception as e:
            logger.error(f"Failed to write header: {e}")
            raise HTTPException(status_code=500, detail="Internal server error.")

    def read_theme(self):
        try:
            return read_json(os.path.join(self.database_dir, "website/global/theme.json"))
        except FileNotFoundError:
            raise HTTPException(status_code=404, detail="Theme not found.")

    def write_theme(self, theme):
        try:
            write_json(os.path.join(self.database_dir, "website/global/theme.json"), theme)
            return True
        except Exception as e:
            logger.error(f"Failed to write theme: {e}")
            raise HTTPException(status_code=500, detail="Internal server error.")

    def read_page(self, page_name):
        try:
            return read_json(os.path.join(self.database_dir, f"website/pages/{page_name}/page.json"))
        except FileNotFoundError:
            raise HTTPException(status_code=404, detail="Page not found.")

    def write_page(self, page_name, page):
        try:
            write_json(os.path.join(self.database_dir, f"website/pages/{page_name}/page.json"), page)
            return True
        except Exception as e:
            logger.error(f"Failed to write page: {e}")
            raise HTTPException(status_code=500, detail="Internal server error.")
