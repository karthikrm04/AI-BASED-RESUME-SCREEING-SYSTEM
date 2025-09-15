
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, CheckCircle } from 'lucide-react';

const CTASection = () => {
  const features = [
    "Process 500+ resumes in minutes",
    "98% matching accuracy",
    "Save 90% of screening time",
    "Free 14-day trial"
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-black bg-opacity-10"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white bg-opacity-10 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white bg-opacity-5 rounded-full"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-white bg-opacity-10 rounded-full"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <div className="space-y-8">
          <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
            Ready to Transform Your 
            <span className="block text-yellow-300">Hiring Process?</span>
          </h2>
          
          <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Join 500+ recruiters who have already revolutionized their hiring process with HireMe. 
            Start your free trial today and see the difference AI can make.
          </p>

          {/* Features checklist */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3 justify-center md:justify-start">
                <CheckCircle className="text-green-400 flex-shrink-0" size={20} />
                <span className="text-blue-100">{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/signup"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:shadow-lg hover:scale-105 min-w-48"
            >
              Get Started Today
            </Link>
            <a 
              href="#features"
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 min-w-48"
            >
              Learn More
            </a>
          </div>

          {/* Trust indicators */}
          <div className="pt-8 border-t border-white border-opacity-20">
            <p className="text-blue-100 mb-4">
              Trusted by leading companies worldwide
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="bg-white bg-opacity-20 px-6 py-2 rounded-lg">
                <span className="font-semibold">TechCorp</span>
              </div>
              <div className="bg-white bg-opacity-20 px-6 py-2 rounded-lg">
                <span className="font-semibold">InnovateLabs</span>
              </div>
              <div className="bg-white bg-opacity-20 px-6 py-2 rounded-lg">
                <span className="font-semibold">GlobalHire</span>
              </div>
              <div className="bg-white bg-opacity-20 px-6 py-2 rounded-lg">
                <span className="font-semibold">StartupHub</span>
              </div>
            </div>
          </div>

          {/* Scroll to top */}
          <div className="pt-8">
            <a 
              href="#top"
              className="inline-flex items-center space-x-2 text-blue-100 hover:text-white transition-colors"
            >
              <ArrowUp size={20} />
              <span>Back to top</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
