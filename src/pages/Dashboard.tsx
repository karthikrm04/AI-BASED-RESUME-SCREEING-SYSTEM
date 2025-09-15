
import React, { useState } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import FileUpload from '../components/FileUpload';
import { useCandidates } from '../hooks/useCandidates';
import { Upload, Search, Users, FileText, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { candidates, addCandidate } = useCandidates();
  const [showFileUpload, setShowFileUpload] = useState(false);
  const shortlistedCandidates = candidates.filter(c => c.isShortlisted);

  const quickStats = [
    { label: 'Total Candidates', value: candidates.length, icon: Users, color: 'blue' },
    { label: 'Shortlisted', value: shortlistedCandidates.length, icon: Target, color: 'green' },
    { label: 'This Month', value: Math.floor(candidates.length * 0.3), icon: Search, color: 'purple' }
  ];

  const handleUploadComplete = (newCandidates) => {
    addCandidate(newCandidates);
    setShowFileUpload(false);
  };

  const quickActions = [
    {
      title: 'Upload Resumes',
      description: 'Add new candidates to your database',
      icon: Upload,
      color: 'blue',
      action: () => setShowFileUpload(true)
    },
    {
      title: 'AI Search',
      description: 'Find perfect candidates using AI',
      icon: Search,
      color: 'purple',
      link: '/search'
    },
    {
      title: 'View Candidates',
      description: 'Manage your candidate pipeline',
      icon: FileText,
      color: 'green',
      link: '/candidate'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Recruiter!</h1>
          <p className="text-lg text-gray-600">
            Manage your candidate pipeline and find the perfect matches for your roles.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                  <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickActions.map((action, index) => {
              if (action.link) {
                return (
                  <Link
                    key={index}
                    to={action.link}
                    className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className={`p-4 rounded-lg bg-${action.color}-100 mb-4`}>
                        <action.icon className={`h-8 w-8 text-${action.color}-600`} />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
                      <p className="text-sm text-gray-600">{action.description}</p>
                    </div>
                  </Link>
                );
              }

              return (
                <button
                  key={index}
                  onClick={action.action}
                  className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow w-full text-left"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className={`p-4 rounded-lg bg-${action.color}-100 mb-4`}>
                      <action.icon className={`h-8 w-8 text-${action.color}-600`} />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Upload className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">New resumes uploaded</p>
                <p className="text-sm text-gray-600">3 new candidates added to database</p>
              </div>
              <span className="text-sm text-gray-500 ml-auto">2 hours ago</span>
            </div>
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Target className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Candidates shortlisted</p>
                <p className="text-sm text-gray-600">2 candidates marked for interview</p>
              </div>
              <span className="text-sm text-gray-500 ml-auto">1 day ago</span>
            </div>
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Search className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">AI search performed</p>
                <p className="text-sm text-gray-600">Found 15 matching candidates for Software Engineer role</p>
              </div>
              <span className="text-sm text-gray-500 ml-auto">2 days ago</span>
            </div>
          </div>
        </div>
      </main>

      {/* File Upload Modal */}
      {showFileUpload && (
        <FileUpload
          onClose={() => setShowFileUpload(false)}
          onUploadComplete={handleUploadComplete}
        />
      )}
    </div>
  );
};

export default Dashboard;
