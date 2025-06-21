import React from 'react'
import { Calendar, Tag, ExternalLink } from 'lucide-react';

interface SearchResultCardProps {
  title: string;
  content: string;
  type: string;
  date: string;
  tags?: string[];
  url?: string;
  onClick?: () => void;
  className?: string;
}

const SearchCard = ({
  title,
  content,
  type,
  date,
  tags = [],
  url,
  onClick,
  className = ''
}: SearchResultCardProps) => {

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

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleTitleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <div
      className={`gap-y-3 group bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 hover:bg-gray-750 border border-gray-700 hover:border-gray-600 p-6 ${className}`}
      onClick={handleClick}
    >
      {/* Title */}
      <div className="mb-3">
        <h3
          className="text-lg font-semibold text-blue-400 hover:text-blue-300 transition-colors duration-200 line-clamp-2 cursor-pointer flex items-center gap-2"
          onClick={handleTitleClick}
        >
          <span className="flex-1">{title}</span>
          {url && (
            <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0" />
          )}
        </h3>
      </div>

      {/* Snippet */}
      <div className="mb-4">
        <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
          {content}
        </p>
      </div>

      {/* Metadata */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-gray-500">
        {/* Source and Date */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <span className="font-medium text-gray-400">{type}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{formatDate(date)}</span>
          </div>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <Tag className="w-3 h-3 text-gray-500" />
            <div className="flex gap-1 flex-wrap">
              {tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-700 text-gray-300 rounded-full text-xs font-medium hover:bg-gray-600 transition-colors duration-200"
                >
                  {tag}
                </span>
              ))}
              {tags.length > 3 && (
                <span className="px-2 py-1 bg-gray-700 text-gray-400 rounded-full text-xs">
                  +{tags.length - 3}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchCard
