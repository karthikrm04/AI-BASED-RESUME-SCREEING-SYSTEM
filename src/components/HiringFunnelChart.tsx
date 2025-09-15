
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

interface FunnelData {
  stage: string;
  count: number;
  percentage: number;
}

interface HiringFunnelChartProps {
  data: FunnelData[];
}

const chartConfig = {
  count: {
    label: "Candidates",
    color: "hsl(var(--primary))",
  },
};

const HiringFunnelChart: React.FC<HiringFunnelChartProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Hiring Funnel</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Visual Funnel */}
          <div className="space-y-2">
            {data.map((item, index) => (
              <div key={item.stage} className="relative">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{item.stage}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-semibold">{item.count}</span>
                    <span className="text-xs text-gray-500">({item.percentage}%)</span>
                  </div>
                </div>
                <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="mt-6">
            <ChartContainer config={chartConfig} className="h-64">
              <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis 
                  dataKey="stage" 
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar 
                  dataKey="count" 
                  fill="var(--color-count)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HiringFunnelChart;
