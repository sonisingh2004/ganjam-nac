// src/pages/citizen/CitizenDashboard.jsx
import { useEffect, useState } from "react";

export default function CitizenDashboard() {
  const [stats, setStats] = useState({
    total: 0,
    resolved: 0,
    pending: 0,
  });

  useEffect(() => {
    // TODO: replace with real API
    setStats({ total: 2, resolved: 0, pending: 2 });
  }, []);

  return (
    <div className="p-6">
      {/* Top headline like admin dashboard */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-green-700">
            Citizen Dashboard
          </h1>
          <p className="mt-2 text-gray-600 text-sm md:text-base">
            Track waste collection, report issues, and help keep our city clean.
          </p>
        </div>
      </div>

      {/* Stat cards row – styled like admin cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Total complaints */}
        <div className="bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-3xl p-5 shadow-md text-white flex flex-col justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide opacity-80">
              Total Complaints
            </p>
            <p className="mt-3 text-3xl font-extrabold">{stats.total}</p>
          </div>
          <button className="mt-4 inline-flex items-center text-xs font-medium bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full">
            View Details →
          </button>
        </div>

        {/* Resolved complaints */}
        <div className="bg-gradient-to-br from-sky-400 to-sky-500 rounded-3xl p-5 shadow-md text-white flex flex-col justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide opacity-80">
              Resolved Complaints
            </p>
            <p className="mt-3 text-3xl font-extrabold">{stats.resolved}</p>
          </div>
          <button className="mt-4 inline-flex items-center text-xs font-medium bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full">
            View Details →
          </button>
        </div>

        {/* Pending complaints */}
        <div className="bg-gradient-to-br from-orange-400 to-orange-500 rounded-3xl p-5 shadow-md text-white flex flex-col justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide opacity-80">
              Pending Complaints
            </p>
            <p className="mt-3 text-3xl font-extrabold">{stats.pending}</p>
          </div>
          <button className="mt-4 inline-flex items-center text-xs font-medium bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full">
            View Details →
          </button>
        </div>
      </div>

      {/* Lower panels – Recent Activity + Quick Actions (similar layout to admin) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent activity big card */}
        <section className="lg:col-span-2 bg-white rounded-3xl shadow p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-800">
              Recent Activity
            </h2>
            <span className="text-xs text-gray-500">
              Latest updates on complaints and collections
            </span>
          </div>

          {/* Placeholder list */}
          <ul className="space-y-3 text-sm">
            <li className="flex items-start justify-between">
              <div>
                <p className="font-medium text-gray-800">
                  Complaint C-101 created
                </p>
                <p className="text-xs text-gray-500">
                  Garbage not collected from your street.
                </p>
              </div>
              <span className="text-[11px] text-gray-400">Today</span>
            </li>
            <li className="flex items-start justify-between">
              <div>
                <p className="font-medium text-gray-800">
                  Vehicle arrival alert
                </p>
                <p className="text-xs text-gray-500">
                  Vehicle will reach your area in 15 minutes.
                </p>
              </div>
              <span className="text-[11px] text-gray-400">Today</span>
            </li>
          </ul>
        </section>

        {/* Quick actions side card */}
        <section className="bg-white rounded-3xl shadow p-5">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Quick Actions
          </h2>
          <div className="flex flex-col gap-3 text-sm">
            <button className="w-full text-left px-4 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-medium shadow hover:shadow-md">
              Post a Complaint
            </button>
            <button className="w-full text-left px-4 py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-sky-600 text-white font-medium shadow hover:shadow-md">
              Track Vehicle
            </button>
            <button className="w-full text-left px-4 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium shadow hover:shadow-md">
              Online Service Booking and Payments
            </button>
            <button className="w-full text-left px-4 py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 text-white font-medium shadow hover:shadow-md">
              View My Complaints
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
