import React from 'react';

// --- Card Component ---
export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 ${className}`}>
    {children}
  </div>
);

// --- Button Component ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = "px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-primary text-white hover:bg-blue-700",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200",
    danger: "bg-danger text-white hover:bg-red-700",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
  };
  
  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

// --- Badge Component ---
export const Badge: React.FC<{ status: string }> = ({ status }) => {
  let colorClass = "bg-gray-100 text-gray-800";
  
  switch (status.toLowerCase()) {
    case 'active':
      colorClass = "bg-green-100 text-green-800";
      break;
    case 'expired':
    case 'inactive':
      colorClass = "bg-red-100 text-red-800";
      break;
    case 'frozen':
      colorClass = "bg-cyan-100 text-cyan-800";
      break;
  }

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${colorClass}`}>
      {status}
    </span>
  );
};
