import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div>
        <Link href="/dashboard">/dashboard</Link>
        <Link href="/camera">/camera</Link>
        <Link href="/subscription">/subscription</Link>
        <Link href="/profile">/profile</Link>
      </div>
    </>
  );
}
