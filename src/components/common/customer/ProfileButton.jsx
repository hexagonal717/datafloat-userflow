import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { User, ChevronDown, LogOut, ScrollText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const ProfileButton = ({ userData, handleLogout }) => {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} modal={false} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={`w-36 justify-between !border-0 !bg-blue-500/10 text-xs font-bold !text-blue-500
            !outline !outline-1 !outline-blue-500/40 hover:!bg-blue-500/15`}>
          <span className="text-primary font-medium">
            {userData?.name || 'User'}
          </span>
          <ChevronDown className="text-primary h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-36">
        <DropdownMenuItem
          onClick={handleLogout}
          className={`!text-red-600 hover:!bg-red-600/15 hover:!text-red-600 dark:!text-red-400
            dark:hover:!bg-red-300/15 dark:hover:!text-red-400`}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileButton;
