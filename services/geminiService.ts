
import { GoogleGenAI, Type } from "@google/genai";
import { StructuredMedicalData } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    patientInfo: {
      type: Type.OBJECT,
      properties: {
        name: { type: Type.STRING, description: "Patient's full name." },
        age: { type: Type.INTEGER, description: "Patient's age in years." },
        gender: { type: Type.STRING, description: "Patient's gender." },
        patientId: { type: Type.STRING, description: "Patient's unique identifier, if available." },
      },
      required: ["name", "age", "gender"],
    },
    diagnosis: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of diagnoses identified in the document.",
    },
    symptoms: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of symptoms mentioned by the patient or doctor.",
    },
    medications: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          drug: { type: Type.STRING, description: "Name of the medication." },
          dosage: { type: Type.STRING, description: "Dosage of the medication (e.g., '500mg')." },
          frequency: { type: Type.STRING, description: "How often to take the medication (e.g., 'twice a day')." },
          duration: { type: Type.STRING, description: "How long to take the medication (e.g., 'for 7 days')." },
        },
        required: ["drug", "dosage", "frequency"],
      },
      description: "List of prescribed medications."
    },
    labValues: {
        type: Type.ARRAY,
        items: {
            type: Type.OBJECT,
            properties: {
                test: { type: Type.STRING, description: "Name of the lab test (e.g., 'Hemoglobin')." },
                value: { type: Type.STRING, description: "The result value of the test (e.g., '14.5 g/dL')." },
                range: { type: Type.STRING, description: "The normal reference range for the test." },
            },
            required: ["test", "value"],
        },
        description: "List of lab test results."
    },
    summary: {
      type: Type.STRING,
      description: "A brief summary of the doctor's notes or overall assessment."
    }
  },
  required: ["patientInfo", "diagnosis", "symptoms", "medications", "summary", "labValues"],
};


export const extractMedicalData = async (imageBase64: string, mimeType: string): Promise<StructuredMedicalData> => {
  const imagePart = {
    inlineData: {
      data: imageBase64,
      mimeType,
    },
  };

  const textPart = {
    text: `Analyze the attached image of a medical record. Extract the patient's details, diagnosis, symptoms, prescribed medications, and any lab results. Provide the output strictly in the JSON format defined by the schema. If a value is not present, use a sensible default like an empty array or null for numbers.`,
  };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: { parts: [imagePart, textPart] },
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.1,
      },
    });

    const jsonText = response.text;
    if (!jsonText) {
        throw new Error("API returned an empty response.");
    }
    
    // The response is already a stringified JSON because of responseMimeType
    return JSON.parse(jsonText) as StructuredMedicalData;

  } catch (error) {
    console.error("Gemini API error:", error);
    throw new Error("Failed to extract data from the document. The AI model could not process the request.");
  }
};
