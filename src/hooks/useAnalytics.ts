
import { useState, useEffect, useMemo } from 'react';

interface AnalyticsData {
  totalApplications: number;
  totalApproved: number;
  totalRejected: number;
  avgProcessingTime: number;
  approvalRate: number;
  hiringFunnel: Array<{
    stage: string;
    count: number;
    percentage: number;
  }>;
  statusDistribution: Array<{
    status: string;
    count: number;
    color: string;
  }>;
  applicationsOverTime: Array<{
    date: string;
    applications: number;
    approved: number;
    rejected: number;
  }>;
  topSkills: Array<{
    skill: string;
    count: number;
    demandScore: number;
  }>;
  experienceDistribution: Array<{
    level: string;
    count: number;
    avgScore: number;
  }>;
}

export const useAnalytics = (dateRange: string, department: string, position: string) => {
  const [isLoading, setIsLoading] = useState(true);

  // Mock data generation based on filters
  const data: AnalyticsData = useMemo(() => {
    // Base numbers that change based on filters
    const baseTotal = department === 'all' ? 1248 : 
                     department === 'engineering' ? 425 :
                     department === 'marketing' ? 285 :
                     department === 'sales' ? 310 : 228;

    const totalApplications = baseTotal;
    const totalApproved = Math.floor(totalApplications * 0.32);
    const totalRejected = Math.floor(totalApplications * 0.28);
    const totalPending = totalApplications - totalApproved - totalRejected;

    const approvalRate = (totalApproved / totalApplications) * 100;

    // Generate time series data
    const applicationsOverTime = [];
    const days = dateRange === '7d' ? 7 : dateRange === '30d' ? 30 : dateRange === '90d' ? 90 : 365;
    
    for (let i = days; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      const dailyApps = Math.floor(Math.random() * 25) + 5;
      const dailyApproved = Math.floor(dailyApps * 0.3);
      const dailyRejected = Math.floor(dailyApps * 0.25);
      
      applicationsOverTime.push({
        date: date.toISOString(),
        applications: dailyApps,
        approved: dailyApproved,
        rejected: dailyRejected,
      });
    }

    return {
      totalApplications,
      totalApproved,
      totalRejected,
      avgProcessingTime: 3.2,
      approvalRate,
      hiringFunnel: [
        { stage: 'Applications', count: totalApplications, percentage: 100 },
        { stage: 'Screen Review', count: Math.floor(totalApplications * 0.75), percentage: 75 },
        { stage: 'Phone Screen', count: Math.floor(totalApplications * 0.45), percentage: 45 },
        { stage: 'Technical', count: Math.floor(totalApplications * 0.35), percentage: 35 },
        { stage: 'Final Interview', count: Math.floor(totalApplications * 0.28), percentage: 28 },
        { stage: 'Offer', count: totalApproved, percentage: Math.round(approvalRate) },
      ],
      statusDistribution: [
        { status: 'Pending', count: totalPending, color: '#fbbf24' },
        { status: 'Approved', count: totalApproved, color: '#10b981' },
        { status: 'Rejected', count: totalRejected, color: '#ef4444' },
      ],
      applicationsOverTime,
      topSkills: [
        { skill: 'React', count: 284, demandScore: 95 },
        { skill: 'JavaScript', count: 267, demandScore: 92 },
        { skill: 'Python', count: 245, demandScore: 88 },
        { skill: 'Node.js', count: 198, demandScore: 85 },
        { skill: 'TypeScript', count: 189, demandScore: 82 },
        { skill: 'AWS', count: 167, demandScore: 79 },
        { skill: 'SQL', count: 156, demandScore: 76 },
        { skill: 'Docker', count: 134, demandScore: 73 },
        { skill: 'MongoDB', count: 123, demandScore: 70 },
        { skill: 'GraphQL', count: 98, demandScore: 67 },
      ],
      experienceDistribution: [
        { level: 'Entry (0-2 years)', count: Math.floor(totalApplications * 0.35), avgScore: 72 },
        { level: 'Mid (3-5 years)', count: Math.floor(totalApplications * 0.32), avgScore: 78 },
        { level: 'Senior (6-8 years)', count: Math.floor(totalApplications * 0.22), avgScore: 84 },
        { level: 'Lead (9+ years)', count: Math.floor(totalApplications * 0.11), avgScore: 89 },
      ],
    };
  }, [dateRange, department, position]);

  useEffect(() => {
    setIsLoading(true);
    // Simulate API call
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [dateRange, department, position]);

  return { data, isLoading };
};
