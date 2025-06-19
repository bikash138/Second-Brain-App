// LinkArea.tsx
import React from 'react';

interface LinkAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  registration?: ReturnType<any>; // Accepts register() result
  error?: string;
}

export default function LinkArea({ registration, error, ...props }: LinkAreaProps) {
  // Simple URL validation regex (optional, for UI feedback)
  const urlPattern = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/i;
  const isValid = !props.value || urlPattern.test(props.value as string);

  return (
    <div>
      <textarea
        {...props}
        {...registration}
        className={`w-full px-4 py-3 bg-gray-700 border ${isValid ? 'border-gray-600' : 'border-red-500'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none text-white placeholder-gray-400`}
        placeholder="Paste a valid link here..."
      />
      {!isValid && (
        <span className="text-red-400 text-xs mt-1 block">Please enter a valid URL (must start with http:// or https://)</span>
      )}
      {error && <span className="text-red-400 text-xs mt-1 block">{error}</span>}
    </div>
  );
}