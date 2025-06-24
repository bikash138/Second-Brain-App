'use client'
import React, { useState, useEffect } from 'react'; 
import { Plus } from 'lucide-react';
import SearchBar from "@/components/Dashboard/SearchBar"
import AddNoteModal from "@/components/Dashboard/AddNoteModal"
import { useNotes } from '@/hooks/useNotes'
import { Typewriter } from 'react-simple-typewriter';
import axios from 'axios';
import SearchCard from '@/components/Dashboard/SearchCard';
import AllThoughtsSection from '@/components/Dashboard/AllThoughtsSection';
import {Element} from 'react-scroll'
import AboutSection from "@/components/Dashboard/AboutUs"
import Favourites from '@/components/Dashboard/Favourites';
import { Thought, SearchResult } from '@/Types/types'

function App() {
  const {addNote} = useNotes();

  const[allThoughts, setAllThoughts] = useState<Thought[]>([])
  const [favouriteThoughts, setFavouriteThoughts] =useState<Thought[]>([])
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Optimisation to be done using React Query or SWR
  useEffect(()=>{
    const getAllThought = async() => {
    try{
      const allThoughts = await axios.get("/api/getAllThought")
      setAllThoughts(allThoughts.data?.thought)
      console.log(allThoughts.data?.thought)
    }catch(error){
      console.log(error)
    }
  }
  getAllThought()
  },[])

  useEffect(()=>{
    const getPinnedThoughts = async() => {
    try{
      const pinnedThoughts = await axios.get("/api/getFavoriteThoughts")
      setFavouriteThoughts(pinnedThoughts.data?.thought)
      console.log(pinnedThoughts.data?.thought)
    }catch(error){
      console.log(error)
    }
  }
  getPinnedThoughts()
  },[])

  const sortedThoughts = [...allThoughts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const [favouriteIds, setFavouriteIds] = useState<string[]>(
  favouriteThoughts ? favouriteThoughts.map((thought) => thought.id) : []
  );

  useEffect(() => {
    setFavouriteIds(favouriteThoughts ? favouriteThoughts.map((thought) => thought.id) : []);
  }, [favouriteThoughts]);

  const handleToggleFavourite = async (noteId: string) => {
    setFavouriteIds(ids =>
      ids.includes(noteId)
        ? ids.filter(id => id !== noteId)
        : [...ids, noteId]
    );
    try {
      await axios.patch('/api/markThought', { thoughtId: noteId });
    } catch (error) {
      console.log(error)
      // Revert local state if API fails
      setFavouriteIds(ids =>
        ids.includes(noteId)
          ? ids.filter(id => id !== noteId)
          : [...ids, noteId]
      );
      alert("Failed to update favourite status!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      {/* Header Section (Full Screen Overlay) */}
      <Element name='search'>
        <div className="h-screen flex flex-col items-center justify-center p-1 bg-gray-950 z-20 ">
          <h1 className="text-4xl font-bold mb-2 text-center bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
            Hi there!{' '}
            <span>
              <Typewriter
                words={["What’s on your mind today?"]}
                loop={1}
                cursor
                cursorStyle="_"
                cursorColor="#DDA0DD"
                typeSpeed={100}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </span>
          </h1>
          <p className="text-gray-400 text-lg mb-8 text-center">
            Capture your ideas in any format. Search and organize your digital brain instantly
          </p>
          <SearchBar setSearchResults={setSearchResults} searchResults={searchResults}/>
          <div className='space-y-4'>
            {
              searchResults.map((result) => (
                <SearchCard
                  key={result.id}
                  title={result.metadata.title}
                  content={result.pageContent}
                  type={result.metadata.type}
                  date={result.metadata.createdAt}
                />
              ))
            }
          </div>
        </div>
      </Element>

      {/* Main Content (hidden behind header, scrolls into view) */}
      <div className="flex-1 lg:ml-0">
        {/* Main Content */}
        <Element name='favourites'>
          <Favourites 
            favouriteThoughts={favouriteThoughts}
            favouriteIds={favouriteIds}
            onToggleFavourite={handleToggleFavourite}
          />
        </Element>
        <Element name="thoughts">
          <AllThoughtsSection 
            sortedThoughts={sortedThoughts}
            favouriteIds={favouriteIds}
            onToggleFavourite={handleToggleFavourite}
          />
        </Element>
        <Element name='aboutus'>
          <AboutSection/>
        </Element>

        {/* Floating Action Button */}
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="cursor-pointer fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-50"
          aria-label="Add new note"
        >
          <Plus className="w-6 h-6" />
        </button>

        {/* Add Note Modal */}
        <AddNoteModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddNote={addNote}
        />
      </div>
    </div>
  );
}

export default App;