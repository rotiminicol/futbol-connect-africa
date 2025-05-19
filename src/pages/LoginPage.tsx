
import React from 'react';
import Layout from '@/components/layout/Layout';
import LoginForm from '@/components/auth/LoginForm';

const LoginPage = () => {
  return (
    <Layout>
      <div className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold">Welcome Back</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  Log in to your Futbol Connect account
                </p>
              </div>
              
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
