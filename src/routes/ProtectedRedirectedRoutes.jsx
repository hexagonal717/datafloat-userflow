import { Navigate, Route } from 'react-router-dom';

const ProtectedRedirectedRoutes = () => {
  return (
    <>
      <Route path="/users-list" element={<Navigate to={'/'} />} />
    </>
  );
};

export default ProtectedRedirectedRoutes;
