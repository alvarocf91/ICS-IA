const GROQ_MODEL = "meta-llama/llama-4-scout-17b-16e-instruct";

export async function detectObjectsWithGroq({ buffer, contentType }) {
  const apiKey = process.env.GROQ_API_KEY?.trim();

  if (!apiKey) {
    throw new Error("Falta GROQ_API_KEY en .env.local");
  }

  const base64Image = buffer.toString("base64");
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      temperature: 0.1,
      max_completion_tokens: 600,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text:
                "Analiza la imagen y devuelve solo JSON valido con esta forma: " +
                '{"objects":["objeto1","objeto2"]}. ' +
                "Incluye objetos, animales, personas, lugares o elementos visibles. " +
                "Usa sustantivos en espanol, en minusculas, sin articulos, sin duplicados y maximo 25 elementos.",
            },
            {
              type: "image_url",
              image_url: {
                url: `data:${contentType};base64,${base64Image}`,
              },
            },
          ],
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Groq ha devuelto ${response.status}: ${errorText}`);
  }

  const completion = await response.json();
  const rawContent = completion.choices?.[0]?.message?.content || "{}";
  const parsed = JSON.parse(rawContent);

  return normalizeObjects(parsed.objects);
}

function normalizeObjects(objects) {
  if (!Array.isArray(objects)) {
    return [];
  }

  const normalized = objects
    .map((item) => String(item).toLowerCase().trim())
    .map((item) => item.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
    .map((item) => item.replace(/[^a-z0-9ñ\s-]/gi, "").replace(/\s+/g, " "))
    .filter(Boolean);

  return [...new Set(normalized)];
}
