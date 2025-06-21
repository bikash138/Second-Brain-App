import React from 'react';
import { FileText, Play, Image as ImageIcon, FileX, Calendar, Edit3 } from 'lucide-react';
import { Note, YouTubeNote, ImageNote, DocumentNote } from '@/Types/types'

interface NoteCardProps {
  note: Note;
  onClick?: () => void;
  onEdit?: () => void;
}

export default function NoteCard({ note, onClick, onEdit }: NoteCardProps) {
  const formatDate = (dateString: string | Date) => {
    const date = typeof dateString === "string" ? new Date(dateString) : dateString;
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // const renderPreview = () => {
  //   switch (note.type) {
  //     case 'VIDEO':
  //       const youtubeNote = note as YouTubeNote;
  //       return (
  //         <div className="relative mb-3 rounded-lg overflow-hidden">
  //           <img
  //             src={youtubeNote.thumbnail}
  //             alt="YouTube thumbnail"
  //             className="w-full h-32 object-cover"
  //           />
  //           <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
  //             <div className="bg-red-600 rounded-full p-2">
  //               <Play className="w-6 h-6 text-white fill-current" />
  //             </div>
  //           </div>
  //         </div>
  //       );
      
  //     // case 'image':
  //     //   const imageNote = note as ImageNote;
  //     //   return (
  //     //     <div className="mb-3 rounded-lg overflow-hidden">
  //     //       <img
  //     //         src={imageNote.imageUrl}
  //     //         alt="Note image"
  //     //         className="w-full h-32 object-cover"
  //     //       />
  //     //     </div>
  //     //   );
      
  //     // case 'document':
  //       const docNote = note as DocumentNote;
  //       return (
  //         <div className="mb-3 flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
  //           <div className="p-2 bg-blue-600 rounded-lg">
  //             <FileText className="w-6 h-6 text-white" />
  //           </div>
  //           <div className="flex-1 min-w-0">
  //             <p className="text-sm font-medium text-white truncate">
  //               {docNote.fileName}
  //             </p>
  //             <p className="text-xs text-gray-400 uppercase">
  //               {docNote.fileType}
  //             </p>
  //           </div>
  //         </div>
  //       );
      
  //     default:
  //       return null;
  //   }
  // };

  // const getIconForType = () => {
  //   switch (note.type) {
  //     case 'youtube':
  //       return <Play className="w-4 h-4" />;
  //     case 'image':
  //       return <ImageIcon className="w-4 h-4" />;
  //     case 'document':
  //       return <FileText className="w-4 h-4" />;
  //     default:
  //       return <FileX className="w-4 h-4" />;
  //   }
  // };

  return (
    <div
      onClick={onClick}
      className={`group relative bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border-l-4 hover:bg-slate-950`}
      style={{ borderLeftColor: note.color }}
    >
      <div className="p-4">
        {/* {renderPreview()} */}
        
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-white text-lg leading-tight line-clamp-2">
            {note.title}
          </h3>
          <button
            onClick={(e) => {
              e.stopPropagation();
              // onEdit();
            }}
            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-700 rounded-md transition-all duration-200"
          >
            <Edit3 className="w-4 h-4 text-gray-400" />
          </button>
        </div>
        
        {note.content ? (
          <p className="text-gray-300 text-sm leading-relaxed line-clamp-3 mb-3">
            {note.content}
          </p>
        ) : (
          <p className="text-gray-300 text-sm leading-relaxed line-clamp-3 mb-3">
            {/* {note.url} */}
          </p>
        )}
        
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            {/* {getIconForType()} */}
            <span className="capitalize">{note.type}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="w-3 h-3" />
            <span>{formatDate(note.createdAt)}</span>
          </div>
        </div>
      </div>
      
      <div
        className="absolute top-0 left-0 w-1 h-full rounded-l-xl opacity-80"
        style={{ backgroundColor: note.color }}
      />
    </div>
  );
}