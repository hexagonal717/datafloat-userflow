import { Outlet } from 'react-router-dom';
import { block } from 'million/react';
import '@fontsource-variable/inter';
import { Button } from '@/components/ui/button.jsx';
import { useDarkMode } from '@/context/theme/useDarkMode.js';
import { Moon, Sun } from 'lucide-react';
const UserLayout = block(() => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <div
      className={`flex h-screen flex-col bg-neutral-100 font-inter text-neutral-950 dark:bg-neutral-900
        dark:text-white`}>
      <div className="w-full overflow-y-hidden">
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
