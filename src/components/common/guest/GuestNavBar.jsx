import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button.jsx';
import { Moon, Sun } from 'lucide-react';
import { useDarkMode } from '@/context/theme/useDarkMode.js';

const GuestNavBar = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <>
      <div
        className="fixed z-40 h-16 w-full select-none flex-col items-center bg-white p-3 px-6 outline
          outline-1 outline-neutral-300 backdrop-blur-sm dark:bg-neutral-950
          dark:outline-neutral-800 sm:flex sm:h-16">
        <ul
          className="flex w-full list-none items-center justify-between sm:justify-between sm:gap-1
            md:gap-4">
          <li>
            <Link to={'/'} replace>
              <div className={'text text-lg font-light dark:text-white'}>
                USER MANAGEMENT
              </div>
            </Link>
          </li>

          <ul className={'flex gap-2'}>
            <li className="relative">
              <Button
                variant={'link'}
                onClick={toggleDarkMode}
                className={'rounded-lg p-2'}>
                {darkMode ? (
                  <Moon className={'scale-75'} />
                ) : (
                  <Sun className={'scale-75'} />
                )}
              </Button>
            </li>
          </ul>
        </ul>
      </div>
    </>
  );
};
export default GuestNavBar;
