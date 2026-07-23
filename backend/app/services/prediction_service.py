from pathlib import Path
from datetime import datetime

import joblib
import pandas as pd


PROJECT_ROOT = Path(__file__).resolve().parents[3]
MODEL_PATH = PROJECT_ROOT / "ml" / "models" / "xgboost_model.pkl"
PREPROCESSOR_PATH = PROJECT_ROOT / "ml" / "models" / "preprocessor.pkl"
TRAINING_DATA_PATH = PROJECT_ROOT / "ml" / "data" / "processed" / "training_data.csv"

model = joblib.load(MODEL_PATH)
preprocessor = joblib.load(PREPROCESSOR_PATH)
training_data = pd.read_csv(TRAINING_DATA_PATH)

WEATHER_CONDITIONS = {
    "Clear": "Sunny",
    "Cloudy": "Cloudy",
    "Rainy": "Rainy",
    "Foggy": "Foggy",
}

SIGNAL_STATUSES = {
    "Operational": "Green",
    "Flashing": "Yellow",
    "Out of service": "Red",
}

WEATHER_SCORES = {"Sunny": 0, "Cloudy": 1, "Windy": 2, "Rainy": 4, "Foggy": 5}
SIGNAL_SCORES = {"Green": 0, "Yellow": 2, "Red": 5}

LOCATION_FEATURES = (
    training_data.groupby("location_id")
    [["road_type", "zone", "road_capacity", "free_flow_speed"]]
    .first()
    .to_dict("index")
)
MEDIAN_TEMPERATURE = float(training_data["temperature"].median())
MEDIAN_HUMIDITY = float(training_data["humidity"].median())


def get_risk_level(score):
    if score >= 80:
        return "Very High"
    elif score >= 60:
        return "High"
    elif score >= 40:
        return "Moderate"
    elif score >= 20:
        return "Low"
    else:
        return "Very Low"


def get_recommendation(score):
    if score >= 80:
        return "Avoid this route if possible."
    elif score >= 60:
        return "Use alternate routes during peak hours."
    elif score >= 40:
        return "Expect moderate delays."
    elif score >= 20:
        return "Traffic is mostly smooth."
    else:
        return "Traffic is flowing normally."


def get_next_30_minutes(score):
    if score >= 80:
        return "Heavy traffic expected."
    elif score >= 60:
        return "Traffic likely to increase."
    elif score >= 40:
        return "Traffic expected to remain stable."
    elif score >= 20:
        return "Light traffic expected."
    else:
        return "Free-flowing traffic expected."


def get_time_of_day(hour):
    if 5 <= hour < 12:
        return "morning"
    if 12 <= hour < 17:
        return "afternoon"
    if 17 <= hour < 21:
        return "evening"
    return "night"


def get_volume_score(ratio):
    if ratio <= 0.30:
        return 5
    if ratio <= 0.50:
        return 10
    if ratio <= 0.70:
        return 20
    if ratio <= 0.90:
        return 30
    return 40


def get_speed_score(ratio):
    if ratio >= 0.90:
        return 0
    if ratio >= 0.75:
        return 8
    if ratio >= 0.60:
        return 16
    if ratio >= 0.45:
        return 26
    return 35


def build_feature_row(
    selected_location_id,
    weather,
    signal_status,
    traffic_volume,
    average_vehicle_speed,
    cars,
    trucks,
    bikes,
    accident_reported,
):
    location = LOCATION_FEATURES.get(selected_location_id)
    if location is None:
        raise ValueError("The selected location is not supported by the trained model.")

    weather_condition = WEATHER_CONDITIONS.get(weather)
    if weather_condition is None:
        raise ValueError("Unsupported weather value.")

    model_signal_status = SIGNAL_STATUSES.get(signal_status)
    if model_signal_status is None:
        raise ValueError("Unsupported signal status value.")

    now = datetime.now()
    hour = now.hour
    day_of_week = now.weekday()
    is_peak_hour = int(7 <= hour <= 10 or 17 <= hour <= 20)
    total_vehicle_count = cars + trucks + bikes
    volume_capacity_ratio = traffic_volume / location["road_capacity"]
    speed_ratio = average_vehicle_speed / location["free_flow_speed"]

    return pd.DataFrame(
        [
            {
                "location_id": selected_location_id,
                "traffic_volume": traffic_volume,
                "avg_vehicle_speed": average_vehicle_speed,
                "vehicle_count_cars": cars,
                "vehicle_count_trucks": trucks,
                "vehicle_count_bikes": bikes,
                "weather_condition": weather_condition,
                "temperature": MEDIAN_TEMPERATURE,
                "humidity": MEDIAN_HUMIDITY,
                "accident_reported": int(accident_reported),
                "signal_status": model_signal_status,
                "hour": hour,
                "day_of_week": day_of_week,
                "month": now.month,
                "is_weekend": int(day_of_week >= 5),
                "is_peak_hour": is_peak_hour,
                "time_of_day": get_time_of_day(hour),
                "road_type": location["road_type"],
                "zone": location["zone"],
                "road_capacity": location["road_capacity"],
                "free_flow_speed": location["free_flow_speed"],
                "total_vehicle_count": total_vehicle_count,
                "volume_capacity_ratio": volume_capacity_ratio,
                "speed_ratio": speed_ratio,
                "volume_score": get_volume_score(volume_capacity_ratio),
                "speed_score": get_speed_score(speed_ratio),
                "accident_score": 10 if accident_reported else 0,
                "weather_score": WEATHER_SCORES[weather_condition],
                "peak_hour_score": 5 if is_peak_hour else 0,
                "signal_score": SIGNAL_SCORES[model_signal_status],
            }
        ]
    )


def get_prediction_details(**prediction_input):
    feature_row = build_feature_row(**prediction_input)
    transformed_row = preprocessor.transform(feature_row)

    predicted_score = model.predict(transformed_row)[0]

    score = max(0, min(100, round(float(predicted_score))))

    return {
        "overallCongestion": score,
        "riskLevel": get_risk_level(score),
        "next30Minutes": get_next_30_minutes(score),
        "recommendedAction": get_recommendation(score),
        "confidence": 92,
        "lastUpdated": "Just now"
    }



    
   


    
