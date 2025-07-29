import React from 'react'

function OutputSection({ output }) {
  if (!output) return null

  return (
    <div className="bg-teal-50 border border-teal-200 p-4 rounded-md shadow">
      <h2 className="font-semibold mb-2 text-teal-800">Filtered Message</h2>
      <p className="whitespace-pre-wrap text-gray-800">{output}</p>
    </div>
  )
}

export default OutputSection
