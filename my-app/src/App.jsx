import './App.css'
import { useState } from 'react'
import InputSection from './InputSection.jsx'
import PolitenessSlider from './PolitenessSlider.jsx'
import RetrySection from './RetrySection.jsx'
import OutputSection from './OutputSection.jsx'

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
    const promptParts = [
      'Please rewrite this message to be more polite.',
      `Audience: ${getAudience()}.`,
      `Politeness level: ${politeness}.`,
    ]
    if (feedback) {
      promptParts.push(`Feedback: ${feedback}.`)
    }
    promptParts.push(`Original message: ${inputText}`)

    const prompt = promptParts.join(' ')

    setLoading(true)
    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
        }),
      })

      const data = await res.json()
      setOutput(data.choices?.[0]?.message?.content?.trim() || '')
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
