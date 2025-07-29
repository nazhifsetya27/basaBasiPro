import { useState } from 'react'

function RetrySection({ previousInput }) {
  const [feedback, setFeedback] = useState('')

  const handleRetry = () => {
    console.log('Retrying with input:', previousInput, 'Feedback:', feedback)
    // API call will be integrated here
    setFeedback('')
  }

  return (
    <div className="bg-gray-100 rounded-md p-4 space-y-2">
      <label htmlFor="retry-feedback" className="block text-sm font-medium text-gray-700">
        Optional Feedback
      </label>
      <textarea
        id="retry-feedback"
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
        placeholder="e.g., Make it shorter or Too formal"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      />
      <button
        onClick={handleRetry}
        className="bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700"
      >
        Retry
      </button>
    </div>
  )
}

export default RetrySection
