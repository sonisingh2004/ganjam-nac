// @ts-nocheck
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { toast } from 'react-toastify';

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapView = ({ vehicles = [] }) => {
  // Create custom vehicle icons
  const createVehicleIcon = (status) => {
    const colors = {
      running: '#10b981',
      standing: '#3b82f6',
      stopped: '#f59e0b',
      dataNotRetrieving: '#6b7280'
    };
    
    return L.divIcon({
      className: 'custom-marker',
      html: `<div style="
        width: 32px;
        height: 32px;
        background: ${colors[status]};
        border: 3px solid white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.3);
      ">🚛</div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -16]
    });
  };

  const filteredVehicles = vehicles.filter(v => v.location);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">Live Satellite Map</h2>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2 bg-emerald-50 px-3 py-1 rounded-lg">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-semibold text-emerald-700">Live Tracking</span>
          </div>
          <button
            onClick={() => toast.info('Switching to roadmap view...')}
            className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-3 py-1 rounded-lg font-semibold text-xs shadow-md transition-all"
          >
            🗺️ Road View
          </button>
        </div>
      </div>
      
      {/* OpenStreetMap with Satellite View */}
      <MapContainer 
            center={[20.9517, 85.0985]} 
            zoom={8} 
            style={{ width: '100%', height: '500px', borderRadius: '12px', zIndex: 0 }}
          >
            {/* Satellite Tile Layer (OpenStreetMap alternative) */}
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution='Tiles &copy; Esri'
            />
            
            {/* Vehicle Markers */}
            {filteredVehicles.map((vehicle) => (
              <Marker
                key={vehicle.id}
                position={[vehicle.location.lat, vehicle.location.lng]}
                icon={createVehicleIcon(vehicle.status)}
              >
                <Popup>
                  <div className="p-2">
                    <h3 className="font-bold text-gray-900 mb-1">{vehicle.registrationNumber}</h3>
                    <p className="text-sm text-gray-600">Driver: {vehicle.driverName}</p>
                    <p className="text-sm text-gray-600">Ward: {vehicle.assignedWard}</p>
                    <p className="text-sm text-gray-600">Speed: {vehicle.speed || 0} km/h</p>
                    <p className="text-sm text-gray-600">Status: <span className="capitalize">{vehicle.status}</span></p>
                    <p className="text-sm text-gray-600">📍 Location: {vehicle.location.lat.toFixed(4)}, {vehicle.location.lng.toFixed(4)}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
          
          {/* Map Legend */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow"></div>
              <span className="text-gray-700">Running</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow"></div>
              <span className="text-gray-700">Standing</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-orange-500 rounded-full border-2 border-white shadow"></div>
              <span className="text-gray-700">Stopped</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gray-500 rounded-full border-2 border-white shadow"></div>
              <span className="text-gray-700">Offline</span>
            </div>
          </div>
    </div>
  );
};

export default MapView;
