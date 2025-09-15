
import React from 'react';
import { Clock, Search, AlertTriangle, TrendingDown } from 'lucide-react';

const ProblemSection = () => {
  const problems = [
    {
      icon: Clock,
      title: "Time-Consuming Process",
      description: "Manually reviewing hundreds of resumes takes days, delaying your hiring process and missing top talent."
    },
    {
      icon: Search,
      title: "Missing Qualified Candidates",
      description: "Important qualifications get overlooked in the manual screening process, causing you to pass on perfect matches."
    },
    {
      icon: AlertTriangle,
      title: "Inconsistent Screening",
      description: "Different recruiters apply different standards, leading to unfair evaluations and potential bias."
    },
    {
      icon: TrendingDown,
      title: "Low Efficiency",
      description: "Your team spends 80% of their time on initial screening instead of building relationships with candidates."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            The Recruiting Challenge
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Traditional resume screening is broken. Recruiters are drowning in applications while 
            great candidates slip through the cracks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {problems.map((problem, index) => (
            <div 
              key={index}
              className="text-center p-6 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-200 transition-colors">
                <problem.icon className="text-red-600" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {problem.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 bg-gray-50 rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-red-600 mb-2">8 hours</div>
              <p className="text-gray-600">Average time to screen 100 resumes manually</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-600 mb-2">67%</div>
              <p className="text-gray-600">Of qualified candidates are overlooked</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-600 mb-2">45 days</div>
              <p className="text-gray-600">Average time-to-hire with manual screening</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
