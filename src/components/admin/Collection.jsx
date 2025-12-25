// @ts-nocheck
const Collection = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-5 sm:p-7 hover:shadow-2xl transition-all duration-500 border border-gray-100 group relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Collection
          </h3>
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <span className="text-white text-2xl">📊</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-5 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl hover:shadow-md transition-all duration-300 border border-purple-100">
            <div className="flex items-center justify-center mb-3">
              <span className="w-3 h-3 rounded-full bg-purple-500 mr-2 shadow-lg shadow-purple-500/50"></span>
              <span className="text-sm text-gray-600 font-semibold">Prev Month</span>
            </div>
            <div className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              ₹{data?.prevMonth || 0}
            </div>
          </div>
          
          <div className="text-center p-5 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl hover:shadow-md transition-all duration-300 border border-orange-100">
            <div className="flex items-center justify-center mb-3">
              <span className="w-3 h-3 rounded-full bg-orange-500 mr-2 shadow-lg shadow-orange-500/50"></span>
              <span className="text-sm text-gray-600 font-semibold">Till Year</span>
            </div>
            <div className="text-3xl font-extrabold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              ₹{data?.tillYear || 0}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
