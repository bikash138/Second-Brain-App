'use client'
import React, { useState, useRef, useEffect } from 'react'; 
import { Plus } from 'lucide-react';
import Sidebar from "@/components/Dashboard/Sidebar"
import SearchBar from "@/components/Dashboard/SearchBar"
import NoteCard from "@/components/Dashboard/NoteCard"
import AddNoteModal from "@/components/Dashboard/AddNoteModal"
import { useNotes } from '@/hooks/useNotes'
import { Typewriter } from 'react-simple-typewriter';
import FadeIn from '@/components/FadeIn';
import axios from 'axios';
import SearchCard from '@/components/Dashboard/SearchCard';
import AllThoughtsSection from '@/components/Dashboard/AllThoughtsSection';
import {Element} from 'react-scroll'
import AboutSection from "@/components/Dashboard/AboutUs"
import Favourites from '@/components/Dashboard/Favourites';

function App() {
  const { notes, addNote, searchNotes, filterNotesByType } = useNotes();
  interface SearchResult {
    id: string;
    metadata: {
      title: string;
      type: string;
      createdAt: string;
    };
    pageContent: string;
  }

  const[allThoughts, setAllThoughts] = useState<any[]>([])
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const mainContentRef = useRef<HTMLDivElement>(null);

  // Apply both search and filter
  // const getFilteredNotes = () => {


  //   let filteredNotes = filterNotesByType(selectedFilter);
  //   if (searchQuery.trim()) {
  //     filteredNotes = filteredNotes.filter(note =>
  //       note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       note.type.toLowerCase().includes(searchQuery.toLowerCase())
  //     );
  //   }
  //   return filteredNotes;
  // };

  

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

  const sortedThoughts = [...allThoughts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  // const filteredNotes = getFilteredNotes();

  const handleNoteClick = (noteId: string) => {
    // Handle note click - could open in detail view
    console.log('Note clicked:', noteId);
  };

  const handleNoteEdit = (noteId: string) => {
    // Handle note edit
    console.log('Edit note:', noteId);
  };

  // const getFilterTitle = () => {
  //   if (searchQuery) {
  //     return `Search Results (${filteredNotes.length})`;
  //   }
    
  //   switch (selectedFilter) {
  //     case 'text':
  //       return 'Text Notes';
  //     case 'youtube':
  //       return 'Video Notes';
  //     case 'image':
  //       return 'Image Notes';
  //     case 'document':
  //       return 'Document Notes';
  //     default:
  //       return 'All Notes';
  //   }
  // };

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      {/* Header Section (Full Screen Overlay) */}
      <Element name='search'>
        <div className="h-screen flex flex-col items-center justify-center p-1 bg-gray-950 z-20 ">
          <h1 className="text-4xl font-bold text-purple-400 mb-2 text-center">
            <Typewriter
              words={['Hi there! What’s on your mind today?']}
              loop={1}
              cursor
              cursorStyle="_"
              cursorColor='#DDA0DD'
              typeSpeed={100}
              deleteSpeed={50}
              delaySpeed={1000}
            />
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
          <Favourites/>
        </Element>
        <Element name="thoughts">
          <AllThoughtsSection sortedThoughts={sortedThoughts} />
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