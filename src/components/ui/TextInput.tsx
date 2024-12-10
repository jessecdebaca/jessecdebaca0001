import React from 'react';
import { clsx } from 'clsx';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export function TextInput({ className, error, ...props }: TextInputProps) {
  return (
    <div>
      <input
        className={clsx(
          'appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300',
          'placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500',
          'focus:border-blue-500 focus:z-10 sm:text-sm',
          error && 'border-red-500',
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}