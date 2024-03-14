import React, { useState } from 'react';

// Mock function to simulate API call
const fetchResultsFromAPI = async (query) => {
  console.log(`Searching for: ${query}`);
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // Return mock result
  return `Results for ${query}`;
};

const Modal = ({ isOpen, onClose, title, onConfirm }) => {
  const [query, setQuery] = useState('');
  const [searchResult, setSearchResult] = useState('');

  const handleSearch = async () => {
    const result = await fetchResultsFromAPI(query);
    setSearchResult(result);
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center z-20 items-center">
        <div className="bg-lime-200 p-4 rounded-3xl max-w-md w-full">
          <h2 className="font-bold mb-4 text-center">{title}</h2>
          <div className="flex items-center bg-gray-200 rounded-full p-2">
            <span>🔍</span> {/* Placeholder for magnifying glass icon */}
            <input
              className="bg-transparent flex-grow p-2 rounded-full"
              placeholder="Old Chang Kee Currypuff "
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="font-bold ml-2" onClick={() => setQuery('')}>
              X
            </button>
            <button
              className="ml-2 mr-2 bg-blue-200 rounded-2xl font-bold p-2  text-xs"
              onClick={handleSearch}
            >
              GO
            </button>
          </div>
          {searchResult && (
            <div>
              <p className="mt-4">{searchResult}</p>
              <button
                className="mt-2"
                onClick={() => {
                  onConfirm(searchResult);
                  onClose();
                }}
              >
                Confirm
              </button>
            </div>
          )}
          <button className="mt-4" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    )
  );
};

export default Modal;
