from pydantic import BaseModel


class LocationResponse(BaseModel):
    id: int
    name: str
    congestion: int
    averageSpeed: int
    prediction: str
    riskLevel: str
    weather: str
    temperature: int
    travelTime: str
    incident: str
    recommendation: str
    lastUpdated: str
