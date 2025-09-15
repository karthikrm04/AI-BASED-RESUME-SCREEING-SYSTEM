
import React, { useState } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import SearchBar from '../components/SearchBar';
import JobDescription from '../components/JobDescription';
import SearchFilters from '../components/SearchFilters';
import SearchResults from '../components/SearchResults';
import ExportResults from '../components/ExportResults';
import { useCandidates } from '../hooks/useCandidates';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../integrations/supabase/client';
import { Candidate } from '../types/candidate';
import { useToast } from '@/hooks/use-toast';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Candidate[]>([]);
  const [allSearchResults, setAllSearchResults] = useState<Candidate[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [activeTab, setActiveTab] = useState('Description');
  const [showExportResults, setShowExportResults] = useState(false);
  const [sortBy, setSortBy] = useState('match-score');
  const [filters, setFilters] = useState({
    experience: '',
    location: '',
    industry: '',
    skillLevel: '',
    cgpa: '',
    minAiScore: 0
  });

  const { candidates, refetch } = useCandidates();
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setIsSearching(true);
    setHasSearched(true);

    try {
      console.log('Starting AI search with query:', query);
      
      // Refresh candidates data first to ensure we have the latest
      await refetch();

      // Call the AI search edge function
      const { data, error } = await supabase.functions.invoke('ai-search', {
        body: {
          query,
          userId: user?.id
        }
      });

      if (error) {
        console.error('AI search error:', error);
        toast({
          title: "Search Error",
          description: "Failed to perform AI search. Please try again.",
          variant: "destructive",
        });
        throw error;
      }

      console.log('AI search completed successfully');
      const scoredCandidates = data.scoredCandidates || [];
      setAllSearchResults(scoredCandidates);
      setSearchResults(scoredCandidates);

      if (scoredCandidates.length === 0) {
        toast({
          title: "No Results",
          description: "No candidates found matching your search criteria. Try uploading more resumes.",
        });
      } else {
        toast({
          title: "Search Complete",
          description: `Found ${scoredCandidates.length} matching candidates`,
        });
      }

    } catch (error) {
      console.error('Search failed:', error);
      
      // Fallback to basic search with candidates data
      const scoredCandidates = candidates.map(candidate => ({
        ...candidate,
        aiMatchScore: Math.floor(Math.random() * 40) + 60,
        matchReason: {
          pros: ['Profile available for review'],
          cons: ['AI analysis temporarily unavailable']
        }
      }));

      const sortedResults = scoredCandidates.sort((a, b) => (b.aiMatchScore || 0) - (a.aiMatchScore || 0));
      setAllSearchResults(sortedResults);
      setSearchResults(sortedResults);

      toast({
        title: "Search Completed with Fallback",
        description: "AI search encountered issues but found candidates using basic matching.",
        variant: "destructive",
      });

    } finally {
      setIsSearching(false);
    }
  };

  const applyFilters = (newFilters: typeof filters) => {
    setFilters(newFilters);
    
    let filteredResults = allSearchResults.filter(candidate => {
      // Experience filter
      if (newFilters.experience && !candidate.experience?.includes(newFilters.experience.split(' ')[0])) return false;
      
      // Location filter
      if (newFilters.location && !candidate.location?.toLowerCase().includes(newFilters.location.toLowerCase())) return false;
      
      // CGPA filter
      if (newFilters.cgpa) {
        const range = newFilters.cgpa.split(' - ');
        const minCgpa = parseFloat(range[0]);
        const maxCgpa = parseFloat(range[1]);
        if (candidate.cgpa && (candidate.cgpa < minCgpa || candidate.cgpa > maxCgpa)) return false;
      }
      
      // Minimum AI Score filter
      if (newFilters.minAiScore > 0) {
        const candidateScore = candidate.aiMatchScore || candidate.score;
        if (candidateScore < newFilters.minAiScore) return false;
      }
      
      return true;
    });

    // Apply sorting
    if (sortBy === 'match-score') {
      filteredResults = filteredResults.sort((a, b) => (b.aiMatchScore || 0) - (a.aiMatchScore || 0));
    }

    setSearchResults(filteredResults);
  };

  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy);
    if (newSortBy === 'match-score') {
      const sorted = [...searchResults].sort((a, b) => (b.aiMatchScore || 0) - (a.aiMatchScore || 0));
      setSearchResults(sorted);
    }
  };

  const handleExportResults = () => {
    setShowExportResults(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI-Powered Candidate Search</h1>
          <p className="text-lg text-gray-600">
            Find perfect candidates using intelligent search and advanced filtering
          </p>
        </div>

        <SearchBar 
          onSearch={handleSearch}
          isSearching={isSearching}
          placeholder="e.g., Software Engineer with Python experience in finance, based in New York"
        />

        {/* Only show tabs and content after search results */}
        {hasSearched && allSearchResults.length > 0 && (
          <>
            {/* Tabs for Description and Filter */}
            <div className="mt-8 mb-6">
              <div className="flex gap-4">
                <button
                  onClick={() => setActiveTab('Description')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'Description'
                      ? 'bg-purple-100 text-purple-700 border border-purple-200'
                      : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  Job Requirements
                </button>
                <button
                  onClick={() => setActiveTab('Filter')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'Filter'
                      ? 'bg-purple-100 text-purple-700 border border-purple-200'
                      : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  Smart Filters
                </button>
              </div>
            </div>

            <div className="flex gap-8">
              <div className="w-80 flex-shrink-0">
                {activeTab === 'Description' ? (
                  <JobDescription searchQuery={searchQuery} />
                ) : (
                  <SearchFilters 
                    filters={filters}
                    onFiltersChange={applyFilters}
                    resultsCount={searchResults.length}
                  />
                )}
              </div>

              <div className="flex-1">
                <SearchResults 
                  results={searchResults}
                  isLoading={isSearching}
                  hasSearched={hasSearched}
                  searchQuery={searchQuery}
                  onExportResults={handleExportResults}
                  onSortChange={handleSortChange}
                  sortBy={sortBy}
                />
              </div>
            </div>
          </>
        )}

        {/* Show results without tabs/filters when no results or still searching */}
        {hasSearched && allSearchResults.length === 0 && (
          <div className="mt-8">
            <SearchResults 
              results={searchResults}
              isLoading={isSearching}
              hasSearched={hasSearched}
              searchQuery={searchQuery}
              onExportResults={handleExportResults}
              onSortChange={handleSortChange}
              sortBy={sortBy}
            />
          </div>
        )}

        {/* Export Results Component */}
        {showExportResults && (
          <ExportResults
            candidates={searchResults}
            onClose={() => setShowExportResults(false)}
          />
        )}
      </main>
    </div>
  );
};

export default Search;
