import { google } from '@ai-sdk/google';
import { openai } from '@ai-sdk/openai';
import { generateObject, generateText } from "ai";
import { z } from 'zod';

export async function generateQuery(doctor: string, prompt: string, type: 'questions' | 'consultation') {
  if (type === 'questions') {
    const schema = z.object({
      questions: z.array(z.object({
        question: z.string()
      }))
    });

    return doctor === 'gpt'
      ? await generateObject({ model: openai("gpt-4o-mini"), system: "Eres un doctor experto en medicina familiar", prompt, schema })
      : await generateObject({ model: google("models/gemini-1.5-pro"), system: "Eres un doctor experto en medicina familiar", prompt, schema });
  } else {
    return doctor === 'gpt'
      ? (await generateText({ model: openai("gpt-4o-mini"), system: "Eres un doctor experto en medicina familiar", prompt })).text
      : (await generateText({ model: google("models/gemini-1.5-pro"), system: "Eres un doctor experto en medicina familiar", prompt })).text;
  }
}
