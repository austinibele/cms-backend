import os
import uuid
from PIL import Image
import io
from src.core.logger import get_logger

logger = get_logger(logger_name=__name__)

class MediaService:
    def __init__(self, database_dir=None):
        if database_dir is None:
            database_dir = os.getenv("DATABASE_DIR", "default_database_dir")  # Provide a default value if DATABASE_DIR is not set
        self.database_dir = database_dir
        
        self.image_dir = os.path.join(self.database_dir, "media", "images")
        os.makedirs(self.image_dir, exist_ok=True)
        
        self.video_dir = os.path.join(self.database_dir, "media", "videos")
        os.makedirs(self.video_dir, exist_ok=True)

    def upload_image(self, image_bytes):
        try:
            # Generate a random UUID for the filename
            filename = f"{uuid.uuid4()}.webp"
            file_path = os.path.join(self.image_dir, filename)

            # Convert the byte string to an Image object
            image = Image.open(io.BytesIO(image_bytes))

            # Convert the image to WebP and save it
            image.save(file_path, "WEBP")

            logger.info(f"Image saved to {file_path}")
            return file_path
        except Exception as e:
            logger.error(f"Failed to upload image: {e}")
            raise

    def get_image(self, image_path):
        try:
            # Construct the full path to the image
            full_path = os.path.join(self.image_dir, image_path)

            # Check if the image exists
            if not os.path.exists(full_path):
                logger.error(f"Image not found at {full_path}")
                raise FileNotFoundError(f"Image not found at {full_path}")

            # Read the image and return its bytes
            with open(full_path, 'rb') as image_file:
                image_bytes = image_file.read()

            logger.info(f"Image retrieved from {full_path}")
            return image_bytes
        except Exception as e:
            logger.error(f"Failed to retrieve image: {e}")
            raise