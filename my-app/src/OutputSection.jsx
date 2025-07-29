import React from 'react'

function OutputSection({ output, error }) {
  if (!output && !error) return null

  return (
    <div className="bg-white rounded p-4 shadow">
      {error ? (
        <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>
      ) : (
        <>
          <h2 className="font-semibold mb-2">Filtered Output</h2>
          <p className="whitespace-pre-wrap text-gray-700">{output}</p>
        </>
      )}
    </div>
  )
}

export default OutputSection
