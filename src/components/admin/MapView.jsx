const MapView = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 h-64 sm:h-80 lg:h-96">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Map View</h3>
        <button className="p-2 hover:bg-gray-100 rounded">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
        </button>
      </div>
      
      <div className="w-full h-full bg-gray-100 rounded flex items-center justify-center">
        {/* Placeholder for map integration */}
        <div className="text-center text-gray-500 px-4">
          <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          <p className="text-sm">Map Integration</p>
          <p className="text-xs mt-1">
            {/* TODO: Integrate with Leaflet, Google Maps, or OpenStreetMap */}
            Connect to mapping service
          </p>
        </div>
      </div>
    </div>
  );
};

export default MapView;
