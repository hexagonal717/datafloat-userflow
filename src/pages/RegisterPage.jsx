import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/user/userSlice.js';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    isBlocked: false
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const newUser = {
      ...formData,
      id: Date.now().toString(), // Generate a unique ID
    };
    dispatch(addUser(newUser));
    navigate('/');
  };

  return (
    <div className="flex min-h-screen items-center justify-center dark:bg-neutral-950 p-4">
      <Card className="max-w-xl ">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Register</CardTitle>
          <CardDescription>Create a new account to get started.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Register
            </Button>

          </form>
        </CardContent>
        <CardFooter><Button variant={'secondary'} onClick={()=>navigate('/')} className="w-full">
          Login
        </Button></CardFooter>
      </Card>
    </div>
  );
};

export default RegisterPage;