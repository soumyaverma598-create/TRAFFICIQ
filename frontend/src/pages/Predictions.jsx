import { useState, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin, AlertCircle } from "lucide-react";

import TrafficMap from "../components/map/TrafficMap";
import PredictionForm from "../components/prediction/PredictionForm";
import PredictionLoader from "../components/prediction/PredictionLoader";
import PredictionResults from "../components/prediction/results/PredictionResults";
import { locations } from "../data/locations";
import { getPredictionData } from "../services/predictionService";

const PHASE_LABELS = [
  "Initializing AI Model...",
  "Analyzing Traffic Data...",
  "Running Congestion Prediction...",
  "Generating Insights...",
];

// Minimum time each phase should stay visible so a fast API response
// still reads as a believable ~1-1.5s sequence. If the real request
// takes longer, phases just wait at the final one until data arrives —
// the request itself is never delayed.
const PHASE_STEP_MS = 320;

function LocationPopup({ location, isSelected }) {
  return (
    <div>
      {isSelected && <span className="traffic-map-popup-badge">Selected Location</span>}
      <p className="traffic-map-popup-title">{location.name}</p>
      <p className="traffic-map-popup-coords">
        {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
      </p>
    </div>
  );
}

export default function Predictions() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [predictionData, setPredictionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [phase, setPhase] = useState(0);
  const [error, setError] = useState("");
  const timersRef = useRef([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  async function handlePrediction(predictionInput) {
    setLoading(true);
    setError("");
    setPhase(0);
    clearTimers();

    // Advance through phases 1, 2, 3 on a fixed cadence regardless of
    // when the API resolves. The request fires immediately and in
    // parallel — this timer only drives the label/progress UI.
    for (let step = 1; step < PHASE_LABELS.length; step += 1) {
      const timer = setTimeout(() => setPhase(step), PHASE_STEP_MS * step);
      timersRef.current.push(timer);
    }

    const requestStart = Date.now();

    try {
      const data = await getPredictionData(predictionInput);

      // If the API was faster than the full phase sequence, hold on
      // the last phase briefly so the loader never feels like it
      // skipped or flashed.
      const elapsed = Date.now() - requestStart;
      const minTotal = PHASE_STEP_MS * (PHASE_LABELS.length - 1) + 250;
      const remaining = Math.max(0, minTotal - elapsed);

      clearTimers();
      setPhase(PHASE_LABELS.length - 1);

      if (remaining > 0) {
        await new Promise((resolve) => setTimeout(resolve, remaining));
      }

      setPredictionData(data);
    } catch (err) {
      console.error("Failed to fetch prediction:", err);
      clearTimers();
      setError("Failed to load prediction data.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <h1 className="text-4xl font-bold tracking-tight text-[var(--color-text-primary)]">
          Predictions
        </h1>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-[var(--color-text-secondary)]">
          <MapPin className="h-4 w-4" aria-hidden="true" />
          Select a location on the map, then run an AI prediction.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut", delay: 0.05 }}
        className="relative h-64 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/40 shadow-[0_8px_30px_rgb(0,0,0,0.25)] sm:h-80"
      >
        <TrafficMap
          center={[21.2514, 81.6296]}
          zoom={13}
          locations={locations}
          onMarkerClick={setSelectedLocation}
          selectedLocationId={selectedLocation?.id}
          showLocationTooltips
          renderPopup={(location) => (
            <LocationPopup location={location} isSelected={selectedLocation?.id === location.id} />
          )}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut", delay: 0.1 }}
      >
        <PredictionForm
          selectedLocation={selectedLocation}
          onPredict={handlePrediction}
          loading={loading}
          loadingLabel={PHASE_LABELS[phase]}
        />
      </motion.div>

      <AnimatePresence mode="wait">
        {loading && <PredictionLoader key="loader" phase={phase} />}

        {error && !loading && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 rounded-xl border border-[var(--color-danger)]/30 bg-[var(--color-danger)]/10 px-4 py-3 text-sm font-medium text-[var(--color-danger)]"
          >
            <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            {error}
          </motion.div>
        )}

        {predictionData && !loading && !error && (
          <motion.div key="results" exit={{ opacity: 0 }}>
            <PredictionResults predictionData={predictionData} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}