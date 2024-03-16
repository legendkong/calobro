'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import useUser from '@/app/hook/useUser';
import Image from 'next/image';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { supabaseBrowser } from '@/lib/supabase/browser';
import { usePathname } from 'next/navigation';
import { protectedPaths } from '@/lib/constant';
import GoalSettingModal from '@/components/GoalSettingModal';

export default function Page() {
  const supabase = supabaseBrowser();
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [userDetails, setUserDetails] = useState({
    age: '',
    weight: '',
    height: '',
    goal: '',
  });

  const [totalCalories, setTotalCalories] = useState(0);
  const [totalProtein, setTotalProtein] = useState(0);
  const [totalCarbs, setTotalCarbs] = useState(0);
  const [totalFat, setTotalFat] = useState(0);

  const { isFetching, data } = useUser();
  const queryClient = useQueryClient();
  const router = useRouter();

  const pathname = usePathname();

  useEffect(() => {
    if (data?.id) {
      getAgeWeightHeight();
    }
  }, [data?.id]); // Dependency array ensures this effect runs when `data.id` changes

  if (isFetching) {
    return <></>;
  }

  const handleGoalSubmit = async ({ age, height, weight, goal }) => {
    await updateUserProfile({ age, height, weight, goal });
    await updateNutrition();
    setIsGoalModalOpen(false);
    setUserDetails({ age, height, weight, goal });
    // Fetch and update user data displayed on the page
  };

  const getAgeWeightHeight = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('age, weight, height, goal');

      if (error) {
        throw new Error(error.message);
      }

      if (data) {
        setUserDetails({
          age: data[0].age,
          weight: data[0].weight,
          height: data[0].height,
          goal: data[0].goal,
        });
      } else {
        // Handle the case where no data is returned
        console.log('No matching user profile found.');
      }
    } catch (error) {
      console.error('Failed to fetch user profile:', error.message);
      // Consider how you might want to handle errors in the UI
    }
  };

  const updateUserProfile = async ({ age, height, weight, goal }) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ age: age, height: height, weight: weight, goal: goal })
        .eq('id', data.id); // Ensure you have the user's ID

      // if (data[0].goal === 'Lose Weight')
      //   setTotalCalories(
      //     66.47 + 13.75 * weight + 5.003 * height - 6.75 * age - 200,
      //   );
      // else if (goal === 'Gain Weight')
      //   setTotalCalories(
      //     66.47 + 13.75 * weight + 5.003 * height - 6.75 * age + 200,
      //   );
      // else
      //   setTotalCalories(66.47 + 13.75 * weight + 5.003 * height - 6.75 * age);

      if (error) throw new Error(error.message);
    } catch (error) {
      console.error('Failed to update user profile:', error.message);
      // Consider setting an error state here and displaying it in your UI
    }
  };

  const updateNutrition = async () => {
    // Assuming 'weight', 'height', and 'age' are fetched and up-to-date
    const newTotalCalories =
      userDetails.goal === 'Lose Weight'
        ? Math.round(
            66.47 +
              13.75 * userDetails.weight +
              5.003 * userDetails.height -
              6.75 * userDetails.age -
              200,
          )
        : userDetails.goal === 'Gain Weight'
        ? Math.round(
            66.47 +
              13.75 * userDetails.weight +
              5.003 * userDetails.height -
              6.75 * userDetails.age +
              200,
          )
        : Math.round(
            66.47 +
              13.75 * userDetails.weight +
              5.003 * userDetails.height -
              6.75 * userDetails.age,
          );

    const newTotalProtein = Math.round(newTotalCalories * 0.3);
    const newTotalCarbs = Math.round(newTotalCalories * 0.5);
    const newTotalFat = Math.round(newTotalCalories * 0.2);

    // Update state
    setTotalCalories(newTotalCalories);
    setTotalProtein(newTotalProtein);
    setTotalCarbs(newTotalCarbs);
    setTotalFat(newTotalFat);
    console.log('Updating nutrition in Supabase', {
      newTotalCalories,
      newTotalProtein,
      newTotalCarbs,
      newTotalFat,
    });

    // update Supabase, using the new values directly
    const { error } = await supabase
      .from('profiles')
      .update({
        total_calories: Math.round(newTotalCalories),
        total_protein: Math.round(newTotalProtein),
        total_carbs: Math.round(newTotalCarbs),
        total_fat: Math.round(newTotalFat),
      })
      .eq('id', data.id); // Make sure to target the correct profile by ID

    if (error) {
      console.error('Failed to update nutrition profile:', error.message);
      // Handle error
    }
  };

  const handleLogout = async () => {
    const supabase = supabaseBrowser();
    queryClient.clear();
    await supabase.auth.signOut();
    router.refresh();
    if (protectedPaths.includes(pathname)) {
      router.replace('/auth?next=' + pathname);
    }
  };
  return (
    // if data is not available, show the sign in button
    <div className="flex flex-col items-center">
      {/* Removed justify-center and min-h-screen, added margin-top for some spacing from the top */}
      {!data?.id ? (
        <Link href="/auth" className="animate-fade">
          <Button variant="outline">Sign In</Button>
        </Link>
      ) : (
        <div className="profile-container flex flex-col items-center animate-fade">
          {data?.image_url ? (
            <Image
              src={data.image_url || ''}
              alt={data.display_name || ''}
              width={100}
              height={100}
              className="rounded-full ring-2 cursor-pointer mb-4"
              onClick={handleLogout}
            />
          ) : (
            <div
              className="h-[50px] w-[50px] flex items-center justify-center ring-1 rounded-full text-2xl font-bold cursor-pointer mb-4"
              onClick={handleLogout}
            >
              <h1>{data.email[0].toUpperCase()}</h1>
            </div>
          )}
          <h1 className="text-xl font-bold text-black mb-1">
            {data.display_name}
          </h1>
        </div>
      )}
      {/* age, weight and height div */}
      <div className="flex flex-row justify-around items-center bg-lime-100 rounded-lg shadow-md p-4 mt-2 mb-4 w-full max-w-xs">
        <div className="text-center">
          <p className="font-bold text-xl">{userDetails.age}</p>
          <p className="text-md">Age</p>
        </div>
        <div className="text-center">
          <p className="font-bold text-xl">{userDetails.weight}</p>
          <p className="text-md">Weight</p>
        </div>
        <div className="text-center">
          <p className="font-bold text-xl">{userDetails.height}</p>
          <p className="text-md">Height</p>
        </div>
      </div>
      <p className="text-sm">🏋️🏃🏻‍♂️🏊🏻🚴🏽</p>
      <p className="mt-1 text-green-600">You are doing great this week! 💪🏼</p>
      {/* New Full-Screen Bottom Div */}
      <div className="fixed inset-x-8 bottom-0 top-1/2 bg-lime-200 rounded-t-3xl overflow-hidden flex flex-col items-center">
        <div className="flex justify-between items-center w-80 rounded-xl p-2 border-2 border-white mt-5 bg-lime-100">
          <div className="p-2">
            <p className="text-gray-500">
              <span className="font-bold">Goal:</span> {userDetails.goal}
            </p>
          </div>
          <button
            className="bg-lime-200 text-xs text-gray-500 rounded-full p-2 pl-3 pr-3"
            onClick={() => setIsGoalModalOpen(true)}
          >
            Set Goals
          </button>
          <GoalSettingModal
            isOpen={isGoalModalOpen}
            onClose={() => setIsGoalModalOpen(false)}
            onSubmit={handleGoalSubmit}
          />
        </div>
        <p className="text-sm mt-3 text-gray-500">
          Log more food to track weekly insights
        </p>
        {/* Static Graph Placeholder */}
        <div className="w-full max-w-4xl h-64 rounded-xl shadow-lg p-4">
          <p className="text-xs text-left -mb-5 text-gray-700">Past 7 days</p>
          <div className="flex justify-between items-end h-full">
            <div className="w-1/12 bg-green-600 h-3/6 rounded"></div>
            {/* Example bar */}
            <div className="w-1/12 bg-green-600 h-4/6 rounded"></div>
            {/* Example bar */}
            <div className="w-1/12 bg-red-600 h-5/6 rounded"></div>
            {/* Example bar */}
            <div className="w-1/12 bg-green-600 h-2/6 rounded"></div>
            {/* Example bar */}
            <div className="w-1/12 bg-red-600 h-5/6 rounded"></div>
            {/* Example bar */}
            <div className="w-1/12 bg-green-600 h-2/6 rounded"></div>
            {/* Example bar */}
            <div className="w-1/12 bg-green-600 h-3/6 rounded"></div>
            {/* Example bar */}
          </div>
        </div>
      </div>
    </div>
  );
}
