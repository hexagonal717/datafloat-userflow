import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  blockUser,
  unblockUser,
  removeUser,
  logoutUser,
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
  const [isPrevLogsCollapsibleOpen, setIsPrevLogsCollapsibleOpen] = useState(false); // Track collapsible state

  const handlePrevLogsCollapsibleChange = (open) => {
    setIsPrevLogsCollapsibleOpen(open);
    if (open) {
      console.log('Collapsible is now open');
    } else {
      console.log('Collapsible is now closed');
    }
  };

  const handleBlock = (id) => {
    dispatch(blockUser(id));
  };

  const handleUnblock = (id) => {
    dispatch(unblockUser(id));
  };

  const handleRemove = (id) => {
    dispatch(removeUser(id));
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
    <div className="flex h-full justify-center pt-16 dark:bg-neutral-950 sm:p-4 sm:pt-20">
      <Card className="min-h-screen w-full max-w-3xl rounded-none sm:rounded-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 dark:border-neutral-800">
          <CardTitle className="flex w-full items-center justify-center text-2xl font-bold">
            Users List
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <ul className="space-y-6">
            {users.map((user,index) => (
              <li key={index}>
                <Card className="overflow-hidden transition-all hover:shadow-md">
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center space-x-3">
                      {user?.isBlocked ? (
                        <Badge
                          variant="destructive"
                          className="flex items-center space-x-1 bg-yellow-500/50 px-2.5 py-1.5 text-yellow-800
                            hover:bg-yellow-500/50 dark:border-yellow-500/10 dark:bg-yellow-500/15
                            dark:text-yellow-300 dark:hover:bg-yellow-500/15">
                          <ShieldOff className="h-4 w-4" />
                          <span>Blocked</span>
                        </Badge>
                      ) : (
                        <Badge
                          variant="secondary"
                          className="flex items-center space-x-1 bg-springgreen-100 px-2.5 py-1.5 text-springgreen-900
                            hover:bg-springgreen-100 dark:border-springgreen-500/10 dark:bg-springgreen-500/15
                            dark:text-springgreen-400 dark:hover:bg-springgreen-500/15">
                          <Shield className="h-4 w-4" />
                          <span>Active</span>
                        </Badge>
                      )}
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
                      rounded-md border transition-colors hover:bg-neutral-100 dark:border-neutral-800`}>
                      <CollapsibleTrigger className="flex w-full items-center justify-between p-4 text-xs">
                        <span className="flex items-center">
                          <RotateCcw className="mr-2 h-4 w-4" />
                          Previous Logins
                        </span>
                        <ChevronDown className="h-4 w-4" />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="space-y-2 bg-neutral-100 p-4 dark:bg-neutral-950/60">
                        <ScrollArea className={'h-24'}>
                          {user?.loginHistory && user.loginHistory.length > 0 ? (
                            <ul className="space-y-2">
                              {user.loginHistory.slice() // Create a shallow copy of the array
                                .reverse().map((login, index) => (
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
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit User</DialogTitle>
                          </DialogHeader>
                          {editingUser && (
                            <div className="space-y-4">
                              <div>
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
                              <div>
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
                      {user?.isBlocked ? (
                        <Button
                          size="sm"
                          onClick={() => handleUnblock(user?.id)}
                          variant="secondary"
                          className="w-20 bg-springgreen-100 text-xs text-green-900 hover:bg-springgreen-200
                            dark:bg-springgreen-500/20 dark:text-springgreen-400 dark:hover:bg-springgreen-500/15">
                          Unblock
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => handleBlock(user?.id)}
                          variant="warning"
                          className="w-20 bg-yellow-500/50 text-xs font-bold text-yellow-700 hover:bg-yellow-500/60
                            dark:bg-yellow-500/10 dark:text-yellow-400 dark:hover:bg-yellow-500/15">
                          Block
                        </Button>
                      )}
                      <Button
                        size="sm"
                        onClick={() => handleRemove(user?.id)}
                        variant="destructive"
                        className="w-20 text-xs">
                        Remove
                      </Button>
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
