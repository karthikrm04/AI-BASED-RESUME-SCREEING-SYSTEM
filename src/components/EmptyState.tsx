
import React from 'react';
import { Search } from 'lucide-react';

interface EmptyStateProps {
  hasSearched: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({ hasSearched }) => {
  if (!hasSearched) {
    return (
      <div className="bg-white rounded-xl shadow-sm border p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="h-8 w-8 text-purple-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to search</h3>
          <p className="text-gray-600">Enter your requirements in the search bar to find matching candidates</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border p-8">
      <div className="text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-2">No candidates found</h3>
        <p className="text-gray-600">Try adjusting your search query or filters</p>
      </div>
    </div>
  );
};

export default EmptyState;
