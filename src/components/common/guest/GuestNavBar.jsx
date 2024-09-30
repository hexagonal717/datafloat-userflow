import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { Moon, Sun, User, X } from 'lucide-react';
import { useDarkMode } from '@/context/theme/useDarkMode.js';
import { Button } from '@/components/ui/button.jsx';

const GuestNavBar = () => {
  // const cartItems = useSelector((state) => state.guestCartSlice.cart?.items);
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileModalOpen, setMobileModalOpen] = useState(false);

  // Ref to track modal
  const modalRef = useRef(null);

  const toggleMobileModal = () => {
    setMobileModalOpen(!mobileModalOpen);
    setProfileOpen(!profileOpen);
  };

  // Close modal when clicking outside
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
        className="fixed z-40 h-28 w-full select-none flex-col items-center bg-neutral-50 p-3 px-6
          outline outline-1 outline-neutral-300 backdrop-blur-sm dark:bg-neutral-950
          dark:outline-neutral-800 sm:flex sm:h-16">
        <ul
          className="flex w-full list-none items-center justify-between sm:justify-center sm:gap-1
            md:gap-4">
          <ul className={'flex gap-2'}>
            <div className="relative sm:hidden">
              <Button
                variant={'ghost'}
                onClick={toggleMobileModal}
                className={'rounded-lg p-2 dark:text-white'}>
                {profileOpen ? (
                  <User className={'scale-90'} />
                ) : (
                  <User className={'scale-90'} />
                )}
              </Button>
            </div>
            <li className="relative">
              <Button
                variant={'outline'}
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
      </div>
    </>
  );
};
export default GuestNavBar;
