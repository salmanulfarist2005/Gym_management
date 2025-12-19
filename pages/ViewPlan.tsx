import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, FileText, CheckCircle, XCircle, Clock, CreditCard, Tag } from 'lucide-react';
import { Card, Button } from '../components/UI.tsx';
import { MOCK_PLANS } from '../constants.ts';

const ViewPlan: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const plan = MOCK_PLANS.find(p => p.id === id);

  if (!plan) return <div className="p-8 text-center">Plan not found</div>;

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('/admin/plans')} className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Plan Details</h1>
          <p className="text-gray-500 text-sm">Membership Configuration</p>
        </div>
      </div>

      <Card className="space-y-8">
        <div className="flex justify-between items-start">
            <div className="flex gap-4">
                <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                    <Tag className="w-8 h-8" />
                </div>
                <div>
                    <h2 className="text-2xl font-black text-gray-900">{plan.name}</h2>
                    <p className="text-sm font-mono text-gray-500">ID: {plan.id}</p>
                </div>
            </div>
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest ${plan.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                {plan.active ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                {plan.active ? 'Active' : 'Disabled'}
            </span>
        </div>

        <div className="grid grid-cols-2 gap-6">
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 text-center">
                <Clock className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Duration</p>
                <p className="text-2xl font-black text-gray-900">{plan.duration} Days</p>
            </div>
            <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 text-center">
                <CreditCard className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-1">Price</p>
                <p className="text-2xl font-black text-primary">₹{plan.price.toLocaleString()}</p>
            </div>
        </div>

        <div>
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Description & Inclusions</h4>
            <div className="p-5 border border-gray-100 rounded-xl text-gray-700 leading-relaxed font-medium">
                {plan.description || 'No detailed description provided for this plan.'}
            </div>
        </div>
      </Card>

      <div className="flex justify-end gap-3 pt-4">
        <Button variant="outline" onClick={() => navigate(`/admin/plans/edit/${id}`)}>Modify Plan</Button>
      </div>
    </div>
  );
};

export default ViewPlan;