
import React, { useState } from 'react';
import { MoreHorizontal, Eye } from 'lucide-react';
import { Candidate } from '../types/candidate';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

interface CandidateTableProps {
  candidates: Candidate[];
  onViewDetails: (candidate: Candidate) => void;
  isLoading: boolean;
}

const CandidateTable: React.FC<CandidateTableProps> = ({
  candidates,
  onViewDetails,
  isLoading
}) => {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const getLocation = (candidate: Candidate) => {
    return candidate.location || 'Not specified';
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading candidates...</p>
      </div>
    );
  }

  if (candidates.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <p className="text-gray-600">No candidates found. Upload some resumes to get started!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Candidate Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Created On</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {candidates.map((candidate) => (
            <TableRow key={candidate.id}>
              <TableCell>
                <div className="font-medium text-blue-600">{candidate.name}</div>
              </TableCell>
              <TableCell>
                <div className="text-sm text-gray-900">{getLocation(candidate)}</div>
              </TableCell>
              <TableCell>
                <div className="text-sm text-gray-900">
                  {new Date(candidate.appliedDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
              </TableCell>
              <TableCell>
                <div className="relative">
                  <button
                    onClick={() => setOpenMenuId(openMenuId === candidate.id ? null : candidate.id)}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                  
                  {openMenuId === candidate.id && (
                    <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border z-10">
                      <div className="py-1">
                        <button
                          onClick={() => {
                            onViewDetails(candidate);
                            setOpenMenuId(null);
                          }}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CandidateTable;
