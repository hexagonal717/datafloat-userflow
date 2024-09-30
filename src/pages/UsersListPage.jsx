import { useState } from 'react';
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
import { ChevronDown, Clock, User, Mail, Shield, ShieldOff, Edit } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const UsersList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.usersSlice.users);
  const [editingUser, setEditingUser] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleBlock = (id) => {
    dispatch(blockUser(id));
  };

  const handleUnblock = (id) => {
    dispatch(unblockUser(id));
  };

  const handleRemove = (id) => {
    dispatch(removeUser(id));
  };

  const handleLogout = () => {
    dispatch(logoutUser());
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
    <div className="bg-background flex min-h-screen justify-center p-4 pt-14">
      <Card className="w-full max-w-3xl shadow-lg">
        <CardHeader
          className="flex flex-row items-center justify-between space-y-0 border-b pb-6
            dark:border-neutral-800">
          <CardTitle className="text-3xl font-bold">Users List</CardTitle>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="hover:text-destructive-foreground hover:bg-neutral-100 dark:hover:bg-neutral-900">
            Logout
          </Button>
        </CardHeader>
        <CardContent className="pt-6">
          <ScrollArea className="h-[calc(100vh-200px)] pr-4">
            <ul className="space-y-6">
              {users.map((user) => (
                <li key={user?.id}>
                  <Card className="overflow-hidden transition-all hover:shadow-md">
                    <CardContent className="p-6">
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
                      <Collapsible
                        className="rounded-md border transition-colors hover:bg-neutral-100 dark:border-neutral-800
                          dark:hover:bg-neutral-900">
                        <CollapsibleTrigger className="flex w-full items-center justify-between p-4 text-xs">
                          <span className="flex items-center">
                            <Clock className="mr-2 h-4 w-4" />
                            Previous Logins
                          </span>
                          <ChevronDown className="h-4 w-4" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="bg-background space-y-2 p-4">
                          {user?.loginHistory && user.loginHistory.length > 0 ? (
                            <ul className="space-y-2">
                              {user.loginHistory.map((login, index) => (
                                <li
                                  key={index}
                                  className="bg-muted flex items-center rounded-md p-2 text-xs">
                                  <Clock className="text-muted-foreground mr-2 h-3 w-3" />
                                  {new Date(login).toLocaleString()}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-muted-foreground text-xs">
                              No previous logins
                            </p>
                          )}
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
                                      setEditingUser({ ...editingUser, name: e.target.value })
                                    }
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="email">Email</Label>
                                  <Input
                                    id="email"
                                    value={editingUser.email}
                                    onChange={(e) =>
                                      setEditingUser({ ...editingUser, email: e.target.value })
                                    }
                                  />
                                </div>
                                <div className="flex justify-end space-x-2">
                                  <Button onClick={handleCloseDialog} variant="outline">Cancel</Button>
                                  <Button onClick={handleUpdateUser}>Update User</Button>
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
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersList;