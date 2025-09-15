
import React from 'react';
import { Candidate } from '../types/candidate';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

interface CandidateDetailsProps {
  candidate: Candidate;
  onClose: () => void;
}

const CandidateDetails: React.FC<CandidateDetailsProps> = ({ candidate, onClose }) => {
  // Mock data for demonstration - in real app this would come from candidate object
  const mockExperienceData = [
    {
      title: "Business Ambassador",
      company: "Crowd Funding",
      duration: "Jan 2021 to Mar 2021"
    },
    {
      title: "Business Ambassador", 
      company: "EXPAND MY BUSINESS",
      duration: "Mar 2021 to May 2021"
    },
    {
      title: "Editorial Wing",
      company: "NATIONAL SERVICE SCHEME NSS, SRCC",
      duration: "2019 to 2020"
    }
  ];

  const mockEducationData = [
    {
      degree: "B.com (Hons.)",
      institution: "Shri Ram College of Commerce, DU",
      duration: "2019 to 2022"
    },
    {
      degree: "HBSE (Class XII)",
      institution: "Vaish Sr. sec. School, Charkhi Dadri",
      duration: "2018 to 2019"
    }
  ];

  const mockTagsData = {
    "Education Type": "Business Management",
    "Education Level": "Bachelors",
    "Industry": "Education, Consulting",
    "Org Type": "Startup, Non-Profit",
    "Work Mode": "Internship",
    "Leadership": "Individual Contributor",
    "Work Domains": "Marketing & Communication, Sales & Business Development, Project Management",
    "Primary Industry": "Education",
    "Business And Tech": "B2B, Consulting",
    "Esg And Diversity": "Diversity and Inclusion (D&I) Champion",
    "Personal Attributes": "Collaborative, Proactive, Problem Solver"
  };

  const mockMetrics = {
    "Latest Company": "Crowd Funding",
    "Current Gap": "4.08333333333333",
    "No. Unique Employer": "5",
    "No of Shifts": "4",
    "No of Shifts 6 in Months": "0",
    "No of Shifts 12 in Months": "0",
    "No of Shifts 3 in Months": "0"
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-lg font-medium text-gray-600">
                  {candidate.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h2 className="text-xl font-semibold">{candidate.name}</h2>
                <p className="text-sm text-gray-500">{candidate.experience}</p>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Experience Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Experience</h3>
            <div className="space-y-3">
              {mockExperienceData.map((exp, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <span className="text-gray-600">•</span>
                  <div>
                    <span className="font-medium">{exp.title}</span>
                    <span className="text-gray-600">, at {exp.company}, from {exp.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Education</h3>
            <div className="space-y-3">
              {mockEducationData.map((edu, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <span className="text-gray-600">•</span>
                  <div>
                    <span className="font-medium">{edu.degree}</span>
                    <span className="text-gray-600">, at {edu.institution}, from {edu.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {candidate.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Tags Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Tags</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(mockTagsData).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="font-medium text-gray-700">{key}</span>
                  <span className="text-gray-600">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Metrics Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(mockMetrics).map(([key, value]) => (
              <div key={key} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">{key}</div>
                <div className="font-semibold text-lg">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CandidateDetails;
