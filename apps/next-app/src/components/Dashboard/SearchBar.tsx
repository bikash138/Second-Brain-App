import React, { useState } from 'react';
import { MoveRight, Search, Sparkles, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';
import { SearchResult } from "@/Types/types"

interface SearchBarProps {
  searchResults: SearchResult[]
  setSearchResults: React.Dispatch<React.SetStateAction<SearchResult[]>>
}

export default function SearchBar({setSearchResults, searchResults}: SearchBarProps) {

  interface SearchInput{
    search: string
  }

  const {
    handleSubmit,
    register,
    reset
  } = useForm<SearchInput>({
    defaultValues:{
      search: ""
    }
  })

  const onsubmit = async(data: SearchInput) => {
    setLoading(true)
    try {
      const result = await axios.post('/api/search', data);
      setSearchResults(result.data?.results);
    }finally {
      reset();
      setLoading(false);
    }
  }
  
  const [loading, setLoading] = useState(false);
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
          
          <form onSubmit={handleSubmit(onsubmit)} className="flex w-full">
            <input
              type="text"
              autoComplete="off"
              {...register('search')}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Ask anything or search your notes..."
              className="block w-full pl-4 text-lg bg-transparent border-none outline-none placeholder-gray-500 text-white"
            />
            <button
              type={searchResults && searchResults.length > 0 ? "button" : "submit"}
              className={`w-12 ${!loading ? 'cursor-pointer' : 'cursor-default'}`}
              disabled={loading}
              onClick={
                searchResults && searchResults.length > 0
                  ? (e) => {
                      e.preventDefault();
                      setSearchResults([]);
                    }
                  : undefined
              }
            >
              {loading ? (
                <ThreeDots
                visible={true}
                height=""
                width="35"
                radius="9"
                color='#DDA0DD'
              />
                // <svg className="animate-spin h-6 w-6 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                //   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                //   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                // </svg>
              ) : (

                searchResults && searchResults.length > 0 ?(
                  <X className="text-gray-400 w-6 hover:text-red-400" />
                ) : (
                  <MoveRight className="text-gray-400 w-6 hover:text-gray-100" />
                )
              )}
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