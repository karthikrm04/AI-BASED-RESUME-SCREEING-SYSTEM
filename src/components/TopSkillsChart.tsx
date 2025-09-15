
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

interface SkillData {
  skill: string;
  count: number;
  demandScore: number;
}

interface TopSkillsChartProps {
  data: SkillData[];
}

const chartConfig = {
  count: {
    label: "Candidates",
    color: "#8b5cf6",
  },
  demandScore: {
    label: "Demand Score",
    color: "#06b6d4",
  },
};

const TopSkillsChart: React.FC<TopSkillsChartProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Top Skills in Demand</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Skills List */}
          <div className="space-y-3">
            {data.slice(0, 8).map((skill, index) => (
              <div key={skill.skill} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 text-xs font-bold rounded-full">
                    {index + 1}
                  </span>
                  <span className="font-medium text-gray-900">{skill.skill}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-900">{skill.count}</div>
                    <div className="text-xs text-gray-500">candidates</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-cyan-500"
                        style={{ width: `${skill.demandScore}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-600 w-8">{skill.demandScore}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="mt-6">
            <ChartContainer config={chartConfig} className="h-64">
              <BarChart data={data.slice(0, 10)} layout="horizontal" margin={{ top: 20, right: 30, left: 60, bottom: 5 }}>
                <XAxis type="number" tick={{ fontSize: 12 }} />
                <YAxis 
                  type="category" 
                  dataKey="skill" 
                  tick={{ fontSize: 12 }}
                  width={80}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar 
                  dataKey="count" 
                  fill="var(--color-count)"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ChartContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TopSkillsChart;
