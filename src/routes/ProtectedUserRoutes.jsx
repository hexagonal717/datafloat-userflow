import { Route } from 'react-router-dom';

import UsersListPage from '@/pages/UsersListPage.jsx';
import UserLayout from '@/components/layouts/user/UserLayout.jsx';

const ProtectedUserRoutes = () => {
  return (
    <Route element={<UserLayout />}>
      <Route path="/" element={<UsersListPage />} />
    </Route>
  );
};

export default ProtectedUserRoutes;
