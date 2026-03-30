import { Routes, Route, Navigate } from 'react-router';
import { Analytics } from '@vercel/analytics/react';
import LandingPage from './pages/LandingPage';
import DashboardLayout from './components/dashboard/DashboardLayout';
import ProtectedRoute from './components/dashboard/ProtectedRoute';
import PackageTable from './components/dashboard/PackageTable';
import UserProfile from './components/dashboard/UserProfile';

function App() {
  return (
    <>
      <Routes>
        <Route path="/home" element={<LandingPage />} />

        {/* protected user area */}
        <Route
          path="/user/*"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Routes>
                  <Route index element={<PackageTable />} />
                  <Route path='/:id' element={<UserProfile />} />
                  {/* additional user routes can go here */}
                </Routes>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* fallback */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
      <Analytics />
    </>
  );
}

export default App;
