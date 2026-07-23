from fastapi import APIRouter, HTTPException, Query

from app.models.prediction import PredictionResponse
from app.services.prediction_service import get_prediction_details

router = APIRouter()


@router.get("/prediction", response_model=PredictionResponse)
def get_prediction(
    selected_location_id: int = Query(alias="selectedLocationId", ge=1),
    weather: str = Query(),
    signal_status: str = Query(alias="signalStatus"),
    traffic_volume: int = Query(alias="trafficVolume", ge=0),
    average_vehicle_speed: float = Query(alias="averageVehicleSpeed", ge=0),
    cars: int = Query(ge=0),
    trucks: int = Query(ge=0),
    bikes: int = Query(ge=0),
    accident_reported: bool = Query(alias="accidentReported"),
):
    try:
        return get_prediction_details(
            selected_location_id=selected_location_id,
            weather=weather,
            signal_status=signal_status,
            traffic_volume=traffic_volume,
            average_vehicle_speed=average_vehicle_speed,
            cars=cars,
            trucks=trucks,
            bikes=bikes,
            accident_reported=accident_reported,
        )
    except ValueError as error:
        raise HTTPException(status_code=422, detail=str(error)) from error
