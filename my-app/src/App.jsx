import './App.css'
import { useState } from 'react'
import InputSection from './InputSection.jsx'
import PolitenessSlider from './PolitenessSlider.jsx'
import RetrySection from './RetrySection.jsx'
import OutputSection from './OutputSection.jsx'
import callOpenAI from './utils/callOpenAI.js'

function App() {
  const [inputText, setInputText] = useState('')
  const [recipient, setRecipient] = useState('')
  const [customRecipient, setCustomRecipient] = useState('')
  const [politeness, setPoliteness] = useState(3)
  const [feedback, setFeedback] = useState('')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)

  const getAudience = () => {
    return recipient === 'Custom' ? customRecipient || 'Custom' : recipient || 'General'
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const result = await callOpenAI(
        inputText,
        getAudience(),
        politeness,
        feedback,
      )
      setOutput(result)
    } catch (err) {
      console.error(err)
      setOutput('Failed to fetch response.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-screen-md mx-auto mt-10 px-4 space-y-6">
      <InputSection
        inputValue={inputText}
        onInputChange={setInputText}
        recipient={recipient}
        customRecipient={customRecipient}
        onRecipientChange={setRecipient}
        onCustomRecipientChange={setCustomRecipient}
        onSubmit={handleSubmit}
      />
      <PolitenessSlider level={politeness} onLevelChange={setPoliteness} />
      <RetrySection
        feedback={feedback}
        onFeedbackChange={setFeedback}
        onRetry={handleSubmit}
      />
      {loading ? (
        <div className="text-center text-gray-600">Filtering...</div>
      ) : (
        <OutputSection output={output} />
      )}
    </div>
  )
}

export default App
