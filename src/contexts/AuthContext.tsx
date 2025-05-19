
import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'player' | 'coach' | 'agent' | 'manager' | 'club_staff' | 'admin' | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  isPremium: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('futbolConnectUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Mock login function (replace with actual auth logic when integrating backend)
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock API call
      // In a real application, this would be an API call to verify credentials
      console.log("Logging in with", email, password);
      
      // Mock successful login
      const mockUser: User = {
        id: "12345",
        name: "John Doe",
        email: email,
        role: "player",
        avatar: "/placeholder.svg",
        isPremium: false,
      };
      
      setUser(mockUser);
      localStorage.setItem('futbolConnectUser', JSON.stringify(mockUser));
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error("Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  // Mock signup function
  const signup = async (name: string, email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    try {
      // Mock API call
      console.log("Signing up with", name, email, password, role);
      
      // Mock successful signup
      const mockUser: User = {
        id: "12345",
        name: name,
        email: email,
        role: role,
        avatar: "/placeholder.svg",
        isPremium: false,
      };
      
      setUser(mockUser);
      localStorage.setItem('futbolConnectUser', JSON.stringify(mockUser));
    } catch (error) {
      console.error("Signup failed:", error);
      throw new Error("Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('futbolConnectUser');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
