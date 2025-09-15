
import React from 'react';
import { Clock, Target, TrendingUp, Zap } from 'lucide-react';

const BenefitsSection = () => {
  const benefits = [
    {
      icon: Clock,
      title: "Save 90% of Screening Time",
      description: "What used to take 8 hours now takes 30 minutes. Focus on interviewing the best candidates instead of manual screening.",
      stat: "8 hours → 30 minutes"
    },
    {
      icon: Target,
      title: "Never Miss Qualified Candidates",
      description: "Our AI analyzes every resume thoroughly, ensuring no qualified candidate slips through the cracks.",
      stat: "98% accuracy rate"
    },
    {
      icon: TrendingUp,
      title: "Make Data-Driven Decisions",
      description: "Get detailed insights and confidence scores for every candidate match, backed by comprehensive analysis.",
      stat: "100% objective screening"
    },
    {
      icon: Zap,
      title: "Streamline Your Process",
      description: "Integrate seamlessly with your existing workflow. Export results, track progress, and collaborate with your team.",
      stat: "50% faster hiring"
    }
  ];

  return (
    <section className="py-20 bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Why Choose HireMe?
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Join hundreds of successful recruiters who have transformed their hiring process 
            with our AI-powered screening technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-white bg-opacity-10 backdrop-blur-sm p-8 rounded-xl hover:bg-opacity-20 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start space-x-4">
                <div className="bg-white bg-opacity-20 p-3 rounded-lg flex-shrink-0">
                  <benefit.icon size={28} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-blue-100 leading-relaxed mb-4">
                    {benefit.description}
                  </p>
                  <div className="bg-white bg-opacity-20 inline-block px-3 py-1 rounded-full text-sm font-medium">
                    {benefit.stat}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Success Stories */}
        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-center mb-8">
            Success Stories
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">500+</div>
              <p className="text-blue-100">Companies using HireMe</p>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">1M+</div>
              <p className="text-blue-100">Resumes processed</p>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">45%</div>
              <p className="text-blue-100">Reduction in time-to-hire</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
