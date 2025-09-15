
export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  skills: string[];
  status: 'pending' | 'approved' | 'rejected';
  score: number;
  resumeUrl?: string;
  appliedDate: string;
  notes?: string;
  aiMatchScore?: number;
  matchReason?: { pros: string[]; cons: string[] };
  location?: string;
  isShortlisted?: boolean;
  qualification?: string;
  cgpa?: number;
}

export interface CandidateFilters {
  status?: string;
  experience?: string;
  skills?: string[];
  scoreRange?: [number, number];
  cgpa?: string;
}
