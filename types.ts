export type UserRole = 'superuser' | 'admin' | 'member';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  gymId?: string;
  avatar?: string;
}

export interface Gym {
  id: string;
  name: string;
  location: string;
  status: 'Active' | 'Inactive';
  membersCount: number;
  revenue: number;
  ownerName: string;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  phone?: string;
  plan: string;
  status: 'Active' | 'Expired' | 'Frozen' | 'Inactive';
  joinDate: string;
  expiryDate: string;
  lastCheckIn: string;
}

export interface Membership {
  id: string;
  memberId: string;
  memberName: string; // Helper for UI display
  startDate: string;
  endDate: string;
  sourcePaymentId: string;
  status: 'Active' | 'Expired' | 'Future' | 'Cancelled';
}

export interface Payment {
  id: string;
  memberId: string;
  memberName: string;
  amount: number;
  date: string;
  method: 'Cash' | 'Card' | 'UPI' | 'Bank Transfer';
  status: 'Completed' | 'Pending' | 'Failed';
  type: string;
  transactionId?: string;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  duration: number; // days
  active: boolean;
  description?: string;
}

export interface CheckIn {
  id: string;
  date: string;
  time: string;
  source: 'Biometric' | 'QR' | 'Manual';
}

export interface StatsData {
  name: string;
  value: number;
  [key: string]: any;
}
