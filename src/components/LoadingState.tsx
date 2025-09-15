
import React from 'react';

const LoadingState: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-8">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Analyzing candidates...</h3>
        <p className="text-gray-600">AI is calculating match scores and ranking results</p>
      </div>
    </div>
  );
};

export default LoadingState;
