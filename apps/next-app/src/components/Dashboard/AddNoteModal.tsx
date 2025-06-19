import React, { useState } from 'react';
import { X, FileText, Play, Image as ImageIcon, Upload, Plus } from 'lucide-react';
import { Note } from '../Types/types'

interface AddNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

const noteColors = [
  '#FFD700', // Yellow
  '#87CEEB', // Sky Blue
  '#98FB98', // Pale Green
  '#FFB6C1', // Light Pink
  '#DDA0DD', // Plum
  '#F0E68C', // Khaki
  '#FFA07A', // Light Salmon
  '#B0E0E6', // Powder Blue
];

export default function AddNoteModal({ isOpen, onClose, onAddNote }: AddNoteModalProps) {
  const [noteType, setNoteType] = useState<'text' | 'youtube' | 'image' | 'document'>('text');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedColor, setSelectedColor] = useState(noteColors[0]);

  const resetForm = () => {
    setNoteType('text');
    setTitle('');
    setContent('');
    setSelectedColor(noteColors[0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newNote: Omit<Note, 'id' | 'createdAt' | 'updatedAt'> = {
      type: noteType,
      title: title.trim(),
      content: content.trim(),
      color: selectedColor,
    };

    onAddNote(newNote);
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-gray-700">
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">Add New Note</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-full transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Note Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Note Type
            </label>
            <div className="grid grid-cols-4 gap-3">
              {[
                { type: 'text' as const, icon: FileText, label: 'Text', color: 'bg-blue-600 text-white' },
                { type: 'youtube' as const, icon: Play, label: 'YouTube', color: 'bg-red-600 text-white' },
                { type: 'image' as const, icon: ImageIcon, label: 'Image', color: 'bg-green-600 text-white' },
                { type: 'document' as const, icon: Upload, label: 'Document', color: 'bg-purple-600 text-white' },
              ].map(({ type, icon: Icon, label, color }) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setNoteType(type)}
                  className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all duration-200 ${
                    noteType === type
                      ? 'border-blue-500 bg-blue-600/20 scale-105'
                      : 'border-gray-600 hover:border-gray-500 hover:bg-gray-700'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${color} mb-2`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-medium text-gray-300">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Title Input */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter note title..."
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-white placeholder-gray-400"
              required
            />
          </div>

          {/* Content Input */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-2">
              {noteType === 'youtube' ? 'YouTube URL' : noteType === 'image' ? 'Image URL' : 'Content'}
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={
                noteType === 'youtube'
                  ? 'Paste YouTube URL here...'
                  : noteType === 'image'
                  ? 'Paste image URL here...'
                  : 'Enter your note content...'
              }
              rows={4}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none text-white placeholder-gray-400"
            />
          </div>

          {/* Color Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Note Color
            </label>
            <div className="flex flex-wrap gap-3">
              {noteColors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                    selectedColor === color
                      ? 'border-white scale-110 shadow-lg'
                      : 'border-gray-600 hover:border-gray-400'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Note</span>
          </button>
        </form>
      </div>
    </div>
  );
}