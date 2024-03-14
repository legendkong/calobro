'use client';
import useUser from '@/app/hook/useUser';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { supabaseBrowser } from '@/lib/supabase/browser';
import { usePathname } from 'next/navigation';
import { protectedPaths } from '@/lib/constant';
import { useState } from 'react';
import Modal from '@/components/SearchModal';
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [mealData, setMealData] = useState({
    Breakfast: '',
    Lunch: '',
    Dinner: '',
  });

  const handleAddFoodClick = (meal) => {
    setModalTitle(meal);
    setIsModalOpen(true);
  };

  const handleConfirm = (result) => {
    setMealData({ ...mealData, [modalTitle]: result });
  };

  const now = new Date();
  const options = { weekday: 'short', month: 'short', day: 'numeric' };
  const dateString = now.toLocaleDateString('en-US', options);
  const { isFetching, data } = useUser();
  const queryClient = useQueryClient();
  const router = useRouter();

  const pathname = usePathname();
  const calorieLeft = 1069;
  const totalCalorie = 2340;
  const caloriePercentage = (calorieLeft / totalCalorie) * 100;

  if (isFetching) {
    return <></>;
  }

  return (
    <div className="flex flex-col items-center relative">
      <div className="profile-container flex flex-col items-center animate-fade z-10 relative">
        <h1 className="font-bold text-xl bg-white px-2">🗓️ {dateString}</h1>
      </div>
      {/* Horizontal Line */}
      <div
        className="absolute w-full border-b border-gray-300"
        style={{ top: '5%' }}
      ></div>
      <div className="flex items-center justify-around p-4 mt-2 -mb-4 w-full max-w-xl">
        <div className="text-center mx-8">
          <p className="text-md font-bold text-gray-700">
            {data.eaten || '1271'}
          </p>
          <p className="font-light text-md">Eaten</p>
        </div>
        <div className="text-center mx-2 flex-shrink">
          <div className="pl-5 pr-5">
            <CircularProgressbarWithChildren
              value={caloriePercentage}
              strokeWidth={3}
              circleRatio={0.75}
              styles={buildStyles({
                rotation: 1 / 2 + 1 / 8,
                strokeLinecap: 'butt',
                trailColor: '#eee',
                textColor: 'black',
                pathColor: 'limegreen',
                // trailColor: '#d6d6d6',
              })}
            >
              <p className="text-3xl font-bold text-gray-700">
                {calorieLeft || '2340'}
              </p>
              <p className="font-light text-md">
                <span className="font-semibold leading-3">calories</span>
                <br />
                <span className="">left</span>
              </p>
            </CircularProgressbarWithChildren>
          </div>
        </div>
        <div className="text-center mx-8">
          <p className="text-md font-bold text-gray-700">
            {data.total || '2340'}
          </p>
          <p className="font-light text-md">Total</p>
        </div>
      </div>
      <div className="flex flex-row justify-around items-center bg-lime-100 rounded-lg shadow-md p-4 mb-4 w-full max-w-md">
        <div className="text-center">
          <p className="text-md font-semibold text-gray-700">Protein</p>
          <p className="font-light text-md">{data.protein || '0/176g'}</p>
        </div>
        <div className="text-center">
          <p className="text-md font-semibold text-gray-700 ">Carbs</p>
          <p className="font-light text-md">{data.carbs || '0/234g'}</p>
        </div>
        <div className="text-center">
          <p className="text-md font-semibold text-gray-700 ">Fat</p>
          <p className="font-light text-md">{data.fat || '0/78g'}</p>
        </div>
      </div>
      {/* BOTTOM DIV */}
      <div className="fixed inset-x-6 bottom-0 top-1/2 bg-lime-200 rounded-t-3xl overflow-hidden flex flex-col items-center p-4 space-y-4 overflow-y-auto mb-28">
        {/* Breakfast */}
        <div className="bg-lime-100 rounded-lg shadow pt-3 pb-3 pl-4 pr-4 w-full ">
          <h2 className="font-bold text-gray-700 text-md mb-2 ">
            🌅 Breakfast
          </h2>
          {/* Thin Divider */}
          <div className="border-b border-gray-300 my-2"></div>
          <button
            className="text-blue-500 font-bold rounded-md"
            onClick={() => handleAddFoodClick('Breakfast')}
          >
            + ADD FOOD
          </button>
          {mealData.Breakfast && <p>{mealData.Breakfast}</p>}
        </div>
        {/* Lunch */}
        <div className="bg-lime-100 rounded-lg shadow pt-3 pb-3 pl-4 pr-4 w-full ">
          <h2 className="font-bold text-gray-700 text-md mb-2 ">🏙️ Lunch</h2>
          {/* Thin Divider */}
          <div className="border-b border-gray-300 my-2"></div>
          <button className="text-blue-500 font-bold rounded-md  ">
            + ADD FOOD
          </button>
        </div>
        {/* Dinner */}
        <div className="bg-lime-100 rounded-lg shadow pt-3 pb-3 pl-4 pr-4 w-full ">
          <h2 className="font-bold text-gray-700 text-md mb-2 ">🌃 Dinner</h2>
          {/* Thin Divider */}
          <div className="border-b border-gray-300 my-2"></div>
          <button className="text-blue-500 font-bold rounded-md  ">
            + ADD FOOD
          </button>
        </div>
        {/* Exercise */}
        <div className="bg-lime-100 rounded-lg shadow pt-3 pb-3 pl-4 pr-4 w-full ">
          <h2 className="font-bold text-gray-700 text-md mb-2 ">🏃🏻‍♂️ Exercise</h2>
          {/* Thin Divider */}
          <div className="border-b border-gray-300 my-2"></div>
          <button className="text-blue-500 font-bold rounded-md  ">
            + ADD EXERCISE
          </button>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalTitle}
        onConfirm={handleConfirm}
      />
    </div>
  );
}
