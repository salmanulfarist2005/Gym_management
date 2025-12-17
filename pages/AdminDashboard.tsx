import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Badge, Button } from '../components/UI';
import { MOCK_MEMBERS, REVENUE_DATA, MEMBER_STATUS_DATA } from '../constants';
import { Users, AlertCircle, CreditCard, UserPlus, Search, ArrowRight, ChevronRight } from 'lucide-react';
import { 
    LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend 
} from 'recharts';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const COLORS = ['#28A745', '#DC3545', '#17A2B8'];

  // Mock data specifically for the expiring section to ensure UI is demonstrated
  const expiringMembers = [
      { id: 'MEM-099', name: 'Sarah Connor', plan: 'Gold Annual', expiry: 'In 2 days' },
      { id: 'MEM-102', name: 'Kyle Reese', plan: 'Silver Monthly', expiry: 'In 5 days' },
      { id: 'MEM-105', name: 'John Wick', plan: 'Platinum', expiry: 'In 6 days' },
  ];

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500 text-sm">Welcome back, Manager</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                    type="text" 
                    placeholder="Search member..." 
                    className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary w-full md:w-64"
                />
            </div>
            <Button onClick={() => navigate('/admin/members/add')}>
                <UserPlus className="w-4 h-4" />
                Add Member
            </Button>
        </div>
      </div>

      {/* Expiring Members Alert Section */}
      <div className="bg-orange-50 border border-orange-200 rounded-xl p-5 text-orange-900 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
            <div className="flex items-center gap-2">
                <div className="p-2 bg-orange-100 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                    <h3 className="font-bold text-lg">Expiring Soon</h3>
                    <p className="text-sm text-orange-700">Memberships expiring within 7 days</p>
                </div>
            </div>
            <button 
                onClick={() => navigate('/admin/members?filter=expiring')} 
                className="flex items-center gap-1 text-sm font-semibold bg-white border border-orange-200 px-3 py-1.5 rounded-lg hover:bg-orange-50 transition-colors shadow-sm"
            >
                View List of Expiring Members
                <ArrowRight className="w-4 h-4" />
            </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {expiringMembers.map((member) => (
                <div key={member.id} className="bg-white/60 border border-orange-100 p-3 rounded-lg flex justify-between items-center">
                    <div>
                        <p className="font-semibold text-sm text-gray-900">{member.name}</p>
                        <p className="text-xs text-gray-500">{member.plan}</p>
                    </div>
                    <Badge status={member.expiry} />
                </div>
            ))}
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
            <div className="flex justify-between items-start mb-2">
                <div className="p-2 bg-blue-50 text-primary rounded-lg">
                    <Users className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-green-600">+12%</span>
            </div>
            <p className="text-sm text-gray-500">Monthly Active Users</p>
            <h3 className="text-2xl font-bold">1,240</h3>
        </Card>
        <Card className="p-4">
            <div className="flex justify-between items-start mb-2">
                <div className="p-2 bg-green-50 text-success rounded-lg">
                    <UserPlus className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-green-600">+5%</span>
            </div>
            <p className="text-sm text-gray-500">New Signups</p>
            <h3 className="text-2xl font-bold">48</h3>
        </Card>
        <Card className="p-4">
            <div className="flex justify-between items-start mb-2">
                <div className="p-2 bg-red-50 text-danger rounded-lg">
                    <AlertCircle className="w-5 h-5" />
                </div>
            </div>
            <p className="text-sm text-gray-500">Expiring (7 days)</p>
            <h3 className="text-2xl font-bold">{expiringMembers.length}</h3>
        </Card>
        <Card className="p-4">
            <div className="flex justify-between items-start mb-2">
                <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                    <CreditCard className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-green-600">+8%</span>
            </div>
            <p className="text-sm text-gray-500">Revenue (MTD)</p>
            <h3 className="text-2xl font-bold">₹1.2M</h3>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Revenue Trend</h3>
            <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={REVENUE_DATA}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#0052CC" stopOpacity={0.1}/>
                                <stop offset="95%" stopColor="#0052CC" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} />
                        <YAxis axisLine={false} tickLine={false} tickFormatter={(val) => `₹${val}`} />
                        <Tooltip />
                        <Area type="monotone" dataKey="value" stroke="#0052CC" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </Card>
        <Card>
            <h3 className="text-lg font-bold text-gray-900 mb-6">Member Status</h3>
            <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={MEMBER_STATUS_DATA}
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {MEMBER_STATUS_DATA.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="bottom" height={36}/>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </Card>
      </div>

      {/* Recent Members Table */}
      <Card className="overflow-hidden p-0">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-900">Recent Members</h3>
            <Button variant="outline" className="text-xs px-2 py-1 h-8" onClick={() => navigate('/admin/members')}>View All</Button>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-500 font-medium">
                    <tr>
                        <th className="px-6 py-3">Name</th>
                        <th className="px-6 py-3">Plan</th>
                        <th className="px-6 py-3">Joined</th>
                        <th className="px-6 py-3">Expiry</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {MOCK_MEMBERS.map((member) => (
                        <tr key={member.id} className="hover:bg-gray-50">
                            <td className="px-6 py-3">
                                <div>
                                    <div className="font-medium text-gray-900">{member.name}</div>
                                    <div className="text-xs text-gray-500">{member.email}</div>
                                </div>
                            </td>
                            <td className="px-6 py-3 text-gray-600">{member.plan}</td>
                            <td className="px-6 py-3 text-gray-600">{member.joinDate}</td>
                            <td className="px-6 py-3 text-gray-600">{member.expiryDate}</td>
                            <td className="px-6 py-3">
                                <Badge status={member.status} />
                            </td>
                            <td className="px-6 py-3">
                                <button className="text-primary hover:underline text-xs font-medium">Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </Card>
    </div>
  );
};

export default AdminDashboard;
