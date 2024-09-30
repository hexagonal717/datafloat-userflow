import { Outlet, useLocation } from 'react-router-dom';
import { block } from 'million/react';
import '@fontsource-variable/inter';
import { Button } from '@/components/ui/button.jsx';
import { useDarkMode } from '@/context/theme/useDarkMode.js';
import { Moon, Sun } from 'lucide-react';
import { useSelector } from 'react-redux';
import GuestNavBar from '@/components/common/guest/GuestNavBar.jsx';
const GuestLayout = block(() => {
  const currentUser = useSelector((state) => state.usersSlice.currentUser);
  const location = useLocation();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const ignoreLocations = [''];
  const shouldIgnore = ignoreLocations.includes(location.pathname);

  return (
    <div
      className={`${darkMode && 'dark'} flex min-h-screen flex-col font-inter bg-white dark:bg-neutral-950/70`}>
      <div className="w-full">
        {!shouldIgnore && <GuestNavBar user={currentUser} />}
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

export default GuestLayout;
