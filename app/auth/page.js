import React from 'react';
import { KeyRound, Google } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FcGoogle } from 'react-icons/fc';
import Image from 'next/image';

export default function page() {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="w-90 h-76 rounded-md border p-5 relative bg-slate-900 flex flex-col items-center">
        <div className="flex items-center gap-2">
          <KeyRound />
          <h1 className="text-xl font-bold">Welcome to Calobro!</h1>
        </div>
        {/* Center the image and reduce vertical spacing */}
        <div className=" flex justify-center items-center">
          {/* Adjust `my-2` for desired gap */}
          <Image
            src="/ios/256.png"
            width={150}
            height={300}
            alt="Logo of Calobro"
          />
        </div>
        <p className="text-sm text-gray-300">Register / Sign In Today 👇</p>
        <Button
          className="w-full flex items-center gap-2 mt-5"
          variant="outline"
        >
          <FcGoogle />
          Google
        </Button>
      </div>
      <div className="glowBox -z-10"></div>
    </div>
  );
}
