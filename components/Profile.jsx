'use client';
import React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';
import useUser from '@/app/hook/useUser';
import Image from 'next/image';

export default function Profile() {
  const { isFetching, data } = useUser();

  if (isFetching) {
    return <></>;
  }

  return (
    <div>
      {!data?.id ? (
        <Link href="/auth" className="animate-fade">
          <Button variant="outline">Sign In</Button>
        </Link>
      ) : (
        <div
          className="profile-container"
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <h1 style={{ marginRight: '10px' }}>{data.display_name}</h1>
          {data?.image_url ? (
            <Image
              src={data.image_url || ''}
              alt={data.display_name || ''}
              width={50}
              height={50}
              className="rounded-full animate-fade ring-2"
            />
          ) : (
            <div className="h-[50px] w-[50px] flex items-center justify-center ring-2 rounded-full text-2xl font-bold">
              <h1>{data.email[0].toUpperCase()}</h1>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
