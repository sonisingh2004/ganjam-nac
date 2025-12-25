// @ts-nocheck
const Collection = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-5 sm:p-7 hover:shadow-2xl transition-all duration-500 border border-gray-100 group relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
            Collection
          </h3>
          <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <span className="text-white text-2xl">📊</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-5 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl hover:shadow-md transition-all duration-300 border border-teal-100">
            <div className="flex items-center justify-center mb-3">
              <span className="w-3 h-3 rounded-full bg-teal-500 mr-2 shadow-lg shadow-teal-500/50"></span>
              <span className="text-sm text-gray-600 font-semibold">Prev Month</span>
            </div>
            <div className="text-3xl font-extrabold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
              ₹{data?.prevMonth || 0}
            </div>
          </div>
          
          <div className="text-center p-5 bg-gradient-to-br from-cyan-50 to-sky-50 rounded-xl hover:shadow-md transition-all duration-300 border border-cyan-100">
            <div className="flex items-center justify-center mb-3">
              <span className="w-3 h-3 rounded-full bg-cyan-500 mr-2 shadow-lg shadow-cyan-500/50"></span>
              <span className="text-sm text-gray-600 font-semibold">Till Year</span>
            </div>
            <div className="text-3xl font-extrabold bg-gradient-to-r from-cyan-600 to-sky-600 bg-clip-text text-transparent">
              ₹{data?.tillYear || 0}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
