
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AddPlayerPage: React.FC = () => {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Player form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    age: '',
    height: '',
    weight: '',
    position: '',
    secondaryPosition: '',
    preferredFoot: 'right',
    currentClub: '',
    bio: '',
    location: '',
    availableForTransfer: false,
    isVerified: true,
    isPremium: true,
  });

  // Check if the current user is an admin
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user || !profile) {
        setIsAdmin(false);
        return;
      }

      // Check if the user has admin role
      if (profile.role === 'admin') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
        toast({
          title: "Access Denied",
          description: "You don't have permission to access the admin portal",
          variant: "destructive",
        });
      }
      
      setLoading(false);
    };

    checkAdminStatus();
  }, [user, profile, toast]);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle switch changes
  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // First, create the auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: generateRandomPassword(), // Generate a random secure password
        options: {
          data: {
            full_name: formData.fullName,
            role: 'player'
          }
        }
      });
      
      if (authError) throw authError;
      
      if (!authData.user) {
        throw new Error("Failed to create user");
      }
      
      const userId = authData.user.id;
      
      // Update profile with additional data
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          full_name: formData.fullName,
          email: formData.email,
          bio: formData.bio,
          location: formData.location,
          is_verified: formData.isVerified,
          is_premium: formData.isPremium
        })
        .eq('id', userId);
        
      if (profileError) throw profileError;
      
      // Update player profile
      const { error: playerProfileError } = await supabase
        .from('player_profiles')
        .update({
          age: formData.age ? parseInt(formData.age) : null,
          height: formData.height ? parseInt(formData.height) : null,
          weight: formData.weight ? parseInt(formData.weight) : null,
          position: formData.position || null,
          secondary_position: formData.secondaryPosition || null,
          preferred_foot: formData.preferredFoot || null,
          current_club: formData.currentClub || null,
          available_for_transfer: formData.availableForTransfer,
          is_admin_created: true
        })
        .eq('id', userId);
        
      if (playerProfileError) throw playerProfileError;
      
      toast({
        title: "Player Added",
        description: "Player profile has been created successfully",
      });
      
      // Reset form or redirect
      setFormData({
        fullName: '',
        email: '',
        age: '',
        height: '',
        weight: '',
        position: '',
        secondaryPosition: '',
        preferredFoot: 'right',
        currentClub: '',
        bio: '',
        location: '',
        availableForTransfer: false,
        isVerified: true,
        isPremium: true
      });
      
      // Redirect to player management
      window.location.href = '/admin/players';
      
    } catch (error: any) {
      console.error('Error adding player:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to add player",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate a random secure password
  const generateRandomPassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let password = '';
    for (let i = 0; i < 16; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-t-2 border-b-2 border-nigerian-green-500 rounded-full mx-auto mb-4"></div>
          <p className="text-gray-500">Verifying admin credentials...</p>
        </div>
      </div>
    );
  }

  if (isAdmin === false) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <AdminSidebar />
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Add New Player</h1>
          <Button 
            variant="outline" 
            onClick={() => window.location.href = '/admin/players'}
          >
            Back to Players
          </Button>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Basic Information</h2>
                
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio/About</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows={4}
                  />
                </div>
              </div>
              
              {/* Player Details */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Player Details</h2>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      name="age"
                      type="number"
                      value={formData.age}
                      onChange={handleInputChange}
                      min="10"
                      max="50"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="height">Height (cm)</Label>
                    <Input
                      id="height"
                      name="height"
                      type="number"
                      value={formData.height}
                      onChange={handleInputChange}
                      min="120"
                      max="220"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input
                      id="weight"
                      name="weight"
                      type="number"
                      value={formData.weight}
                      onChange={handleInputChange}
                      min="40"
                      max="150"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="position">Primary Position</Label>
                  <Select 
                    value={formData.position}
                    onValueChange={(value) => handleSelectChange('position', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Goalkeeper">Goalkeeper</SelectItem>
                      <SelectItem value="Defender">Defender</SelectItem>
                      <SelectItem value="Center Back">Center Back</SelectItem>
                      <SelectItem value="Left Back">Left Back</SelectItem>
                      <SelectItem value="Right Back">Right Back</SelectItem>
                      <SelectItem value="Midfielder">Midfielder</SelectItem>
                      <SelectItem value="Defensive Midfielder">Defensive Midfielder</SelectItem>
                      <SelectItem value="Central Midfielder">Central Midfielder</SelectItem>
                      <SelectItem value="Attacking Midfielder">Attacking Midfielder</SelectItem>
                      <SelectItem value="Left Winger">Left Winger</SelectItem>
                      <SelectItem value="Right Winger">Right Winger</SelectItem>
                      <SelectItem value="Forward">Forward</SelectItem>
                      <SelectItem value="Striker">Striker</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="secondaryPosition">Secondary Position</Label>
                  <Select 
                    value={formData.secondaryPosition}
                    onValueChange={(value) => handleSelectChange('secondaryPosition', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">None</SelectItem>
                      <SelectItem value="Goalkeeper">Goalkeeper</SelectItem>
                      <SelectItem value="Defender">Defender</SelectItem>
                      <SelectItem value="Center Back">Center Back</SelectItem>
                      <SelectItem value="Left Back">Left Back</SelectItem>
                      <SelectItem value="Right Back">Right Back</SelectItem>
                      <SelectItem value="Midfielder">Midfielder</SelectItem>
                      <SelectItem value="Defensive Midfielder">Defensive Midfielder</SelectItem>
                      <SelectItem value="Central Midfielder">Central Midfielder</SelectItem>
                      <SelectItem value="Attacking Midfielder">Attacking Midfielder</SelectItem>
                      <SelectItem value="Left Winger">Left Winger</SelectItem>
                      <SelectItem value="Right Winger">Right Winger</SelectItem>
                      <SelectItem value="Forward">Forward</SelectItem>
                      <SelectItem value="Striker">Striker</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="preferredFoot">Preferred Foot</Label>
                  <Select 
                    value={formData.preferredFoot}
                    onValueChange={(value) => handleSelectChange('preferredFoot', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select preferred foot" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="right">Right</SelectItem>
                      <SelectItem value="left">Left</SelectItem>
                      <SelectItem value="both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="currentClub">Current Club</Label>
                  <Input
                    id="currentClub"
                    name="currentClub"
                    value={formData.currentClub}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            
            {/* Status Options */}
            <div className="border-t pt-6 space-y-4">
              <h2 className="text-xl font-semibold">Status Settings</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="availableForTransfer"
                    checked={formData.availableForTransfer}
                    onCheckedChange={(checked) => handleSwitchChange('availableForTransfer', checked)}
                  />
                  <Label htmlFor="availableForTransfer">Available for Transfer</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="isVerified"
                    checked={formData.isVerified}
                    onCheckedChange={(checked) => handleSwitchChange('isVerified', checked)}
                  />
                  <Label htmlFor="isVerified">Verified Profile</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="isPremium"
                    checked={formData.isPremium}
                    onCheckedChange={(checked) => handleSwitchChange('isPremium', checked)}
                  />
                  <Label htmlFor="isPremium">Premium User</Label>
                </div>
              </div>
            </div>
            
            {/* Submit */}
            <div className="flex justify-end">
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full md:w-auto"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-t-2 border-b-2 border-white rounded-full mr-2"></div>
                    Creating Player...
                  </>
                ) : (
                  'Add Player'
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPlayerPage;
