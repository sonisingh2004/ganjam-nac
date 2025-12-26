import {
  GoogleMap,
  Marker,
  Polyline,
  useLoadScript,
} from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";
import { X, Map, Navigation } from "lucide-react";

const center = { lat: 19.3149, lng: 84.7941 };

const initialVehicles = [
  {
    id: 1,
    number: "OD-07-GT-1023",
    driver: "Ramesh",
    ward: "Ward 5",
    status: "Active",
    path: [{ lat: 19.3149, lng: 84.7941 }],
  },
  {
    id: 2,
    number: "OD-07-GT-1048",
    driver: "Suresh",
    ward: "Ward 12",
    status: "Maintenance",
    path: [{ lat: 19.3205, lng: 84.8012 }],
  },
];

const LiveTracking = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const mapRef = useRef(null);
  const [mapType, setMapType] = useState("roadmap");
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  /* ---------------- LIVE MOVEMENT ---------------- */
  useEffect(() => {
    const interval = setInterval(() => {
      setVehicles((prev) =>
        prev.map((v) => {
          const last = v.path[v.path.length - 1];
          const next = {
            lat: last.lat + (Math.random() - 0.5) * 0.0005,
            lng: last.lng + (Math.random() - 0.5) * 0.0005,
          };
          return { ...v, path: [...v.path.slice(-20), next] };
        })
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  /* ---------------- AUTO FOCUS ---------------- */
  useEffect(() => {
    if (!selectedVehicle || !mapRef.current) return;
    const pos = selectedVehicle.path[selectedVehicle.path.length - 1];
    mapRef.current.panTo(pos);
    mapRef.current.setZoom(16);
  }, [selectedVehicle]);

  if (!isLoaded) return <p className="p-6">Loading Map…</p>;

  return (
    <div className="relative h-[75vh] bg-white rounded-2xl shadow overflow-hidden">

      {/* MAP */}
      <GoogleMap
        onLoad={(map) => (mapRef.current = map)}
        zoom={14}
        center={center}
        mapTypeId={mapType}
        mapContainerClassName="w-full h-full"
      >
        {vehicles.map((v) => (
          <div key={v.id}>
            <Polyline
              path={v.path}
              options={{
                strokeColor:
                  v.status === "Active" ? "#22c55e" : "#facc15",
                strokeWeight: 4,
              }}
            />

            <Marker
              position={v.path[v.path.length - 1]}
              label={{ text: "🚛", fontSize: "18px" }}
              onClick={() => setSelectedVehicle(v)}
            />
          </div>
        ))}
      </GoogleMap>

      {/* ================= MAP CONTROLS ================= */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-40">
        <button
          onClick={() =>
            setMapType(mapType === "roadmap" ? "satellite" : "roadmap")
          }
          className="bg-white shadow p-2 rounded-lg hover:bg-gray-100"
          title="Toggle Map View"
        >
          <Map size={18} />
        </button>

        <button
          onClick={() => {
            mapRef.current.panTo(center);
            mapRef.current.setZoom(14);
          }}
          className="bg-white shadow p-2 rounded-lg hover:bg-gray-100"
          title="Re-center"
        >
          <Navigation size={18} />
        </button>
      </div>

      {/* ================= VEHICLE PANEL ================= */}
      {selectedVehicle && (
        <div className="absolute top-0 right-0 h-full w-96 bg-white shadow-xl z-50">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="font-semibold text-green-700">
              Vehicle Details
            </h2>
            <button onClick={() => setSelectedVehicle(null)}>
              <X />
            </button>
          </div>

          <div className="p-4 space-y-3 text-sm">
            <Info label="Vehicle No" value={selectedVehicle.number} />
            <Info label="Driver" value={selectedVehicle.driver} />
            <Info label="Ward" value={selectedVehicle.ward} />
            <Info label="Status" value={selectedVehicle.status} badge />
          </div>
        </div>
      )}
    </div>
  );
};

const Info = ({ label, value, badge }) => (
  <div>
    <p className="text-xs text-gray-500">{label}</p>
    {badge ? (
      <span className="inline-block mt-1 px-3 py-1 text-xs rounded-full bg-green-600 text-white">
        {value}
      </span>
    ) : (
      <p className="font-medium">{value}</p>
    )}
  </div>
);

export default LiveTracking;
