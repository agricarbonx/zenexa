
export interface PatientInfo {
  name: string;
  age: number | null;
  gender: string;
  patientId?: string;
}

export interface Medication {
  drug: string;
  dosage: string;
  frequency: string;
  duration?: string;
}

export interface LabValue {
  test: string;
  value: string;
  range?: string;
}

export interface StructuredMedicalData {
  patientInfo: PatientInfo;
  diagnosis: string[];
  symptoms: string[];
  medications: Medication[];
  labValues: LabValue[];
  summary: string;
}
