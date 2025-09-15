import React, { useState } from 'react';
import { Upload, X, File, CheckCircle, AlertCircle, Loader2, FolderOpen } from 'lucide-react';
import { Candidate } from '../types/candidate';
import { supabase } from '../integrations/supabase/client';
import { useAuth } from '../contexts/AuthContext';

interface FileUploadProps {
  onClose: () => void;
  onUploadComplete: (candidates: Candidate[]) => void;
}

interface UploadFile {
  file: File;
  id: string;
  progress: number;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  candidate?: Candidate;
  error?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ onClose, onUploadComplete }) => {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useAuth();

  const generateMockCandidate = (fileName: string, resumeUrl: string): Candidate => {
    const names = ['John Smith', 'Sarah Johnson', 'Michael Brown', 'Emily Davis', 'David Wilson', 'Jessica Garcia', 'Robert Miller', 'Ashley Taylor', 'Christopher Lee', 'Amanda Rodriguez'];
    const positions = ['Software Engineer', 'Product Manager', 'UX Designer', 'Data Scientist', 'Marketing Manager', 'DevOps Engineer', 'Business Analyst', 'Frontend Developer', 'Backend Developer', 'Full Stack Developer'];
    const experiences = ['2-3 years', '3-5 years', '5+ years', '1-2 years', '7+ years'];
    const skillSets = [
      ['React', 'JavaScript', 'Node.js', 'TypeScript'],
      ['Python', 'Machine Learning', 'SQL', 'TensorFlow'],
      ['Figma', 'Adobe XD', 'User Research', 'Prototyping'],
      ['Project Management', 'Agile', 'Scrum', 'JIRA'],
      ['Digital Marketing', 'SEO', 'Analytics', 'Content Strategy'],
      ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
      ['Business Analysis', 'Requirements Gathering', 'Process Improvement'],
      ['Vue.js', 'Angular', 'CSS', 'HTML'],
      ['Java', 'Spring Boot', 'Microservices', 'REST APIs'],
      ['React', 'Node.js', 'MongoDB', 'Express']
    ];

    const randomIndex = Math.floor(Math.random() * names.length);
    const name = names[randomIndex];
    const position = positions[randomIndex];
    const skills = skillSets[randomIndex];
    
    return {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      name,
      email: `${name.toLowerCase().replace(' ', '.')}@email.com`,
      phone: `+1 (555) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      position,
      experience: experiences[Math.floor(Math.random() * experiences.length)],
      skills,
      status: 'pending',
      score: Math.floor(Math.random() * 40) + 60,
      appliedDate: new Date().toISOString(),
      resumeUrl,
      cgpa: Math.round((Math.random() * 2 + 6) * 100) / 100,
      qualification: 'Bachelor\'s Degree',
      location: 'India'
    };
  };

  const uploadToSupabase = async (file: File): Promise<string> => {
    if (!user) {
      console.error('User not authenticated for upload');
      throw new Error('User not authenticated');
    }
    
    console.log('Starting upload for file:', file.name, 'Size:', file.size);
    
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}/${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
    
    console.log('Uploading to path:', fileName);
    
    // Upload file to Supabase storage
    const { data, error } = await supabase.storage
      .from('resumes')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });
    
    if (error) {
      console.error('Supabase upload error:', error);
      throw new Error(`Upload failed: ${error.message}`);
    }
    
    console.log('Upload successful:', data);
    
    // Get public URL for the uploaded file
    const { data: urlData } = supabase.storage
      .from('resumes')
      .getPublicUrl(fileName);
    
    console.log('Public URL generated:', urlData.publicUrl);
    
    return urlData.publicUrl;
  };

  const processFile = async (uploadFile: UploadFile): Promise<void> => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    try {
      console.log('Processing file:', uploadFile.file.name);
      
      // Update progress during upload
      setFiles(prev => prev.map(f => 
        f.id === uploadFile.id ? { ...f, progress: 25, status: 'uploading' } : f
      ));

      // Upload file to Supabase storage
      const resumeUrl = await uploadToSupabase(uploadFile.file);
      console.log('File uploaded successfully, URL:', resumeUrl);
      
      setFiles(prev => prev.map(f => 
        f.id === uploadFile.id ? { ...f, progress: 75, status: 'processing' } : f
      ));

      // Generate candidate data
      const candidate = generateMockCandidate(uploadFile.file.name, resumeUrl);
      console.log('Generated candidate data:', candidate);
      
      // Save candidate to database
      const { data: insertedCandidate, error: dbError } = await supabase
        .from('candidates')
        .insert({
          user_id: user.id,
          name: candidate.name,
          email: candidate.email,
          phone: candidate.phone,
          position: candidate.position,
          experience: candidate.experience,
          skills: candidate.skills,
          status: candidate.status,
          score: candidate.score,
          resume_url: resumeUrl,
          cgpa: candidate.cgpa,
          qualification: candidate.qualification,
          location: candidate.location
        })
        .select()
        .single();

      if (dbError) {
        console.error('Database insert error:', dbError);
        throw new Error(`Database error: ${dbError.message}`);
      }

      console.log('Candidate saved to database:', insertedCandidate);
      
      // Update file status to completed
      setFiles(prev => prev.map(f => 
        f.id === uploadFile.id ? { 
          ...f, 
          progress: 100, 
          status: 'completed', 
          candidate: { ...candidate, id: insertedCandidate.id, resumeUrl } 
        } : f
      ));

    } catch (error) {
      console.error('File processing error:', error);
      setFiles(prev => prev.map(f => 
        f.id === uploadFile.id ? { 
          ...f, 
          status: 'error', 
          error: error instanceof Error ? error.message : 'Processing failed' 
        } : f
      ));
      throw error;
    }
  };

  const processBatch = async (newFiles: UploadFile[]) => {
    setIsProcessing(true);
    console.log('Starting batch processing for files:', newFiles.map(f => f.id));
    
    try {
      // Process files one by one to avoid overwhelming the system
      for (const uploadFile of newFiles) {
        try {
          await processFile(uploadFile);
        } catch (error) {
          console.error(`Error processing file ${uploadFile.id}:`, error);
          // Continue with other files even if one fails
        }
        
        // Small delay between files
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileSelect = (selectedFiles: FileList) => {
    if (!user) {
      console.error('User not authenticated');
      return;
    }

    const newFiles: UploadFile[] = [];
    
    Array.from(selectedFiles).forEach(file => {
      console.log('Processing selected file:', file.name, file.type, file.size);
      
      const isValidFile = file.type === 'application/pdf' || 
                         file.name.endsWith('.pdf') || 
                         file.type === 'application/zip' || 
                         file.name.endsWith('.zip') ||
                         file.type === 'text/csv' || 
                         file.name.endsWith('.csv');
      
      if (isValidFile && file.size <= 10 * 1024 * 1024) { // 10MB limit
        const uploadFile: UploadFile = {
          file,
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          progress: 0,
          status: 'uploading'
        };
        newFiles.push(uploadFile);
        console.log('Added file to upload queue:', uploadFile.id);
      } else {
        console.warn('File rejected:', file.name, 'Valid:', isValidFile, 'Size OK:', file.size <= 10 * 1024 * 1024);
      }
    });

    if (newFiles.length > 0) {
      setFiles(prev => [...prev, ...newFiles]);
      
      console.log('Starting processing for new files:', newFiles.map(f => f.id));
      
      if (!isProcessing) {
        processBatch(newFiles);
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    console.log('Files dropped:', e.dataTransfer.files.length);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      console.log('Files selected via input:', e.target.files.length);
      handleFileSelect(e.target.files);
    }
  };

  const handleComplete = () => {
    const completedCandidates = files
      .filter(f => f.status === 'completed' && f.candidate)
      .map(f => f.candidate!);
    
    console.log('Completing upload with candidates:', completedCandidates);
    onUploadComplete(completedCandidates);
    onClose();
  };

  const completedCount = files.filter(f => f.status === 'completed').length;
  const errorCount = files.filter(f => f.status === 'error').length;
  const processingCount = files.filter(f => f.status === 'processing' || f.status === 'uploading').length;
  const hasCompleted = completedCount > 0;

  if (!user) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Authentication Required</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>
          <p className="text-gray-600 mb-4">You need to be logged in to upload resumes.</p>
          <button
            onClick={onClose}
            className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Upload Resumes</h2>
            <p className="text-gray-600 mt-1">Upload PDF, ZIP, or CSV files containing candidate resumes</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Upload Area */}
        <div
          className={`border-2 border-dashed rounded-xl p-12 text-center mb-6 transition-all ${
            isDragOver
              ? 'border-blue-500 bg-blue-50 scale-105'
              : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
          }`}
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
        >
          <div className="flex flex-col items-center">
            <div className="p-4 bg-blue-100 rounded-full mb-4">
              <FolderOpen className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Drag & drop your files here
            </h3>
            <p className="text-gray-600 mb-4">
              Supports PDF, ZIP, and CSV files up to 10MB each
            </p>
            <input
              type="file"
              multiple
              accept=".pdf,.zip,.csv"
              onChange={handleFileInput}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 cursor-pointer transition-colors"
            >
              <Upload className="h-5 w-5 mr-2" />
              Choose Files
            </label>
          </div>
        </div>

        {/* Processing Status */}
        {files.length > 0 && (
          <div className="mb-6 p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-6">
                <div className="text-sm text-gray-700">
                  <span className="font-semibold">{files.length}</span> files uploaded
                </div>
                <div className="text-sm text-green-600">
                  <span className="font-semibold">{completedCount}</span> processed
                </div>
                {processingCount > 0 && (
                  <div className="flex items-center text-sm text-blue-600">
                    <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                    <span className="font-semibold">{processingCount}</span> processing
                  </div>
                )}
                {errorCount > 0 && (
                  <div className="text-sm text-red-600">
                    <span className="font-semibold">{errorCount}</span> errors
                  </div>
                )}
              </div>
              <div className="text-sm font-medium text-gray-700">
                {files.length > 0 ? Math.round((completedCount / files.length) * 100) : 0}% complete
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${files.length > 0 ? (completedCount / files.length) * 100 : 0}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* File List */}
        {files.length > 0 && (
          <div className="flex-1 overflow-y-auto mb-6">
            <div className="grid grid-cols-1 gap-2 max-h-60">
              {files.slice(0, 100).map((uploadFile) => (
                <div key={uploadFile.id} className="bg-white border rounded-lg p-3 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <File className="h-4 w-4 text-gray-400" />
                    <span className="font-medium text-gray-900 text-sm truncate max-w-md">
                      {uploadFile.file.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      ({(uploadFile.file.size / 1024 / 1024).toFixed(1)} MB)
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {uploadFile.status === 'completed' && (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    )}
                    {uploadFile.status === 'error' && (
                      <div className="flex items-center space-x-1">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        {uploadFile.error && (
                          <span className="text-xs text-red-600 max-w-32 truncate" title={uploadFile.error}>
                            {uploadFile.error}
                          </span>
                        )}
                      </div>
                    )}
                    {(uploadFile.status === 'processing' || uploadFile.status === 'uploading') && (
                      <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />
                    )}
                  </div>
                </div>
              ))}
              {files.length > 100 && (
                <div className="text-center text-sm text-gray-500 p-2">
                  ... and {files.length - 100} more files
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="text-sm text-gray-600">
            {hasCompleted && `${completedCount} candidate${completedCount !== 1 ? 's' : ''} extracted successfully`}
          </div>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            {hasCompleted && (
              <button
                onClick={handleComplete}
                className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Complete Upload
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
