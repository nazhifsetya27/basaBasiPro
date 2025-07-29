import { useState } from 'react'
import RecipientSelector from './RecipientSelector.jsx'

function InputSection() {
  const [mode, setMode] = useState('text')

  const toggleMode = () => {
    setMode((prev) => (prev === 'text' ? 'voice' : 'text'))
  }

  return (
    <div className="bg-gray-100 rounded-xl px-4 py-3 space-y-4 shadow-md">
      <RecipientSelector />
      <div className="flex items-center justify-center gap-4">
        <span className={`font-medium ${mode === 'text' ? 'text-teal-600' : 'text-gray-500'}`}>Text</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={mode === 'voice'}
            onChange={toggleMode}
          />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-teal-500 peer-checked:bg-teal-500"></div>
          <div className="absolute top-0 left-0 w-6 h-6 bg-white border border-gray-300 rounded-full transition-transform peer-checked:translate-x-full"></div>
        </label>
        <span className={`font-medium ${mode === 'voice' ? 'text-teal-600' : 'text-gray-500'}`}>Voice</span>
      </div>
      {mode === 'text' ? (
        <textarea
          className="w-full h-32 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
          placeholder="Type your text here..."
        />
      ) : (
        <div className="flex flex-col items-center gap-4">
          <div className="w-full h-32 p-3 border rounded-md flex items-center justify-center text-gray-500 bg-white">
            Listening...
          </div>
          <button className="p-3 bg-teal-500 text-white rounded-full hover:bg-teal-600 focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 1v2m0 14a4 4 0 004-4V7a4 4 0 10-8 0v6a4 4 0 004 4zm0 0v5m-4 0h8"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}

export default InputSection
