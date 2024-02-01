import os
import pytest
from src.services.media_service import MediaService

@pytest.fixture
def media_service(tmp_path):
    service = MediaService(database_dir=tmp_path)
    return service

def test_upload_image(media_service):
    test_image_path = 'tests/data/test_image.png'
    
    with open(test_image_path, 'rb') as image_file:
        test_image_bytes = image_file.read()

    uploaded_image_path = media_service.upload_image(test_image_bytes)

    assert os.path.exists(uploaded_image_path)
    assert uploaded_image_path.endswith('.webp')

def test_get_image(media_service):
    test_image_path = 'tests/data/test_image.png'
    
    with open(test_image_path, 'rb') as image_file:
        test_image_bytes = image_file.read()

    uploaded_image_path = media_service.upload_image(test_image_bytes)

    retrieved_image_bytes = media_service.get_image(os.path.basename(uploaded_image_path))

    assert retrieved_image_bytes
