import React, { useState } from 'react';

const GoalSettingModal = ({ isOpen, onClose, onSubmit }) => {
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [goal, setGoal] = useState('');

  const isFormValid = age && height && weight && goal;

  const handleSubmit = async () => {
    if (!isFormValid) return;
    onSubmit({ age, height, weight, goal });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-lime-200 p-6 rounded-lg max-w-md w-full space-y-4">
        <h2 className="font-bold text-xl mb-4 text-center">🥦 Goal Setting</h2>
        <div className="space-y-2">
          <div className="flex flex-col">
            <label className="mb-2 font-semibold">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="25"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-semibold">Height (cm)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="170"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-semibold">Weight (kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="70"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-semibold">Goal</label>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="select bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option value="">Select a goal...</option>
              <option value="Lose Weight">Lose Weight</option>
              <option value="Maintain Weight">Maintain Weight</option>
              <option value="Gain Weight">Gain Weight</option>
            </select>
          </div>
        </div>
        <div className="flex justify-between">
          <button
            onClick={handleSubmit}
            disabled={!isFormValid}
            className={`mt-4 ${
              isFormValid
                ? 'bg-green-500 hover:bg-green-700 text-white'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            } font-bold py-2 px-4 rounded`}
          >
            Confirm
          </button>
          <button
            onClick={onClose}
            className="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoalSettingModal;
