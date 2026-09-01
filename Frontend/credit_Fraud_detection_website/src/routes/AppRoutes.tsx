import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Predict from '../pages/Predict';
import Predictions from '../pages/Predictions';
import TransactionDetails from '../pages/TransactionDetails';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/predict" element={<Predict />} />
      <Route path="/predictions" element={<Predictions />} />
      <Route path="/predictions/:id" element={<TransactionDetails />} />
      {/* Catch-all redirect to Dashboard */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
export default AppRoutes;
