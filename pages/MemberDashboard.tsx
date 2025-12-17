import React from 'react';
import { Card, Badge, Button } from '../components/UI';
import { MOCK_CHECKINS } from '../constants';
import { Calendar, Clock, Award, ChevronRight, QrCode } from 'lucide-react';

const MemberDashboard: React.FC = () => {
  const memberName = "Alice Johnson";
  const planName = "Gold Annual";
  const daysRemaining = 92;
  const expiryDate = "Jan 15, 2024";

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10">
            <h1 className="text-3xl font-bold mb-2">Hi, {memberName}!</h1>
            <p className="opacity-90">Keep pushing your limits. You're doing great!</p>
            <div className="mt-6 flex flex-wrap gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                    <span className="block text-xs opacity-75">Plan</span>
                    <span className="font-bold">{planName}</span>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                    <span className="block text-xs opacity-75">Member ID</span>
                    <span className="font-mono">MEM-001</span>
                </div>
            </div>
        </div>
        {/* Abstract Shapes */}
        <div className="absolute right-0 top-0 h-full w-1/3 bg-white/10 skew-x-12 transform translate-x-12"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Membership Status */}
          <Card className="lg:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900">Membership Status</h3>
                <Badge status="Active" />
              </div>
              
              <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="relative w-32 h-32 flex items-center justify-center">
                     {/* Simple Circular Progress Simulator */}
                     <svg className="w-full h-full transform -rotate-90">
                         <circle cx="64" cy="64" r="56" stroke="#e5e7eb" strokeWidth="12" fill="transparent" />
                         <circle cx="64" cy="64" r="56" stroke="#0052CC" strokeWidth="12" fill="transparent" strokeDasharray="351" strokeDashoffset="80" strokeLinecap="round" />
                     </svg>
                     <div className="absolute text-center">
                         <span className="block text-2xl font-bold text-gray-900">{daysRemaining}</span>
                         <span className="text-xs text-gray-500">Days Left</span>
                     </div>
                  </div>
                  
                  <div className="flex-1 space-y-4 w-full">
                      <div className="flex justify-between border-b border-gray-100 pb-2">
                          <span className="text-gray-500">Expires On</span>
                          <span className="font-medium text-gray-900">{expiryDate}</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-100 pb-2">
                          <span className="text-gray-500">Last Renewal</span>
                          <span className="font-medium text-gray-900">Jan 15, 2023</span>
                      </div>
                      <Button className="w-full mt-2">Renew Membership</Button>
                  </div>
              </div>
          </Card>

          {/* Quick Actions / QR */}
          <Card className="bg-gray-900 text-white flex flex-col items-center justify-center text-center">
             <div className="bg-white p-2 rounded-lg mb-4">
                 <QrCode className="w-32 h-32 text-gray-900" />
             </div>
             <p className="text-sm text-gray-400 mb-4">Scan to Check-In</p>
             <h3 className="text-lg font-bold">{memberName}</h3>
             <p className="text-xs text-gray-500">ID: MEM-001</p>
          </Card>
      </div>

      {/* Attendance History */}
      <Card>
          <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-900">Recent Attendance</h3>
              <button className="text-primary text-sm font-medium flex items-center">
                  View All <ChevronRight className="w-4 h-4" />
              </button>
          </div>
          <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                  <thead className="text-gray-500 font-medium border-b border-gray-100">
                      <tr>
                          <th className="py-3">Date</th>
                          <th className="py-3">Time</th>
                          <th className="py-3">Source</th>
                          <th className="py-3 text-right">Points</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                      {MOCK_CHECKINS.map((checkin) => (
                          <tr key={checkin.id}>
                              <td className="py-3 flex items-center gap-2">
                                  <Calendar className="w-4 h-4 text-gray-400" />
                                  {checkin.date}
                              </td>
                              <td className="py-3 text-gray-600">
                                  <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-gray-400" />
                                    {checkin.time}
                                  </div>
                              </td>
                              <td className="py-3">
                                  <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600">{checkin.source}</span>
                              </td>
                              <td className="py-3 text-right text-success font-medium">
                                  +10
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

export default MemberDashboard;
