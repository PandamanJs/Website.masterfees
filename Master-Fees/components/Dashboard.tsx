import { useState, useEffect } from 'react';
import { toast } from "sonner";
import { api } from "../utils/supabase/api";

interface DashboardProps {
  schoolName: string;
  onLogout: () => void;
}

interface MetricsData {
  revenue: number;
  balance: number;
  outstanding: number;
}

export default function Dashboard({ schoolName, onLogout }: DashboardProps) {
  const [metrics, setMetrics] = useState<MetricsData>({
    revenue: 0,
    balance: 0,
    outstanding: 0
  });
  const [activeSection, setActiveSection] = useState('dashboard');

  useEffect(() => {
    loadMetrics();
  }, []);

  const loadMetrics = async () => {
    try {
      // Use demo data for display until database is connected
      setMetrics({
        revenue: 532000,
        balance: 444500,
        outstanding: 87500
      });
    } catch (error) {
      console.error('Failed to load metrics:', error);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'students', label: 'Students', icon: '👥' },
    { id: 'fees', label: 'Fee Management', icon: '💰' },
    { id: 'payments', label: 'Payments', icon: '💳' },
    { id: 'reports', label: 'Reports', icon: '📈' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Master Fees</h1>
          <p className="text-gray-300 text-sm mt-1">{schoolName}</p>
        </div>
        
        <nav className="space-y-2">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                activeSection === item.id 
                  ? 'bg-white bg-opacity-20 text-white' 
                  : 'text-gray-300 hover:bg-white hover:bg-opacity-10'
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-8">
          <button
            onClick={onLogout}
            className="w-full px-4 py-3 text-left text-gray-300 hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors"
          >
            <span className="mr-3">🚪</span>
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            {activeSection === 'dashboard' ? 'Financial Overview' : 
             activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
          </h2>
          <p className="text-gray-600 mt-2">
            {activeSection === 'dashboard' ? 'Track your school\'s financial performance' : 
             `Manage ${activeSection} for your school`}
          </p>
        </div>

        {activeSection === 'dashboard' && (
          <>
            {/* Financial Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="metric-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-green-600 mt-1">
                      {formatCurrency(metrics.revenue)}
                    </p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                    <span className="text-2xl">💰</span>
                  </div>
                </div>
              </div>

              <div className="metric-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Current Balance</p>
                    <p className="text-2xl font-bold text-blue-600 mt-1">
                      {formatCurrency(metrics.balance)}
                    </p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <span className="text-2xl">🏦</span>
                  </div>
                </div>
              </div>

              <div className="metric-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Outstanding Fees</p>
                    <p className="text-2xl font-bold text-orange-600 mt-1">
                      {formatCurrency(metrics.outstanding)}
                    </p>
                  </div>
                  <div className="p-3 bg-orange-100 rounded-full">
                    <span className="text-2xl">⏰</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="metric-card mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button className="p-4 text-center border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
                  <span className="text-2xl block mb-2">➕</span>
                  <span className="text-sm font-medium">Add Student</span>
                </button>
                <button className="p-4 text-center border border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors">
                  <span className="text-2xl block mb-2">💳</span>
                  <span className="text-sm font-medium">Record Payment</span>
                </button>
                <button className="p-4 text-center border border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors">
                  <span className="text-2xl block mb-2">📧</span>
                  <span className="text-sm font-medium">Send Reminder</span>
                </button>
                <button className="p-4 text-center border border-gray-200 rounded-lg hover:border-gray-500 hover:bg-gray-50 transition-colors">
                  <span className="text-2xl block mb-2">📊</span>
                  <span className="text-sm font-medium">Generate Report</span>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="metric-card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Payment Received</p>
                    <p className="text-sm text-gray-600">John Doe - Grade 10A</p>
                  </div>
                  <span className="text-green-600 font-medium">+$500</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">New Student Enrolled</p>
                    <p className="text-sm text-gray-600">Sarah Smith - Grade 9B</p>
                  </div>
                  <span className="text-blue-600 font-medium">New</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Fee Reminder Sent</p>
                    <p className="text-sm text-gray-600">25 students notified</p>
                  </div>
                  <span className="text-gray-600 font-medium">Sent</span>
                </div>
              </div>
            </div>
          </>
        )}

        {activeSection !== 'dashboard' && (
          <div className="metric-card">
            <div className="text-center py-12">
              <span className="text-6xl mb-4 block">🚧</span>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} Section
              </h3>
              <p className="text-gray-600">
                This section is under development. The dashboard shows your main financial overview.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}