
import React from 'react';
import { Candidate } from '../types/candidate';

interface ExportResultsProps {
  candidates: (Candidate & { aiMatchScore?: number; matchReason?: { pros: string[]; cons: string[] } })[];
  onClose: () => void;
}

// Function to convert data to CSV format and trigger download
const downloadExcel = (candidates: (Candidate & { aiMatchScore?: number })[], filename: string) => {
  // Create CSV content
  const headers = ['Name', 'Email', 'Qualification', 'CGPA/GPA'];
  const csvContent = [
    headers.join(','),
    ...candidates.map(candidate => [
      `"${candidate.name}"`,
      `"${candidate.email}"`,
      `"${candidate.qualification || 'N/A'}"`,
      `"${candidate.cgpa || 'N/A'}"`
    ].join(','))
  ].join('\n');

  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const ExportResults: React.FC<ExportResultsProps> = ({ candidates, onClose }) => {
  // Automatically trigger download when component is rendered
  React.useEffect(() => {
    const timestamp = new Date().toISOString().split('T')[0];
    downloadExcel(candidates, `search-results-${timestamp}.csv`);
    onClose(); // Close immediately after download
  }, [candidates, onClose]);

  return null; // No UI needed since we're auto-downloading
};

export default ExportResults;
