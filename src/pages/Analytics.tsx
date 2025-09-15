
import React, { useState } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import AnalyticsFilters from '../components/AnalyticsFilters';
import MetricCard from '../components/MetricCard';
import { useAnalytics } from '../hooks/useAnalytics';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, Sparkles, Calendar, FileText, Users, ChevronRight } from 'lucide-react';
import { ChartContainer } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const Analytics = () => {
  const [dateRange, setDateRange] = useState('30d');
  const [department, setDepartment] = useState('all');
  const [position, setPosition] = useState('all');

  const { data, isLoading } = useAnalytics(dateRange, department, position);

  const pipelineData = [
    { stage: 'applied', count: 3096, percentage: 76 },
    { stage: 'screening', count: 187, percentage: 6 },
    { stage: 'assessment', count: 168, percentage: 6 },
    { stage: 'interview', count: 244, percentage: 8 },
    { stage: 'offer', count: 236, percentage: 9 },
    { stage: 'hired', count: 220, percentage: 7 },
  ];

  const topMetrics = [
    {
      title: 'Open Jobs',
      value: '59',
      icon: <Users className="h-6 w-6 text-blue-600" />,
      change: { value: 12, type: 'increase' as const, period: 'last month' }
    },
    {
      title: 'Time to Fill (Avg.)',
      value: '7 days',
      icon: <Calendar className="h-6 w-6 text-green-600" />,
      change: { value: 8, type: 'decrease' as const, period: 'last month' }
    },
    {
      title: 'Interview-to-Offer Ratio',
      value: '1:1',
      icon: <FileText className="h-6 w-6 text-purple-600" />,
      change: { value: 5, type: 'increase' as const, period: 'last quarter' }
    },
    {
      title: 'Offer Acceptance Rate',
      value: '91%',
      icon: <AlertTriangle className="h-6 w-6 text-orange-600" />,
      change: { value: 3, type: 'increase' as const, period: 'last month' }
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <DashboardHeader />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Recruiter Analytics</h1>
          
          {/* Analytics Filters */}
          <AnalyticsFilters
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            department={department}
            onDepartmentChange={setDepartment}
            position={position}
            onPositionChange={setPosition}
          />
        </div>

        {/* Top Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {topMetrics.map((metric, index) => (
            <MetricCard
              key={index}
              title={metric.title}
              value={metric.value}
              change={metric.change}
              icon={metric.icon}
            />
          ))}
        </div>

        {/* Middle Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Your Productivity */}
          <Card className="bg-white">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Your Productivity</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-600">Interviews Scheduled</span>
                  </div>
                  <p className="text-3xl font-bold text-gray-900">0</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-600">Offers Released</span>
                  </div>
                  <p className="text-3xl font-bold text-gray-900">241</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Recommendations */}
          <Card className="bg-white lg:col-span-2">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="h-5 w-5 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-900">AI Recommendations</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">
                    Job - data analyst has no candidates in Interview stage. Consider sourcing more aggressively.
                  </span>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">
                    Job - Automation Engineer has no candidates in Interview stage. Consider sourcing more aggressively.
                  </span>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pipeline Overview */}
        <Card className="bg-white">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Pipeline Overview</h3>
            
            {/* Pipeline Stats */}
            <div className="grid grid-cols-6 gap-4 mb-6">
              {pipelineData.map((item, index) => (
                <div key={item.stage} className="text-center">
                  <p className="text-sm text-gray-600 capitalize mb-1">{item.stage}</p>
                  <p className="text-lg font-bold text-gray-900">{item.count.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">({item.percentage}%)</p>
                </div>
              ))}
            </div>

            {/* Chart */}
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={pipelineData}>
                  <XAxis 
                    dataKey="stage" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                  />
                  <Bar 
                    dataKey="count" 
                    fill="#8b5cf6"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Analytics;
