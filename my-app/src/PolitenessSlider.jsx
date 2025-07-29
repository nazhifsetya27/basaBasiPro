import { useState } from 'react'

function PolitenessSlider() {
  const [level, setLevel] = useState(3)

  const getLabel = (value) => {
    switch (Number(value)) {
      case 1:
        return 'Casual'
      case 2:
        return 'Somewhat Casual'
      case 3:
        return 'Neutral'
      case 4:
        return 'Polite'
      case 5:
        return 'Very Polite'
      default:
        return ''
    }
  }

  return (
    <div className="w-full space-y-1">
      <label className="block text-sm font-medium text-gray-700" htmlFor="politeness-range">
        Politeness Level
      </label>
      <input
        id="politeness-range"
        type="range"
        min="1"
        max="5"
        step="1"
        value={level}
        onChange={(e) => setLevel(Number(e.target.value))}
        className="w-full accent-teal-500"
      />
      <div className="text-sm text-gray-600 text-center">{getLabel(level)}</div>
    </div>
  )
}

export default PolitenessSlider
