import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Cloud,
  CloudRain,
  CloudFog,
  Sun,
  TrafficCone,
  Car,
  Truck,
  Bike,
  Gauge,
  AlertTriangle,
  Loader2,
  Sparkles,
} from "lucide-react";

const WEATHER_OPTIONS = [
  { value: "Clear", icon: Sun },
  { value: "Cloudy", icon: Cloud },
  { value: "Rainy", icon: CloudRain },
  { value: "Foggy", icon: CloudFog },
];

const SIGNAL_STATUS_OPTIONS = ["Operational", "Flashing", "Out of service"];

export default function PredictionForm({ selectedLocation, onPredict, loading, loadingLabel }) {
  const [formData, setFormData] = useState({
    weather: "Clear",
    signalStatus: "Operational",
    trafficVolume: "",
    averageVehicleSpeed: "",
    cars: "",
    trucks: "",
    bikes: "",
    accidentReported: false,
  });

  // Auto-fill volume/cars/bikes/trucks from the selected location's
  // defaults, AND average vehicle speed from the location's existing
  // `speed` field. All five are required, non-optional query params on
  // the backend (no defaults) — leaving averageVehicleSpeed blank was
  // producing an empty-string query param that FastAPI's automatic
  // validation rejects with 422 before the request ever reaches the
  // prediction logic. Every field here is still fully editable
  // afterwards via the normal updateField handler.
  useEffect(() => {
    if (!selectedLocation) return;

    const { defaults, speed } = selectedLocation;

    setFormData((currentData) => ({
      ...currentData,
      ...(defaults
        ? {
            trafficVolume: defaults.trafficVolume,
            cars: defaults.cars,
            bikes: defaults.bikes,
            trucks: defaults.trucks,
          }
        : {}),
      ...(speed !== undefined ? { averageVehicleSpeed: speed } : {}),
    }));
  }, [selectedLocation?.id]);

  function updateField(event) {
    const { name, value, type, checked } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handlePredict() {
    onPredict({ selectedLocation, ...formData });
  }

  const inputClassName =
    "mt-1.5 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 py-2.5 text-sm text-[var(--color-text-primary)] outline-none transition-all duration-200 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20";

  const labelClassName =
    "flex items-center gap-1.5 text-sm font-medium text-[var(--color-text-secondary)]";

  const isDisabled = !selectedLocation || loading;

  const vehicleFields = [
    { name: "cars", label: "Cars", icon: Car },
    { name: "trucks", label: "Trucks", icon: Truck },
    { name: "bikes", label: "Bikes", icon: Bike },
  ];

  return (
    <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/80 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.25)] backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-[var(--color-accent)]" aria-hidden="true" />
        <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
          Traffic Prediction Input
        </h2>
      </div>

      <div className="mt-5">
        <label className="text-sm text-[var(--color-text-secondary)]" htmlFor="selected-location">
          Selected Location
        </label>
        <input
          id="selected-location"
          className={inputClassName}
          readOnly
          value={selectedLocation?.name ?? "No location selected"}
        />
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <label className={labelClassName} htmlFor="weather">
          <div className="w-full">
            Weather
            <select
              id="weather"
              name="weather"
              className={inputClassName}
              value={formData.weather}
              onChange={updateField}
            >
              {WEATHER_OPTIONS.map(({ value }) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        </label>

        <label className={labelClassName} htmlFor="signal-status">
          <div className="w-full">
            <span className="flex items-center gap-1.5">
              <TrafficCone className="h-3.5 w-3.5" aria-hidden="true" />
              Signal Status
            </span>
            <select
              id="signal-status"
              name="signalStatus"
              className={inputClassName}
              value={formData.signalStatus}
              onChange={updateField}
            >
              {SIGNAL_STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </label>

        <label className={labelClassName} htmlFor="trafficVolume">
          <div className="w-full">
            <span className="flex items-center gap-1.5">
              <Gauge className="h-3.5 w-3.5" aria-hidden="true" />
              Traffic Volume
            </span>
            <input
              id="trafficVolume"
              name="trafficVolume"
              type="number"
              min="0"
              className={inputClassName}
              value={formData.trafficVolume}
              onChange={updateField}
            />
          </div>
        </label>

        <label className={labelClassName} htmlFor="averageVehicleSpeed">
          <div className="w-full">
            Average Vehicle Speed
            <input
              id="averageVehicleSpeed"
              name="averageVehicleSpeed"
              type="number"
              min="0"
              className={inputClassName}
              value={formData.averageVehicleSpeed}
              onChange={updateField}
            />
          </div>
        </label>

        {vehicleFields.map(({ name, label, icon: Icon }) => (
          <label key={name} className={labelClassName} htmlFor={name}>
            <div className="w-full">
              <span className="flex items-center gap-1.5">
                <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                {label}
              </span>
              <input
                id={name}
                name={name}
                type="number"
                min="0"
                className={inputClassName}
                value={formData[name]}
                onChange={updateField}
              />
            </div>
          </label>
        ))}

        <label
          className="flex items-center gap-2 self-end rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 py-2.5 text-sm text-[var(--color-text-secondary)]"
          htmlFor="accident-reported"
        >
          <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
          <input
            id="accident-reported"
            name="accidentReported"
            type="checkbox"
            checked={formData.accidentReported}
            onChange={updateField}
            className="ml-auto h-4 w-4 accent-[var(--color-accent)]"
          />
          Accident Reported
        </label>
      </div>

      <motion.button
        type="button"
        disabled={isDisabled}
        onClick={handlePredict}
        whileHover={!isDisabled ? { scale: 1.01 } : {}}
        whileTap={!isDisabled ? { scale: 0.98 } : {}}
        animate={
          loading
            ? { boxShadow: ["0 0 0px rgba(0,0,0,0)", "0 0 24px var(--color-accent)", "0 0 0px rgba(0,0,0,0)"] }
            : {}
        }
        transition={loading ? { duration: 1.6, repeat: Infinity, ease: "easeInOut" } : {}}
        className={`mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent)]/70 px-4 py-3 text-sm font-semibold text-[#06211d] shadow-lg shadow-[var(--color-accent)]/20 transition-shadow duration-200 ${
          isDisabled ? "cursor-not-allowed opacity-50" : "hover:shadow-xl hover:shadow-[var(--color-accent)]/30"
        }`}
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            {loadingLabel || "Initializing AI Model..."}
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Run AI Prediction
          </>
        )}
      </motion.button>
    </section>
  );
}