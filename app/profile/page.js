'use client';
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import useUser from '@/app/hook/useUser';
import Image from 'next/image';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { supabaseBrowser } from '@/lib/supabase/browser';
import { usePathname } from 'next/navigation';
import { protectedPaths } from '@/lib/constant';

export default function Page() {
  const { isFetching, data } = useUser();
  const queryClient = useQueryClient();
  const router = useRouter();

  const pathname = usePathname();

  if (isFetching) {
    return <></>;
  }
  const handleLogout = async () => {
    const supabase = supabaseBrowser();
    queryClient.clear();
    await supabase.auth.signOut();
    router.refresh();
    if (protectedPaths.includes(pathname)) {
      router.replace('/auth?next=' + pathname);
    }
  };
  return (
    // if data is not available, show the sign in button
    <div className="flex flex-col items-center">
      {/* Removed justify-center and min-h-screen, added margin-top for some spacing from the top */}
      {!data?.id ? (
        <Link href="/auth" className="animate-fade">
          <Button variant="outline">Sign In</Button>
        </Link>
      ) : (
        <div className="profile-container flex flex-col items-center animate-fade">
          {data?.image_url ? (
            <Image
              src={data.image_url || ''}
              alt={data.display_name || ''}
              width={100}
              height={100}
              className="rounded-full ring-2 cursor-pointer mb-4"
              onClick={handleLogout}
            />
          ) : (
            <div
              className="h-[50px] w-[50px] flex items-center justify-center ring-1 rounded-full text-2xl font-bold cursor-pointer mb-4"
              onClick={handleLogout}
            >
              <h1>{data.email[0].toUpperCase()}</h1>
            </div>
          )}
          <h1 className="text-xl font-bold text-black mb-1">
            {data.display_name}
          </h1>
        </div>
      )}
      {/* age, weight and height div */}
      <div className="flex flex-row justify-around items-center bg-lime-100 rounded-lg shadow-md p-4 mt-2 mb-4 w-full max-w-xs">
        <div className="text-center">
          <p className="font-bold text-xl">{data.age || '27'}</p>
          <p className="text-md">Age</p>
        </div>
        <div className="text-center">
          <p className="font-bold text-xl">{data.weight || '80'}</p>
          <p className="text-md">Weight</p>
        </div>
        <div className="text-center">
          <p className="font-bold text-xl">{data.height || '172'}</p>
          <p className="text-md">Height</p>
        </div>
      </div>
      <p className="text-sm">🏋️🏃🏻‍♂️🏊🏻🚴🏽</p>
      <p className="mt-1 text-green-600">You are doing great this week! 💪🏼</p>
      {/* New Full-Screen Bottom Div */}
      <div className="fixed inset-x-0 bottom-0 top-1/2 bg-lime-200 rounded-t-3xl overflow-hidden flex flex-col items-center">
        <div className="flex justify-between items-center w-80 rounded-xl p-2 border-2 border-white mt-5 bg-lime-100">
          <div className="p-2">
            <p className="text-gray-500">
              <span className="font-bold">Goal:</span> Lose Weight
            </p>
          </div>
          <button className="bg-lime-200 text-xs text-gray-500 rounded-full p-2 pl-3 pr-3">
            Set Goals
          </button>
        </div>
        <p className="text-sm mt-3 text-gray-500">
          Log more food to track weekly insights
        </p>
        {/* Static Graph Placeholder */}
        <div className="w-full max-w-4xl h-64 rounded-xl shadow-lg p-4">
          <p className="text-xs text-left -mb-5 text-gray-700">Past 7 days</p>
          <div className="flex justify-between items-end h-full">
            <div className="w-1/12 bg-green-600 h-3/6 rounded"></div>{' '}
            {/* Example bar */}
            <div className="w-1/12 bg-green-600 h-4/6 rounded"></div>{' '}
            {/* Example bar */}
            <div className="w-1/12 bg-red-600 h-5/6 rounded"></div>{' '}
            {/* Example bar */}
            <div className="w-1/12 bg-green-600 h-2/6 rounded"></div>{' '}
            {/* Example bar */}
            <div className="w-1/12 bg-red-600 h-5/6 rounded"></div>{' '}
            {/* Example bar */}
            <div className="w-1/12 bg-green-600 h-2/6 rounded"></div>{' '}
            {/* Example bar */}
            <div className="w-1/12 bg-green-600 h-3/6 rounded"></div>{' '}
            {/* Example bar */}
          </div>
        </div>
      </div>
    </div>
  );
}
