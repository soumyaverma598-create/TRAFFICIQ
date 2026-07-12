from fastapi import APIRouter

router = APIRouter()


@router.get("/map")
def get_map():
    return {
        "center": {
            "lat": 21.2514,
            "lng": 81.6296
        },

        "zoom": 13,

        "locations": [
            {
                "id": 1,
                "name": "Raipur Railway Station",
                "lat": 21.2568,
                "lng": 81.6296,
                "congestion": 22,
                "speed": 58,
                "prediction": "Moderate Traffic"
            },
            {
                "id": 2,
                "name": "AIIMS Raipur",
                "lat": 21.2588,
                "lng": 81.5794,
                "congestion": 71,
                "speed": 29,
                "prediction": "Heavy Traffic"
            },
            {
                "id": 3,
                "name": "Swami Vivekananda Airport",
                "lat": 21.1804,
                "lng": 81.7388,
                "congestion": 31,
                "speed": 61,
                "prediction": "Light Traffic"
            },
            {
                "id": 4,
                "name": "Telibandha",
                "lat": 21.2395,
                "lng": 81.6576,
                "congestion": 64,
                "speed": 34,
                "prediction": "Moderate Traffic"
            },
            {
                "id": 5,
                "name": "Jaistambh Chowk",
                "lat": 21.2370,
                "lng": 81.6335,
                "congestion": 82,
                "speed": 21,
                "prediction": "Heavy Traffic"
            },
            {
                "id": 6,
                "name": "Magneto Mall",
                "lat": 21.2519,
                "lng": 81.6685,
                "congestion": 39,
                "speed": 49,
                "prediction": "Moderate Traffic"
            },
            {
                "id": 7,
                "name": "Pandri Bus Stand",
                "lat": 21.2455,
                "lng": 81.6494,
                "congestion": 47,
                "speed": 43,
                "prediction": "Moderate Traffic"
            }
        ]
    }