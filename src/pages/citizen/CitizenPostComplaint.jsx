// src/pages/citizen/CitizenPostComplaint.jsx
import { useState } from "react";

export default function CitizenPostComplaint() {
  const [category, setCategory] = useState("Garbage not collected");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState("");

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhoto(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUseGPS = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      setLocation(`${latitude.toFixed(5)}, ${longitude.toFixed(5)}`);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: send to backend
    alert("Complaint submitted (frontend only)");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-green-700 mb-4">
        Post a Complaint
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow p-5 max-w-2xl space-y-4"
      >
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            className="w-full border rounded-lg px-3 py-2 text-sm"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Garbage not collected</option>
            <option>Overflowing bin</option>
            <option>Vehicle not arrived</option>
            <option>Street not cleaned</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            className="w-full border rounded-lg px-3 py-2 text-sm min-h-[80px]"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the issue clearly."
            required
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Location
          </label>
          <div className="flex gap-2">
            <input
              className="flex-1 border rounded-lg px-3 py-2 text-sm"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="House no, street or GPS coordinates."
              required
            />
            <button
              type="button"
              onClick={handleUseGPS}
              className="px-3 py-2 text-xs border rounded-lg text-green-700 border-green-600 hover:bg-green-50"
            >
              Use GPS
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Photo (optional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="text-xs"
          />
          {preview && (
            <img
              src={preview}
              alt="preview"
              className="mt-2 h-24 w-24 object-cover rounded-lg"
            />
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 text-xs font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700"
          >
            Submit Complaint
          </button>
        </div>
      </form>
    </div>
  );
}
