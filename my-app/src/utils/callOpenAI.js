export default async function callOpenAI(
  inputText,
  recipient,
  politenessLevel,
  feedback = ""
) {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  if (!apiKey) {
    console.warn("OpenAI API key is missing.");
    throw new Error("API key is missing. Please check your .env setup.");
  }

  const promptLines = [
    `Ubah kalimat berikut menjadi versi yang lebih sopan, profesional, dan tidak menyinggung.`,
    `Konteks penerima: ${recipient}`,
    `Tingkat kesopanan (1-5): ${politenessLevel}`,
  ];
  if (feedback) {
    promptLines.push(`Catatan tambahan: ${feedback}`);
  }
  promptLines.push(`Kalimat asli: "${inputText}"`);
  promptLines.push(
    `\nBalas hanya dengan versi yang sudah diperhalus, tanpa penjelasan.`
  );

  const formattedPrompt = promptLines.join("\n");

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      // messages: [{ role: 'user', content: formattedPrompt }],
      messages: [
        {
          role: "system",
          content: `You are a polite rewriting assistant. You will receive messages that may sound harsh, emotional, or rude.
Your job is to rewrite them into polite and professional messages suitable for communication with others (e.g., boss, client, coworker), in Bahasa Indonesia.
Return only the rewritten message, without any explanation.`,
        },
        {
          role: "user",
          content: formattedPrompt,
        },
      ],
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch response");
  }

  const data = await res.json();
  const result = data.choices?.[0]?.message?.content?.trim() || "";

  if (
    result.toLowerCase().includes("error") ||
    result.toLowerCase().includes("api") ||
    result.toLowerCase().includes("communication")
  ) {
    throw new Error("Invalid model output — retry or adjust prompt.");
  }
  return result;
}
