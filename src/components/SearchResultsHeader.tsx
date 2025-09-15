
import React from 'react';
import { Download, SortDesc } from 'lucide-react';

interface SearchResultsHeaderProps {
  resultsCount: number;
  onExportResults: () => void;
  onSortChange?: (sortBy: string) => void;
  sortBy?: string;
}

const SearchResultsHeader: React.FC<SearchResultsHeaderProps> = ({ 
  resultsCount, 
  onExportResults,
  onSortChange,
  sortBy 
}) => {
  const handleSortClick = () => {
    if (onSortChange) {
      onSortChange('match-score');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-gray-600">
          <strong>{resultsCount}</strong> candidates found / <strong>1180</strong> profiles
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleSortClick}
            className={`flex items-center gap-2 px-3 py-2 text-sm border rounded-lg transition-colors ${
              sortBy === 'match-score' 
                ? 'border-purple-500 bg-purple-50 text-purple-700' 
                : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            <SortDesc className="h-4 w-4" />
            Sort by Match Score
          </button>
          <button 
            onClick={onExportResults}
            className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Download className="h-4 w-4" />
            Export Results
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-600">High Match (90%+)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Good Match (70-89%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Potential Match (50-69%)</span>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsHeader;
