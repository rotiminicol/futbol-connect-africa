
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PricingPlan } from '@/data/mockData';

interface PricingCardProps {
  plan: PricingPlan;
  onSelectPlan: (plan: PricingPlan) => void;
}

const PricingCard: React.FC<PricingCardProps> = ({ plan, onSelectPlan }) => {
  return (
    <Card className={`flex flex-col h-full ${plan.recommended ? 'border-nigerian-green-500 shadow-lg' : ''}`}>
      <CardHeader className="pb-0">
        {plan.recommended && (
          <div className="flex justify-center mb-4">
            <Badge className="bg-nigerian-green-500">Recommended</Badge>
          </div>
        )}
        <h3 className="text-xl font-bold text-center mb-1">{plan.name}</h3>
        <div className="text-center mb-4">
          <span className="text-3xl font-bold">{plan.currency} {plan.price.toLocaleString()}</span>
          <span className="text-gray-500">/{plan.period}</span>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="space-y-3">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <svg className="h-5 w-5 text-nigerian-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => onSelectPlan(plan)}
          className={`w-full ${plan.recommended ? 'bg-nigerian-green-500 hover:bg-nigerian-green-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'}`}
        >
          Select Plan
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PricingCard;
