// @ts-nocheck
import { useEffect, useState } from 'react';
import ComplaintsStatus from '../../components/admin/ComplaintsStatus';
import FuelManagement from '../../components/admin/FuelManagement';
import MapView from '../../components/admin/MapView';
import PendingActions from '../../components/admin/PendingActions';
import QuickActions from '../../components/admin/QuickActions';
import RecentActivity from '../../components/admin/RecentActivity';
import RouteCompletion from '../../components/admin/RouteCompletion';
import StaffPerformance from '../../components/admin/StaffPerformance';
import StatsCard from '../../components/admin/StatsCard';
import TodaysPerformance from '../../components/admin/TodaysPerformance';
import VehiclesStatus from '../../components/admin/VehiclesStatus';
import WardCoverage from '../../components/admin/WardCoverage';


const AdminDashboard = () => {
  // State management for dashboard data
  const [dashboardData, setDashboardData] = useState({
    stats: {
      waste: 0,
      vehicles: 0,
      activeStaff: 0,
      complaints: 0,
      wards: 0,
      citizens: 0
    },
    performance: {
      resolvedComplaints: 0,
      totalComplaints: 0,
      collectionRate: 0
    },
    pending: {
      pendingComplaints: 0,
      avgResponseTime: '0h'
    },
    wardCoverage: {
      wards: []
    },
    staffPerformance: {
      present: 0,
      absent: 0,
      onLeave: 0,
      attendanceRate: 0,
      tasksAssigned: 0,
      tasksCompleted: 0,
      tasksInProgress: 0
    },
    routeCompletion: {
      overallCompletion: 0,
      completedRoutes: 0,
      totalRoutes: 0,
      routes: []
    },
    fuelManagement: {
      todayUsage: 0,
      monthUsage: 0,
      totalCost: 0,
      avgCostPerLiter: 0,
      alerts: []
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
          waste: 125.50,
          vehicles: 18,
          activeStaff: 45,
          complaints: 23,
          wards: 12,
          citizens: 8250
        },
        performance: {
          resolvedComplaints: 87,
          totalComplaints: 100,
          collectionRate: 94,
          complaintsTrend: [72, 68, 75, 81, 78, 85, 87],
          collectionTrend: [88, 90, 89, 92, 91, 93, 94]
        },
        pending: {
          pendingComplaints: 234,
          avgResponseTime: '2.4h'
        },
        wardCoverage: {
          wards: [
            { name: 'Ward 1', status: 'completed', completion: 100, collectedToday: 12.5 },
            { name: 'Ward 2', status: 'completed', completion: 100, collectedToday: 10.8 },
            { name: 'Ward 3', status: 'in-progress', completion: 75, collectedToday: 8.5 },
            { name: 'Ward 4', status: 'in-progress', completion: 60, collectedToday: 7.2 },
            { name: 'Ward 5', status: 'pending', completion: 25, collectedToday: 3.5 },
            { name: 'Ward 6', status: 'completed', completion: 100, collectedToday: 11.3 }
          ]
        },
        staffPerformance: {
          present: 45,
          absent: 2,
          onLeave: 1,
          attendanceRate: 94,
          tasksAssigned: 52,
          tasksCompleted: 38,
          tasksInProgress: 14
        },
        routeCompletion: {
          overallCompletion: 73,
          completedRoutes: 11,
          totalRoutes: 15,
          routes: [
            { name: 'Route A1', vehicle: 'MH-12-AB-1234', status: 'completed', completion: 100 },
            { name: 'Route A2', vehicle: 'MH-12-AB-1235', status: 'completed', completion: 100 },
            { name: 'Route B1', vehicle: 'MH-12-CD-5678', status: 'in-progress', completion: 65 },
            { name: 'Route B2', vehicle: 'MH-12-CD-5679', status: 'in-progress', completion: 45 },
            { name: 'Route C1', vehicle: 'MH-12-EF-9012', status: 'pending', completion: 0 }
          ]
        },
        fuelManagement: {
          todayUsage: 285,
          monthUsage: 4630,
          totalCost: 1687611,
          avgCostPerLiter: 105,
          alerts: [
            { type: 'warning', message: 'High fuel consumption detected', vehicle: 'MH-12-CD-5678' },
            { type: 'info', message: 'Refueling scheduled', vehicle: 'MH-12-AB-1234' }
          ]
        },
        vehicles: {
          all: 18,
          overSpeeding: 0,
          running: 12,
          standing: 3,
          stopped: 2,
          dataNotRetrieving: 1
        },
        complaints: {
          pending: 5,
          open: 12,
          closed: 58,
          outOfScope: 3
        },
        recentActivities: [
          { type: 'collection', message: 'Waste collected from Ward 5 - 2.5 tons', time: '10 mins ago' },
          { type: 'complaint', message: 'New complaint registered - Missed collection', time: '25 mins ago' },
          { type: 'vehicle', message: 'Vehicle MH-12-AB-1234 route completed', time: '45 mins ago' },
          { type: 'staff', message: 'Morning shift attendance completed - 45/48 present', time: '1 hour ago' },
          { type: 'payment', message: 'Payment received - ₹1,850', time: '2 hours ago' }
        ]
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-teal-50 to-cyan-100 p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-green-300/40 to-emerald-300/40 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-teal-300/40 to-cyan-300/40 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-lime-200/20 to-green-200/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      
      <div className="relative z-10">
        {/* Welcome Header */}
        <div className="mb-8 sm:mb-10">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl sm:text-4xl font-extrabold bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent mb-3 animate-gradient">
                Command & Control Center 🌿
              </h1>
              <p className="text-gray-600 text-lg flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Real-time monitoring of waste management operations across all wards
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
            title="Waste Collected"
            value={dashboardData.stats.waste}
            icon="♻️"
            gradient="from-emerald-500 to-teal-600"
          />
          <StatsCard
            title="Active Vehicles"
            value={dashboardData.stats.vehicles}
            icon="🚛"
            gradient="from-teal-500 to-cyan-600"
          />
          <StatsCard
            title="Staff Present"
            value={dashboardData.stats.activeStaff}
            icon="👷"
            gradient="from-blue-500 to-indigo-600"
          />
          <StatsCard
            title="Complaints"
            value={dashboardData.stats.complaints}
            icon="📧"
            gradient="from-rose-500 to-pink-600"
          />
          <StatsCard
            title="Total Wards"
            value={dashboardData.stats.wards}
            icon="🏘️"
            gradient="from-lime-600 to-green-600"
          />
          <StatsCard
            title="Registered Citizens"
            value={dashboardData.stats.citizens}
            icon="👥"
            gradient="from-purple-500 to-violet-600"
          />
        </div>

        {/* Performance & Actions Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8 sm:mb-10">
          <TodaysPerformance data={dashboardData.performance} />
          <ComplaintsStatus data={dashboardData.complaints} />
          <QuickActions />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 mb-6 sm:mb-8">
          {/* Ward Coverage */}
          <WardCoverage data={dashboardData.wardCoverage} />

          {/* Vehicles Status */}
          <VehiclesStatus data={dashboardData.vehicles} />

          {/* Complaints Status */}
          <PendingActions data={dashboardData.pending} />
        </div>

        {/* Staff & Route Management */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 mb-6 sm:mb-8">
          <StaffPerformance data={dashboardData.staffPerformance} />
          <RouteCompletion data={dashboardData.routeCompletion} />
        </div>

        {/* Fuel Management */}
        <div className="mb-6 sm:mb-8">
            <MapView />
        </div>

        {/* Map & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
          <div className="lg:col-span-2">
          <FuelManagement data={dashboardData.fuelManagement} />
          </div>
          <RecentActivity activities={dashboardData.recentActivities} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
