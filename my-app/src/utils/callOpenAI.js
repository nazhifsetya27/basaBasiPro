export default async function callOpenAI(inputText, recipient, politenessLevel, feedback = '') {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY
  if (!apiKey) {
    console.warn('OpenAI API key is missing.')
    throw new Error('API key is missing. Please check your .env setup.')
  }

  const promptLines = [
    'You are a helpful assistant that rewrites rude or harsh messages to sound polite and professional.',
    `Recipient: ${recipient}`,
    `Politeness level: ${politenessLevel}`,
  ]
  if (feedback) {
    promptLines.push(`Feedback: ${feedback}`)
  }
  promptLines.push(`Original message: ${inputText}`)
  promptLines.push('Polite version:')

  const formattedPrompt = promptLines.join('\n')

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: formattedPrompt }],
    }),
  })

  if (!res.ok) {
    throw new Error('Failed to fetch response')
  }

  const data = await res.json()
  return data.choices?.[0]?.message?.content?.trim() || ''
}
