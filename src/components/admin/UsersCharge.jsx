// @ts-nocheck
const UsersCharge = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-5 sm:p-7 hover:shadow-2xl transition-all duration-500 border border-gray-100 group relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Users Charge
          </h3>
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <span className="text-white text-2xl">💰</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-5 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl hover:shadow-md transition-all duration-300 border border-blue-100">
            <div className="flex items-center justify-center mb-3">
              <span className="w-3 h-3 rounded-full bg-blue-500 mr-2 animate-pulse shadow-lg shadow-blue-500/50"></span>
              <span className="text-sm text-gray-600 font-semibold">Today</span>
            </div>
            <div className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              ₹{data?.today || 0}
            </div>
          </div>
          
          <div className="text-center p-5 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl hover:shadow-md transition-all duration-300 border border-emerald-100">
            <div className="flex items-center justify-center mb-3">
              <span className="w-3 h-3 rounded-full bg-emerald-500 mr-2 shadow-lg shadow-emerald-500/50"></span>
              <span className="text-sm text-gray-600 font-semibold">Till Month</span>
            </div>
            <div className="text-3xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              ₹{data?.tillMonth || 0}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersCharge;
