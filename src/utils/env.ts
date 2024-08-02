export function checkEnvVariables() {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error(
        "OPENAI_API_KEY environment variable is required. You can get this via https://vercel.com/docs/integrations/ai"
      );
    }
  
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      throw new Error(
        "GOOGLE_GENERATIVE_AI_API_KEY environment variable is required. You can get this via https://vercel.com/docs/integrations/ai"
      );
    }
  }
  