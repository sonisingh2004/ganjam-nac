import { useEffect, useState } from 'react';
import Collection from '../../components/admin/Collection';
import ComplaintsStatus from '../../components/admin/ComplaintsStatus';
import KYCStatus from '../../components/admin/KYCStatus';
import MapView from '../../components/admin/MapView';
import RecentActivity from '../../components/admin/RecentActivity';
import SecondaryScan from '../../components/admin/SecondaryScan';
import StatsCard from '../../components/admin/StatsCard';
import UsersCharge from '../../components/admin/UsersCharge';
import VehiclesStatus from '../../components/admin/VehiclesStatus';


const AdminDashboard = () => {
  // State management for dashboard data
  const [dashboardData, setDashboardData] = useState({
    stats: {
      waste: 0,
      vehicles: 0,
      fuel: 0,
      fuelCost: 0,
      complaints: 0,
      userFees: 0
    },
    usersCharge: {
      today: 0,
      tillMonth: 0
    },
    collection: {
      prevMonth: 0,
      tillYear: 0
    },
    vehicles: {
      all: 0,
      overSpeeding: 0,
      running: 0,
      standing: 0,
      stopped: 0,
      dataNotRetrieving: 0
    },
    complaints: {
      pending: 0,
      open: 0,
      closed: 0,
      outOfScope: 0
    },
    secondaryScan: {
      today: 0,
      yesterday: 0,
      tillMonth: 0,
      prevMonth: 0
    },
    kyc: {
      residential: 0,
      commercial: 0,
      religious: 0,
      industrial: 0,
      doorToDoor: {
        today: 0,
        yesterday: 0,
        tillMonth: 0,
        prevMonth: 0
      }
    },
    recentActivities: []
  });

  const [loading, setLoading] = useState(true);

  // Fetch dashboard data from API
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API endpoint
      // const response = await fetch('/api/admin/dashboard');
      // const data = await response.json();
      
      // Mock data for demonstration
      const mockData = {
        stats: {
          waste: 100.33,
          vehicles: 1,
          fuel: 4630,
          fuelCost: 1687611,
          complaints: 23,
          userFees: 0
        },
        usersCharge: {
          today: 0,
          tillMonth: 240
        },
        collection: {
          prevMonth: 100,
          tillYear: 340
        },
        vehicles: {
          all: 1,
          overSpeeding: 0,
          running: 0,
          standing: 0,
          stopped: 0,
          dataNotRetrieving: 1
        },
        complaints: {
          pending: 1,
          open: 18,
          closed: 3,
          outOfScope: 1
        },
        secondaryScan: {
          today: 0,
          yesterday: 0,
          tillMonth: 0,
          prevMonth: 0
        },
        kyc: {
          residential: 21,
          commercial: 10,
          religious: 5,
          industrial: 6,
          doorToDoor: {
            today: 0,
            yesterday: 0,
            tillMonth: 42,
            prevMonth: 0
          }
        },
        recentActivities: []
      };

      setDashboardData(mockData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-emerald-50 via-green-50/50 to-teal-50 relative overflow-hidden">
        {/* Animated background circles */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        
        <div className="text-center relative z-10">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-emerald-600"></div>
          </div>
          <p className="text-xl font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent animate-pulse">Loading dashboard...</p>
          <p className="text-sm text-gray-500 mt-2">Please wait while we fetch your data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50/70 via-green-50/50 to-teal-50/70 p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-green-200/35 to-emerald-200/35 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-teal-200/35 to-cyan-200/35 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-lime-100/15 to-green-100/15 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      
      <div className="relative z-10">
        {/* Welcome Header */}
        <div className="mb-8 sm:mb-10">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent mb-3 animate-gradient">
                Welcome Back, Admin! 👋
              </h1>
              <p className="text-gray-600 text-lg flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Here's what's happening with your waste management system today.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white px-4 py-2 rounded-xl shadow-lg border border-gray-100">
                <p className="text-xs text-gray-500">Current Date</p>
                <p className="font-semibold text-gray-800">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-5 mb-8 sm:mb-10">
          <StatsCard
            title="Waste(Ton.)"
            value={dashboardData.stats.waste}
            icon="♻️"
            gradient="from-blue-500 to-cyan-500"
          />
          <StatsCard
            title="Vehicles"
            value={dashboardData.stats.vehicles}
            icon="🚛"
            gradient="from-emerald-500 to-teal-500"
          />
          <StatsCard
            title="Fuel(Ltr.)"
            value={dashboardData.stats.fuel}
            icon="⛽"
            gradient="from-amber-500 to-orange-500"
          />
          <StatsCard
            title="Fuel Cost(₹)"
            value={dashboardData.stats.fuelCost}
            icon="💰"
            gradient="from-indigo-600 to-purple-600"
          />
          <StatsCard
            title="Complaints"
            value={dashboardData.stats.complaints}
            icon="📧"
            gradient="from-pink-500 to-rose-500"
          />
          <StatsCard
            title="User Fees"
            value={dashboardData.stats.userFees}
            icon="₹"
            gradient="from-violet-600 to-purple-600"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 mb-6 sm:mb-8">
          {/* Users Charge & Collection */}
          <div className="space-y-5 sm:space-y-6">
            <UsersCharge data={dashboardData.usersCharge} />
            <Collection data={dashboardData.collection} />
          </div>

          {/* Vehicles Status */}
          <VehiclesStatus data={dashboardData.vehicles} />

          {/* Complaints Status */}
          <ComplaintsStatus data={dashboardData.complaints} />
        </div>

        {/* Secondary Scan & KYC */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 mb-6 sm:mb-8">
          <SecondaryScan data={dashboardData.secondaryScan} />
          <KYCStatus data={dashboardData.kyc} />
        </div>

        {/* Map & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
          <div className="lg:col-span-2">
            <MapView />
          </div>
          <RecentActivity activities={dashboardData.recentActivities} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
