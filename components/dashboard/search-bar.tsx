import React, { useState, useEffect } from 'react';
import { useAppStore } from '@/store/app-store';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { debounce } from '@/lib/utils';

export const SearchBar = () => {
  const { 
    searchFilters, 
    updateSearchQuery, 
    clearSearch, 
    addRecentSearch, 
    recentSearches 
  } = useAppStore();
  
  const [inputValue, setInputValue] = useState(searchFilters.query);
  const [showRecentSearches, setShowRecentSearches] = useState(false);
  
  // Debounced search function
  const debouncedSearch = debounce((value: string) => {
    updateSearchQuery(value);
  }, 300);
  
  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedSearch(value);
  };
  
  // Handle search submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateSearchQuery(inputValue);
    if (inputValue.trim()) {
      addRecentSearch(inputValue.trim());
    }
  };
  
  // Handle clear search
  const handleClear = () => {
    setInputValue('');
    clearSearch();
  };
  
  // Handle selecting a recent search
  const handleSelectRecentSearch = (query: string) => {
    setInputValue(query);
    updateSearchQuery(query);
    setShowRecentSearches(false);
  };
  
  // Close recent searches dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowRecentSearches(false);
    };
    
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  
  return (
    <div className="relative w-full max-w-md">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center">
          <Input
            type="text"
            placeholder="Search assets, KPIs, and more..."
            value={inputValue}
            onChange={handleInputChange}
            onFocus={() => setShowRecentSearches(true)}
            leftIcon={
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 20 20" 
                fill="currentColor" 
                className="w-5 h-5"
              >
                <path 
                  fillRule="evenodd" 
                  d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" 
                  clipRule="evenodd" 
                />
              </svg>
            }
            rightIcon={
              inputValue ? (
                <button 
                  type="button" 
                  onClick={handleClear}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor" 
                    className="w-5 h-5"
                  >
                    <path 
                      d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" 
                    />
                  </svg>
                </button>
              ) : null
            }
            fullWidth
            className="pr-20"
          />
          <Button 
            type="submit" 
            className="absolute right-0 rounded-l-none"
          >
            Search
          </Button>
        </div>
      </form>
      
      {/* Recent searches dropdown */}
      {showRecentSearches && recentSearches.length > 0 && (
        <div 
          className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg" 
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-2 text-sm font-medium text-gray-500">
            Recent Searches
          </div>
          <ul className="max-h-60 overflow-auto">
            {recentSearches.map((query, index) => (
              <li key={index}>
                <button
                  type="button"
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center"
                  onClick={() => handleSelectRecentSearch(query)}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor" 
                    className="w-4 h-4 mr-2 text-gray-400"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5.5a.75.75 0 001.5 0V5z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                  {query}
                </button>
              </li>
            ))}
          </ul>
          <div className="p-2 border-t border-gray-200">
            <button
              type="button"
              className="w-full px-2 py-1 text-xs text-center text-gray-500 hover:text-gray-700"
              onClick={handleClear}
            >
              Clear Recent Searches
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
