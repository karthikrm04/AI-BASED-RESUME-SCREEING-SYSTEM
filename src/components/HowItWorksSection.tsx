
import React from 'react';
import { Upload, FileText, Search, Users } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      icon: Upload,
      title: "Upload Resumes",
      description: "Drag and drop up to 500 resumes in PDF, DOC, or DOCX format. Our system securely processes them in minutes.",
      details: ["Support for multiple formats", "Bulk upload capability", "Secure processing", "OCR for scanned documents"]
    },
    {
      icon: FileText,
      title: "Enter Job Requirements",
      description: "Describe your ideal candidate in plain English. No complex queries needed - just tell us what you're looking for.",
      details: ["Natural language input", "Flexible requirements", "Skills and experience matching", "Location preferences"]
    },
    {
      icon: Search,
      title: "Get AI-Ranked Matches",
      description: "Our AI analyzes every resume and provides ranked results with confidence scores and detailed explanations.",
      details: ["Intelligent ranking system", "Confidence scores", "Detailed match explanations", "Customizable filters"]
    },
    {
      icon: Users,
      title: "Review & Contact",
      description: "Review AI insights, add your notes, and reach out to top candidates directly through our integrated contact system.",
      details: ["Detailed candidate profiles", "Contact management", "Team collaboration", "Interview scheduling"]
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our streamlined process makes resume screening effortless. From upload to hire, 
            everything is designed for maximum efficiency.
          </p>
        </div>

        <div className="space-y-16">
          {steps.map((step, index) => (
            <div 
              key={index}
              className={`flex flex-col lg:flex-row items-center gap-12 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Content */}
              <div className="flex-1 space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">
                    {index + 1}
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900">
                    {step.title}
                  </h3>
                </div>
                
                <p className="text-xl text-gray-600 leading-relaxed">
                  {step.description}
                </p>

                <ul className="space-y-2">
                  {step.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-gray-700">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Visual */}
              <div className="flex-1">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl">
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-center mb-6">
                      <div className="bg-blue-100 p-4 rounded-full">
                        <step.icon className="text-blue-600" size={32} />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {index === 0 && (
                        <>
                          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="text-sm text-gray-700">resume_john_doe.pdf</span>
                          </div>
                          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="text-sm text-gray-700">jane_smith_cv.docx</span>
                          </div>
                          <div className="text-center text-sm text-gray-500">
                            + 498 more files processed
                          </div>
                        </>
                      )}
                      
                      {index === 1 && (
                        <div className="space-y-3">
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="text-sm text-gray-600 mb-2">Job Requirements:</div>
                            <div className="text-gray-800">"5+ years React development, team leadership experience, Bachelor's degree preferred"</div>
                          </div>
                        </div>
                      )}
                      
                      {index === 2 && (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                            <span className="text-sm font-medium">Sarah Johnson</span>
                            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">98% Match</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                            <span className="text-sm font-medium">Mike Chen</span>
                            <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs">95% Match</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                            <span className="text-sm font-medium">Alex Rivera</span>
                            <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs">87% Match</span>
                          </div>
                        </div>
                      )}
                      
                      {index === 3 && (
                        <div className="space-y-3">
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="text-sm font-medium text-gray-800 mb-2">Sarah Johnson - 98% Match</div>
                            <div className="text-xs text-gray-600 mb-3">7 years React, Team Lead at TechCorp</div>
                            <button className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                              Schedule Interview
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
