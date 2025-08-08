import React from 'react';
import { ShoppingBag, Users, DollarSign, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { mockOrders, mockCustomers } from '../data/mockData';

const Dashboard: React.FC = () => {
  const totalOrders = mockOrders.length;
  const totalCustomers = mockCustomers.length;
  const totalRevenue = mockOrders.reduce((sum, order) => sum + order.totalAmount, 0);
  const pendingOrders = mockOrders.filter(order => order.status === 'pending').length;
  const completedOrders = mockOrders.filter(order => order.status === 'completed').length;
  
  const stats = [
    {
      title: 'Total Revenue',
      value: `₹${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-emerald-500',
      change: '+12%'
    },
    {
      title: 'Total Orders',
      value: totalOrders.toString(),
      icon: ShoppingBag,
      color: 'bg-blue-500',
      change: '+8%'
    },
    {
      title: 'Customers',
      value: totalCustomers.toString(),
      icon: Users,
      color: 'bg-purple-500',
      change: '+15%'
    },
    {
      title: 'Growth Rate',
      value: '23%',
      icon: TrendingUp,
      color: 'bg-orange-500',
      change: '+3%'
    }
  ];

  const recentOrders = mockOrders.slice(0, 5);

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your business.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className="text-sm text-emerald-600 mt-1">{stat.change} from last month</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Orders & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Recent Orders</h2>
            <span className="text-sm text-gray-500">Last 5 orders</span>
          </div>
          
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    order.status === 'completed' ? 'bg-emerald-100' :
                    order.status === 'processing' ? 'bg-blue-100' :
                    order.status === 'confirmed' ? 'bg-yellow-100' :
                    'bg-gray-100'
                  }`}>
                    {order.status === 'completed' ? 
                      <CheckCircle className="h-5 w-5 text-emerald-600" /> :
                      <Clock className="h-5 w-5 text-gray-600" />
                    }
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{order.customerName}</p>
                    <p className="text-sm text-gray-500">{order.id} • {order.orderDate}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">₹{order.totalAmount.toLocaleString()}</p>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                    order.status === 'completed' ? 'bg-emerald-100 text-emerald-800' :
                    order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'confirmed' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Status</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Pending</span>
                <span className="font-semibold text-orange-600">{pendingOrders}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Processing</span>
                <span className="font-semibold text-blue-600">{mockOrders.filter(o => o.status === 'processing').length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Completed</span>
                <span className="font-semibold text-emerald-600">{completedOrders}</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 rounded-xl text-white">
            <h3 className="text-lg font-semibold mb-2">WhatsApp Integration</h3>
            <p className="text-indigo-100 text-sm mb-4">Send bills instantly to customers</p>
            <button className="bg-white text-indigo-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-50 transition-colors">
              Configure Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;