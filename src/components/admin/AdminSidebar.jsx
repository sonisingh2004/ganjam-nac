// @ts-nocheck
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminSidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  
  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  }, [location, setIsOpen]);

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: '🏠' },
    { name: 'Complaint', path: '/admin/complaints', icon: '📋' },
    { name: 'Fuel Management', path: '/admin/fuel', icon: '⛽' },
    { name: 'MSW', path: '/admin/msw', icon: '♻️' },
    { name: 'Master Data', path: '/admin/master-data', icon: '📊' },
    { name: 'Customer Management', path: '/admin/customers', icon: '👥' },
    { name: 'AVTS', path: '/admin/avts', icon: '🚛' },
    { name: 'Waste Collection', path: '/admin/waste-collection', icon: '🗑️' },
    { name: 'Coverage Monitoring', path: '/admin/coverage', icon: '📍' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 w-64 bg-white shadow-lg h-screen fixed left-0 top-0 transition-transform duration-300 z-50 overflow-y-auto`}>
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-indigo-600">
              Admin
            </h1>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-1 hover:bg-gray-100 rounded lg:hidden"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">Admin Panel</p>
        </div>

        {/* Menu Items */}
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={index}>
                  <Link
                    to={item.path}
                    className={`flex items-center justify-start px-4 py-3 rounded-lg transition-all ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-600 font-semibold'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="ml-3">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default AdminSidebar;
