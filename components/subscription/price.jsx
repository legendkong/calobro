import React from 'react';
import { LucideCheckCircle2 } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

export default function Price() {
  const prices = [
    {
      title: 'Hobby',
      description: 'Start your next side project',
      benefits: [
        'Improved productivity',
        'Enhanced performance',
        'Cost savings',
        'Improved communication',
        'Enhanced collaboration',
      ],
      amount: 10,
    },
    {
      title: 'Pro',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      benefits: [
        'Improved productivity',
        'Enhanced performance',
        'Cost savings',
        'Improved communication',
        'Enhanced collaboration',
      ],
      amount: 20,
    },
    {
      title: 'Enterprise',
      description: 'asdasdasdafw',
      benefits: [
        'Improved productivity',
        'Enhanced performance',
        'Cost savings',
        'Improved communication',
        'Enhanced collaboration',
      ],
      amount: 100,
    },
  ];
  return (
    <div>
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