import React from 'react';

const DashboardWrapper = ({ children }) => {
  return (
    <main className="flex-1 overflow-y-auto p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </main>
  );
};

export default DashboardWrapper;