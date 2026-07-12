from pydantic import BaseModel


class PredictionResponse(BaseModel):
    overallCongestion: int
    riskLevel: str
    next30Minutes: str
    recommendedAction: str
    confidence: int
    lastUpdated: str
