import React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';

export default function Profile() {
  return (
    <div>
      <Link href="/auth">
        <Button variant="outline">Sign In</Button>
      </Link>
    </div>
  );
}
