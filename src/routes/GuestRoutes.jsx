import { Route } from 'react-router-dom';
import GuestLayout from '@/components/layouts/guest/GuestLayout.jsx';
import LoginPage from '@/pages/LoginPage.jsx';
import RegisterPage from '@/pages/RegisterPage.jsx';


const GuestRoutes = () => {
  return (
    <>
      <Route element={<GuestLayout />}>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
    </>
  );
};

export default GuestRoutes;
