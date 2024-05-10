'use client';
import { useState, useEffect } from 'react';
import { supabaseBrowser } from '@/lib/supabase/browser';

export default function Page() {
  const supabase = supabaseBrowser();
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

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
          placeholder="Search recipes..."
          onChange={handleSearch}
          className="p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
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
              <p className="text-sm text-orange-500">{recipe.category}</p>
              <h3 className="text-lg font-semibold">{recipe.title}</h3>
              <p className="text-sm">Tags: {recipe.helpswith}</p>
              <button className="bg-orange-400 p-1 mt-3 pl-5 pr-5 rounded-lg">
                View
              </button>
              {/* You can add more details here */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
