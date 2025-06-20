import React, { useState } from 'react';
import { Search, Sparkles } from 'lucide-react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

interface SearchBarProps {
  onSearch: (query: string) => void;
  searchQuery: string;
}

export default function SearchBar({ onSearch, searchQuery }: SearchBarProps) {

  const {
    handleSubmit,
    register
  } = useForm()

  //@ts-ignore
  const onsubmit = async(data) => {
    const result = await axios.post('/api/search', data)
    console.log(result.data?.results)
  }

  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative w-full max-w-4xl mx-auto mb-8">
      <div className={`relative bg-gray-800 rounded-4xl border-2 transition-all duration-300 ${
        isFocused ? 'border-blue-500 shadow-xl shadow-blue-500/20 scale-[1.02]' : 'border-gray-700 hover:border-gray-600'
      }`}>
        <div className="flex items-center px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-full transition-colors duration-200 ${
              isFocused ? 'bg-blue-600' : 'bg-gray-700'
            }`}>
              {isFocused ? (
                <Sparkles className={`w-5 h-5 transition-colors duration-200 ${
                  isFocused ? 'text-white' : 'text-gray-400'
                }`} />
              ) : (
                <Search className="w-5 h-5 text-gray-400" />
              )}
            </div>
          </div>
          
          <form onSubmit={handleSubmit(onsubmit)}>
            <input
              type="text"
              {...register('search')}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Ask anything or search your notes..."
            className="flex-1 ml-4 text-lg bg-transparent border-none outline-none placeholder-gray-500 text-white"
            />
            <button className='cursor-pointer pointer ml-6'>
              Search
            </button>
          </form>
        </div>
        
        {/* {isFocused && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 rounded-2xl shadow-xl border border-gray-700 p-4 z-10">
            <div className="text-sm text-gray-400">
              <p className="mb-2 font-medium text-gray-300">Search suggestions:</p>
              <div className="flex flex-wrap gap-2">
                {['Recent notes', 'YouTube videos', 'Documents', 'Images'].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => onSearch(suggestion.toLowerCase())}
                    className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-full text-sm transition-colors duration-200"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
}