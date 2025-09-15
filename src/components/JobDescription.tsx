
import React from 'react';
import { FileText } from 'lucide-react';

interface JobDescriptionProps {
  searchQuery: string;
}

const JobDescription: React.FC<JobDescriptionProps> = ({ searchQuery }) => {
  // Generate AI job description based on search query
  const generateJobDescription = (query: string) => {
    if (!query) {
      return {
        title: "Job Description",
        description: "AI-generated job description will appear here based on your search criteria.",
        responsibilities: [],
        requirements: []
      };
    }

    // Mock AI-generated content based on the search query
    return {
      title: "AI-Generated Job Description",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      responsibilities: [
        "Develop and maintain high-quality software applications using Python programming language.",
        "Write efficient, clean, and reusable code following best practices and coding standards.",
        "Design and implement scalable web applications using Python frameworks such as Django or Flask.",
        "Troubleshoot and debug issues in existing software applications, ensuring optimal performance and functionality."
      ],
      requirements: [
        "Bachelor of Computer Application (BCA)",
        "Minimum of 3 years of experience in Python development",
        "Strong understanding of object-oriented programming",
        "Expertise in Python frameworks such as Django or Flask"
      ]
    };
  };

  const jobDesc = generateJobDescription(searchQuery);

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="h-5 w-5 text-purple-600" />
        <h3 className="text-lg font-semibold text-gray-900">{jobDesc.title}</h3>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Description</h4>
          <p className="text-gray-600 text-sm leading-relaxed">{jobDesc.description}</p>
        </div>

        {jobDesc.responsibilities.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Responsibilities</h4>
            <ul className="space-y-1">
              {jobDesc.responsibilities.map((responsibility, index) => (
                <li key={index} className="text-gray-600 text-sm flex items-start">
                  <span className="mr-2">•</span>
                  <span>{responsibility}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {jobDesc.requirements.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Requirements</h4>
            <ul className="space-y-1">
              {jobDesc.requirements.map((requirement, index) => (
                <li key={index} className="text-gray-600 text-sm flex items-start">
                  <span className="mr-2">•</span>
                  <span>{requirement}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDescription;
