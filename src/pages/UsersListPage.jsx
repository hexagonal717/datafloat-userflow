import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  blockUser,
  unblockUser,
  removeUser,
  updateUser,
} from '../redux/user/userSlice.js';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  ChevronDown,
  User,
  Mail,
  Shield,
  ShieldOff,
  Edit,
  RotateCcw,
  Calendar,
  Trash,
  ShieldCheck,
  ShieldBan,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const UsersList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.usersSlice.users);
  const [editingUser, setEditingUser] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPrevLogsCollapsibleOpen, setIsPrevLogsCollapsibleOpen] = useState(false);
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);

  const handleBlock = (email) => {
    dispatch(blockUser(email));
  };

  const handleUnblock = (email) => {
    dispatch(unblockUser(email));
  };

  const handleRemove = (email) => {
    dispatch(removeUser(email));
  };

  const handleEditUser = (user) => {
    setEditingUser({ ...user });
    setIsDialogOpen(true);
  };

  const handleUpdateUser = () => {
    dispatch(updateUser(editingUser));
    setEditingUser(null);
    setIsDialogOpen(false);
  };

  const handleCloseDialog = () => {
    setEditingUser(null);
    setIsDialogOpen(false);
  };

  return (
    <div className="flex h-full justify-center pt-16 sm:p-4 sm:pt-20">
      <Card
        className="min-h-screen w-full max-w-3xl rounded-none border-0 bg-[#f5f5f5] sm:rounded-md
          sm:border">
        <CardHeader className="flex flex-row items-center justify-between dark:border-neutral-800">
          <CardTitle className="flex w-full items-center text-sm font-bold uppercase sm:text-lg">
            user List
          </CardTitle>
        </CardHeader>
        <CardContent className={'px-4'}>
          <ul className="space-y-6">
            {users.map((user, index) => (
              <li key={index}>
                <Card className="overflow-hidden rounded-2xl shadow-none transition-all">
                  <CardContent className="p-5">
                    <div className="mb-4 flex items-center space-x-3">
                      <Badge
                        variant={user?.isBlocked ? 'destructive' : 'secondary'}
                        className={`flex w-max items-center justify-center space-x-1 px-2.5 py-1.5 pr-3 ${
                        user?.isBlocked
                            ? `bg-yellow-500/50 text-yellow-800 dark:border-yellow-500/10 dark:bg-yellow-500/15
                              dark:text-yellow-300`
                            : `bg-springgreen-100 text-springgreen-900 hover:bg-springgreen-100
                              dark:border-springgreen-500/10 dark:bg-springgreen-500/15 dark:text-springgreen-400
                              dark:hover:bg-springgreen-500/15`
                        }`}>
                        {user?.isBlocked ? (
                          <ShieldOff className="h-3.5 w-4" />
                        ) : (
                          <Shield className="h-3.5 w-4" />
                        )}
                        <span>{user?.isBlocked ? 'Blocked' : 'Active'}</span>
                      </Badge>
                    </div>
                    <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="flex items-center space-x-3">
                        <User className="text-primary h-4 w-4" />
                        <span className="text-sm font-medium">{user?.name}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Mail className="text-primary h-4 w-4" />
                        <span className={'text-sm'}>{user?.email}</span>
                      </div>
                    </div>

                    <Collapsible
                      key={index}
                      onOpenChange={setIsPrevLogsCollapsibleOpen}
                      className={`${isPrevLogsCollapsibleOpen ? 'dark:bg-neutral-900/50 dark:hover:bg-neutral-900/50' : 'dark:bg-neutral-950 dark:hover:bg-neutral-900'}
                      rounded-lg border transition-colors hover:bg-neutral-100 dark:border-neutral-800`}>
                      <CollapsibleTrigger className="flex w-full items-center justify-between p-4 text-xs">
                        <span className="flex items-center">
                          <RotateCcw className="mr-2 h-4 w-4" />
                          Previous entries
                        </span>

                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-200
                          ${isPrevLogsCollapsibleOpen ? 'rotate-180' : ''}`}
                        />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="space-y-2 rounded-lg bg-neutral-100 p-4 dark:bg-neutral-950/60">
                        <ScrollArea className={'h-36'}>
                          {user?.loginHistory && user.loginHistory.length > 0 ? (
                            <ul className="space-y-2">
                              {user.loginHistory
                                .slice() // Create a shallow copy of the array
                                .reverse()
                                .map((login, index) => (
                                  <li
                                    key={index}
                                    className="bg-muted flex items-center rounded-md p-2 text-xs">
                                    <Calendar className="text-muted-foreground mr-2 h-3 w-3" />
                                    {new Date(login).toLocaleString()}
                                  </li>
                                ))}
                            </ul>
                          ) : (
                            <p className="text-muted-foreground text-xs">
                              No previous logins
                            </p>
                          )}
                        </ScrollArea>
                      </CollapsibleContent>
                    </Collapsible>
                    <div className="mt-4 flex justify-end space-x-2">
                      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-20 text-xs"
                            onClick={() => handleEditUser(user)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Button>
                        </DialogTrigger>
                        <DialogContent className={'rounded-lg w-[calc(100vw-2rem)]'}>
                          <DialogHeader>
                            <DialogTitle>Edit User</DialogTitle>
                          </DialogHeader>
                          {editingUser && (
                            <div className="space-y-4">
                              <div className="flex flex-col space-y-2.5">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                  id="name"
                                  value={editingUser.name}
                                  onChange={(e) =>
                                    setEditingUser({
                                      ...editingUser,
                                      name: e.target.value,
                                    })
                                  }
                                />
                              </div>
                              <div className="flex flex-col space-y-2.5">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                  id="email"
                                  value={editingUser.email}
                                  onChange={(e) =>
                                    setEditingUser({
                                      ...editingUser,
                                      email: e.target.value,
                                    })
                                  }
                                />
                              </div>
                              <div className="flex justify-end space-x-2">
                                <Button
                                  onClick={handleCloseDialog}
                                  variant="outline">
                                  Cancel
                                </Button>
                                <Button onClick={handleUpdateUser}>
                                  Update User
                                </Button>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      <Button
                        size="sm"
                        onClick={() =>
                        user?.isBlocked
                            ? handleUnblock(user?.email)
                            : handleBlock(user?.email)
                        }
                        variant={user?.isBlocked ? 'secondary' : 'warning'}
                        className={`w-24 text-xs font-normal ${
                          user?.isBlocked
                            ? `bg-springgreen-100 text-green-900 hover:bg-springgreen-200 dark:bg-springgreen-500/10
                              dark:text-springgreen-400 dark:hover:bg-springgreen-500/15`
                            : `bg-yellow-500/50 text-yellow-950 hover:bg-yellow-500/60 dark:bg-yellow-500/10
                              dark:text-yellow-400 dark:hover:bg-yellow-500/15`
                        }`}>
                        {user?.isBlocked ? (
                          <ShieldCheck className="mr-1 h-3.5 w-3.5" />
                        ) : (
                          <ShieldBan className="mr-1 h-3.5 w-3.5" />
                        )}

                        {user?.isBlocked ? 'Unblock' : 'Block'}
                      </Button>

                      <Dialog
                        open={isRemoveDialogOpen}
                        onOpenChange={setIsRemoveDialogOpen}>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="w-24 text-xs">
                            <Trash className="mr-2 h-4 w-4" />
                            Remove
                          </Button>
                        </DialogTrigger>
                        <DialogContent className={'rounded-lg w-[calc(100vw-2rem)]'}>
                          <DialogHeader>
                            <DialogTitle className={'mb-10'}>
                              Remove this user?
                            </DialogTitle>
                          </DialogHeader>
                          <Button onClick={()=>handleRemove(user?.email)} variant={'destructive'}>Remove</Button>
                          <Button onClick={()=>setIsRemoveDialogOpen(false)} variant={'secondary'}>Cancel</Button>

                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersList;
