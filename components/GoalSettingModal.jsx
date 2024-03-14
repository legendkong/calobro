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
      <div className="bg-white p-4 rounded-lg max-w-md w-full">
        <div>
          <label>Age</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="input"
          />
        </div>
        <div>
          <label>Height (cm)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="input"
          />
        </div>
        <div>
          <label>Weight (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="input"
          />
        </div>
        <div>
          <label>Goal</label>
          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="select"
          >
            <option value="">Select a goal...</option>
            <option value="Lose Weight">Lose Weight</option>
            <option value="Maintain Weight">Maintain Weight</option>
            <option value="Gain Weight">Gain Weight</option>
          </select>
        </div>
        <button
          onClick={handleSubmit}
          disabled={!isFormValid}
          className={!isFormValid ? 'button-disabled' : 'button'}
        >
          Confirm
        </button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default GoalSettingModal;
