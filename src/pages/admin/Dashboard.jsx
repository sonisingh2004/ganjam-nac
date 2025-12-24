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
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <StatsCard
          title="Waste(Ton.)"
          value={dashboardData.stats.waste}
          icon="♻️"
          bgColor="bg-blue-400"
        />
        <StatsCard
          title="Vehicles"
          value={dashboardData.stats.vehicles}
          icon="🚛"
          bgColor="bg-teal-400"
        />
        <StatsCard
          title="Fuel(Ltr.)"
          value={dashboardData.stats.fuel}
          icon="⛽"
          bgColor="bg-yellow-400"
        />
        <StatsCard
          title="Fuel Cost(₹)"
          value={dashboardData.stats.fuelCost}
          icon="💰"
          bgColor="bg-indigo-600"
        />
        <StatsCard
          title="Complaints"
          value={dashboardData.stats.complaints}
          icon="📧"
          bgColor="bg-pink-400"
        />
        <StatsCard
          title="User Fees"
          value={dashboardData.stats.userFees}
          icon="₹"
          bgColor="bg-purple-600"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
        {/* Users Charge & Collection */}
        <div className="space-y-4 sm:space-y-6">
          <UsersCharge data={dashboardData.usersCharge} />
          <Collection data={dashboardData.collection} />
        </div>

        {/* Vehicles Status */}
        <VehiclesStatus data={dashboardData.vehicles} />

        {/* Complaints Status */}
        <ComplaintsStatus data={dashboardData.complaints} />
      </div>

      {/* Secondary Scan & KYC */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
        <SecondaryScan data={dashboardData.secondaryScan} />
        <KYCStatus data={dashboardData.kyc} />
      </div>

      {/* Map & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2">
          <MapView />
        </div>
        <RecentActivity activities={dashboardData.recentActivities} />
      </div>
    </div>
  );
};

export default AdminDashboard;
