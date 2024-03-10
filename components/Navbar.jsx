import React from 'react';
import Profile from './Profile';
import Link from 'next/link';

export default function Navbar() {
  return (
    <div className="flex justify-between items-center h-20 animate-fade">
      <Link href="/">
        <h1 className="text-xl font-bold">🥦 Calobro.</h1>
      </Link>
      <Profile />
    </div>
  );
}
