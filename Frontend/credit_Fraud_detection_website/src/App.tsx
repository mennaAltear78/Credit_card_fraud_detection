import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import AppRoutes from './routes/AppRoutes';

export const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="flex flex-col h-screen overflow-hidden bg-gray-950 text-gray-100 font-sans antialiased">
        {/* Top Navbar */}
        <Navbar onMenuToggle={() => setSidebarOpen(prev => !prev)} />
        
        {/* Main Layout Area */}
        <div className="flex flex-1 overflow-hidden">
          {/* Collapsible/Navigation Sidebar */}
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          
          {/* Scrollable Main Content Container */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <AppRoutes />
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
