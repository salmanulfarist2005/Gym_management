import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Printer, FileDown, CheckCircle, CreditCard, User, Building, ExternalLink } from 'lucide-react';
import { Card, Badge, Button } from '../components/UI.tsx';
import { MOCK_PAYMENTS } from '../constants.ts';

const ViewPayment: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const payment = MOCK_PAYMENTS.find(p => p.id === id);

  if (!payment) return <div className="p-8 text-center">Payment record not found</div>;

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
            <button onClick={() => navigate('/admin/payments')} className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors">
                <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Payment Receipt</h1>
                <p className="text-gray-500 text-sm">Reference: {payment.id}</p>
            </div>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" className="text-xs px-3"><Printer className="w-4 h-4" /> Print</Button>
            <Button variant="outline" className="text-xs px-3"><FileDown className="w-4 h-4" /> PDF</Button>
        </div>
      </div>

      <Card className="p-0 overflow-hidden shadow-2xl border-none">
          {/* Receipt Header */}
          <div className="bg-gray-900 text-white p-8 flex justify-between items-start">
              <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary rounded-lg">
                    <Building className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-black text-xl tracking-tight">GymPro Nexus</h3>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Official Receipt</p>
                  </div>
              </div>
              <div className="text-right">
                  <Badge status={payment.status} />
                  <p className="text-[10px] font-bold text-gray-500 mt-2 uppercase tracking-widest">Transaction ID</p>
                  <p className="text-xs font-mono font-bold text-gray-300">{payment.transactionId || 'CASH-REC-001'}</p>
              </div>
          </div>

          {/* Receipt Body */}
          <div className="p-8 space-y-8 bg-white">
              <div className="grid grid-cols-2 gap-8">
                  <div>
                      <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Billed To</h4>
                      <div className="space-y-1">
                          <p className="font-black text-gray-900">{payment.memberName}</p>
                          <p className="text-sm text-gray-500 font-medium">Member ID: {payment.memberId}</p>
                      </div>
                  </div>
                  <div className="text-right">
                      <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Payment Date</h4>
                      <p className="font-bold text-gray-900">{payment.date}</p>
                      <p className="text-sm text-gray-500 font-medium">{payment.method} Transaction</p>
                  </div>
              </div>

              <div className="border-t border-b border-gray-100 py-6">
                  <table className="w-full text-left">
                      <thead>
                          <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                              <th className="pb-4">Description</th>
                              <th className="pb-4 text-right">Amount</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr className="text-gray-900 font-bold">
                              <td className="py-2">{payment.type}</td>
                              <td className="py-2 text-right">₹{payment.amount.toLocaleString()}</td>
                          </tr>
                      </tbody>
                  </table>
              </div>

              <div className="flex flex-col items-end gap-2">
                  <div className="flex justify-between w-48 border-t-2 border-gray-900 pt-3">
                      <span className="font-black text-gray-400 text-xs uppercase tracking-widest">Total</span>
                      <span className="font-black text-gray-900 text-xl">₹{payment.amount.toLocaleString()}</span>
                  </div>
                  <p className="text-[10px] text-gray-400 italic">Inclusive of all applicable taxes</p>
              </div>

              <div className="pt-10 flex flex-col items-center justify-center text-center">
                  <div className="p-3 bg-green-50 text-success rounded-full mb-4">
                      <CheckCircle className="w-8 h-8" />
                  </div>
                  <h4 className="font-black text-gray-900">Payment Successful</h4>
                  <p className="text-sm text-gray-500 mt-1">Thank you for being part of the GymPro community.</p>
              </div>
          </div>

          <div className="bg-gray-50 p-6 border-t border-gray-100 text-center">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Nexus Verification • Protected by 256-bit Encryption</p>
          </div>
      </Card>

      <div className="flex justify-end gap-3 pt-4">
        <Button variant="outline" onClick={() => navigate(`/admin/payments/edit/${id}`)}>Edit Record</Button>
      </div>
    </div>
  );
};

export default ViewPayment;