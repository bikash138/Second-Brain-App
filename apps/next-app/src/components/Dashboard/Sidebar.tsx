import React from 'react';
import { FileText, Play, Image as ImageIcon, Upload, User, LogOut, Menu, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}

const filterOptions = [
  { id: 'all', label: 'All Notes', icon: FileText, count: 0 },
  { id: 'text', label: 'Text', icon: FileText, count: 0 },
  { id: 'youtube', label: 'Videos', icon: Play, count: 0 },
  { id: 'image', label: 'Images', icon: ImageIcon, count: 0 },
  { id: 'document', label: 'Documents', icon: Upload, count: 0 },
];

export default function Sidebar({ isOpen, onToggle, selectedFilter, onFilterChange }: SidebarProps) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full bg-gray-900 border-r border-gray-800 z-50 transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } w-64 lg:translate-x-0 lg:static lg:z-auto`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">Notes</h1>
          </div>
          <button
            onClick={onToggle}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors duration-200 lg:hidden"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {filterOptions.map((option) => {
              const Icon = option.icon;
              const isActive = selectedFilter === option.id;
              
              return (
                <button
                  key={option.id}
                  onClick={() => onFilterChange(option.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{option.label}</span>
                  {option.count > 0 && (
                    <span className={`ml-auto text-xs px-2 py-1 rounded-full ${
                      isActive ? 'bg-blue-500' : 'bg-gray-700'
                    }`}>
                      {option.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white font-medium">John Doe</p>
              <p className="text-gray-400 text-sm">john@example.com</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <button className="w-full flex items-center space-x-3 px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors duration-200">
              <User className="w-4 h-4" />
              <span>Profile</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-red-400 rounded-lg transition-colors duration-200">
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={onToggle}
        className="fixed top-4 left-4 z-30 p-3 bg-gray-900 hover:bg-gray-800 text-white rounded-xl shadow-lg transition-all duration-200 lg:hidden"
      >
        <Menu className="w-5 h-5" />
      </button>
    </>
  );
}