import { Routes, Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router';
import LandingPage from './pages/LandingPage';
import DashboardLayout from './components/dashboard/DashboardLayout';
import ProtectedRoute from './components/dashboard/ProtectedRoute';
import PackageTable from './components/dashboard/PackageTable';
import UserProfile from './components/dashboard/UserProfile';
import PageNotFound from './components/dashboard/PageNotFound';
import { Suspense } from 'react';
import AppPreloader from './components/dashboard/AppPreloader';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<LandingPage />} />
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

      <Route path="*" element={<PageNotFound />} />
    </Route>
  )
)

function App() {
  return (
    <Suspense fallback={<AppPreloader/>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
