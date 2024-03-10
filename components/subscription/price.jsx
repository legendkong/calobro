import React from 'react';
import { LucideCheckCircle2 } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

export default function Price() {
  const prices = [
    {
      title: 'Starter',
      description:
        'Kickstart your wellness journey with essential calorie tracking and basic insights.',
      benefits: [
        'Basic calorie tracking',
        'Food database access',
        'Standard exercise routines',
        'Community support',
        'Daily wellness tips',
      ],
      amount: 5,
    },
    {
      title: 'Premium',
      description:
        'Elevate your fitness with advanced features, including image-to-text food recognition.',
      benefits: [
        'All Starter benefits',
        'Food recognition from camera',
        'Nutritional insights and advice',
        'Goal setting and tracking',
        'Ad-free experience',
      ],
      amount: 15,
    },
    {
      title: 'Elite',
      description:
        'Achieve your ultimate fitness goals with personalized coaching and exclusive content.',
      benefits: [
        'All Premium benefits',
        '1-on-1 online workout sessions',
        'Personalized meal and workout plans',
        'Access to premium content and webinars',
        'Early access to new features',
      ],
      amount: 30,
    },
  ];

  return (
    <div className="mb-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {prices.map((price, index) => {
          const isPopular = index === 1;
          return (
            <div
              key={index}
              className={cn('border rounded-md p-5 space-y-5', {
                'ring-2 ring-green-500': isPopular,
              })}
            >
              <div className="space-y-3">
                <h1 className="text-2xl font-bold">{price.title}</h1>
                <h1 className="text-3xl font-bold">${price.amount}</h1>
                <p className="text-sm text-gray-400">{price.description}</p>
              </div>
              <div className="space-y-3">
                {price.benefits.map((benefit, index) => {
                  return (
                    <div key={index} className="flex items-center gap-2">
                      <LucideCheckCircle2 />
                      <h1 className="text-sm text-gray-400">{benefit}</h1>
                    </div>
                  );
                })}
              </div>
              <Button className="w-full">Getting Started</Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
