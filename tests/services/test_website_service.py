import pytest
from src.services.website_service import WebsiteService

@pytest.fixture
def website_service():
    return WebsiteService()

def test_website_service(website_service):
    assert website_service is not None