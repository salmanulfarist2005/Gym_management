import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, IdCard, User, Calendar, CreditCard, ShieldCheck, Clock } from 'lucide-react';
import { Card, Badge, Button } from '../components/UI.tsx';
import { MOCK_MEMBERSHIPS, MOCK_PAYMENTS } from '../constants.ts';

const ViewMembership: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const sub = MOCK_MEMBERSHIPS.find(m => m.id === id);
  const payment = MOCK_PAYMENTS.find(p => p.id === sub?.sourcePaymentId);

  if (!sub) return <div className="p-8 text-center">Membership record not found</div>;

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('/admin/memberships')} className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Membership Details</h1>
          <p className="text-gray-500 text-sm">Subscription ID: {sub.id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card className="space-y-8">
            <div className="flex justify-between items-start border-b border-gray-100 pb-6">
                <div className="flex gap-4">
                    <div className="p-3 bg-blue-50 text-primary rounded-xl">
                        <IdCard className="w-8 h-8" />
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-gray-900">{sub.memberName}</h2>
                        <p className="text-sm font-mono text-gray-500">{sub.memberId}</p>
                    </div>
                </div>
                <Badge status={sub.status} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-6">
                    <div>
                        <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Calendar className="w-3 h-3" /> Validity Period
                        </h4>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                <span className="text-sm text-gray-500 font-medium">Start Date</span>
                                <span className="font-bold text-gray-900">{sub.startDate}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                                <span className="text-sm text-blue-600 font-bold">End Date</span>
                                <span className="font-black text-primary">{sub.endDate}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <CreditCard className="w-3 h-3" /> Source Transaction
                        </h4>
                        <div className="p-4 border-2 border-dashed border-gray-200 rounded-xl space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500 font-medium">Payment ID:</span>
                                <button 
                                    className="font-mono font-bold text-primary hover:underline"
                                    onClick={() => navigate(`/admin/payments/view/${payment?.id}`)}
                                >
                                    {sub.sourcePaymentId}
                                </button>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500 font-medium">Amount:</span>
                                <span className="font-black text-gray-900">₹{payment?.amount.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500 font-medium">Status:</span>
                                <span className="text-success font-bold uppercase text-[10px] tracking-wide">PAID</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button variant="outline" onClick={() => navigate(`/admin/memberships/extend/${id}`)}>Extend Period</Button>
        <Button onClick={() => navigate(`/admin/memberships/edit/${id}`)}>Update Status</Button>
      </div>
    </div>
  );
};

export default ViewMembership;