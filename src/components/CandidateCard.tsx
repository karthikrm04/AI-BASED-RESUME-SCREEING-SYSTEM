
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Candidate } from '../types/candidate';
import MatchAnalysis from './MatchAnalysis';

interface CandidateCardProps {
  candidate: Candidate & { aiMatchScore?: number; matchReason?: { pros: string[]; cons: string[] } };
}

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0"></div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-gray-900">{candidate.name}</h3>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                <span>📅 {candidate.experience}</span>
                <span>📍 {candidate.email.includes('mumbai') ? 'Mumbai' : 'Location'}</span>
              </div>
              
              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">AI Match Score</span>
                  <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                    {candidate.aiMatchScore || candidate.score}%
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="mb-2">
                  <strong className="text-sm text-gray-700">Experience</strong>
                  <ul className="text-sm text-gray-600 mt-1 ml-4">
                    <li>• {candidate.position} ({candidate.experience})</li>
                    <li>• Previous experience in {candidate.skills[0]} development</li>
                  </ul>
                </div>

                <div className="mb-4">
                  <strong className="text-sm text-gray-700">Education</strong>
                  <p className="text-sm text-gray-600 mt-1">
                    {candidate.qualification || 'Bachelor\'s in Computer Science and Software Engineering'}
                  </p>
                </div>

                <div>
                  <strong className="text-sm text-gray-700">Skills</strong>
                  <div className="mt-2">
                    <div className="mb-2">
                      <span className="text-xs text-green-600 font-medium">EVIDENCE FOUND</span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {candidate.skills.slice(0, 4).map((skill, index) => (
                          <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                            ✓ {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {candidate.skills.length > 4 && (
                      <div>
                        <span className="text-xs text-gray-500 font-medium">EVIDENCE NOT FOUND</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                            Requirements gathering
                          </span>
                          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                            Collaboration
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {isExpanded && candidate.matchReason && (
                <MatchAnalysis matchReason={candidate.matchReason} />
              )}

              <button
                onClick={toggleExpanded}
                className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800 mt-2"
              >
                {isExpanded ? 'Show Less' : 'Show More'}
                {isExpanded ? 
                  <ChevronUp className="h-4 w-4" /> : 
                  <ChevronDown className="h-4 w-4" />
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;
