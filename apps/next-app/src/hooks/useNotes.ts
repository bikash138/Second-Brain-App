import { useState, useEffect } from 'react';
import { Note, YouTubeNote, ImageNote, DocumentNote } from '../components/Types/types'

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);

  // Load notes from localStorage on mount
  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      const parsedNotes = JSON.parse(savedNotes).map((note: any) => ({
        ...note,
        createdAt: new Date(note.createdAt),
        updatedAt: new Date(note.updatedAt),
      }));
      setNotes(parsedNotes);
    } else {
      // Add some sample notes for demo
      const sampleNotes: Note[] = [
        {
          id: '1',
          type: 'text',
          title: 'Welcome to Your Dark Notes!',
          content: 'This is your beautiful dark-themed note-taking app. You can add text notes, YouTube videos, images, and documents. Use the sidebar to filter by type and start organizing your thoughts!',
          color: '#FFD700',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          type: 'youtube',
          title: 'Inspiring TED Talk',
          content: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          color: '#87CEEB',
          createdAt: new Date(Date.now() - 86400000),
          updatedAt: new Date(Date.now() - 86400000),
        } as YouTubeNote,
        {
          id: '3',
          type: 'text',
          title: 'Project Ideas',
          content: '• Build a personal portfolio website\n• Learn a new programming language\n• Start a side project\n• Contribute to open source\n• Create a mobile app',
          color: '#98FB98',
          createdAt: new Date(Date.now() - 172800000),
          updatedAt: new Date(Date.now() - 172800000),
        },
        {
          id: '4',
          type: 'image',
          title: 'Beautiful Landscape',
          content: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg',
          color: '#FFB6C1',
          createdAt: new Date(Date.now() - 259200000),
          updatedAt: new Date(Date.now() - 259200000),
        } as ImageNote,
        {
          id: '5',
          type: 'document',
          title: 'Important Document.pdf',
          content: 'This is a sample document note',
          color: '#DDA0DD',
          createdAt: new Date(Date.now() - 345600000),
          updatedAt: new Date(Date.now() - 345600000),
        } as DocumentNote,
      ];
      
      // Add YouTube thumbnails and other properties for sample notes
      const updatedSampleNotes = sampleNotes.map(note => {
        if (note.type === 'youtube') {
          const youtubeNote = note as YouTubeNote;
          youtubeNote.videoId = 'dQw4w9WgXcQ';
          youtubeNote.thumbnail = `https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg`;
        } else if (note.type === 'image') {
          const imageNote = note as ImageNote;
          imageNote.imageUrl = note.content;
        } else if (note.type === 'document') {
          const docNote = note as DocumentNote;
          docNote.fileName = 'Important Document.pdf';
          docNote.fileType = 'PDF';
        }
        return note;
      });
      
      setNotes(updatedSampleNotes);
    }
  }, []);

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = (noteData: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date();
    let newNote: Note = {
      id: Date.now().toString(),
      ...noteData,
      createdAt: now,
      updatedAt: now,
    };

    // Handle YouTube notes
    if (noteData.type === 'youtube' && noteData.content) {
      const videoId = extractYouTubeId(noteData.content);
      if (videoId) {
        (newNote as YouTubeNote).videoId = videoId;
        (newNote as YouTubeNote).thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      }
    }

    // Handle image notes
    if (noteData.type === 'image' && noteData.content) {
      (newNote as ImageNote).imageUrl = noteData.content;
    }

    // Handle document notes
    if (noteData.type === 'document' && noteData.content) {
      const fileName = noteData.title || 'Document';
      const fileExtension = fileName.split('.').pop()?.toUpperCase() || 'FILE';
      (newNote as DocumentNote).fileName = fileName;
      (newNote as DocumentNote).fileType = fileExtension;
    }

    setNotes(prev => [newNote, ...prev]);
  };

  const updateNote = (id: string, updates: Partial<Note>) => {
    setNotes(prev =>
      prev.map(note =>
        note.id === id
          ? { ...note, ...updates, updatedAt: new Date() }
          : note
      )
    );
  };

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  const searchNotes = (query: string): Note[] => {
    if (!query.trim()) return notes;

    const lowercaseQuery = query.toLowerCase();
    return notes.filter(note =>
      note.title.toLowerCase().includes(lowercaseQuery) ||
      note.content.toLowerCase().includes(lowercaseQuery) ||
      note.type.toLowerCase().includes(lowercaseQuery)
    );
  };

  const filterNotesByType = (type: string): Note[] => {
    if (type === 'all') return notes;
    return notes.filter(note => note.type === type);
  };

  return {
    notes,
    addNote,
    updateNote,
    deleteNote,
    searchNotes,
    filterNotesByType,
  };
}

function extractYouTubeId(url: string): string | null {
  const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
}