'use client'
import React, { useState, useRef } from 'react'; 
import { Plus } from 'lucide-react';
import Sidebar from "@/components/Dashboard/Sidebar"
import SearchBar from "@/components/Dashboard/SearchBar"
import NoteCard from "@/components/Dashboard/NoteCard"
import AddNoteModal from "@/components/Dashboard/AddNoteModal"
import { useNotes } from '@/hooks/useNotes'

function App() {
  const { notes, addNote, searchNotes, filterNotesByType } = useNotes();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const mainContentRef = useRef<HTMLDivElement>(null);

  // Apply both search and filter
  const getFilteredNotes = () => {
    let filteredNotes = filterNotesByType(selectedFilter);
    if (searchQuery.trim()) {
      filteredNotes = filteredNotes.filter(note =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.type.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return filteredNotes;
  };

  const filteredNotes = getFilteredNotes();

  const handleNoteClick = (noteId: string) => {
    // Handle note click - could open in detail view
    console.log('Note clicked:', noteId);
  };

  const handleNoteEdit = (noteId: string) => {
    // Handle note edit
    console.log('Edit note:', noteId);
  };

  const getFilterTitle = () => {
    if (searchQuery) {
      return `Search Results (${filteredNotes.length})`;
    }
    
    switch (selectedFilter) {
      case 'text':
        return 'Text Notes';
      case 'youtube':
        return 'Video Notes';
      case 'image':
        return 'Image Notes';
      case 'document':
        return 'Document Notes';
      default:
        return 'All Notes';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Header Section (Full Screen Overlay) */}
      <div className="h-screen flex flex-col items-center justify-center bg-gray-900 z-20">
        <h1 className="text-4xl font-bold text-white mb-2 text-center">
          Hi there! What’s on your mind today?
        </h1>
        <p className="text-gray-400 text-lg mb-8 text-center">
          Capture your ideas in any format. Search and organize your digital brain instantly
        </p>
        <SearchBar onSearch={setSearchQuery} searchQuery={searchQuery} />
      </div>

      {/* Main Content (hidden behind header, scrolls into view) */}
      <div className="flex-1 lg:ml-0">
        {/* Main Content */}
        <div className="flex-1 lg:ml-0 my-20">
          {/* Main Content Area */}
          <div className="px-4 sm:px-6 lg:px-8 py-8 min-w-full">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <h2 className="text-2xl font-semibold text-white">
                  {getFilterTitle()}
                </h2>
                {(searchQuery || selectedFilter !== 'all') && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedFilter('all');
                    }}
                    className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            </div>

            {/* Notes Grid */}
            {filteredNotes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredNotes.map((note) => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    onClick={() => handleNoteClick(note.id)}
                    onEdit={() => handleNoteEdit(note.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <div className="bg-gray-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Plus className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {searchQuery || selectedFilter !== 'all' ? 'No notes found' : 'No notes yet'}
                  </h3>
                  <p className="text-gray-400 mb-6">
                    {searchQuery || selectedFilter !== 'all'
                      ? 'Try adjusting your search terms or filters, or add a new note.'
                      : 'Start by creating your first note. You can add text, YouTube links, images, or documents.'}
                  </p>
                  <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl transition-colors duration-200"
                  >
                    Add Your First Note
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Floating Action Button */}
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-50"
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