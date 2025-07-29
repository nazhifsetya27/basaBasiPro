import { useState } from 'react'
import RecipientSelector from './RecipientSelector.jsx'

function InputSection({
  inputValue,
  onInputChange,
  recipient,
  customRecipient,
  onRecipientChange,
  onCustomRecipientChange,
  onSubmit,
}) {
  const [mode, setMode] = useState('text')


  return (
    <div className="bg-white rounded-xl p-6 space-y-6 shadow-md text-gray-700">
      <RecipientSelector
        recipient={recipient}
        customRecipient={customRecipient}
        onRecipientChange={onRecipientChange}
        onCustomRecipientChange={onCustomRecipientChange}
      />
      <div className="flex items-center justify-center gap-0 rounded-md overflow-hidden border divide-x w-max mx-auto">
        <button
          className={`px-4 py-2 text-sm font-medium flex-1 ${mode === 'text' ? 'bg-teal-500 text-white' : 'bg-gray-100 text-gray-700'}`}
          onClick={() => setMode('text')}
        >
          Text
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium flex-1 ${mode === 'voice' ? 'bg-teal-500 text-white' : 'bg-gray-100 text-gray-700'}`}
          onClick={() => setMode('voice')}
        >
          Voice
        </button>
      </div>
      {mode === 'text' ? (
        <textarea
          className="w-full h-32 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
          placeholder="Type your text here..."
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
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
      <button
        onClick={onSubmit}
        className="bg-teal-600 text-white rounded-md px-4 py-2 hover:bg-teal-700"
      >
        Submit
      </button>
    </div>
  )
}

export default InputSection
