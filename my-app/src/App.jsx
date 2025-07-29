import './App.css'
import { useState } from 'react'
import InputSection from './InputSection.jsx'
import PolitenessSlider from './PolitenessSlider.jsx'
import RetrySection from './RetrySection.jsx'

function App() {
  const [inputText, setInputText] = useState('')

  return (
    <div className="max-w-screen-md mx-auto mt-10 px-4 space-y-6">
      <InputSection inputValue={inputText} onInputChange={setInputText} />
      <PolitenessSlider />
      <RetrySection previousInput={inputText} />
    </div>
  )
}

export default App
