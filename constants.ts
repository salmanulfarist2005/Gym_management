import { Gym, Member, CheckIn, StatsData, Plan, Membership, Payment } from './types';

export const MOCK_GYMS: Gym[] = [
  { id: 'GYM-001', name: 'Iron Paradise', location: 'New York, NY', status: 'Active', membersCount: 1450, revenue: 58000, ownerName: 'Dwayne J.' },
  { id: 'GYM-002', name: 'Gold\'s Legacy', location: 'Venice, CA', status: 'Active', membersCount: 3200, revenue: 125000, ownerName: 'Joe G.' },
  { id: 'GYM-003', name: 'Metro Fitness', location: 'Chicago, IL', status: 'Inactive', membersCount: 0, revenue: 0, ownerName: 'Mike T.' },
];

export const MOCK_PLANS: Plan[] = [
  { id: 'PLAN-001', name: 'Silver Monthly', price: 2999, duration: 30, active: true, description: 'Standard access to gym floor and locker rooms.' },
  { id: 'PLAN-002', name: 'Gold Annual', price: 24999, duration: 365, active: true, description: 'All access pass including group classes and sauna.' },
  { id: 'PLAN-003', name: 'Platinum VIP', price: 49999, duration: 365, active: true, description: 'VIP access with personal trainer sessions and dedicated locker.' },
];

export const MOCK_MEMBERS: Member[] = [
  { id: 'MEM-001', name: 'Alice Johnson', email: 'alice@example.com', phone: '+1 (555) 123-4567', plan: 'Gold Annual', status: 'Active', joinDate: '2023-01-15', expiryDate: '2024-01-15', lastCheckIn: '2 hrs ago' },
  { id: 'MEM-002', name: 'Bob Smith', email: 'bob@example.com', phone: '+1 (555) 987-6543', plan: 'Silver Monthly', status: 'Expired', joinDate: '2023-05-20', expiryDate: '2023-06-20', lastCheckIn: '5 days ago' },
  { id: 'MEM-003', name: 'Charlie Davis', email: 'charlie@example.com', phone: '+1 (555) 456-7890', plan: 'Platinum VIP', status: 'Active', joinDate: '2023-08-10', expiryDate: '2024-08-10', lastCheckIn: 'Yesterday' },
  { id: 'MEM-004', name: 'Diana Prince', email: 'diana@example.com', phone: '+1 (555) 234-5678', plan: 'Silver Monthly', status: 'Frozen', joinDate: '2023-03-01', expiryDate: '2023-04-01', lastCheckIn: '2 weeks ago' },
  { id: 'MEM-005', name: 'Evan Wright', email: 'evan@example.com', phone: '+1 (555) 876-5432', plan: 'Gold Annual', status: 'Active', joinDate: '2023-11-05', expiryDate: '2024-11-05', lastCheckIn: '10 mins ago' },
];

export const MOCK_MEMBERSHIPS: Membership[] = [
    { id: 'SUB-001', memberId: 'MEM-001', memberName: 'Alice Johnson', startDate: '2023-01-15', endDate: '2024-01-15', sourcePaymentId: 'PAY-001', status: 'Active' },
    { id: 'SUB-002', memberId: 'MEM-002', memberName: 'Bob Smith', startDate: '2023-05-20', endDate: '2023-06-20', sourcePaymentId: 'PAY-002', status: 'Expired' },
    { id: 'SUB-003', memberId: 'MEM-003', memberName: 'Charlie Davis', startDate: '2023-08-10', endDate: '2024-08-10', sourcePaymentId: 'PAY-003', status: 'Active' },
];

export const MOCK_PAYMENTS: Payment[] = [
  { id: 'PAY-001', memberId: 'MEM-001', memberName: 'Alice Johnson', amount: 24999, date: '2023-01-15', method: 'Card', status: 'Completed', type: 'Membership - Gold Annual', transactionId: 'TXN-12345' },
  { id: 'PAY-002', memberId: 'MEM-002', memberName: 'Bob Smith', amount: 2999, date: '2023-05-20', method: 'Cash', status: 'Completed', type: 'Membership - Silver Monthly' },
  { id: 'PAY-003', memberId: 'MEM-003', memberName: 'Charlie Davis', amount: 49999, date: '2023-08-10', method: 'UPI', status: 'Completed', type: 'Membership - Platinum VIP', transactionId: 'UPI-98765' },
];

export const MOCK_CHECKINS: CheckIn[] = [
  { id: 'CHK-1', date: '2023-10-25', time: '08:30 AM', source: 'Biometric' },
  { id: 'CHK-2', date: '2023-10-24', time: '06:15 PM', source: 'QR' },
  { id: 'CHK-3', date: '2023-10-23', time: '07:45 AM', source: 'Biometric' },
  { id: 'CHK-4', date: '2023-10-21', time: '09:00 AM', source: 'Manual' },
  { id: 'CHK-5', date: '2023-10-20', time: '05:30 PM', source: 'Biometric' },
];

export const REVENUE_DATA: StatsData[] = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4500 },
  { name: 'May', value: 6000 },
  { name: 'Jun', value: 5500 },
];

export const MEMBER_STATUS_DATA: StatsData[] = [
  { name: 'Active', value: 400 },
  { name: 'Expired', value: 50 },
  { name: 'Frozen', value: 25 },
];
