
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface TimeData {
  date: string;
  applications: number;
  approved: number;
  rejected: number;
}

interface ApplicationsTimeChartProps {
  data: TimeData[];
}

const chartConfig = {
  applications: {
    label: "Applications",
    color: "#3b82f6",
  },
  approved: {
    label: "Approved",
    color: "#10b981",
  },
  rejected: {
    label: "Rejected",
    color: "#ef4444",
  },
};

const ApplicationsTimeChart: React.FC<ApplicationsTimeChartProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Applications Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-80">
          <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="applicationsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-applications)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="var(--color-applications)" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="approvedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-approved)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="var(--color-approved)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => {
                const date = new Date(value);
                return `${date.getMonth() + 1}/${date.getDate()}`;
              }}
            />
            <YAxis tick={{ fontSize: 12 }} />
            <ChartTooltip 
              content={<ChartTooltipContent />}
              labelFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString();
              }}
            />
            <Area
              type="monotone"
              dataKey="applications"
              stroke="var(--color-applications)"
              fillOpacity={1}
              fill="url(#applicationsGradient)"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="approved"
              stroke="var(--color-approved)"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="rejected"
              stroke="var(--color-rejected)"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ApplicationsTimeChart;
