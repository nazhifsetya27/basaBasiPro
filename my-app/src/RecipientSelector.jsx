import { useState } from 'react'

function RecipientSelector() {
  const [recipient, setRecipient] = useState('')
  const [customRecipient, setCustomRecipient] = useState('')

  const handleChange = (e) => {
    setRecipient(e.target.value)
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="font-medium text-gray-700">Recipient</label>
      <select
        className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
        value={recipient}
        onChange={handleChange}
      >
        <option value="">Select Recipient</option>
        <option>Boss</option>
        <option>Client</option>
        <option>Coworker</option>
        <option>Subordinate</option>
        <option>Lecturer</option>
        <option>Student</option>
        <option>Custom</option>
      </select>
      {recipient === 'Custom' && (
        <input
          type="text"
          className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="Enter custom recipient"
          value={customRecipient}
          onChange={(e) => setCustomRecipient(e.target.value)}
        />
      )}
    </div>
  )
}

export default RecipientSelector
