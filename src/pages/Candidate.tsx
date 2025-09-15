
import React, { useState, useEffect } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import CandidateTable from '../components/CandidateTable';
import FileUpload from '../components/FileUpload';
import CandidateDetails from '../components/CandidateDetails';
import ExportCandidates from '../components/ExportCandidates';
import { useCandidates } from '../hooks/useCandidates';
import { Candidate } from '../types/candidate';
import { Upload, Download, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '../contexts/AuthContext';

const CandidatePage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showUpload, setShowUpload] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const { candidates, updateCandidate, deleteCandidate, isLoading, refetch } = useCandidates();
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    console.log('CandidatePage mounted, user:', user);
    console.log('Current candidates:', candidates);
  }, [user, candidates]);

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'shortlisted') {
      return matchesSearch && candidate.isShortlisted;
    }
    return matchesSearch;
  });

  const shortlistedCandidates = candidates.filter(c => c.isShortlisted);

  const handleViewDetails = (candidate: Candidate) => {
    console.log('Viewing details for candidate:', candidate);
    setSelectedCandidate(candidate);
  };

  const handleCloseDetails = () => {
    setSelectedCandidate(null);
  };

  const handleUploadComplete = async (newCandidates: Candidate[]) => {
    try {
      console.log('Upload completed, received candidates:', newCandidates);
      console.log('Refreshing candidates list...');
      
      // Refresh the candidates list since they're already saved in the database
      await refetch();
      
      console.log('Candidates list refreshed successfully');
      
      toast({
        title: "Upload Successful",
        description: `${newCandidates.length} candidate${newCandidates.length !== 1 ? 's' : ''} uploaded successfully`,
      });
    } catch (error) {
      console.error('Error after upload:', error);
      toast({
        title: "Upload Error",
        description: "Failed to refresh candidates list",
        variant: "destructive",
      });
    }
    setShowUpload(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Authentication Required</h2>
          <p className="text-gray-600">Please log in to access the candidate database.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Actions */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Candidate Database</h2>
          <div className="flex items-center space-x-3">
            {shortlistedCandidates.length > 0 && (
              <button
                onClick={() => setShowExport(true)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                <Download className="h-4 w-4 mr-2" />
                Export Shortlisted
              </button>
            )}
            <button
              onClick={() => setShowUpload(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Resumes
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'all', label: `All Candidates (${candidates.length})` },
                { id: 'shortlisted', label: `Shortlisted (${shortlistedCandidates.length})` }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name, email, or phone"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Candidate Table */}
        <CandidateTable 
          candidates={filteredCandidates}
          onViewDetails={handleViewDetails}
          isLoading={isLoading}
        />

        {/* File Upload Modal */}
        {showUpload && (
          <FileUpload 
            onClose={() => setShowUpload(false)}
            onUploadComplete={handleUploadComplete}
          />
        )}

        {/* Export Modal */}
        {showExport && (
          <ExportCandidates
            candidates={shortlistedCandidates}
            onClose={() => setShowExport(false)}
          />
        )}

        {/* Candidate Details Modal */}
        {selectedCandidate && (
          <CandidateDetails
            candidate={selectedCandidate}
            onClose={handleCloseDetails}
          />
        )}
      </main>
    </div>
  );
};

export default CandidatePage;
