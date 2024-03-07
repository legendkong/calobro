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
        <Link href="/auth">
          <Button variant="outline">Sign In</Button>
        </Link>
      ) : (
        <>
          <h1>{data.display_name}</h1>
          <Image
            src={data.image_url || ''}
            alt={data.display_name || ''}
            width={50}
            height={50}
            className="rounded-full"
          />
        </>
      )}
    </div>
  );
}
