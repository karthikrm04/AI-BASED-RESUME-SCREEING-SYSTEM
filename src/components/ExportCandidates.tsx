
import React, { useState } from 'react';
import { Download, FileSpreadsheet, FileText, File, X } from 'lucide-react';
import { Candidate } from '../types/candidate';

interface ExportCandidatesProps {
  candidates: Candidate[];
  onClose: () => void;
}

const ExportCandidates: React.FC<ExportCandidatesProps> = ({ candidates, onClose }) => {
  const [selectedFormat, setSelectedFormat] = useState<'xlsx' | 'pdf' | 'csv'>('xlsx');
  const [includeFields, setIncludeFields] = useState({
    personalInfo: true,
    contactInfo: true,
    experience: true,
    skills: true,
    scores: true,
    notes: false
  });

  const exportFormats = [
    { id: 'xlsx', name: 'Excel (XLSX)', icon: FileSpreadsheet, description: 'Spreadsheet format with multiple columns' },
    { id: 'pdf', name: 'PDF Report', icon: FileText, description: 'Professional report format' },
    { id: 'csv', name: 'CSV File', icon: File, description: 'Comma-separated values for data import' }
  ];

  const handleExport = () => {
    // Mock export functionality
    const exportData = candidates.map(candidate => ({
      name: includeFields.personalInfo ? candidate.name : '',
      email: includeFields.contactInfo ? candidate.email : '',
      phone: includeFields.contactInfo ? candidate.phone : '',
      position: candidate.position,
      experience: includeFields.experience ? candidate.experience : '',
      skills: includeFields.skills ? candidate.skills.join(', ') : '',
      score: includeFields.scores ? candidate.score : '',
      aiMatchScore: includeFields.scores ? candidate.aiMatchScore : '',
      status: candidate.status,
      notes: includeFields.notes ? candidate.notes : ''
    }));

    console.log('Exporting candidates:', exportData);
    console.log('Format:', selectedFormat);
    
    // In a real implementation, you would:
    // 1. Convert data to the selected format
    // 2. Generate the file
    // 3. Trigger download
    
    // Mock download
    const fileName = `shortlisted-candidates-${new Date().toISOString().split('T')[0]}.${selectedFormat}`;
    alert(`Exporting ${candidates.length} candidates to ${fileName}`);
    
    onClose();
  };

  const toggleField = (field: keyof typeof includeFields) => {
    setIncludeFields(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Export Candidates</h2>
            <p className="text-gray-600 mt-1">Export {candidates.length} shortlisted candidates</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Export Format Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Choose Export Format</h3>
          <div className="grid grid-cols-1 gap-3">
            {exportFormats.map((format) => (
              <label
                key={format.id}
                className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedFormat === format.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <input
                  type="radio"
                  name="format"
                  value={format.id}
                  checked={selectedFormat === format.id}
                  onChange={(e) => setSelectedFormat(e.target.value as any)}
                  className="sr-only"
                />
                <format.icon className="h-5 w-5 text-gray-600 mr-3" />
                <div>
                  <div className="font-medium text-gray-900">{format.name}</div>
                  <div className="text-sm text-gray-600">{format.description}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Field Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Include Fields</h3>
          <div className="space-y-2">
            {Object.entries(includeFields).map(([field, checked]) => (
              <label key={field} className="flex items-center">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleField(field as keyof typeof includeFields)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-700 capitalize">
                  {field.replace(/([A-Z])/g, ' $1').trim()}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Export Preview */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Export Preview</h4>
          <div className="text-sm text-gray-600">
            <p>• {candidates.length} candidates will be exported</p>
            <p>• Format: {exportFormats.find(f => f.id === selectedFormat)?.name}</p>
            <p>• Fields: {Object.entries(includeFields).filter(([_, checked]) => checked).length} selected</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportCandidates;
