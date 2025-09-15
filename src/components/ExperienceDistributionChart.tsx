
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

interface ExperienceData {
  level: string;
  count: number;
  avgScore: number;
}

interface ExperienceDistributionChartProps {
  data: ExperienceData[];
}

const chartConfig = {
  count: {
    label: "Candidates",
    color: "#f59e0b",
  },
  avgScore: {
    label: "Avg Score",
    color: "#3b82f6",
  },
};

const ExperienceDistributionChart: React.FC<ExperienceDistributionChartProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Experience Level Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-64">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis 
              dataKey="level" 
              tick={{ fontSize: 12 }}
            />
            <YAxis tick={{ fontSize: 12 }} />
            <ChartTooltip 
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white p-3 border rounded-lg shadow-lg">
                      <p className="font-medium mb-2">{label}</p>
                      <div className="space-y-1">
                        <p className="text-sm">
                          <span className="font-medium">Candidates:</span> {payload[0]?.value}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Avg Score:</span> {payload[0]?.payload?.avgScore}/100
                        </p>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar 
              dataKey="count" 
              fill="var(--color-count)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ExperienceDistributionChart;
