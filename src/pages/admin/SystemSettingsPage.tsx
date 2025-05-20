
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface SystemSetting {
  id: string;
  key: string;
  value: string;
  description?: string;
}

const SystemSettingsPage: React.FC = () => {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<SystemSetting[]>([]);
  const [isSaving, setIsSaving] = useState(false);

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
        fetchSettings();
      } else {
        setIsAdmin(false);
        toast({
          title: "Access Denied",
          description: "You don't have permission to access the admin portal",
          variant: "destructive",
        });
      }
    };

    checkAdminStatus();
  }, [user, profile, toast]);

  // Fetch system settings
  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('system_settings')
        .select('*');

      if (error) throw error;

      // If no settings exist, create default ones
      if (!data || data.length === 0) {
        const defaultSettings: Omit<SystemSetting, 'id'>[] = [
          { key: 'test_mode', value: 'true', description: 'Bypass payment requirements for all users' },
          { key: 'allow_registration', value: 'true', description: 'Allow new user registrations' },
          { key: 'auto_verify', value: 'false', description: 'Automatically verify new users' },
          { key: 'maintenance_mode', value: 'false', description: 'Put site in maintenance mode (admins only)' },
        ];

        try {
          // Insert default settings
          for (const setting of defaultSettings) {
            await supabase
              .from('system_settings')
              .insert(setting);
          }

          // Fetch again after insertion
          const { data: newData, error: newError } = await supabase
            .from('system_settings')
            .select('*');

          if (newError) throw newError;
          setSettings(newData);
        } catch (insertError) {
          console.error('Error inserting default settings:', insertError);
          toast({
            title: "Error",
            description: "Failed to create default system settings",
            variant: "destructive",
          });
        }
      } else {
        setSettings(data);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast({
        title: "Error",
        description: "Failed to load system settings",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  // Update a setting
  const updateSetting = async (key: string, value: string) => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('system_settings')
        .update({ value })
        .eq('key', key);

      if (error) throw error;

      // Update local state
      setSettings(settings.map(setting => 
        setting.key === key ? { ...setting, value } : setting
      ));

      toast({
        title: "Setting Updated",
        description: "System setting has been updated successfully",
      });
    } catch (error) {
      console.error('Error updating setting:', error);
      toast({
        title: "Error",
        description: "Failed to update system setting",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Toggle boolean setting
  const toggleSetting = (key: string, currentValue: string) => {
    const newValue = currentValue === 'true' ? 'false' : 'true';
    updateSetting(key, newValue);
  };

  // Get setting value as boolean
  const getBooleanValue = (key: string): boolean => {
    const setting = settings.find(s => s.key === key);
    return setting ? setting.value === 'true' : false;
  };

  // Reset all settings to default
  const resetToDefaults = async () => {
    if (window.confirm('Are you sure you want to reset all settings to their defaults?')) {
      setIsSaving(true);
      try {
        const defaultValues = {
          'test_mode': 'true',
          'allow_registration': 'true',
          'auto_verify': 'false',
          'maintenance_mode': 'false'
        };

        // Update existing settings to default values
        for (const [key, value] of Object.entries(defaultValues)) {
          await supabase
            .from('system_settings')
            .update({ value })
            .eq('key', key);
        }

        // Fetch updated settings
        const { data, error } = await supabase
          .from('system_settings')
          .select('*');

        if (error) throw error;
        
        setSettings(data);
        
        toast({
          title: "Settings Reset",
          description: "All system settings have been reset to their defaults",
        });
      } catch (error) {
        console.error('Error resetting settings:', error);
        toast({
          title: "Error",
          description: "Failed to reset system settings",
          variant: "destructive",
        });
      } finally {
        setIsSaving(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-t-2 border-b-2 border-nigerian-green-500 rounded-full mx-auto mb-4"></div>
          <p className="text-gray-500">Loading system settings...</p>
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
          <h1 className="text-3xl font-bold">System Settings</h1>
          <Button onClick={resetToDefaults} variant="outline" disabled={isSaving}>
            Reset to Defaults
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Test Mode</CardTitle>
              <CardDescription>
                When enabled, all users bypass payment requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Switch
                  id="test-mode"
                  checked={getBooleanValue('test_mode')}
                  onCheckedChange={() => toggleSetting('test_mode', getBooleanValue('test_mode') ? 'true' : 'false')}
                  disabled={isSaving}
                />
                <Label htmlFor="test-mode">
                  {getBooleanValue('test_mode') ? 'Enabled' : 'Disabled'}
                </Label>
              </div>
            </CardContent>
            <CardFooter className="text-sm text-gray-500">
              {getBooleanValue('test_mode') 
                ? "All users currently have full access regardless of payment status"
                : "Only paid users have full access to features"
              }
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Registration</CardTitle>
              <CardDescription>
                Control whether new users can register
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Switch
                  id="registration"
                  checked={getBooleanValue('allow_registration')}
                  onCheckedChange={() => toggleSetting('allow_registration', getBooleanValue('allow_registration') ? 'true' : 'false')}
                  disabled={isSaving}
                />
                <Label htmlFor="registration">
                  {getBooleanValue('allow_registration') ? 'Enabled' : 'Disabled'}
                </Label>
              </div>
            </CardContent>
            <CardFooter className="text-sm text-gray-500">
              {getBooleanValue('allow_registration') 
                ? "New users can register accounts"
                : "Registration is currently disabled"
              }
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Auto-Verification</CardTitle>
              <CardDescription>
                Automatically verify all new user accounts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Switch
                  id="auto-verify"
                  checked={getBooleanValue('auto_verify')}
                  onCheckedChange={() => toggleSetting('auto_verify', getBooleanValue('auto_verify') ? 'true' : 'false')}
                  disabled={isSaving}
                />
                <Label htmlFor="auto-verify">
                  {getBooleanValue('auto_verify') ? 'Enabled' : 'Disabled'}
                </Label>
              </div>
            </CardContent>
            <CardFooter className="text-sm text-gray-500">
              {getBooleanValue('auto_verify') 
                ? "New users are automatically verified on registration"
                : "New users require manual verification by an admin"
              }
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Maintenance Mode</CardTitle>
              <CardDescription>
                Restrict site access to admins only
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Switch
                  id="maintenance"
                  checked={getBooleanValue('maintenance_mode')}
                  onCheckedChange={() => toggleSetting('maintenance_mode', getBooleanValue('maintenance_mode') ? 'true' : 'false')}
                  disabled={isSaving}
                />
                <Label htmlFor="maintenance">
                  {getBooleanValue('maintenance_mode') ? 'Enabled' : 'Disabled'}
                </Label>
              </div>
            </CardContent>
            <CardFooter className="text-sm text-gray-500">
              {getBooleanValue('maintenance_mode') 
                ? "Site is in maintenance mode - only admins can access"
                : "Site is accessible to all users"
              }
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SystemSettingsPage;
