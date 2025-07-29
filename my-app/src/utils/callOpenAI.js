export default async function callOpenAI(inputText, recipient, politenessLevel, feedback = '') {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY
  if (!apiKey) {
    console.warn('OpenAI API key is missing.')
    throw new Error('API key is missing. Please check your .env setup.')
  }

  const promptParts = [
    'Please rewrite this message to be more polite and respectful.',
    `Audience: ${recipient}.`,
    `Politeness level: ${politenessLevel}.`,
  ]
  if (feedback) {
    promptParts.push(`Feedback: ${feedback}.`)
  }
  promptParts.push(`Message: ${inputText}`)

  const prompt = promptParts.join(' ')

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    }),
  })

  if (!res.ok) {
    throw new Error('Failed to fetch response')
  }

  const data = await res.json()
  return data.choices?.[0]?.message?.content?.trim() || ''
}
