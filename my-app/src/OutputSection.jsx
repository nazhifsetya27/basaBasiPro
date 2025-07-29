import React from 'react'

function OutputSection({ output }) {
  if (!output) return null

  return (
    <div className="bg-white rounded p-4 shadow">
      <h2 className="font-semibold mb-2">Filtered Output</h2>
      <p className="whitespace-pre-wrap text-gray-700">{output}</p>
    </div>
  )
}

export default OutputSection
