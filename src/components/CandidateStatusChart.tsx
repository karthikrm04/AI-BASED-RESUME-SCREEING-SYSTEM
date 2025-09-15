
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

interface StatusData {
  status: string;
  count: number;
  color: string;
}

interface CandidateStatusChartProps {
  data: StatusData[];
}

const chartConfig = {
  pending: {
    label: "Pending",
    color: "#fbbf24",
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

const CandidateStatusChart: React.FC<CandidateStatusChartProps> = ({ data }) => {
  const total = data.reduce((sum, item) => sum + item.count, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Candidate Status Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-64">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={5}
              dataKey="count"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <ChartTooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0];
                  const percentage = ((data.value as number / total) * 100).toFixed(1);
                  return (
                    <div className="bg-white p-3 border rounded-lg shadow-lg">
                      <p className="font-medium">{data.payload.status}</p>
                      <p className="text-sm text-gray-600">
                        {data.value} candidates ({percentage}%)
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              formatter={(value, entry) => (
                <span className="text-sm font-medium" style={{ color: entry.color }}>
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default CandidateStatusChart;
