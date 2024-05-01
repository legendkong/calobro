'use client';
import React, { Suspense } from 'react';
import { KeyRound, Google } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FcGoogle } from 'react-icons/fc';
import Image from 'next/image';
import { supabaseBrowser } from '@/lib/supabase/browser';
import { useSearchParams } from 'next/navigation';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthComponent />
    </Suspense>
  );
}

function AuthComponent() {
  const params = useSearchParams();
  const next = params.get('next');
  const baseUrl =
    location.hostname === 'localhost'
      ? 'http://localhost:3000'
      : 'https://calobro.vercel.app';

  const handleLoginWithOAuth = (provider) => {
    const supabase = supabaseBrowser();

    supabase.auth.signInWithOAuth({
      provider,
      options: {
        // redirectTo: location.origin + '/auth/callback?next=' + next,
        redirectTo: `${baseUrl}/auth/callback?next=${next}`,
      },
    });
  };

  return (
    <div className="flex justify-center w-full h-screen relative">
      <div className="glowBox absolute inset-0 z-0"></div>
      <div className="w-96 h-80 rounded-3xl border p-5 relative bg-slate-800 flex flex-col items-center mt-32 z-10 relative">
        <div className="flex items-center gap-2">
          <KeyRound color="gray" />
          <h1 className="text-xl font-bold text-gray-300">
            Welcome to Calobro
          </h1>
        </div>
        <div className="flex justify-center items-center">
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
          onClick={() => handleLoginWithOAuth('google')}
        >
          <FcGoogle />
          Google
        </Button>
      </div>
    </div>
  );
}
