# TRAFFICIQ Dataset V2 Specification

## Overview

TRAFFICIQ Dataset V2 defines the structured traffic intelligence dataset used for congestion prediction across key Raipur traffic locations. The dataset is designed to predict a single primary target, the **Congestion Score**, and then derive user-facing traffic metrics such as Average Speed and Travel Time from that prediction.

## Prediction Target

| Target | Type | Range | Description |
| --- | --- | --- | --- |
| `congestion_score` | Integer | 0-100 | Predicted congestion intensity for a location and time window. `0` means free-flow traffic and `100` means severe congestion. |

## Raipur Locations

| Location ID | Location | Purpose |
| --- | --- | --- |
| 1 | Raipur Railway Station | Captures transit-heavy congestion caused by passenger movement, autos, taxis, buses, and station-area pickups/drop-offs. |
| 2 | AIIMS Raipur | Monitors hospital corridor traffic where emergency access, patient movement, and public transport demand can affect flow. |
| 3 | Swami Vivekananda Airport | Tracks airport access-road congestion caused by flight schedules, passenger pickups, taxis, and private vehicles. |
| 4 | Telibandha | Represents a busy urban-commercial corridor with mixed residential, office, and shopping traffic. |
| 5 | Jaistambh Chowk | Captures core city junction congestion in a high-density commercial and administrative zone. |
| 6 | Magneto Mall | Monitors retail and leisure traffic, especially evening and weekend demand near mall access roads. |
| 7 | Pandri Bus Stand | Tracks bus-terminal congestion caused by intercity buses, local transport, and pedestrian movement. |
| 8 | Ghadi Chowk | Represents central-city junction traffic with office-hour peaks, civic movement, and cross-city route pressure. |

## Complete Feature List

| Feature | Type | Example | Description |
| --- | --- | --- | --- |
| `record_id` | String | `TRIQ-V2-000001` | Unique dataset row identifier. |
| `location_id` | Integer | `5` | Numeric identifier for one of the 8 monitored Raipur locations. |
| `location_name` | String | `Jaistambh Chowk` | Human-readable location name. |
| `latitude` | Float | `21.2370` | Location latitude. |
| `longitude` | Float | `81.6335` | Location longitude. |
| `timestamp` | Datetime | `2026-07-09T17:30:00+05:30` | Observation or prediction timestamp. |
| `day_of_week` | String | `Thursday` | Day name derived from timestamp. |
| `is_weekend` | Boolean | `false` | Whether the timestamp falls on Saturday or Sunday. |
| `time_of_day` | String | `Evening Peak` | Time bucket such as Morning Peak, Midday, Evening Peak, or Night. |
| `hour` | Integer | `17` | Hour of day in 24-hour format. |
| `month` | Integer | `7` | Calendar month. |
| `season` | String | `Monsoon` | Seasonal bucket used for weather and demand patterns. |
| `is_public_holiday` | Boolean | `false` | Whether the date is a public holiday. |
| `road_type` | String | `Urban Arterial` | Road category for the monitored location. |
| `free_flow_speed_kmph` | Integer | `45` | Expected speed under low or no congestion. |
| `road_capacity_vehicles_per_hour` | Integer | `3000` | Approximate hourly traffic capacity for the road profile. |
| `lane_count` | Integer | `4` | Number of effective traffic lanes. |
| `signalized_intersection` | Boolean | `true` | Whether the location includes a signal-controlled junction. |
| `near_transit_hub` | Boolean | `true` | Whether the location is near a railway station, bus stand, airport, or major public transport node. |
| `near_commercial_zone` | Boolean | `true` | Whether commercial activity significantly affects traffic demand. |
| `weather_condition` | String | `Cloudy` | Weather condition at the prediction time. |
| `temperature_celsius` | Float | `31.0` | Ambient temperature. |
| `rain_intensity_mm_hr` | Float | `2.4` | Rainfall intensity, useful for monsoon traffic slowdown. |
| `visibility_km` | Float | `6.5` | Estimated visibility. |
| `event_flag` | Boolean | `false` | Whether a local event, gathering, or disruption is expected nearby. |
| `incident_flag` | Boolean | `false` | Whether an accident, breakdown, or road blockage is known. |
| `historical_avg_congestion` | Float | `68.5` | Historical average congestion for the same location and time bucket. |
| `previous_15_min_congestion` | Float | `70.0` | Congestion score from the previous 15-minute interval. |
| `previous_30_min_congestion` | Float | `64.0` | Congestion score from the previous 30-minute interval. |
| `vehicle_count_estimate` | Integer | `2450` | Estimated vehicle count for the current or recent interval. |
| `prediction_horizon_minutes` | Integer | `30` | Forecast horizon for the prediction row. |
| `congestion_score` | Integer | `74` | Prediction target: congestion score from 0 to 100. |

## Road Profiles

| Location | Road Type | Free Flow Speed | Road Capacity |
| --- | --- | ---: | ---: |
| Raipur Railway Station | Transit Access Road | 35 km/h | 1,800 vehicles/hour |
| AIIMS Raipur | Institutional Arterial | 45 km/h | 2,400 vehicles/hour |
| Swami Vivekananda Airport | Airport Access Road | 60 km/h | 2,800 vehicles/hour |
| Telibandha | Urban Arterial | 45 km/h | 3,000 vehicles/hour |
| Jaistambh Chowk | Central Business District Junction | 30 km/h | 2,200 vehicles/hour |
| Magneto Mall | Commercial Access Road | 40 km/h | 2,500 vehicles/hour |
| Pandri Bus Stand | Transit Terminal Road | 30 km/h | 2,000 vehicles/hour |
| Ghadi Chowk | Core City Junction | 35 km/h | 2,300 vehicles/hour |

## Derived Metrics

Average Speed and Travel Time are **not predicted directly** in Dataset V2.

Instead, TRAFFICIQ predicts the `congestion_score` first. The application then derives:

| Derived Metric | Derived From | Description |
| --- | --- | --- |
| Average Speed | Predicted congestion score + free flow speed | Estimated by reducing the road profile's free flow speed according to predicted congestion intensity. |
| Travel Time | Derived average speed + segment distance | Estimated from the computed average speed and the expected distance for the monitored road segment. |

This approach keeps the machine learning target focused and consistent while allowing downstream traffic metrics to remain explainable and aligned with each location's road profile.

## Modeling Notes

- The primary model output is `congestion_score`.
- Location-specific road profiles provide static context for deriving operational metrics.
- Weather, incident, event, time, and historical congestion features provide dynamic context for prediction.
- Derived metrics should be recalculated whenever either the predicted congestion score or the road profile changes.
