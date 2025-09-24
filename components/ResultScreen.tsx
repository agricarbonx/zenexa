
import React, { useMemo } from 'react';
import { StructuredMedicalData } from '../types';

interface ResultScreenProps {
  originalFile: File;
  structuredData: StructuredMedicalData;
  onReset: () => void;
}

const DataCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-slate-900/50 backdrop-blur-lg border border-white/10 rounded-2xl p-4 transition-all duration-300 hover:border-blue-400 hover:shadow-[0_0_20px_3px_rgba(96,165,250,0.3)]">
    <h3 className="text-lg font-bold text-blue-300 mb-2">{title}</h3>
    <div className="text-white/90">{children}</div>
  </div>
);

const Pill: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <span className="inline-block bg-blue-500/20 text-blue-200 text-sm font-medium mr-2 mb-2 px-3 py-1 rounded-full">{children}</span>
);

export const ResultScreen: React.FC<ResultScreenProps> = ({ originalFile, structuredData, onReset }) => {
  const fileUrl = useMemo(() => URL.createObjectURL(originalFile), [originalFile]);

  const downloadJSON = () => {
    const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(structuredData, null, 2))}`;
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "medical_data.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };
  
  const downloadCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Category,Key,Value\n";
    
    // Patient Info
    Object.entries(structuredData.patientInfo).forEach(([key, value]) => {
        csvContent += `Patient Info,${key},"${value}"\n`;
    });
    // Diagnosis
    structuredData.diagnosis.forEach(item => {
        csvContent += `Diagnosis,,"${item}"\n`;
    });
    // Symptoms
    structuredData.symptoms.forEach(item => {
        csvContent += `Symptoms,,"${item}"\n`;
    });
    // Medications
    structuredData.medications.forEach(med => {
        csvContent += `Medication,"${med.drug}","${med.dosage}, ${med.frequency}, ${med.duration || ''}"\n`;
    });
    // Lab Values
    structuredData.labValues.forEach(lab => {
        csvContent += `Lab Value,"${lab.test}","${lab.value} (${lab.range || 'N/A'})"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "medical_data.csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="w-full h-full flex flex-col p-4 space-y-4">
      <div className="flex-shrink-0 flex items-center justify-between">
         <h1 className="text-2xl font-bold">Extracted Medical Data</h1>
         <div className="flex gap-2">
            <button onClick={downloadJSON} className="px-4 py-2 bg-blue-600 rounded-full font-semibold hover:bg-blue-700 transition">Export JSON</button>
            <button onClick={downloadCSV} className="px-4 py-2 bg-blue-600 rounded-full font-semibold hover:bg-blue-700 transition">Export CSV</button>
            <button onClick={onReset} className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 rounded-full font-semibold hover:from-red-700 hover:to-red-800 transition">Process Another</button>
         </div>
      </div>
      <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-hidden">
        <div className="bg-slate-900/50 rounded-2xl p-4 flex items-center justify-center overflow-hidden">
            <img src={fileUrl} alt="Original Document" className="max-w-full max-h-full object-contain rounded-lg"/>
        </div>
        <div className="overflow-y-auto space-y-4 pr-2">
            <DataCard title="Patient Information">
                <p><strong>Name:</strong> {structuredData.patientInfo.name}</p>
                <p><strong>Age:</strong> {structuredData.patientInfo.age}</p>
                <p><strong>Gender:</strong> {structuredData.patientInfo.gender}</p>
                {structuredData.patientInfo.patientId && <p><strong>Patient ID:</strong> {structuredData.patientInfo.patientId}</p>}
            </DataCard>
             <DataCard title="Summary">
                <p>{structuredData.summary}</p>
            </DataCard>
            <DataCard title="Diagnosis">
                {structuredData.diagnosis.map((d, i) => <Pill key={i}>{d}</Pill>)}
            </DataCard>
            <DataCard title="Symptoms">
                 {structuredData.symptoms.map((s, i) => <Pill key={i}>{s}</Pill>)}
            </DataCard>
            <DataCard title="Medications">
                <ul className="space-y-2">
                {structuredData.medications.map((med, i) => (
                    <li key={i}><strong>{med.drug}:</strong> {med.dosage}, {med.frequency} {med.duration && `, ${med.duration}`}</li>
                ))}
                </ul>
            </DataCard>
            <DataCard title="Lab Values">
                <ul className="space-y-2">
                {structuredData.labValues.map((lab, i) => (
                    <li key={i}><strong>{lab.test}:</strong> {lab.value} {lab.range && <span className="text-white/60"> (Range: {lab.range})</span>}</li>
                ))}
                </ul>
            </DataCard>
        </div>
      </div>
    </div>
  );
};
