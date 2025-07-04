import React from 'react'
import FadeIn from '@/components/FadeIn';
import NoteCard from './NoteCard';
import { Thought } from '@/Types/types';

interface FavouriteSectionProps{
  sortedThoughts: Thought[]
  favouriteIds: string[]
  onToggleFavourite: (id: string) => void
}

const AllThoughtsSection = ({sortedThoughts,favouriteIds, onToggleFavourite}: FavouriteSectionProps) => {
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
            sortedThoughts.length > 0 ? (
              <>
              <h1 
                className="text-3xl font-bold mb-8 text-shadow-indigo-50 bg-clip-text drop-shadow-lg tracking-tight">
                  Recent Thoughts
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
                {
                  sortedThoughts.map((thought)=>(
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
            //   <div className="text-center py-16">
            //   <div className="max-w-md mx-auto">
            //     <div className="bg-gray-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            //       <Plus className="w-8 h-8 text-gray-400" />
            //     </div>
            //     <h3 className="text-xl font-semibold text-white mb-2">
            //       {searchQuery || selectedFilter !== 'all' ? 'No notes found' : 'No notes yet'}
            //     </h3>
            //     <p className="text-gray-400 mb-6">
            //       {searchQuery || selectedFilter !== 'all'
            //         ? 'Try adjusting your search terms or filters, or add a new note.'
            //         : 'Start by creating your first note. You can add text, YouTube links, images, or documents.'}
            //     </p>
            //     <button
            //       onClick={() => setIsAddModalOpen(true)}
            //       className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl transition-colors duration-200"
            //     >
            //       Add Your First Note
            //     </button>
            //   </div>
            // </div>
            <div>Please add notes</div>
            )
          }
        </div>
      </div>
    </FadeIn>
  )
}

export default AllThoughtsSection