const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

function cleanObjectList(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return [
    ...new Set(
      value
        .map((item) => String(item).trim().toLowerCase())
        .filter(Boolean)
        .map((item) => item.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
    )
  ].slice(0, 30);
}

export async function detectObjectsWithGroq({ base64, mimeType }) {
  if (!process.env.GROQ_API_KEY) {
    throw new Error("Falta GROQ_API_KEY en .env.local");
  }

  const response = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: process.env.GROQ_MODEL || "meta-llama/llama-4-scout-17b-16e-instruct",
      temperature: 0,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            'Eres un detector de objetos. Responde solo JSON valido con la forma {"objects":["objeto"]}. Usa sustantivos concretos en espanol, minusculas, sin frases largas.'
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text:
                "Identifica los objetos visibles de esta imagen. Devuelve entre 3 y 20 elementos utiles para busqueda."
            },
            {
              type: "image_url",
              image_url: {
                url: `data:${mimeType};base64,${base64}`
              }
            }
          ]
        }
      ]
    })
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Groq no pudo analizar la imagen: ${detail}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content || "{}";
  const parsed = JSON.parse(content);

  return cleanObjectList(parsed.objects);
}
