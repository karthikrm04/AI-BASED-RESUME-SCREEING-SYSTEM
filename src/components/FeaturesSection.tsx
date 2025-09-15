
import React from 'react';
import { Upload, Search, BarChart3, CheckCircle } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Upload,
      title: "Bulk Upload",
      description: "Upload up to 500 resumes at once in PDF, DOC, or DOCX format. Our AI processes them in minutes.",
      color: "blue"
    },
    {
      icon: Search,
      title: "AI Search",
      description: "Use natural language queries like '2+ years Python experience' or 'MBA with marketing focus' to find candidates.",
      color: "green"
    },
    {
      icon: BarChart3,
      title: "Smart Matching",
      description: "Get ranked results with confidence scores showing exactly how well each candidate matches your requirements.",
      color: "purple"
    },
    {
      icon: CheckCircle,
      title: "Quick Decisions",
      description: "Review AI-generated insights, rate candidates, and reach out to top matches with built-in contact tools.",
      color: "orange"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: { bg: "bg-blue-100", text: "text-blue-600", hover: "group-hover:bg-blue-200" },
      green: { bg: "bg-green-100", text: "text-green-600", hover: "group-hover:bg-green-200" },
      purple: { bg: "bg-purple-100", text: "text-purple-600", hover: "group-hover:bg-purple-200" },
      orange: { bg: "bg-orange-100", text: "text-orange-600", hover: "group-hover:bg-orange-200" }
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Features
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI-powered platform transforms the way you screen resumes, making the process 
            faster, more accurate, and completely bias-free.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const colors = getColorClasses(feature.color);
            return (
              <div 
                key={index}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className={`${colors.bg} ${colors.hover} w-16 h-16 rounded-lg flex items-center justify-center mb-6 transition-colors`}>
                  <feature.icon className={colors.text} size={28} />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
