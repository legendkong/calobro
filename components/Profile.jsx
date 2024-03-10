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
          <Image
            src={data.image_url || ''}
            alt={data.display_name || ''}
            width={50}
            height={50}
            className="rounded-full animate-fade"
          />
        </div>
      )}
    </div>
  );
}
