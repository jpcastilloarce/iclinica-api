import type { NextApiRequest, NextApiResponse } from "next";
import { checkEnvVariables } from '@/utils/env';
import { createConsultationPrompt } from '@/utils/prompt';
import { generateQuery } from '@/utils/generateQuery';
import { PatientForm } from '@/utils/types';
export const config = {
  maxDuration: 300,
};
export const maxDuration = 300
checkEnvVariables();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { doctor, patientForm }: { doctor: string; patientForm: PatientForm } = req.body;

    if (!(doctor === 'gpt' || doctor === 'gemini')) {
      return res.status(400).json({ error: 'Invalid doctor type' });
    }

    try {
      const prompt = createConsultationPrompt(patientForm);
      const query = await generateQuery(doctor, prompt, 'consultation');

      return res.status(200).json(query);
    } catch (error) {
      return res.status(500).json({ error: 'Error generating consultation: '});
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
