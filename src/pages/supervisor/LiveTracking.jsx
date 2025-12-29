import {
  GoogleMap,
  Marker,
  Polyline,
  useLoadScript,
} from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";
import { X, Map, Navigation } from "lucide-react";

/* ================= MAP CENTER ================= */
const center = { lat: 19.3149, lng: 84.7941 };

/* ================= INITIAL VEHICLE DATA ================= */
const initialVehicles = [
  {
    id: 1,
    number: "OD-07-GT-1023",
    driver: "Ramesh",
    ward: "Ward 5",
    status: "Active",
    lastUpdated: "10:28 AM",
    path: [{ lat: 19.3149, lng: 84.7941 }],
  },
  {
    id: 2,
    number: "OD-07-GT-1048",
    driver: "Suresh",
    ward: "Ward 12",
    status: "Maintenance",
    lastUpdated: "09:55 AM",
    path: [{ lat: 19.3205, lng: 84.8012 }],
  },
];

/* ================= STATUS COLOR ================= */
const getColor = (status) => {
  if (status === "Active") return "#22c55e";       // Green
  if (status === "Maintenance") return "#facc15"; // Yellow
  return "#ef4444";                               // Red
};

const LiveTracking = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const mapRef = useRef(null);
  const [mapType, setMapType] = useState("roadmap");
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  /* ================= LIVE MOVEMENT (ACTIVE ONLY) ================= */
  useEffect(() => {
    const interval = setInterval(() => {
      setVehicles((prev) =>
        prev.map((v) => {
          if (v.status !== "Active") return v;

          const last = v.path[v.path.length - 1];
          const next = {
            lat: last.lat + (Math.random() - 0.5) * 0.0005,
            lng: last.lng + (Math.random() - 0.5) * 0.0005,
          };

          return {
            ...v,
            lastUpdated: new Date().toLocaleTimeString(),
            path: [...v.path.slice(-20), next],
          };
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  /* ================= AUTO FOCUS ================= */
  useEffect(() => {
    if (!selectedVehicle || !mapRef.current) return;
    const pos =
      selectedVehicle.path[selectedVehicle.path.length - 1];
    mapRef.current.panTo(pos);
    mapRef.current.setZoom(16);
  }, [selectedVehicle]);

  if (!isLoaded) return <p className="p-6">Loading Map…</p>;

  return (
    <div className="relative h-[75vh] bg-white rounded-2xl shadow overflow-hidden">

      {/* ================= MAP ================= */}
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
                strokeColor: getColor(v.status),
                strokeWeight: 4,
              }}
            />

            <Marker
              position={v.path[v.path.length - 1]}
              icon={{
                url: "https://maps.google.com/mapfiles/ms/icons/truck.png",
                scaledSize: new window.google.maps.Size(32, 32),
              }}
              onClick={() => setSelectedVehicle(v)}
            />
          </div>
        ))}
      </GoogleMap>

      {/* ================= MAP CONTROLS ================= */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-40">
        <button
          onClick={() =>
            setMapType(
              mapType === "roadmap" ? "satellite" : "roadmap"
            )
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

      {/* ================= LEGEND ================= */}
      <div className="absolute bottom-4 left-4 bg-white shadow rounded-lg p-3 text-xs space-y-1 z-40">
        <p className="flex items-center gap-2">
          <span className="w-3 h-3 bg-green-500 rounded-full" /> Active
        </p>
        <p className="flex items-center gap-2">
          <span className="w-3 h-3 bg-yellow-400 rounded-full" /> Maintenance
        </p>
        <p className="flex items-center gap-2">
          <span className="w-3 h-3 bg-red-500 rounded-full" /> Inactive
        </p>
      </div>

      {/* ================= VEHICLE PANEL ================= */}
      {selectedVehicle && (
        <div className="absolute top-0 right-0 h-full w-full sm:w-96 bg-white shadow-xl z-50">
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
            <Info
              label="Last GPS Update"
              value={selectedVehicle.lastUpdated}
            />
          </div>
        </div>
      )}
    </div>
  );
};

/* ================= INFO ROW ================= */
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
