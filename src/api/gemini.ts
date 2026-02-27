import { GoogleGenerativeAI } from '@google/generative-ai';

const SYSTEM_PROMPT = `
You are an Expert Fitness Data Analyst. Your task is to extract structured workout details from natural language descriptions.
Rules:
- Always return valid JSON matching the schema.
- Support multiple exercises in one sentence.
- For strength, include 'exerciseName', 'sets' (with 'reps' and 'weight').
- For cardio, include 'exerciseName', 'duration' (minutes).
- Default 'unit' to 'kg' if not specified.
- The output should be a JSON object with a 'workouts' array.

Schema:
{
  "workouts": [
    {
      "exerciseName": string,
      "type": "strength" | "cardio",
      "sets": [{ "reps": number, "weight": number }],
      "duration": number (only for cardio),
      "unit": string
    }
  ]
}
`;

export async function parseWorkoutDescription(text: string, apiKey: string) {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ 
    model: 'gemini-1.5-flash',
    generationConfig: { responseMimeType: 'application/json' }
  });

  const prompt = `System: ${SYSTEM_PROMPT}

User: ${text}`;
  
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const jsonText = response.text();
  
  try {
    return JSON.parse(jsonText);
  } catch (e) {
    console.error('Failed to parse Gemini response:', jsonText);
    throw new Error('Invalid response format from AI');
  }
}
