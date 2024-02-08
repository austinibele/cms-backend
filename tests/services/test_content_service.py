import pytest
from src.services.content_service import ContentService
from fastapi import HTTPException

@pytest.fixture
def content_service():
    return ContentService("mock_database")

def test_get_slugs(content_service):
    slugs = content_service.get_slugs()
    assert isinstance(slugs, list)
    assert "blog" in slugs
    assert "news" in slugs
    
def test_create_slug(content_service):
    content_service.create_slug("test")
    slugs = content_service.get_slugs()
    assert "test" in slugs
    
    # Clean up by deleting the test slug
    content_service.delete_slug("test")
   
def test_create_slug_already_exists(content_service):
    # First, create a slug to ensure it exists
    slug = "existing_slug"
    content_service.create_slug(slug)
    
    # Now, attempt to create the same slug again and expect an HTTPException
    with pytest.raises(HTTPException) as exc_info:
        content_service.create_slug(slug)
    
    # Check that the exception has the correct status code and message
    assert exc_info.value.status_code == 500
    assert "Slug already exists" in str(exc_info.value.detail)

    # Clean up by deleting the slug
    content_service.delete_slug(slug)
   
def test_delete_slug(content_service):
    content_service.create_slug("test")
    content_service.delete_slug("test")
    slugs = content_service.get_slugs()
    assert "test" not in slugs

def test_delete_slug_not_found(content_service):
    # Attempt to delete a slug that does not exist and expect an HTTPException
    non_existent_slug = "non_existent_slug"
    with pytest.raises(HTTPException) as exc_info:
        content_service.delete_slug(non_existent_slug)
    
    # Check that the exception has the correct status code and message
    assert exc_info.value.status_code == 404
    assert "Slug not found" in str(exc_info.value.detail)

def test_read_content_file(content_service):
    content = content_service.read_content_file("blog", "fixture_1")
    assert isinstance(content, dict)
    
def test_write_content_file(content_service):
    content = {}
    content["test"] = "test"
    content_service.write_content_file("blog", "test", content)
    content = content_service.read_content_file("blog", "test")
    assert "test" in content
    
    # Clean up by deleting the test content file
    content_service.delete_content_file("blog", "test")
