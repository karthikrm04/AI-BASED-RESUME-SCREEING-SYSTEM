
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowLeft, Sparkles, Users, Zap } from 'lucide-react';

const Success = () => {
  const nextSteps = [
    {
      icon: Users,
      title: "Upload Your First Batch",
      description: "Start by uploading up to 500 resumes to see HireMe in action",
      action: "Upload Resumes"
    },
    {
      icon: Zap,
      title: "Set Job Requirements",
      description: "Define your ideal candidate criteria using natural language",
      action: "Create Job Profile"  
    },
    {
      icon: Sparkles,
      title: "Get AI Matches",
      description: "Review ranked candidates with confidence scores and insights",
      action: "View Tutorial"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        {/* Success Message */}
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to HireMe!
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Your account is ready and you're all set to transform your hiring process. 
            Let's get you started with AI-powered resume screening.
          </p>

          {/* Stats */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600 mb-1">500+</div>
                <p className="text-sm text-gray-600">Recruiters using HireMe</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600 mb-1">90%</div>
                <p className="text-sm text-gray-600">Time saved on screening</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600 mb-1">1M+</div>
                <p className="text-sm text-gray-600">Resumes processed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Get Started in 3 Simple Steps
          </h2>
          
          <div className="space-y-6">
            {nextSteps.map((step, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0">
                  <step.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {index + 1}. {step.title}
                  </h3>
                  <p className="text-gray-600 mb-3">
                    {step.description}
                  </p>
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm hover:underline">
                    {step.action} →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors hover:shadow-lg">
            Start Screening Resumes
          </button>
          <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors">
            Watch Demo Video
          </button>
        </div>

        {/* Help & Support */}
        <div className="bg-blue-50 rounded-xl p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Need Help Getting Started?
          </h3>
          <p className="text-gray-600 mb-4">
            Our support team is here to help you make the most of HireMe.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="#" className="text-blue-600 hover:text-blue-700 font-medium text-sm hover:underline">
              View Documentation
            </a>
            <span className="hidden sm:inline text-gray-400">•</span>
            <a href="#" className="text-blue-600 hover:text-blue-700 font-medium text-sm hover:underline">
              Contact Support
            </a>
            <span className="hidden sm:inline text-gray-400">•</span>
            <a href="#" className="text-blue-600 hover:text-blue-700 font-medium text-sm hover:underline">
              Join Community
            </a>
          </div>
        </div>

        {/* Back to home */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft size={16} />
            <span>Back to home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
