'use client';
import { useState, useEffect } from 'react';
import { supabaseBrowser } from '@/lib/supabase/browser';

export default function Page() {
  const supabase = supabaseBrowser();
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState(null); // State to hold the selected recipe
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [filter, setFilter] = useState(''); // State to hold the current filter

  useEffect(() => {
    const fetchRecipes = async () => {
      let { data, error } = await supabase.from('recipe').select('*');
      if (error) console.log('error', error);
      else {
        setRecipes(data);
        setFilteredRecipes(data);
      }
      setLoading(false);
    };

    fetchRecipes();
  }, []);

  const handleSearch = (event) => {
    const searchText = event.target.value.toLowerCase();
    const filtered = recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchText),
    );
    setFilteredRecipes(filtered);
  };

  const applyFilter = (newFilter) => {
    setFilter(newFilter);
    const filtered = recipes.filter((recipe) =>
      recipe.helpswith.includes(newFilter),
    );
    setFilteredRecipes(filtered);
  };

  const clearFilter = () => {
    setFilter('');
    setFilteredRecipes(recipes);
  };

  const openModal = (recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (loading)
    return (
      <div>
        <div className="flex flex-col items-center min-h-screen">
          <header className="text-center py-5 text-xl font-bold pt-20 mt-30">
            <p className="font-semibold">Loading</p> 🥦 Calo
            <span className="text-orange-500">bro</span>
            <p className="font-semibold">recipes...</p>
          </header>
        </div>
      </div>
    );

  return (
    <div className="px-4 sm:px-6 lg:px-8 mb-20">
      <div className="py-3">
        <input
          type="text"
          placeholder="🔍 Search recipes ..."
          onChange={handleSearch}
          className="p-2 block  w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        <div className="mt-3 text-xs flex flex-wrap -mx-2 font-bold">
          <button
            onClick={() => applyFilter('Protein')}
            className="border-2 border-orange-300 text-slate-950 px-1 rounded text-sm flex-1 mx-2"
          >
            💪🏼 Protein
          </button>
          <button
            onClick={() => applyFilter('Sugar')}
            className="border-2 border-orange-300 text-slate-950 py-1 px-1 rounded text-sm flex-1 mx-2"
          >
            ⬇️ Sugar
          </button>
          <button
            onClick={() => applyFilter('cholesterol')}
            className="border-2 border-orange-300 text-slate-950 py-1 px-1 rounded text-sm flex-1 mx-2"
          >
            🫀 Cholesterol
          </button>
          <button
            onClick={clearFilter}
            className="bg-red-500 text-white py-1 mt-2 px-3 rounded text-sm flex-1 mx-2"
          >
            Clear Filter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex items-center space-x-2">
                <p className="text-sm text-orange-500">{recipe.category}</p>
                <span className="text-xs bg-purple-200 text-gray-700 py-1 px-2 rounded-full">
                  {recipe.calories} kcal 🔥
                </span>
              </div>
              <h3 className="text-lg font-semibold">{recipe.title}</h3>
              <p className="text-sm">Tags: {recipe.helpswith}</p>
              <button
                onClick={() => openModal(recipe)}
                className="bg-orange-400 p-1 mt-3 pl-3 pr-3 rounded-lg text-sm"
              >
                Get Recipe
              </button>
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && selectedRecipe && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto mb-20">
          <div className="relative top-20 mx-auto p-10 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-1 text-left">
              <h3 className="text-lg text-center leading-6 font-medium text-gray-900">
                {selectedRecipe.title}
              </h3>
              <div className="mt-2">
                <img
                  src={selectedRecipe.image}
                  alt={selectedRecipe.title}
                  className="w-full"
                />
                <p className="text-sm text-gray-500 mt-4">
                  <p className="font-bold text-left text-black">Ingredients</p>
                  {selectedRecipe.ingredients
                    .split('- ')
                    .map((ingredient, index) => (
                      <p key={index}>{ingredient}</p>
                    ))}
                </p>
                <p className="mt-4 text-sm font-bold text-left text-black">
                  Method
                </p>
                <p className="text-sm text-gray-500">
                  {selectedRecipe.method
                    .split(/(?=\d+\.)/)
                    .map((step, index) => (
                      <p key={index}>{step.trim()}</p>
                    ))}
                </p>
                <div className="mt-4">
                  <p className="text-sm font-bold">Nutritional Info:</p>
                  <p className="text-sm text-gray-500">
                    Total Calories: {selectedRecipe.calories} kcal
                  </p>
                  <p className="text-sm text-gray-500">
                    Carbs: {selectedRecipe.carbs}g
                  </p>
                  <p className="text-sm text-gray-500">
                    Fats: {selectedRecipe.fats}g
                  </p>
                  <p className="text-sm text-gray-500">
                    Protein: {selectedRecipe.protein}g
                  </p>
                </div>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-orange-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
