import { useEffect, useState } from "react";
import { X, Bookmark } from "lucide-react";

export default function AddCity({ onClose, openModal }) {
  const [city, setCity] = useState("");
  const [savedCities, setSavedCities] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cities")) || [];
    setSavedCities(data);
  }, []);

  const handleSave = () => {
    if (!city.trim()) return;

    const updated = [...savedCities, city];
    setSavedCities(updated);
    localStorage.setItem("cities", JSON.stringify(updated));

    setCity("");
    onClose();
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
          <h2 className="text-lg font-semibold flex items-center gap-2">
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
            className="flex-1 bg-indigo-400 text-white text-black py-2 rounded-xl"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-white/10 py-2 rounded-xl"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
