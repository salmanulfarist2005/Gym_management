import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Badge, Button } from '../components/UI.tsx';
import { MOCK_MEMBERS, REVENUE_DATA, MEMBER_STATUS_DATA } from '../constants.ts';
import { Users, AlertCircle, CreditCard, UserPlus, Search, ArrowRight, ChevronRight } from 'lucide-react';
import { 
    LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend 
} from 'recharts';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const COLORS = ['#28A745', '#DC3545', '#17A2B8'];

  const expiringMembers = [
      { id: 'MEM-099', name: 'Sarah Connor', plan: 'Gold Annual', expiry: 'In 2 days' },
      { id: 'MEM-102', name: 'Kyle Reese', plan: 'Silver Monthly', expiry: 'In 5 days' },
      { id: 'MEM-105', name: 'John Wick', plan: 'Platinum', expiry: 'In 6 days' },
  ];

  return (
    <div className="space-y-10">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">Dashboard</h1>
            <p className="text-gray-500 text-lg mt-1">Welcome back, Manager</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                    type="text" 
                    placeholder="Search member..." 
                    className="pl-12 pr-6 py-3.5 border-2 border-gray-100 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-primary w-full md:w-80 transition-all"
                />
            </div>
            <Button onClick={() => navigate('/admin/members/add')}>
                <UserPlus className="w-6 h-6" />
                Add Member
            </Button>
        </div>
      </div>

      {/* Expiring Members Alert Section */}
      <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-8 text-orange-900 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div className="flex items-center gap-4">
                <div className="p-4 bg-orange-100 rounded-2xl">
                    <AlertCircle className="w-8 h-8 text-orange-600" />
                </div>
                <div>
                    <h3 className="font-black text-2xl">Expiring Soon</h3>
                    <p className="text-lg text-orange-700">Memberships expiring within 7 days</p>
                </div>
            </div>
            <button 
                onClick={() => navigate('/admin/members?filter=expiring')} 
                className="flex items-center gap-2 text-base font-bold bg-white border-2 border-orange-200 px-6 py-2.5 rounded-xl hover:bg-orange-50 transition-all shadow-sm active:scale-95"
            >
                View Expiring Members
                <ArrowRight className="w-5 h-5" />
            </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {expiringMembers.map((member) => (
                <div key={member.id} className="bg-white/80 border-2 border-orange-100 p-5 rounded-xl flex justify-between items-center shadow-sm">
                    <div>
                        <p className="font-bold text-lg text-gray-900">{member.name}</p>
                        <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">{member.plan}</p>
                    </div>
                    <Badge status={member.expiry} />
                </div>
            ))}
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-8">
            <div className="flex justify-between items-start mb-4">
                <div className="p-4 bg-blue-50 text-primary rounded-2xl">
                    <Users className="w-8 h-8" />
                </div>
                <span className="text-sm font-black bg-green-50 text-green-600 px-3 py-1 rounded-lg">+12%</span>
            </div>
            <p className="text-lg text-gray-500 font-medium">Monthly Active Users</p>
            <h3 className="text-4xl font-black mt-2">1,240</h3>
        </Card>
        <Card className="p-8">
            <div className="flex justify-between items-start mb-4">
                <div className="p-4 bg-green-50 text-success rounded-2xl">
                    <UserPlus className="w-8 h-8" />
                </div>
                <span className="text-sm font-black bg-green-50 text-green-600 px-3 py-1 rounded-lg">+5%</span>
            </div>
            <p className="text-lg text-gray-500 font-medium">New Signups</p>
            <h3 className="text-4xl font-black mt-2">48</h3>
        </Card>
        <Card className="p-8 border-2 border-red-50">
            <div className="flex justify-between items-start mb-4">
                <div className="p-4 bg-red-50 text-danger rounded-2xl">
                    <AlertCircle className="w-8 h-8" />
                </div>
            </div>
            <p className="text-lg text-gray-500 font-medium">Expiring (7 days)</p>
            <h3 className="text-4xl font-black mt-2">{expiringMembers.length}</h3>
        </Card>
        <Card className="p-8">
            <div className="flex justify-between items-start mb-4">
                <div className="p-4 bg-purple-50 text-purple-600 rounded-2xl">
                    <CreditCard className="w-8 h-8" />
                </div>
                <span className="text-sm font-black bg-green-50 text-green-600 px-3 py-1 rounded-lg">+8%</span>
            </div>
            <p className="text-lg text-gray-500 font-medium">Revenue (MTD)</p>
            <h3 className="text-4xl font-black mt-2">₹1.2M</h3>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 p-8">
            <h3 className="text-2xl font-black text-gray-900 mb-8">Revenue Trend</h3>
            <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={REVENUE_DATA}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#0052CC" stopOpacity={0.1}/>
                                <stop offset="95%" stopColor="#0052CC" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 14, fontWeight: 600}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fontSize: 14, fontWeight: 600}} tickFormatter={(val) => `₹${val}`} />
                        <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                        <Area type="monotone" dataKey="value" stroke="#0052CC" strokeWidth={4} fillOpacity={1} fill="url(#colorValue)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </Card>
        <Card className="p-8">
            <h3 className="text-2xl font-black text-gray-900 mb-8">Member Status</h3>
            <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={MEMBER_STATUS_DATA}
                            innerRadius={80}
                            outerRadius={120}
                            paddingAngle={8}
                            dataKey="value"
                        >
                            {MEMBER_STATUS_DATA.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="bottom" height={40} iconType="circle" wrapperStyle={{fontWeight: 700, fontSize: '14px'}} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </Card>
      </div>

      {/* Recent Members Table */}
      <Card className="overflow-hidden p-0">
        <div className="p-8 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-2xl font-black text-gray-900">Recent Members</h3>
            <Button variant="outline" className="text-sm px-4 py-2" onClick={() => navigate('/admin/members')}>View All Members</Button>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left text-lg">
                <thead className="bg-gray-50 text-gray-500 font-bold uppercase text-xs tracking-widest">
                    <tr>
                        <th className="px-8 py-5">Name</th>
                        <th className="px-8 py-5">Plan</th>
                        <th className="px-8 py-5">Joined</th>
                        <th className="px-8 py-5">Expiry</th>
                        <th className="px-8 py-5">Status</th>
                        <th className="px-8 py-5 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {MOCK_MEMBERS.map((member) => (
                        <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-8 py-6">
                                <div>
                                    <div className="font-bold text-gray-900">{member.name}</div>
                                    <div className="text-sm text-gray-500 font-medium">{member.email}</div>
                                </div>
                            </td>
                            <td className="px-8 py-6 text-gray-600 font-medium">{member.plan}</td>
                            <td className="px-8 py-6 text-gray-600 font-medium">{member.joinDate}</td>
                            <td className="px-8 py-6 text-gray-600 font-medium">{member.expiryDate}</td>
                            <td className="px-8 py-6">
                                <Badge status={member.status} />
                            </td>
                            <td className="px-8 py-6 text-right">
                                <button className="text-primary hover:text-blue-700 font-black text-base transition-colors">Edit</button>
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