'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Zap } from 'lucide-react';

export default function Page() {
  const [query, setQuery] = useState('');
  const [searchResult, setSearchResult] = useState('');
  const [showMessage, setShowMessage] = useState(false); // FOR DEMO PURPOSES
  const now = new Date();
  const options = { weekday: 'short', month: 'short', day: 'numeric' };
  const dateString = now.toLocaleDateString('en-US', options);

  const handleSearch = async () => {
    // const result = await fetchResultsFromAPI(query);
    // setSearchResult(result);
    setShowMessage(true); // FOR DEMO PURPOSES
  };

  return (
    <div className="flex flex-col items-center relative mb-40">
      <div className="profile-container flex flex-col items-center animate-fade z-10 relative">
        <h1 className="font-bold text-xl bg-white px-2">🏋️ Ask Calobro</h1>
        <Link href="/subscription">
          <div className="p-2 rounded-lg bg-orange-400 pl-5 pr-5 text-xs mt-2 mb-2 font-semibold">
            Upgrade Plan
            <span className="flex flex-col items-center">
              <Zap color="yellow" />
            </span>
          </div>
        </Link>
        <p className="text-md py-1">{dateString}</p>
      </div>
      {/* Horizontal Line */}
      <div
        className="absolute w-full border-b border-gray-300"
        style={{ top: '1.5%' }}
      ></div>

      <div className="text-center mt-4 w-full px-4">
        {' '}
        {/* Adjusted for wider padding if needed */}
        <div className="flex items-center bg-white border-2 border-lime-300 rounded-full p-2 w-full">
          <input
            className="bg-transparent flex-grow p-4 rounded-full text-sm"
            placeholder="What workout should i do today?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="font-bold ml-2 text-xs py-1 px-1"
            onClick={() => setQuery('')}
          >
            X
          </button>
          <button
            className="ml-2 mr-2 rounded-2xl font-bold p-2 text-xs border-2 py-1 px-2"
            onClick={handleSearch}
          >
            ASK
          </button>
        </div>
      </div>
      {showMessage && (
        <div className="m-6">
          You have eaten an extra 155 calories today! You can burn it off by
          walking for 28 minutes, or going for a slow jog for 11 minutes.
        </div>
      )}
      <h1 className="font-bold mt-6">🔥 Top deals around you</h1>
      <div className="flex flex-col items-center mt-2 space-y-2 w-full px-2">
        <div className="flex items-center bg-orange-100 border-2 border-orange-300 rounded-lg w-full p-4 relative">
          <Image
            src="/anytimefitness.jpeg" // Your image URL
            alt="Anytime Fitness CCK Branch"
            className="rounded-lg mr-4"
            width={70}
            height={70}
          />
          <div>
            {/* Highlighted Tag */}
            <div className="absolute top-0 right-0 bg-red-500 text-white text-xs py-1 px-2 rounded-bl-lg">
              FREE 1 month
            </div>
            <h3 className="font-bold">Anytime Fitness CCK Branch</h3>
            <p className="text-sm">
              24/7 access, 0.5km away from you. Early bird promo if you sign up
              now!
            </p>
          </div>
        </div>

        {/* Second div with different content */}
        <div className="flex items-center bg-orange-100 border-2 border-orange-300 rounded-lg w-full p-4 relative">
          <Image
            src="/activesg.png" // Your image URL
            alt="Active SG CCK Branch"
            className="rounded-lg mr-4 bg-white"
            width={70}
            height={70}
          />
          <div>
            {/* Highlighted Tag */}
            <div className="absolute top-0 right-0 bg-red-500 text-white text-xs py-1 px-2 rounded-bl-lg">
              3 free trials
            </div>
            <h3 className="font-bold">ActiveSG Choa Chu Kang Stadium</h3>
            <p className="text-sm">
              Convenient location in Choa Chu Kang. Sign up for free trial
              classes now!
            </p>
          </div>
        </div>

        {/* Third div with different content */}
        <div className="flex items-center bg-orange-100 border-2 border-orange-300 rounded-lg w-full p-4 relative">
          <Image
            src="/Subway.jpeg" // Your image URL
            alt="Subway"
            className="rounded-lg mr-4"
            width={70}
            height={70}
          />
          <div>
            {/* Highlighted Tag */}
            <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs py-1 px-2 rounded-bl-lg">
              -10% Starter Tier
            </div>
            <h3 className="font-bold">10% off Subway orders</h3>
            <p className="text-sm">
              10% off for all Starter tier subscribers. Flash your app to apply
              discount.
            </p>
          </div>
        </div>

        {/* Fourth div with different content */}
        <div className="flex items-center bg-orange-100 border-2 border-orange-300 rounded-lg w-full p-4 relative">
          <Image
            src="/nike.jpeg" // Your image URL
            alt="Nike"
            className="rounded-lg mr-4"
            width={70}
            height={70}
          />
          <div>
            {/* Highlighted Tag */}
            <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs py-1 px-2 rounded-bl-lg">
              -30% Premium Tier
            </div>
            <h3 className="font-bold">30% off Nike products</h3>
            <p className="text-sm">
              For Premium subscribers and above. Only available at participating
              outlets.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
