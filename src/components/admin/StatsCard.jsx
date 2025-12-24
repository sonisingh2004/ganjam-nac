// @ts-nocheck
const StatsCard = ({ title, value, icon, bgColor }) => {
  return (
    <div className={`${bgColor} rounded-lg shadow-md p-4 sm:p-6 text-white hover:shadow-xl transition-shadow duration-300`}>
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h3 className="text-xs sm:text-sm font-medium opacity-90">{title}</h3>
        <span className="text-xl sm:text-2xl">{icon}</span>
      </div>
      <div className="text-2xl sm:text-3xl font-bold mb-2">
        {typeof value === 'number' ? value.toLocaleString() : value}
      </div>
      <button className="text-xs bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-1 rounded transition-all">
        View Details
      </button>
    </div>
  );
};

export default StatsCard;
