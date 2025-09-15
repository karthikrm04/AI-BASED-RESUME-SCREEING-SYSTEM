
import React from 'react';

interface MatchAnalysisProps {
  matchReason: { pros: string[]; cons: string[] };
}

const MatchAnalysis: React.FC<MatchAnalysisProps> = ({ matchReason }) => {
  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
      <h4 className="font-medium text-gray-900 mb-2">AI Match Analysis</h4>
      {matchReason.pros.length > 0 && (
        <div className="mb-2">
          <span className="text-sm font-medium text-green-600">✅ Pros:</span>
          <ul className="text-sm text-gray-600 ml-4">
            {matchReason.pros.map((pro, index) => (
              <li key={index}>• {pro}</li>
            ))}
          </ul>
        </div>
      )}
      {matchReason.cons.length > 0 && (
        <div>
          <span className="text-sm font-medium text-red-600">❌ Cons:</span>
          <ul className="text-sm text-gray-600 ml-4">
            {matchReason.cons.map((con, index) => (
              <li key={index}>• {con}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MatchAnalysis;
