// src/pages/citizen/CitizenTrackVehicle.jsx
import { useEffect, useState } from "react";

export default function CitizenTrackVehicle() {
  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    // TODO: replace with live API
    setVehicle({
      route: "Ward 5 – Morning Route",
      status: "On the way",
      lastUpdate: "10:05 AM",
      distance: "1.2 km from your area",
      lat: 19.8132,
      lng: 85.8311,
    });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-green-700 mb-4">
        Track Vehicle
      </h1>

      <div className="bg-white rounded-2xl shadow p-5 max-w-2xl space-y-3">
        {vehicle ? (
          <>
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Route: </span>
              {vehicle.route}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Status: </span>
              {vehicle.status}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Last update: </span>
              {vehicle.lastUpdate}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Distance: </span>
              {vehicle.distance}
            </p>
            <a
              href={`https://www.google.com/maps?q=${vehicle.lat},${vehicle.lng}`}
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-2 text-xs text-blue-600 hover:underline"
            >
              Open location in map
            </a>
          </>
        ) : (
          <p className="text-sm text-gray-500">
            Vehicle tracking information will appear here.
          </p>
        )}
      </div>
    </div>
  );
}
