from fastapi import APIRouter, HTTPException, Path, Body, Query
from src.services.content_service import ContentService
import json    
import traceback

router = APIRouter()

def get_content_service(locale=None):
    if locale is not None:
        return ContentService(locale=locale)
    else:
        return ContentService()

with open("../content/mapping.json", "r") as mapping_file:
    mapping = json.load(mapping_file)

def map_slug(slug, locale):
    if locale is not None:
        return mapping["dirs"][slug][locale]
    else:
        return slug


@router.get("/", status_code=200, operation_id="get_slugs")
async def get_slugs(locale: str = Query(None)):
    content_service = get_content_service(locale)
    try:
        slugs = content_service.get_slugs()
        return {"success": True, "data": slugs}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/{slug}", status_code=201, operation_id="create_slug")
async def create_slug(slug: str, locale: str = Query(None)):
    content_service = get_content_service(locale)
    try:
        slug = map_slug(slug, locale)
        content_service.create_slug(slug)
        return {"success": True, "message": "Slug created successfully."}
    except HTTPException as e:
        raise e

@router.delete("/{slug}", status_code=200, operation_id="delete_slug")
async def delete_slug(slug: str, locale: str = Query(None)):
    content_service = get_content_service(locale)
    try:
        slug = map_slug(slug, locale)
        content_service.delete_slug(slug)
        return {"success": True, "message": "Slug deleted successfully."}
    except HTTPException as e:
        raise e

@router.get("/{slug}", status_code=200, operation_id="get_content_files")
async def get_content_files(slug: str, locale: str = Query(None)):
    content_service = get_content_service(locale)
    try:
        slug = map_slug(slug, locale)
        content_files = content_service.get_content_files(slug)
        return {"success": True, "data": content_files}
    except Exception as e:
        print(e)
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{slug}/{filename}", status_code=200, operation_id="read_content")
async def read_content(slug: str, filename: str, locale: str = Query(None)):
    content_service = get_content_service(locale)
    try:
        slug = map_slug(slug, locale)
        content = content_service.read_content_file(slug, filename)
        return {"success": True, "data": content}
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Content file not found.")
    except Exception as e:
        print(e)
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/{slug}/{filename}", status_code=200, operation_id="write_content")
async def write_content(slug: str, filename: str, content: dict = Body(...), locale: str = Query(None)):
    content_service = get_content_service(locale)
    try:
        slug = map_slug(slug, locale)
        content_service.write_content_file(slug, filename, content)
        return {"success": True, "message": "Content file updated successfully."}
    except HTTPException as e:
        raise e

@router.delete("/{slug}/{filename}", status_code=200, operation_id="delete_content")
async def delete_content_file(slug: str, filename: str, locale: str = Query(None)):
    content_service = get_content_service(locale)
    try:
        slug = map_slug(slug, locale)
        content_service.delete_content_file(slug, filename)
        return {"success": True, "message": "Content file deleted successfully."}
    except HTTPException as e:
        raise e