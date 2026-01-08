// import React, { useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import Topbar from './Topbar';
// import { useAuth } from '../contexts/AuthContext';
// import Sidebar from './sidebar';

// const DashboardWrapper = ({ children }) => {
//   const [isSidebarOpen, setSidebarOpen] = useState(false);
//   const { user, logout } = useAuth();
//   const location = useLocation();

//   return (
//     <div className="flex h-screen bg-gray-50 overflow-hidden">
//       {/* Navigation Sidebar */}
//       <Sidebar
//         isOpen={isSidebarOpen} 
//         onClose={() => setSidebarOpen(false)} 
//         user={user}
//         currentPath={location.pathname}
//       />

//       {/* Content Area */}
//       <div className="flex-1 flex flex-col min-w-0 relative overflow-hidden">
//         <Topbar 
//           onMenuClick={() => setSidebarOpen(true)} 
//           user={user} 
//           onLogout={logout} 
//         />
        
//         <main className="flex-1 overflow-y-auto p-4 lg:p-8">
//           <div className="max-w-7xl mx-auto">
//             {children}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DashboardWrapper;

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