import type { NextApiRequest, NextApiResponse } from "next";
import { checkEnvVariables } from '@/utils/env';
import { createQuestionsPrompt } from '@/utils/prompt';
import { generateQuery } from '@/utils/generateQuery';
import { PatientPreForm } from '@/utils/types';

checkEnvVariables();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { doctor, patientPreForm }: { doctor: string; patientPreForm: PatientPreForm } = req.body;

    if (!(doctor === 'gpt' || doctor === 'gemini')) {
      return res.status(400).json({ error: 'Invalid doctor type' });
    }

    try {
      const prompt = createQuestionsPrompt(patientPreForm);
      const query = await generateQuery(doctor, prompt, 'questions');

      return res.status(200).json(query);
    } catch (error) {
      return res.status(500).json({ error: 'Error generating questions: ' + error });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
