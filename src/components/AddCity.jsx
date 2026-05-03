import { useEffect, useState } from "react";
import { X, Bookmark } from "lucide-react";
import { useSearch } from "../context/SearchContext";
import { fetchCitySuggestions } from "../services/weatherService";

export default function AddCity({ onClose, openModal }) {
  const [city, setCity] = useState("");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");
  const { setRecentCities } = useSearch();

  useEffect(() => {
    if (!toast) return undefined;

    const timer = setTimeout(() => setToast(""), 2000);
    return () => clearTimeout(timer);
  }, [toast]);

  const handleSave = async () => {
    const trimmedCity = city.trim();
    if (!trimmedCity || saving) return;

    setSaving(true);
    const suggestions = await fetchCitySuggestions(trimmedCity);
    const selectedCity =
      suggestions.find(
        (item) => item.name.toLowerCase() === trimmedCity.toLowerCase(),
      ) || suggestions[0];

    if (!selectedCity) {
      setToast("City not found");
      setSaving(false);
      return;
    }

    setRecentCities((prev) => {
      const filtered = prev.filter(
        (item) => item.lat !== selectedCity.lat || item.lon !== selectedCity.lon,
      );

      return [selectedCity, ...filtered].slice(0, 4);
    });

    setCity("");
    setToast("City saved successfully");
    setSaving(false);
  };

  if (!openModal) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 "
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[90%] max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 text-white transition-all duration-300 ease-in-out"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2 ">
            <Bookmark size={20} />
            Save City
          </h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full p-3 rounded-xl bg-white/10 border border-white/20 mb-4"
        />

        <div className="flex gap-3">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 bg-indigo-400 text-white text-black py-2 rounded-xl disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save"}
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-white/10 py-2 rounded-xl"
          >
            Cancel
          </button>
        </div>

        {toast && (
          <div className="mt-4 rounded-xl border border-emerald-400/30 bg-emerald-400/15 px-4 py-3 text-sm text-emerald-100">
            {toast}
          </div>
        )}
      </div>
    </div>
  );
}
