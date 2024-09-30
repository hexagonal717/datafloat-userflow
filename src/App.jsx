import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { DarkModeProvider } from './context/theme/DarkModeContext.jsx';
import ProtectedRedirectedRoutes from '@/routes/ProtectedRedirectedRoutes.jsx';
import { useSelector } from 'react-redux';
import ProtectedRoutes from '@/routes/ProtectedRoutes.jsx';
import GuestRoutes from '@/routes/GuestRoutes.jsx';
import ProtectedUserRoutes from '@/routes/ProtectedUserRoutes.jsx';
import { useEffect } from 'react';

function App() {
  const { isAuthenticated }= useSelector((state) => state.usersSlice);

  useEffect(() => {

  }, [isAuthenticated]);

  const pageRouter = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        {!isAuthenticated && GuestRoutes()}

        {/* Protected Routes */}
        <Route element={<ProtectedRoutes />}>

          {/* Protected Redirected Routes */}
          {ProtectedRedirectedRoutes()}

          {/* Protected User Routes */}
          {isAuthenticated && ProtectedUserRoutes()}
        </Route>
      </Route>,
    ),
  );

  return (
    <DarkModeProvider>
      <RouterProvider router={pageRouter} />
    </DarkModeProvider>
  );
}

export default App;
