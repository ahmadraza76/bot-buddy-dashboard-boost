
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
    if (!change) return <Minus className="h-3 w-3 text-gray-400" />;
    if (change > 0) return <TrendingUp className="h-3 w-3 text-green-500" />;
    return <TrendingDown className="h-3 w-3 text-red-500" />;
  };

  const getTrendColor = (change?: number) => {
    if (!change) return "text-gray-400";
    if (change > 0) return "text-green-600";
    return "text-red-600";
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2 px-3 pt-3">
            <div className="flex items-center justify-between">
              <p className="text-[10px] sm:text-xs text-gray-600 font-medium">
                {stat.label}
              </p>
              {stat.icon && (
                <stat.icon className={`h-4 w-4 ${stat.color || 'text-gray-400'}`} />
              )}
            </div>
          </CardHeader>
          <CardContent className="px-3 pb-3">
            <div className="flex items-center justify-between">
              <p className="text-lg sm:text-2xl font-bold text-gray-900">
                {stat.value}
              </p>
              {stat.change !== undefined && (
                <div className="flex items-center gap-1">
                  {getTrendIcon(stat.change)}
                  <span className={`text-xs ${getTrendColor(stat.change)}`}>
                    {Math.abs(stat.change)}%
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
