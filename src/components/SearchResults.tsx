
import React from 'react';
import { Candidate } from '../types/candidate';
import LoadingState from './LoadingState';
import EmptyState from './EmptyState';
import SearchResultsHeader from './SearchResultsHeader';
import CandidateCard from './CandidateCard';

interface SearchResultsProps {
  results: (Candidate & { aiMatchScore?: number; matchReason?: { pros: string[]; cons: string[] } })[];
  isLoading: boolean;
  hasSearched: boolean;
  searchQuery: string;
  onExportResults: () => void;
  onSortChange?: (sortBy: string) => void;
  sortBy?: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ 
  results, 
  isLoading, 
  hasSearched, 
  searchQuery, 
  onExportResults,
  onSortChange,
  sortBy 
}) => {
  if (isLoading) {
    return <LoadingState />;
  }

  if (!hasSearched || results.length === 0) {
    return <EmptyState hasSearched={hasSearched} />;
  }

  return (
    <div className="space-y-6">
      <SearchResultsHeader 
        resultsCount={results.length} 
        onExportResults={onExportResults}
        onSortChange={onSortChange}
        sortBy={sortBy}
      />
      
      <div className="space-y-4">
        {results.map((candidate) => (
          <CandidateCard 
            key={candidate.id} 
            candidate={candidate} 
          />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
