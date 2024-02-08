import os
from src.core.logger import get_logger
from src.utils import read_json, write_json

logger = get_logger(logger_name=__name__)

class MappingService:
    def __init__(self, database_dir=None):
        if database_dir is None:
            database_dir = os.getenv("DATABASE_DIR")
        self.database_dir = database_dir

    def read_mapping(self):
        return read_json(os.path.join(self.database_dir, "content", "mapping.json"))

    def save_mapping(self, new_mapping):
        # Read the current mapping
        current_mapping = self.read_mapping()

        # Identify deleted items and their slugs in different languages
        deleted_items = []
        for dir_name, articles in current_mapping['names'].items():
            new_articles = new_mapping['names'].get(dir_name, {})
            for article_name, slugs in articles.items():
                if article_name not in new_articles:
                    deleted_items.append((dir_name, article_name, slugs))

        # Remove corresponding files for each deleted item
        for dir_name, article_name, slugs in deleted_items:
            for locale, slug in slugs.items():
                dir_locale = current_mapping['dirs'][dir_name][locale]
                file_path = os.path.join(self.database_dir, "content", locale, dir_locale, f"{slug}.json")
                if os.path.exists(file_path):
                    os.remove(file_path)
                    logger.info(f"Removed file: {file_path}")
                else:
                    logger.warning(f"File not found: {file_path}")

        # Remove references from immigration_resources_categories.json
        categories_path = os.path.join(self.database_dir, "content", "meta", "immigration_resources_categories.json")
        if os.path.exists(categories_path):
            categories = read_json(categories_path)
            for _, _, slugs in deleted_items:
                english_slug = slugs.get('en')
                if english_slug:
                    for category, articles in categories.items():
                        if english_slug in articles:
                            articles.remove(english_slug)
                            logger.info(f"Removed reference to {english_slug} from {category}")
            write_json(categories_path, categories)

        # Save the new mapping
        return write_json(os.path.join(self.database_dir, "content", "mapping.json"), new_mapping)