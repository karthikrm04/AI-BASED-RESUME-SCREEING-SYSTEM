
import React from 'react';
import { Search, Filter } from 'lucide-react';

interface CandidateFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const CandidateFilters: React.FC<CandidateFiltersProps> = ({
  searchTerm,
  onSearchChange
}) => {
  return (
    <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search candidates by name, email, or position..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>

        {/* Filter Button */}
        <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
          <Filter className="h-4 w-4 mr-2" />
          More Filters
        </button>
      </div>
    </div>
  );
};

export default CandidateFilters;
