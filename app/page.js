'use client';
import Image from 'next/image';
import useUser from '@/app/hook/useUser';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useQueryClient } from '@tanstack/react-query';
import { Zap } from 'lucide-react';

export default function Home() {
  const { isFetching, data } = useUser();
  const queryClient = useQueryClient();
  const now = new Date();
  const options = { weekday: 'short', month: 'short', day: 'numeric' };
  const dateString = now.toLocaleDateString('en-US', options);
  if (isFetching) {
    return <></>;
  }
  return (
    <div className="font-bold">
      {/* <Link href="/dashboard">/dashboard</Link>
        <Link href="/camera">/camera</Link>
        <Link href="/subscription">/subscription</Link>
        <Link href="/profile">/profile</Link> */}
      <div className="flex flex-col items-center min-h-screen">
        <header className="text-center py-2 text-xl font-bold">
          Welcome back,{' '}
          <span className="text-orange-500">{data.display_name}</span>.
        </header>
        <p className="font-light text-md mb-5">{dateString}</p>
        <p>Ad</p>
        <Image
          src="/healthscreen.jpeg"
          alt="ads"
          width={300}
          height={300}
        ></Image>
        <Link href="/subscription">
          <div className="p-2 rounded-lg bg-orange-400 pl-5 pr-5 text-xs mt-2 mb-2 font-semibold">
            Hate ads? Upgrade plan.
            <span className="flex flex-col items-center mt-1">
              <Zap color="yellow" />
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
