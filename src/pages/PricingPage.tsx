
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import PricingCard from '@/components/pricing/PricingCard';
import { useAuth } from '../contexts/AuthContext';
import { pricingPlans, PricingPlan } from '@/data/mockData';
import { useToast } from "@/hooks/use-toast";

const PricingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Filter plans based on user role if logged in
  const filteredPlans = user?.role 
    ? pricingPlans.filter(plan => plan.role === user.role)
    : pricingPlans;

  const handleSelectPlan = (plan: PricingPlan) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in or sign up before selecting a plan",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }

    // Mock payment processing
    console.log(`Selected plan: ${plan.name}`);
    toast({
      title: "Plan selected",
      description: `You've selected the ${plan.name} plan. Proceeding to payment.`,
    });
    
    // Redirect to payment page (mock)
    navigate('/payment');
  };

  return (
    <Layout>
      <div className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Plan</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Select the plan that best fits your football career needs and goals
            </p>
          </div>

          {user ? (
            <>
              {filteredPlans.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  {filteredPlans.map((plan) => (
                    <PricingCard key={plan.id} plan={plan} onSelectPlan={handleSelectPlan} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-lg text-gray-600 dark:text-gray-400">
                    No plans available for your role. Please contact support.
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                Please log in or sign up to view pricing plans specific to your role.
              </p>
              <div className="flex justify-center gap-4">
                <button 
                  onClick={() => navigate('/login')}
                  className="px-6 py-2 rounded-md bg-white dark:bg-gray-800 text-nigerian-green-500 border border-nigerian-green-500 hover:bg-nigerian-green-50 dark:hover:bg-gray-700"
                >
                  Log In
                </button>
                <button 
                  onClick={() => navigate('/signup')}
                  className="px-6 py-2 rounded-md bg-nigerian-green-500 text-white hover:bg-nigerian-green-600"
                >
                  Sign Up
                </button>
              </div>
            </div>
          )}

          <div className="mt-16 bg-white dark:bg-gray-800 rounded-lg p-8 max-w-4xl mx-auto shadow-md">
            <h3 className="text-2xl font-bold mb-4">Frequently Asked Questions</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold mb-2">What payment methods do you accept?</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  We accept payments via credit/debit cards, bank transfers, and mobile money services like Paystack.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-2">Can I upgrade my plan later?</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Yes, you can upgrade your subscription at any time. The new rate will be prorated based on the time remaining in your current subscription.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-2">Is there a free trial?</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  We offer limited free access to basic features. Premium features require a subscription.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-2">How do I cancel my subscription?</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  You can cancel your subscription at any time from your account settings. Your access will remain active until the end of your billing period.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PricingPage;
