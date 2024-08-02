
# API de Consulta Médica (iclinicA)

Este proyecto proporciona dos endpoints principales para generar preguntas y respuestas de consulta médica utilizando modelos de IA. Las APIs aprovechan los modelos GPT de OpenAI y Gemini de Google para proporcionar preguntas relevantes y respuestas detalladas de consulta basadas en la información del paciente.

## Tabla de Contenidos

- [Instalación](#instalación)
- [Variables de Entorno](#variables-de-entorno)
- [Endpoints de la API](#endpoints-de-la-api)
  - [/api/questions](#apiquestions)
  - [/api/consultations](#apiconsultations)
- [Estructura del Proyecto](#estructura-del-proyecto)

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/jpcastilloarce/iclinica-api.git
   cd iclinica-api
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Ejecuta el servidor de desarrollo:
   ```bash
   npm run dev
   ```

## Variables de Entorno

Crea un archivo `.env.local` en el directorio raíz y añade las siguientes variables de entorno:

```env
OPENAI_API_KEY=tu-clave-api-de-openai
GOOGLE_GENERATIVE_AI_API_KEY=tu-clave-api-de-google-generative-ai
```

## Endpoints de la API

### /api/questions

Este endpoint genera una lista de preguntas relevantes basadas en la información y síntomas del paciente.

**Solicitud:**

- Método: `POST`
- Cuerpo:
  ```json
  {
    "doctor": "gpt" | "gemini",
    "patientPreForm": {
      "patientInfo": {
        "country": "string",
        "age": "number",
        "gender": "string",
        "weight": "number",
        "height": "number"
      },
      "reason": "string",
      "riskFactors": {
        "smokes": "boolean",
        "hasHypertension": "boolean",
        "hasDiabetes": "boolean",
        "hasAsthma": "boolean",
        "hadStroke": "boolean",
        "hadHeartAttack": "boolean"
      },
      "symptoms": [
        {
          "location": "string",
          "description": "string",
          "duration": "string",
          "intensity": "number"
        }
      ]
    }
  }
  ```

**Respuesta:**

- Éxito: `200 OK`
  ```json
  {
    "preguntas": [
      {
        "pregunta": "string"
      }
    ]
  }
  ```
- Error: `400 Bad Request` o `500 Internal Server Error`

### /api/consultations

Este endpoint proporciona una respuesta detallada de consulta basada en la información y síntomas del paciente.

**Solicitud:**

- Método: `POST`
- Cuerpo:
  ```json
  {
    "doctor": "gpt" | "gemini",
    "patientForm": {
      "patientInfo": {
        "country": "string",
        "age": "number",
        "gender": "string",
        "weight": "number",
        "height": "number"
      },
      "reason": "string",
      "riskFactors": {
        "smokes": "boolean",
        "hasHypertension": "boolean",
        "hasDiabetes": "boolean",
        "hasAsthma": "boolean",
        "hadStroke": "boolean",
        "hadHeartAttack": "boolean"
      },
      "symptoms": [
        {
          "location": "string",
          "description": "string",
          "duration": "string",
          "intensity": "number"
        }
      ],
      "aditionalQuestions": [
        {
          "question": "string",
          "answer": "string"
        }
      ],
      "aditionalConetxt": {
        "contacts": "string",
        "travels": "string"
      }
    }
  }
  ```

**Respuesta:**

- Éxito: `200 OK`
  ```json
  {
    "response": "string"
  }
  ```
- Error: `400 Bad Request` o `500 Internal Server Error`

## Estructura del Proyecto

```plaintext
src/
│
├── pages/
│   ├── api/
│   │   ├── questions.ts
│   │   └── consultations.ts
│
├── utils/
│   ├── env.ts
│   ├── prompt.ts
│   ├── types.ts
│   └── generateQuery.ts
│
└── README.md
```

- **pages/api/**: Contiene los manejadores de rutas API.
- **utils/**: Contiene funciones y tipos utilitarios usados en todo el proyecto.
