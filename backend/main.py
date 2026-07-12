from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.dashboard import router as dashboard_router
from app.api.location import router as location_router
from app.api.map import router as map_router
from app.api.prediction import router as prediction_router


app = FastAPI(
    title="TRAFFICIQ API",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dashboard API
app.include_router(
    dashboard_router,
    prefix="/api",
    tags=["Dashboard"],
)

# Map API
app.include_router(
    map_router,
    prefix="/api",
    tags=["Map"],
)

# Location API
app.include_router(
    location_router,
    prefix="/api",
    tags=["Location"],
)

# Prediction API
app.include_router(
    prediction_router,
    prefix="/api",
    tags=["Prediction"],
)


@app.get("/")
def root():
    return {
        "message": "Welcome to TRAFFICIQ API 🚦"
    }
