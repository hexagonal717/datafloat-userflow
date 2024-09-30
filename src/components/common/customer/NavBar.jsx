import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import {
  Moon,
  LogOut,
  Sun,
  User,
  X,
} from 'lucide-react';
import { useDarkMode } from '@/context/theme/useDarkMode.js';
import { useDispatch} from 'react-redux';
import ProfileButton from '@/components/common/customer/ProfileButton.jsx';
import { logoutUser } from '@/redux/user/userSlice.js';

const NavBar = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {darkMode, toggleDarkMode} = useDarkMode();
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileModalOpen, setMobileModalOpen] = useState(false);

  // Ref to track modal
  const modalRef = useRef(null);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setMobileModalOpen(false);
        setProfileOpen(false);
      }
    };
    if (mobileModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };


  }, [mobileModalOpen]);





  const toggleMobileModal = () => {
    setMobileModalOpen(!mobileModalOpen);
    setProfileOpen(!profileOpen);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setMobileModalOpen(false);
        setProfileOpen(false);
      }
    };
    if (mobileModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileModalOpen]);

  return (
    <>
      <div
        className="fixed z-40 h-16 w-full select-none flex-col items-center bg-white p-3 px-6
          outline outline-1 outline-neutral-300 backdrop-blur-sm dark:bg-neutral-950
          dark:outline-neutral-800 sm:flex sm:h-16">
        <ul
          className="flex w-full list-none items-center justify-between sm:justify-between sm:gap-1
            md:gap-4">
          <li>
            <Link to={'/'} replace>
              <div className={'text text-lg font-light dark:text-white'}>USER MANAGEMENT</div>
            </Link>
          </li>


          <ul className={'flex gap-2'}>
            <li className={'flex items-center justify-center gap-4'}>
              <div className="relative hidden sm:block">
                <ProfileButton userData={user} handleLogout={handleLogout} />
              </div>
            </li>
            <div className="relative sm:hidden">
              <Button
                variant="outline"
                onClick={toggleMobileModal}
                className="rounded-lg">
                <User className="h-4 w-4" />
              </Button>
            </div>
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

      {mobileModalOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={toggleMobileModal}></div>
      )}

      {mobileModalOpen && (
        <div
          ref={modalRef}
          className="fixed bottom-0 left-0 right-0 z-50 transform rounded-t-2xl bg-neutral-100 px-6 pb-10
            pt-8 shadow-lg transition-transform duration-300 ease-in-out dark:bg-neutral-900">
          <Button
            variant={'ghost'}
            onClick={toggleMobileModal}
            className="absolute right-2 top-2 scale-90 rounded-full p-2 dark:text-white">
            <X className="h-6 w-6" />
          </Button>
          <div className="mt-8 flex flex-col space-y-4">
            <Button onClick={() => navigate('/login')} className="w-full">
              Log In
            </Button>
            <Button
              variant={'outline'}
              onClick={() => navigate('/signup')}
              className="w-full">
              Sign Up
            </Button>
          </div>
        </div>
      )}

      {mobileModalOpen ? (
        <div
          ref={modalRef}
          className="fixed bottom-0 left-0 right-0 z-50 transform rounded-t-2xl bg-neutral-100 px-2 pb-10
            pt-8 shadow-lg transition-transform duration-300 ease-in-out dark:bg-neutral-900">
          <Button
            variant="ghost"
            onClick={toggleMobileModal}
            className="absolute right-2 top-2 scale-90 rounded-full p-2 dark:text-white">
            <X className="h-6 w-6" />
          </Button>

          <div className="mb-10 pl-4 flex flex-col items-center justify-center gap-4">
            <User className="h-8 w-8" />
            <h2 className="text-xl font-bold">
              {`${user?.name}` || 'No User'}
            </h2>
          </div>

          <nav>
            <ul className="space-y-1">
              <li>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left text-red-500 hover:bg-neutral-200 hover:text-red-600
                    dark:text-red-400 dark:hover:bg-neutral-800 dark:hover:text-red-300"
                  onClick={handleLogout}>
                  <LogOut
                    className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      ) : null}
    </>
  );
};
export default NavBar;
