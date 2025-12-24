// @ts-nocheck
const Collection = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Collection</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
            <span className="text-sm text-gray-600">Prev Month</span>
          </div>
          <div className="text-2xl font-bold text-gray-800">
            ₹{data?.prevMonth || 0}
          </div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <span className="w-3 h-3 rounded-full bg-orange-500 mr-2"></span>
            <span className="text-sm text-gray-600">Till Year</span>
          </div>
          <div className="text-2xl font-bold text-gray-800">
            ₹{data?.tillYear || 0}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
