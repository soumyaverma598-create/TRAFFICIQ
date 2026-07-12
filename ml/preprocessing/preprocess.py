import numpy as np
import pandas as pd

df = pd.read_csv("ml/data/raw/smart_traffic_management_dataset.csv")

# Basic dataset information
print("\n" + "=" * 50)
print("BASIC DATASET INFORMATION")
print("=" * 50)
print("Dataset shape:", df.shape)
print("\nColumn names:")
print(df.columns.tolist())
print("\nData types:")
print(df.dtypes)

# Check for missing values and duplicate rows
print("\n" + "=" * 50)
print("DATA QUALITY CHECKS")
print("=" * 50)
print("Missing values per column:")
print(df.isnull().sum())
print("\nTotal duplicate rows:", df.duplicated().sum())

# Summary statistics for numerical columns
print("\n" + "=" * 50)
print("NUMERICAL SUMMARY STATISTICS")
print("=" * 50)
print(df.describe())

# Unique values for selected categorical columns
print("\n" + "=" * 50)
print("UNIQUE CATEGORICAL VALUES")
print("=" * 50)
print("Unique weather_condition values:")
print(df["weather_condition"].unique())
print("\nUnique signal_status values:")
print(df["signal_status"].unique())

# Location ID analysis
print("\n" + "=" * 50)
print("LOCATION ID ANALYSIS")
print("=" * 50)
print("Number of unique location IDs:", df["location_id"].nunique())
print("\nCount of records for each location_id:")
print(df["location_id"].value_counts())
df["timestamp"]=pd.to_datetime(df["timestamp"])
df["hour"]=df["timestamp"].dt.hour
df["day_of_week"]=df["timestamp"].dt.dayofweek
df["month"]=df["timestamp"].dt.month

df["is_weekend"] = df["day_of_week"].apply(lambda x: 1 if x >= 5 else 0)
df["is_peak_hour"] = df["hour"].apply(lambda x: 1 if (7 <= x <= 10) or (17 <= x <= 20) else 0)
df["time_of_day"] = df["hour"].apply(lambda x: "morning" if 5 <= x < 12 else ("afternoon" if 12 <= x < 17 else ("evening" if 17 <= x < 21 else "night")))
location_dict = {
    1: "Raipur Railway Station",
    2: "AIIMS Raipur",
    3: "Swami Vivekananda Airport",
    4: "Magneto Mall",
    5: "Jaistambh Chowk"
}

df["location_name"] = df["location_id"].map(location_dict)

road_type_mapping={


    1:"Commercial",
    2:"Arterial",
    3:"Highway",
    4:"Urban",
    5:"CBD"
    }
df["road_type"] = df["location_id"].map(road_type_mapping)

zone_mapping = {
    1: "Transit",
    2: "Hospital",
    3: "Airport",
    4: "Commercial",
    5: "Business District"
}

df["zone"] = df["location_id"].map(zone_mapping)


road_capacity_mapping = {
    1: 1200,   # Raipur Railway Station
    2: 1000,   # AIIMS
    3: 1800,   # Airport
    4: 900,    # Magneto Mall
    5: 700     # Jaistambh Chowk
}

df["road_capacity"] = df["location_id"].map(road_capacity_mapping)

free_flow_speed_mapping = {
    1: 45,
    2: 50,
    3: 70,
    4: 40,
    5: 35
}

df["free_flow_speed"] = df["location_id"].map(free_flow_speed_mapping)


df["total_vehicle_count"]= df["vehicle_count_cars"] + df["vehicle_count_trucks"] + df["vehicle_count_bikes"]


df["volume_capacity_ratio"] = df["traffic_volume"] / df["road_capacity"]

df["speed_ratio"] = df["avg_vehicle_speed"] / df["free_flow_speed"]




print(
    df[
        [
            "traffic_volume",
            "road_capacity",
            "volume_capacity_ratio",
            "avg_vehicle_speed",
            "free_flow_speed",
            "speed_ratio",
        ]
    ].head(10)
)





print(
    df.groupby("location_name")["avg_vehicle_speed"].describe()
)


def calculate_volume_score(ratio):
    if ratio <= 0.30:
        return 5
    elif ratio <= 0.50:
        return 10
    elif ratio <= 0.70:
        return 20
    elif ratio <= 0.90:
        return 30
    else:
        return 40

df["volume_score"] = df["volume_capacity_ratio"].apply(calculate_volume_score)



def calculate_speed_score(ratio):
    if ratio >= 0.90:
        return 0
    elif ratio >= 0.75:
        return 8
    elif ratio >= 0.60:
        return 16
    elif ratio >= 0.45:
        return 26
    else:
        return 35

df["speed_score"] = df["speed_ratio"].apply(calculate_speed_score)





def calculate_accident_score(accident):
    return 10 if accident == 1 else 0

df["accident_score"] = df["accident_reported"].apply(calculate_accident_score)



weather_scores = {
    "Sunny": 0,
    "Cloudy": 1,
    "Windy": 2,
    "Rainy": 4,
    "Foggy": 5
}

df["weather_score"] = df["weather_condition"].map(weather_scores)




def calculate_peak_score(peak):
    return 5 if peak == 1 else 0

df["peak_hour_score"] = df["is_peak_hour"].apply(calculate_peak_score)



signal_scores = {
    "Green": 0,
    "Yellow": 2,
    "Red": 5
}

df["signal_score"] = df["signal_status"].map(signal_scores)


df["congestion_score"] = (
    df["volume_score"]
    + df["speed_score"]
    + df["accident_score"]
    + df["weather_score"]
    + df["peak_hour_score"]
    + df["signal_score"]
)




print(
    df[
        [
            "volume_score",
            "speed_score",
            "accident_score",
            "weather_score",
            "peak_hour_score",
            "signal_score",
            "congestion_score",
        ]
    ].head(10)
)


print(df["congestion_score"].describe())


df.to_csv("ml/data/processed/training_data.csv", index=False)


#selecting  x and y for training the model

