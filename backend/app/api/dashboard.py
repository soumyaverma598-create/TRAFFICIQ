from fastapi import APIRouter

router = APIRouter()


@router.get("/dashboard")
def get_dashboard():
    return {
        "hero": {
            "greeting": "Hello From FastAPI 🚀",
            "status": "Online"
        },

        "kpis": {
            "congestion": 91,
            "travelTime": 37,
            "accidentProbability": 4,
            "segments": 128
        },

        "insights": [
            {
                "icon": "warning",
                "iconColor": "text-[var(--color-warning)]",
                "iconBg": "bg-[var(--color-warning)]/10",
                "title": "Peak congestion expected",
                "detail": "Between 5:30 PM and 7 PM"
            },
            {
                "icon": "weather",
                "iconColor": "text-[var(--color-accent)]",
                "iconBg": "bg-[var(--color-accent)]/10",
                "title": "Rain may increase travel time",
                "detail": "Estimated +12%"
            },
            {
                "icon": "route",
                "iconColor": "text-[var(--color-danger)]",
                "iconBg": "bg-[var(--color-danger)]/10",
                "title": "NH-53 slowdown detected",
                "detail": "Recommend alternate routes"
            }
        ],

        "trafficTrend": {
            "range": "Last 24 Hours",

            "labels": [
                "12AM",
                "6AM",
                "12PM",
                "6PM",
                "11PM"
            ],

            "points": [
                18, 14, 10, 8, 9, 14,
                22, 34, 46, 52, 55, 58,
                60, 62, 64, 68, 74, 82,
                96, 88, 70, 52, 36, 24
            ],

            "peakTraffic": "6 PM",
            "averageSpeed": "72 km/h",
            "lowestTraffic": "2 AM"
        },

        "heatmap": {
            "selectedTimeMode": "Current",

            "selectedDateRange": "Today",

            "timeModes": [
                "Current",
                "Forecast",
                "Historical"
            ],

            "dateRanges": [
                "Today",
                "Last 24h"
            ],

           "mapTitle": "Raipur Smart Traffic Center",

            "description": (
                "Interactive traffic visualization for Raipur City. "
                "Live congestion, AI predictions and traffic hotspots "
                "will appear here."
            ),

            "legend": [
                {
                    "label": "Low",
                    "range": "< 500",
                    "tone": "bg-emerald-500"
                },
                {
                    "label": "Moderate",
                    "range": "500–1500",
                    "tone": "bg-amber-400"
                },
                {
                    "label": "Heavy",
                    "range": "1500–3000",
                    "tone": "bg-orange-500"
                },
                {
                    "label": "Severe",
                    "range": "> 3000",
                    "tone": "bg-rose-500"
                }
            ],

            "futureCapabilities": [
                {
                    "label": "Live Raipur traffic overlays",
                    "icon": "layers"
                },
                {
                    "label": "AI congestion prediction",
                    "icon": "brain"
                },
                {
                    "label": "Route recommendations",
                    "icon": "navigation"
                },
                {
                    "label": "Clickable intersections",
                    "icon": "pointer"
                }
            ]
        }
    }