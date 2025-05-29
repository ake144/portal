'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {useRouter} from 'next/navigation';
import Link from 'next/link';
import { toast } from "sonner";
import { Eye, EyeOff, LogIn, Mail, Lock } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    mainId: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.mainId) {
      newErrors.mainId = 'ID is required';
         
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate login API call
     const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/login/`, {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(formData),
     });
        if (!response.ok) {
            throw new Error('Login failed');
        }
        const data = await response.json();


      toast("Login Successful", {
        description: "Welcome back to the Student Portal!",
      });

      router.push('/');
    } catch (error) {
      toast("Login Failed", {
        description: "Invalid mainId or password. Please try again.",
        style: {
          backgroundColor: '#f8d7da',
          color: '#721c24',
          borderColor: '#f5c6cb',
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <LogIn className="w-6 h-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription>
            Sign in to your student portal account
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ugr" className="text-sm font-medium flex items-center gap-2">
                <Mail className="w-4 h-4" />
                ID<span className="text-red-500">*</span>
              </Label>
              <Input
                id="mainId"
                name="mainId"
                type="text"
                placeholder="Enter your ID"
                value={formData.mainId}
                onChange={handleChange}
                className={errors.mainId ? "border-red-500" : ""}
              />
              {errors.mainId && (
                <p className="text-red-500 text-sm">{errors.mainId}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Password <span className="text-red-500">*</span>
              </Label>
              <div className="relative space-y-6">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? "border-red-500" : ""}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
            
            <div className="text-center">
              <span className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link 
                  href="/auth/register" 
                  className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
                >
                  Create Account
                </Link>
              </span>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;