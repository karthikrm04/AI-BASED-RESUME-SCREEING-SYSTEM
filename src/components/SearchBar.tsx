
import React, { useState } from 'react';
import { Search, Sparkles, Clock, Zap } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isSearching: boolean;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isSearching, placeholder }) => {
  const [query, setQuery] = useState('');
  const [showPastSearches, setShowPastSearches] = useState(false);

  const pastSearches = [
    "Looking for a product manager, business analyst, or project manager with 10+ years of experience",
    "Seeking a product manager, senior developer, or UX designer with over 10 years in the industry",
    "Hiring for a product manager or project manager with 10+ years of experience in product development",
    "In search of a product manager, marketing strategist, or product owner with at least 10 years of expertise",
    "Looking for experienced professionals—product manager, product owner, or business analyst—with 10+ years of experience"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setShowPastSearches(false);
    }
  };

  const handlePastSearchClick = (pastQuery: string) => {
    setQuery(pastQuery);
    onSearch(pastQuery);
    setShowPastSearches(false);
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <Sparkles className="absolute left-4 h-5 w-5 text-purple-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setShowPastSearches(true)}
            placeholder={placeholder || "Looking for a product manager with 3+ years experience"}
            className="w-full pl-12 pr-16 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm"
            disabled={isSearching}
          />
          <button
            type="submit"
            disabled={isSearching || !query.trim()}
            className="absolute right-3 p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>
      </form>

      {/* Past Searches Dropdown */}
      {showPastSearches && !isSearching && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
          <div className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="h-4 w-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-600">Past Searches</span>
            </div>
            <div className="space-y-2">
              {pastSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handlePastSearchClick(search)}
                  className="w-full text-left p-3 hover:bg-gray-50 rounded-lg text-sm text-gray-700 transition-colors"
                >
                  <Clock className="inline h-3 w-3 mr-2 text-gray-400" />
                  {search}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Search Status */}
      {isSearching && (
        <div className="mt-4 flex items-center justify-center p-4 bg-purple-50 rounded-lg">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600 mr-3"></div>
          <div className="text-purple-700">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="h-4 w-4" />
              <p className="font-medium">DeepSeek AI is analyzing your database...</p>
            </div>
            <p className="text-sm">Scanning candidates and calculating intelligent match scores</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
