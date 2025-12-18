import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Badge, Button } from '../components/UI.tsx';
import { MOCK_MEMBERS, REVENUE_DATA, MEMBER_STATUS_DATA } from '../constants.ts';
import { Users, AlertCircle, CreditCard, UserPlus, Search, ArrowRight, Edit2, Trash2 } from 'lucide-react';
import { 
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend 
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
    <div className="space-y-8">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Dashboard</h1>
            <p className="text-gray-500 text-base mt-0.5">Welcome back, Manager</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                    type="text" 
                    placeholder="Search member..." 
                    className="pl-10 pr-4 py-2.5 border-2 border-gray-100 rounded-xl text-base focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-primary w-full md:w-64 transition-all"
                />
            </div>
            <Button onClick={() => navigate('/admin/members/add')}>
                <UserPlus className="w-5 h-5" />
                Add Member
            </Button>
        </div>
      </div>

      {/* Expiring Members Alert Section */}
      <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-6 text-orange-900 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
            <div className="flex items-center gap-3">
                <div className="p-3 bg-orange-100 rounded-xl">
                    <AlertCircle className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                    <h3 className="font-black text-xl">Expiring Soon</h3>
                    <p className="text-base text-orange-700">Memberships expiring within 7 days</p>
                </div>
            </div>
            <button 
                onClick={() => navigate('/admin/members?filter=expiring')} 
                className="flex items-center gap-2 text-sm font-bold bg-white border-2 border-orange-200 px-4 py-2 rounded-xl hover:bg-orange-50 transition-all shadow-sm active:scale-95"
            >
                View All
                <ArrowRight className="w-4 h-4" />
            </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {expiringMembers.map((member) => (
                <div key={member.id} className="bg-white/80 border border-orange-100 p-4 rounded-xl flex justify-between items-center shadow-sm">
                    <div>
                        <p className="font-bold text-base text-gray-900">{member.name}</p>
                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">{member.plan}</p>
                    </div>
                    <Badge status={member.expiry} />
                </div>
            ))}
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6">
            <div className="flex justify-between items-start mb-3">
                <div className="p-3 bg-blue-50 text-primary rounded-xl">
                    <Users className="w-6 h-6" />
                </div>
                <span className="text-xs font-black bg-green-50 text-green-600 px-2 py-0.5 rounded-md">+12%</span>
            </div>
            <p className="text-base text-gray-500 font-medium">Active Users</p>
            <h3 className="text-3xl font-black mt-1">1,240</h3>
        </Card>
        <Card className="p-6">
            <div className="flex justify-between items-start mb-3">
                <div className="p-3 bg-green-50 text-success rounded-xl">
                    <UserPlus className="w-6 h-6" />
                </div>
                <span className="text-xs font-black bg-green-50 text-green-600 px-2 py-0.5 rounded-md">+5%</span>
            </div>
            <p className="text-base text-gray-500 font-medium">New Signups</p>
            <h3 className="text-3xl font-black mt-1">48</h3>
        </Card>
        <Card className="p-6 border border-red-100">
            <div className="flex justify-between items-start mb-3">
                <div className="p-3 bg-red-50 text-danger rounded-xl">
                    <AlertCircle className="w-6 h-6" />
                </div>
            </div>
            <p className="text-base text-gray-500 font-medium">Expiring</p>
            <h3 className="text-3xl font-black mt-1">{expiringMembers.length}</h3>
        </Card>
        <Card className="p-6">
            <div className="flex justify-between items-start mb-3">
                <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                    <CreditCard className="w-6 h-6" />
                </div>
                <span className="text-xs font-black bg-green-50 text-green-600 px-2 py-0.5 rounded-md">+8%</span>
            </div>
            <p className="text-base text-gray-500 font-medium">Revenue</p>
            <h3 className="text-3xl font-black mt-1">₹1.2M</h3>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
            <h3 className="text-xl font-black text-gray-900 mb-6">Revenue Trend</h3>
            <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={REVENUE_DATA}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#0052CC" stopOpacity={0.1}/>
                                <stop offset="95%" stopColor="#0052CC" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 600}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 600}} tickFormatter={(val) => `₹${val}`} />
                        <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 8px 12px -3px rgb(0 0 0 / 0.1)'}} />
                        <Area type="monotone" dataKey="value" stroke="#0052CC" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </Card>
        <Card className="p-6">
            <h3 className="text-xl font-black text-gray-900 mb-6">Member Status</h3>
            <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={MEMBER_STATUS_DATA}
                            innerRadius={60}
                            outerRadius={90}
                            paddingAngle={6}
                            dataKey="value"
                        >
                            {MEMBER_STATUS_DATA.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{fontWeight: 700, fontSize: '12px'}} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </Card>
      </div>

      {/* Recent Members Table */}
      <Card className="overflow-hidden p-0">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-xl font-black text-gray-900">Recent Members</h3>
            <Button variant="outline" className="text-xs px-3 py-1.5" onClick={() => navigate('/admin/members')}>View All</Button>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left text-base">
                <thead className="bg-gray-50 text-gray-500 font-bold uppercase text-[10px] tracking-widest">
                    <tr>
                        <th className="px-6 py-4">Name</th>
                        <th className="px-6 py-4">Plan</th>
                        <th className="px-6 py-4">Joined</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {MOCK_MEMBERS.map((member) => (
                        <tr key={member.id} className="hover:bg-gray-50 transition-colors group">
                            <td className="px-6 py-4">
                                <div>
                                    <div className="font-bold text-gray-900 text-sm">{member.name}</div>
                                    <div className="text-xs text-gray-500 font-medium">{member.email}</div>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-gray-600 font-medium text-sm">{member.plan}</td>
                            <td className="px-6 py-4 text-gray-600 font-medium text-sm">{member.joinDate}</td>
                            <td className="px-6 py-4">
                                <Badge status={member.status} />
                            </td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-1 transition-opacity">
                                    <button 
                                        className="p-2 text-gray-400 hover:text-primary hover:bg-blue-50 rounded-lg transition-all" 
                                        title="Edit"
                                        onClick={() => navigate(`/admin/members/edit/${member.id}`)}
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 text-gray-400 hover:text-danger hover:bg-red-50 rounded-lg transition-all" title="Delete">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
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