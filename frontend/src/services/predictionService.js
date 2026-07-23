import api from "./api";

export async function getPredictionData(predictionInput = {}) {
  const { selectedLocation, ...formData } = predictionInput;

  const response = await api.get("/api/prediction", {
    params: {
      ...formData,
      selectedLocationId: selectedLocation?.id,
    },
  });

  return response.data;
}
