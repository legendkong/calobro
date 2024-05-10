'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Home,
  Camera,
  PersonStanding,
  Dumbbell,
  CookingPot,
} from 'lucide-react';

const MobileNavbar = () => {
  const router = useRouter(); // Use useRouter to access the current route

  // A function to determine if a route is the current one and set the color accordingly
  const getIconColor = (path) =>
    router.pathname === path ? '#f07400' : '#FFF';

  return (
    <div className="fixed inset-x-0 bottom-0 bg-gray-800 text-white text-center py-7 flex justify-around items-center z-50 divide-x divide-gray-600">
      <div className="flex flex-grow justify-center items-center border-r border-gray-600">
        <Link href="/dashboard">
          <span className="flex flex-col items-center">
            <Home color={getIconColor('/dashboard')} />
          </span>
        </Link>
      </div>
      <div className="flex flex-grow justify-center items-center border-r border-gray-600">
        <Link href="/camera">
          <span className="flex flex-col items-center">
            <Camera color={getIconColor('/camera')} />
          </span>
        </Link>
      </div>
      <div className="flex flex-grow justify-center items-center border-r border-gray-600">
        <Link href="/trainingplans">
          <span className="flex flex-col items-center">
            <Dumbbell color={getIconColor('/trainingplans')} />
          </span>
        </Link>
      </div>
      <div className="flex flex-grow justify-center items-center border-r border-gray-600">
        <Link href="/recipe">
          <span className="flex flex-col items-center">
            <CookingPot color={getIconColor('/recipe')} />
          </span>
        </Link>
      </div>
      <div className="flex flex-grow justify-center items-center border-r border-gray-600">
        <Link href="/profile">
          <span className="flex flex-col items-center">
            <PersonStanding color={getIconColor('/profile')} />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default MobileNavbar;
