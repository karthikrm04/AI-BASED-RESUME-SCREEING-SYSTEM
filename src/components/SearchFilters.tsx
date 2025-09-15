
import React from 'react';
import { Filter, X } from 'lucide-react';

interface SearchFiltersProps {
  filters: {
    experience: string;
    location: string;
    industry: string;
    skillLevel: string;
    cgpa: string;
    minAiScore: number;
  };
  onFiltersChange: (filters: any) => void;
  resultsCount: number;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ filters, onFiltersChange, resultsCount }) => {
  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      experience: '',
      location: '',
      industry: '',
      skillLevel: '',
      cgpa: '',
      minAiScore: 0
    };
    onFiltersChange(clearedFilters);
  };

  const industries = [
    'Information Technology',
    'Healthcare',
    'Finance & Banking',
    'Education',
    'Manufacturing',
    'Retail & E-commerce',
    'Consulting',
    'Media & Entertainment',
    'Real Estate',
    'Automotive'
  ];

  const experienceLevels = [
    '0-1 years (Entry Level)',
    '2-4 years (Junior)',
    '5-7 years (Mid-level)',
    '8-12 years (Senior)',
    '13+ years (Lead/Executive)'
  ];

  const skillLevels = [
    'Beginner',
    'Intermediate',
    'Advanced',
    'Expert'
  ];

  const cgpaRanges = [
    '9.0 - 10.0',
    '8.0 - 8.9',
    '7.0 - 7.9',
    '6.0 - 6.9',
    '5.0 - 5.9'
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-600" />
          <h3 className="font-semibold text-gray-900">Smart Filters</h3>
        </div>
        <button
          onClick={clearFilters}
          className="text-sm text-purple-600 hover:text-purple-700 flex items-center gap-1"
        >
          <X className="h-3 w-3" />
          Clear All
        </button>
      </div>

      <div className="space-y-6">
        {/* Experience Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Experience Level
          </label>
          <select
            value={filters.experience}
            onChange={(e) => handleFilterChange('experience', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Select experience level</option>
            {experienceLevels.map((level) => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <select
            value={filters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Any location</option>
            <option value="mumbai">Mumbai</option>
            <option value="bangalore">Bangalore</option>
            <option value="delhi">Delhi NCR</option>
            <option value="pune">Pune</option>
            <option value="hyderabad">Hyderabad</option>
            <option value="chennai">Chennai</option>
          </select>
        </div>

        {/* Industry */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Industry
          </label>
          <select
            value={filters.industry}
            onChange={(e) => handleFilterChange('industry', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Select industry</option>
            {industries.map((industry) => (
              <option key={industry} value={industry}>{industry}</option>
            ))}
          </select>
        </div>

        {/* Skill Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Skill Level
          </label>
          <select
            value={filters.skillLevel}
            onChange={(e) => handleFilterChange('skillLevel', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Select skill level</option>
            {skillLevels.map((level) => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>

        {/* CGPA Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            CGPA/GPA Range
          </label>
          <select
            value={filters.cgpa}
            onChange={(e) => handleFilterChange('cgpa', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Select CGPA range</option>
            {cgpaRanges.map((range) => (
              <option key={range} value={range}>{range}</option>
            ))}
          </select>
        </div>

        {/* AI Score Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Minimum AI Match Score
          </label>
          <div className="space-y-2">
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={filters.minAiScore || 0}
              onChange={(e) => handleFilterChange('minAiScore', parseInt(e.target.value))}
              className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>0%</span>
              <span className="font-medium text-purple-600">{filters.minAiScore || 0}%+</span>
              <span>100%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Apply Filters Button */}
      <div className="mt-8">
        <button 
          onClick={() => onFiltersChange(filters)}
          className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
        >
          Apply Filters ({resultsCount} matches)
        </button>
      </div>
    </div>
  );
};

export default SearchFilters;
