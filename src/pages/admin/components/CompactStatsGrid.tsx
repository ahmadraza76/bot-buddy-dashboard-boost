
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatItem {
  label: string;
  value: string | number;
  change?: number;
  icon?: React.ComponentType<{ className?: string }>;
  color?: string;
}

interface CompactStatsGridProps {
  stats: StatItem[];
}

export default function CompactStatsGrid({ stats }: CompactStatsGridProps) {
  const getTrendIcon = (change?: number) => {
    if (!change) return <Minus className="h-4 w-4 text-gray-400" />;
    if (change > 0) return <TrendingUp className="h-4 w-4 text-green-500" />;
    return <TrendingDown className="h-4 w-4 text-red-500" />;
  };

  const getTrendColor = (change?: number) => {
    if (!change) return "text-gray-400";
    if (change > 0) return "text-green-600";
    return "text-red-600";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 group">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-gray-50 group-hover:scale-110 transition-transform duration-200">
                {stat.icon && <stat.icon className={`h-6 w-6 ${stat.color || 'text-gray-600'}`} />}
              </div>
              {stat.change !== undefined && (
                <div className="flex items-center gap-1">
                  {getTrendIcon(stat.change)}
                  <span className={`text-sm font-semibold ${getTrendColor(stat.change)}`}>
                    {Math.abs(stat.change)}%
                  </span>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
