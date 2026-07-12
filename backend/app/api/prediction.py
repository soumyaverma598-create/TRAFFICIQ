from fastapi import APIRouter

from app.models.prediction import PredictionResponse
from app.services.prediction_service import get_prediction_details

router = APIRouter()


@router.get("/prediction", response_model=PredictionResponse)
def get_prediction():
    return get_prediction_details()
