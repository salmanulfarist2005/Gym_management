import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Calendar, User, CreditCard, CheckCircle } from 'lucide-react';
import { Card, Button } from '../components/UI';
import { MOCK_PLANS, MOCK_MEMBERS, MOCK_PAYMENTS } from '../constants';

const AddMembership: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Form structured to match: id (auto), member_id, start_date, end_date, source_payment_id, status
  const [formData, setFormData] = useState({
    memberId: '',
    status: 'Active',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    sourcePaymentId: '',
  });

  // Helper: Plan selection for date auto-fill
  const [selectedPlanId, setSelectedPlanId] = useState('');

  // Update End Date when Plan changes
  useEffect(() => {
    const selectedPlan = MOCK_PLANS.find(p => p.id === selectedPlanId);
    if (selectedPlan && formData.startDate) {
      const start = new Date(formData.startDate);
      const end = new Date(start);
      end.setDate(start.getDate() + selectedPlan.duration);
      
      setFormData(prev => ({ ...prev, endDate: end.toISOString().split('T')[0] }));
    }
  }, [selectedPlanId, formData.startDate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Reset payment if member changes to prevent mismatch
    if (name === 'memberId') {
        setFormData(prev => ({ ...prev, memberId: value, sourcePaymentId: '' }));
    } else {
        setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const payload = {
        member_id: formData.memberId,
        start_date: formData.startDate,
        end_date: formData.endDate,
        source_payment_id: formData.sourcePaymentId,
        status: formData.status
    };

    setTimeout(() => {
      setLoading(false);
      console.log('Membership Period Created:', payload);
      navigate('/admin/memberships');
    }, 1000);
  };

  // Filter payments for the selected member
  const memberPayments = MOCK_PAYMENTS.filter(p => p.memberId === formData.memberId);

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-12">
      <div className="flex items-center gap-4">
        <button 
            onClick={() => navigate('/admin/memberships')}
            className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors"
        >
            <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
            <h1 className="text-2xl font-bold text-gray-900">Add Membership Period</h1>
            <p className="text-gray-500 text-sm">Create a new subscription record for a member</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-6 space-y-6">
            
            {/* 1. Member Selection */}
            <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                    <User className="w-4 h-4 text-primary" />
                    Member
                </label>
                <select 
                    name="memberId"
                    value={formData.memberId}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                >
                    <option value="">-- Select Member --</option>
                    {MOCK_MEMBERS.map(m => (
                        <option key={m.id} value={m.id}>{m.name} ({m.id})</option>
                    ))}
                </select>
            </div>

            {/* 2. Membership Status */}
            <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    Membership Status
                </label>
                <select 
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                >
                    <option value="Active">Active</option>
                    <option value="Expired">Expired</option>
                    <option value="Future">Future</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
            </div>

            <hr className="border-gray-100" />

            {/* 3 & 4. Dates Section */}
            <div>
                <div className="flex justify-between items-center mb-4">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <Calendar className="w-4 h-4 text-primary" />
                        Duration
                    </label>
                    
                    {/* Helper to auto-fill dates */}
                    <select 
                        value={selectedPlanId}
                        onChange={(e) => setSelectedPlanId(e.target.value)}
                        className="text-xs border-gray-200 rounded-lg bg-gray-50 px-2 py-1 text-gray-600 focus:ring-primary focus:border-primary"
                    >
                        <option value="">Quick Fill: Select Plan...</option>
                        {MOCK_PLANS.map(plan => (
                            <option key={plan.id} value={plan.id}>{plan.name} ({plan.duration} days)</option>
                        ))}
                    </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Start Date</label>
                        <input 
                            type="date" 
                            name="startDate"
                            required
                            value={formData.startDate}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">End Date</label>
                        <input 
                            type="date" 
                            name="endDate"
                            required
                            value={formData.endDate}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                </div>
            </div>

            <hr className="border-gray-100" />

            {/* 5. Source Payment Selection */}
            <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                    <CreditCard className="w-4 h-4 text-primary" />
                    Source Payment
                </label>
                <select 
                    name="sourcePaymentId"
                    value={formData.sourcePaymentId}
                    onChange={handleChange}
                    disabled={!formData.memberId}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white disabled:bg-gray-100 disabled:text-gray-400"
                >
                    <option value="">-- Select Payment Transaction --</option>
                    {memberPayments.length > 0 ? (
                        memberPayments.map(p => (
                            <option key={p.id} value={p.id}>
                                {p.id} - {p.date} - ₹{p.amount.toLocaleString()} ({p.method})
                            </option>
                        ))
                    ) : (
                        <option disabled>No payments found for this member</option>
                    )}
                </select>
                {!formData.memberId && (
                    <p className="text-xs text-orange-500 mt-1">Please select a member first to see available payments.</p>
                )}
                {formData.memberId && memberPayments.length === 0 && (
                    <p className="text-xs text-red-500 mt-1">
                        No payments found. <a href="#/admin/payments/add" className="underline hover:text-red-700">Record a payment</a> first.
                    </p>
                )}
            </div>
        </Card>

        <div className="flex justify-end gap-4">
            <Button 
                type="button" 
                variant="secondary" 
                onClick={() => navigate('/admin/memberships')}
            >
                Cancel
            </Button>
            <Button 
                type="submit" 
                disabled={loading}
                className={loading ? 'opacity-70 cursor-not-allowed' : ''}
            >
                <Save className="w-4 h-4" />
                {loading ? 'Creating...' : 'Create Membership'}
            </Button>
        </div>
      </form>
    </div>
  );
};

export default AddMembership;