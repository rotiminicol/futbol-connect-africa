
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { Profile } from '@/types/supabase';
import { useToast } from '@/hooks/use-toast';

export type UserRole = 'player' | 'coach' | 'agent' | 'manager' | 'club_staff' | 'admin' | null;

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  session: null,
  isLoading: true,
  login: async () => {},
  signup: async () => {},
  logout: async () => {},
  updateProfile: async () => {},
  refreshProfile: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const cleanupAuthState = () => {
  // Remove standard auth tokens
  localStorage.removeItem('supabase.auth.token');
  // Remove all Supabase auth keys from localStorage
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      localStorage.removeItem(key);
    }
  });
  // Remove from sessionStorage if in use
  Object.keys(sessionStorage || {}).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      sessionStorage.removeItem(key);
    }
  });
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Fetch user profile data with console logs for debugging
  const fetchProfile = async (userId: string) => {
    try {
      console.log("Fetching profile for user:", userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return null;
      }

      console.log("Profile fetched successfully:", data);
      return data as Profile;
    } catch (error) {
      console.error('Exception fetching profile:', error);
      return null;
    }
  };

  // Refresh profile data
  const refreshProfile = async () => {
    if (!user) return;
    
    console.log("Refreshing profile for user:", user.id);
    const profileData = await fetchProfile(user.id);
    if (profileData) {
      setProfile(profileData);
      console.log("Profile state updated:", profileData);
    }
  };

  // Update user profile
  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return;

    try {
      console.log("Updating profile for user:", user.id, updates);
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) {
        throw error;
      }

      // Refresh profile after update
      await refreshProfile();
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Update failed",
        description: "There was a problem updating your profile",
        variant: "destructive",
      });
    }
  };

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      console.log("Login attempt for:", email);
      // Clean up auth state
      cleanupAuthState();
      
      // Sign out globally first
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        console.log("Error during pre-login signout:", err);
        // Continue even if this fails
      }
      
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        console.error("Login error:", error);
        throw error;
      }
      
      console.log("Login successful:", data);
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
      
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: "Login failed",
        description: error.message || "Invalid credentials",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Signup function
  const signup = async (name: string, email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    try {
      console.log("Signup attempt for:", email, "with role:", role);
      // Clean up auth state
      cleanupAuthState();
      
      // Sign out globally first
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        console.log("Error during pre-signup signout:", err);
        // Continue even if this fails
      }
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            role: role,
          },
        }
      });
      
      if (error) {
        console.error("Signup error:", error);
        throw error;
      }
      
      console.log("Signup successful:", data);
      toast({
        title: "Registration successful",
        description: "Your account has been created successfully.",
      });
      
    } catch (error: any) {
      console.error('Signup error:', error);
      toast({
        title: "Signup failed",
        description: error.message || "There was an error creating your account",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      console.log("Logout attempt");
      // Clean up auth state
      cleanupAuthState();
      
      // Sign out
      const { error } = await supabase.auth.signOut({ scope: 'global' });
      if (error) throw error;
      
      setUser(null);
      setProfile(null);
      setSession(null);
      
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
      
      // Force page reload
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Logout failed",
        description: "There was a problem signing you out",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    console.log("Setting up auth state listener");
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log("Auth state change:", event);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        // Fetch profile data when auth state changes to signed in
        if (event === 'SIGNED_IN' && currentSession?.user) {
          // Use setTimeout to prevent potential deadlocks
          setTimeout(async () => {
            console.log("Fetching profile after sign-in");
            const profileData = await fetchProfile(currentSession.user.id);
            setProfile(profileData);
            setIsLoading(false);
          }, 0);
        } else if (event === 'SIGNED_OUT') {
          setProfile(null);
          setIsLoading(false);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      console.log("Checked existing session:", currentSession ? "found" : "none");
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (currentSession?.user) {
        // Fetch profile data for existing session
        fetchProfile(currentSession.user.id).then(profileData => {
          setProfile(profileData);
          setIsLoading(false);
        });
      } else {
        setIsLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        profile,
        session, 
        isLoading, 
        login, 
        signup, 
        logout,
        updateProfile,
        refreshProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
