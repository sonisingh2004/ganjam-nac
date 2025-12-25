const MapView = () => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-5 sm:p-7 h-64 sm:h-80 lg:h-96 hover:shadow-2xl transition-all duration-500 border border-gray-100 group relative overflow-hidden">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
          Live Map View
        </h3>
        <button className="p-2.5 hover:bg-gradient-to-br hover:from-green-50 hover:to-emerald-50 rounded-xl transition-all duration-300 border border-transparent hover:border-green-200 group/btn">
          <svg className="w-5 h-5 text-gray-600 group-hover/btn:text-green-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
        </button>
      </div>
      
      <div className="w-full h-full bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-xl flex items-center justify-center border-2 border-dashed border-green-200 relative overflow-hidden group-hover:border-green-300 transition-colors">
        {/* Animated background circles */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-20 right-10 w-32 h-32 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        
        {/* Placeholder for map integration */}
        <div className="text-center text-gray-500 px-4 relative z-10">
          <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-500">
            <svg className="w-12 h-12 sm:w-14 sm:h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
          </div>
          <p className="text-base font-bold text-gray-700 mb-1">Map Integration</p>
          <p className="text-xs text-gray-500">
            {/* TODO: Integrate with Leaflet, Google Maps, or OpenStreetMap */}
            Connect to mapping service
          </p>
        </div>
      </div>
    </div>
  );
};

export default MapView;
