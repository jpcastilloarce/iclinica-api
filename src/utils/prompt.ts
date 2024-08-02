import { PatientForm, PatientPreForm, Question, Symptom } from "./types";

export function buildPrompt(prompt: string): { role: "user"; content: string }[] {
    return [
      {
        role: "user",
        content: prompt,
      },
    ];
  }
  
export function createQuestionsPrompt(patientPreForm: PatientPreForm): string {
    const { patientInfo, reason, riskFactors, symptoms } = patientPreForm;
    return `
        Necesito que me hagas una lista de las 5 preguntas más relevantes en base a los sintomas 
        y la información del paciente para poder dar un mejor analisis a una consulta médica. Estas preguntas deberán
        estar formuladas te forma tal que el paciente pueda elegir como respuesta entre 3 opciones: Si, No y Omitir.
        La lista de preguntas debe estar en formato que sea legible al español (UTF-8), no deben contener el texto
        "(Si/No/Omitir)" ni nada parecido, solo la pregunta en sí.

        A continuación se muestra la información del paciente y los síntomas que presenta:
        **Información Básica del Paciente**
        - Pais: ${patientInfo.country}
        - Edad: ${patientInfo.age}
        - Sexo: ${patientInfo.gender}
        - Peso (kg): ${patientInfo.weight}
        - Altura (cm): ${patientInfo.height}

        **Motivo de la Consulta**
        - Descripción principal del problema o síntoma: ${reason}

        **Factores de Riesgo**
        - Fuma Cigarro: ${riskFactors.smokes ? 'Sí' : 'No'}
        - Tengo Hipertensión: ${riskFactors.hasHypertension ? 'Sí' : 'No'}
        - Tengo Diabetes: ${riskFactors.hasDiabetes ? 'Sí' : 'No'}
        - Tengo Asma: ${riskFactors.hasAsthma ? 'Sí' : 'No'}
        - Tuve Accidente Cerebrovascular ACV: ${riskFactors.hadStroke ? 'Sí' : 'No'}
        - Tuve Ataque al corazón: ${riskFactors.hadHeartAttack ? 'Sí' : 'No'}

        **Síntomas Especificos**
        ${symptoms.map((symptom: Symptom, index: number) => `
        - Sintoma n${index + 1}:
        - Ubicación del síntoma: ${symptom.location}
        - Descripción del síntoma: ${symptom.description}
        - Duración del síntoma: ${symptom.duration}
        - Intensidad del síntoma (1/10): ${symptom.intensity}
        `).join('\n')}
    `;
}
  
export function createConsultationPrompt(patientForm: PatientForm): string {
    const { patientInfo, reason, riskFactors, symptoms, aditionalQuestions, aditionalConetxt } = patientForm;
    return `
        Por favor, responde de manera amable, profesional y detallada a la 
        siguiente consulta médica basada en la información proporcionada, al final no te despidas:
        
        A continuación se muestra la información del paciente y los síntomas que presenta:
        **Información Básica del Paciente**
        - Pais: ${patientInfo.country}
        - Edad: ${patientInfo.age}
        - Sexo: ${patientInfo.gender}
        - Peso (kg): ${patientInfo.weight}
        - Altura (cm): ${patientInfo.height}
    
        **Motivo de la Consulta**
        - Descripción principal del problema o síntoma: ${reason}
    
        **Factores de Riesgo**
        - Fuma Cigarro: ${riskFactors.smokes ? 'Sí' : 'No'}
        - Tengo Hipertensión: ${riskFactors.hasHypertension ? 'Sí' : 'No'}
        - Tengo Diabetes: ${riskFactors.hasDiabetes ? 'Sí' : 'No'}
        - Tengo Asma: ${riskFactors.hasAsthma ? 'Sí' : 'No'}
        - Tuve Accidente Cerebrovascular ACV: ${riskFactors.hadStroke ? 'Sí' : 'No'}
        - Tuve Ataque al corazón: ${riskFactors.hadHeartAttack ? 'Sí' : 'No'}
    
        **Síntomas Especificos**
        ${symptoms.map((symptom: Symptom, index: number) => `
        - Síntoma n${index + 1}:
        - Ubicación del síntoma: ${symptom.location}
        - Descripción del síntoma: ${symptom.description}
        - Duración del síntoma: ${symptom.duration}
        - Intensidad del síntoma (1/10): ${symptom.intensity}
        `).join('\n')}
    
        **Preguntas adicionales en base de los síntomas**
        ${aditionalQuestions.map((question: Question) => `
        - ${question.question}: ${question.answer}
        `).join('\n')}
    
        **Contexto Adicional**
        - Contacto reciente con personas enfermas: ${aditionalConetxt.contacts}
        - Viajes recientes: ${aditionalConetxt.travels}
    `;
    }
