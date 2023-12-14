import pytest
from src.services.website_service import WebsiteService

@pytest.fixture
def website_service():
    return WebsiteService()

def test_read_footer(website_service):
    footer = website_service.read_footer()
    assert isinstance(footer, dict)
    
@pytest.mark.skip(reason="overwrites data I want to keep")
def test_write_footer(website_service):
    footer = website_service.read_footer()
    footer["test"] = "test"
    website_service.write_footer(footer)
    footer = website_service.read_footer()
    assert "test" in footer
    
def test_read_header(website_service):
    header = website_service.read_header()
    assert isinstance(header, dict)
    
@pytest.mark.skip(reason="overwrites data I want to keep")
def test_write_header(website_service):
    header = website_service.read_header()
    header["test"] = "test"
    website_service.write_header(header)
    header = website_service.read_header()
    assert "test" in header
    
def test_read_theme(website_service):
    theme = website_service.read_theme()
    assert isinstance(theme, dict)

@pytest.mark.skip(reason="overwrites data I want to keep")
def test_write_theme(website_service):
    theme = website_service.read_theme()
    theme["test"] = "test"
    website_service.write_theme(theme)
    theme = website_service.read_theme()
    assert "test" in theme

def test_read_page(website_service):
    page = website_service.read_page("index")
    assert isinstance(page, dict)
    
@pytest.mark.skip(reason="overwrites data I want to keep")
def test_write_page(website_service):
    page = website_service.read_page("idex")
    page["test"] = "test"
    website_service.write_page("idex", page)
    page = website_service.read_page("index")
    assert "test" in page
