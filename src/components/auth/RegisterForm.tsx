
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { UserRole } from '@/contexts/AuthContext';
import { Mail, User, Lock } from "lucide-react";

const RegisterForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!role) {
      toast({
        title: "Role selection required",
        description: "Please select your role to continue",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      console.log("Attempting signup with:", email, name, role);
      await signup(name, email, password, role);
      toast({
        title: "Registration successful",
        description: "Your account has been created. Please complete your profile.",
      });
      navigate('/pricing');
    } catch (error: any) {
      console.error('Signup error:', error);
      // Toast is shown in the AuthContext
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Full Name
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-gray-500">
              <User size={18} />
            </span>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="pl-10 w-full"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-gray-500">
              <Mail size={18} />
            </span>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="pl-10 w-full"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Password
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-gray-500">
              <Lock size={18} />
            </span>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="pl-10 w-full"
              minLength={8}
            />
          </div>
          <p className="text-xs text-gray-500">Must be at least 8 characters</p>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            I am a...
          </label>
          <Select onValueChange={(value) => setRole(value as UserRole)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="player">Player</SelectItem>
              <SelectItem value="coach">Coach</SelectItem>
              <SelectItem value="agent">Agent</SelectItem>
              <SelectItem value="manager">Manager</SelectItem>
              <SelectItem value="club_staff">Club Staff</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center space-x-2">
          <input
            id="terms"
            type="checkbox"
            required
            className="h-4 w-4 rounded border-gray-300 text-blue-theme-500 focus:ring-blue-theme-500"
          />
          <label htmlFor="terms" className="text-sm text-gray-700 dark:text-gray-300">
            I agree to the{' '}
            <a href="/terms" className="text-blue-theme-500 hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/privacy" className="text-blue-theme-500 hover:underline">
              Privacy Policy
            </a>
          </label>
        </div>
        
        <Button
          type="submit"
          className="w-full bg-blue-theme-600 hover:bg-blue-theme-700 text-white"
          disabled={isLoading}
        >
          {isLoading ? 'Creating Account...' : 'Sign Up'}
        </Button>
      </form>
      
      <div className="mt-6 text-center text-sm">
        <p className="text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <a href="/login" className="text-blue-theme-500 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
