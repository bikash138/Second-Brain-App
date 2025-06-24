import React from 'react'
import FadeIn from '@/components/FadeIn';
import NoteCard from './NoteCard';
import { Thought } from '@/Types/types';

interface FavouriteSectionProps{
  favouriteThoughts: Thought[]
  favouriteIds: string[]
  onToggleFavourite: (id: string) => void
}

const Favourites = ({favouriteThoughts, favouriteIds, onToggleFavourite}: FavouriteSectionProps) => {
  return (
    <FadeIn>
      <div className="flex-1 lg:ml-0 my-20 border-t border-gray-800">
        {/* Main Content Area */}
        <div className="px-4 sm:px-6 lg:px-8 py-8 min-w-full">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-semibold text-white">
              </h2>
            </div>
          </div>
          {
            favouriteThoughts.length > 0 ? (
              <>
                <h1 
                  className="text-3xl font-bold mb-8 text-shadow-indigo-50 bg-clip-text drop-shadow-lg tracking-tight">
                    Favourites
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
                  {
                    favouriteThoughts.map((thought)=>(
                      <NoteCard
                          key={thought.id}
                          note={thought}
                          isFavourite={favouriteIds.includes(thought.id)}
                          onToggleFavourite={() => onToggleFavourite(thought.id)}
                        />
                    ))
                  }
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="bg-blue-900/40 rounded-full w-20 h-20 flex items-center justify-center mb-6 shadow-lg">
                  <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-2">No notes in Favourites</h3>
                <p className="text-gray-400 mb-4 text-center max-w-md">
                  You haven&apos;t added any notes to your favourites yet.<br />
                  Mark notes as favourites to see them here!
                </p>
              </div>
            )
          }
        </div>
      </div>
    </FadeIn>
  )
}

export default Favourites