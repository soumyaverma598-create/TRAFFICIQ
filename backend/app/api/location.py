from fastapi import APIRouter

from app.models.location import LocationResponse
from app.services.location_service import get_location_details

router = APIRouter()


@router.get("/location/{id}", response_model=LocationResponse)
def get_location(id: int):
    return get_location_details(id)
