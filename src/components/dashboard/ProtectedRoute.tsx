import { type ReactNode } from 'react';
import { Navigate } from 'react-router';
import { AUTHORIZATION } from '../../core/constants';

// placeholder authentication check
function isAuthenticated() {
  // replace with real logic
  return (Boolean(!localStorage.getItem(AUTHORIZATION)));
}

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  if (!isAuthenticated()) {
    return <Navigate to="/home" replace />;
  }
  return <>{children}</>;
}
