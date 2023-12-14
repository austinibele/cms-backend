import pytest
from src.services.content_service import ContentService

@pytest.fixture
def content_service():
    return ContentService()

def test_get_slugs():
    content_service = ContentService()
    slugs = content_service.get_slugs()
    assert isinstance(slugs, list)
    assert slugs == ['blog', 'news']
    

