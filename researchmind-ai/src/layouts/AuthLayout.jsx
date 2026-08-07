import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-[#09090B] text-[#FAFAFA] flex items-center justify-center p-4 selection:bg-white/20 selection:text-white">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
