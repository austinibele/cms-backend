from fastapi import APIRouter, HTTPException, Body
from src.services.website_service import WebsiteService

router = APIRouter()
website_service = WebsiteService()

@router.get("/website/footer", status_code=200, operation_id="read_footer")
async def read_footer():
    try:
        footer = website_service.read_footer()
        return {"success": True, "data": footer}
    except HTTPException as e:
        raise e

@router.put("/website/footer", status_code=200, operation_id="write_footer")
async def write_footer(footer: dict = Body(...)):
    try:
        website_service.write_footer(footer)
        return {"success": True, "message": "Footer updated successfully."}
    except HTTPException as e:
        raise e

@router.get("/website/header", status_code=200, operation_id="read_header")
async def read_header():
    try:
        header = website_service.read_header()
        return {"success": True, "data": header}
    except HTTPException as e:
        raise e

@router.put("/website/header", status_code=200, operation_id="write_header")
async def write_header(header: dict = Body(...)):
    try:
        website_service.write_header(header)
        return {"success": True, "message": "Header updated successfully."}
    except HTTPException as e:
        raise e

@router.get("/website/theme", status_code=200, operation_id="read_theme")
async def read_theme():
    try:
        theme = website_service.read_theme()
        return {"success": True, "data": theme}
    except HTTPException as e:
        raise e

@router.put("/website/theme", status_code=200, operation_id="write_theme")
async def write_theme(theme: dict = Body(...)):
    try:
        website_service.write_theme(theme)
        return {"success": True, "message": "Theme updated successfully."}
    except HTTPException as e:
        raise e

@router.get("/website/pages/{page_name}", status_code=200, operation_id="read_page")
async def read_page(page_name: str):
    try:
        page = website_service.read_page(page_name)
        return {"success": True, "data": page}
    except HTTPException as e:
        raise e

@router.put("/website/pages/{page_name}", status_code=200, operation_id="write_page")
async def write_page(page_name: str, page: dict = Body(...)):
    try:
        website_service.write_page(page_name, page)
        return {"success": True, "message": f"Page '{page_name}' updated successfully."}
    except HTTPException as e:
        raise e