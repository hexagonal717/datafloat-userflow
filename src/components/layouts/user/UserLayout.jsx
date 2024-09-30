import { Outlet, useLocation } from 'react-router-dom';
import { block } from 'million/react';
import '@fontsource-variable/inter';
import { Button } from '@/components/ui/button.jsx';
import { useDarkMode } from '@/context/theme/useDarkMode.js';
import { Moon, Sun } from 'lucide-react';
import NavBar from '@/components/common/customer/NavBar.jsx';
import { useSelector } from 'react-redux';
const UserLayout = block(() => {
  const currentUser = useSelector((state) => state.usersSlice.currentUser);
  const location = useLocation();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const ignoreLocations = [
    '/login',
    '/register',
  ];
  const shouldIgnore = ignoreLocations.includes(location.pathname);



  return (
    <div
      className={`flex min-h-screen flex-col bg-neutral-100 font-inter text-neutral-950 dark:bg-neutral-900
        dark:text-white`}>
      <div className="w-full">
        {!shouldIgnore && <NavBar user={currentUser} />}
        <Button
          variant={'outline'}
          onClick={toggleDarkMode}
          className={'absolute right-2 top-2 rounded-lg p-2'}>
          {darkMode ? (
            <Moon className={'scale-75'} />
          ) : (
            <Sun className={'scale-75'} />
          )}
        </Button>

        <Outlet />
      </div>
    </div>
  );
});

export default UserLayout;
