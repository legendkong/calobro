import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Price from '@/components/subscription/price';

export default function Home() {
  return (
    <>
      <div>
        <Link href="/dashboard">/dashboard</Link>
        <Link href="/profile">/profile</Link>
        <Link href="/subscription">/subscription</Link>
      </div>
      <Price />
    </>
  );
}
