import Link from 'next/link';

const MobileNavbar = () => {
  return (
    <div className="fixed inset-x-0 bottom-0 bg-gray-800 text-white text-center py-2 flex justify-around items-center z-50">
      <Link href="/dashboard">
        <span className="flex flex-col items-center">Home</span>
      </Link>
      <Link href="/camera">
        <span className="flex flex-col items-center">Camera</span>
      </Link>
      <Link href="/subscription">
        <span className="flex flex-col items-center">Pricing</span>
      </Link>
      <Link href="/profile">
        <span className="flex flex-col items-center">Profile</span>
      </Link>
    </div>
  );
};

export default MobileNavbar;
