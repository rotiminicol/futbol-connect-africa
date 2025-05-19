
import React from 'react';
import Layout from '@/components/layout/Layout';
import RegisterForm from '@/components/auth/RegisterForm';

const RegisterPage = () => {
  return (
    <Layout>
      <div className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold">Create Your Account</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  Join the premier football talent marketplace in Nigeria
                </p>
              </div>
              
              <RegisterForm />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RegisterPage;
