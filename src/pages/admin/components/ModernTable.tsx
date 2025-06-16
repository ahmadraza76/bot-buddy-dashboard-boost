
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, MoreVertical, UserCheck, UserX } from "lucide-react";

interface ModernTableProps {
  data: any[];
  type: 'users' | 'payments' | 'bots' | 'payouts';
  onAction?: (action: string, item: any) => void;
}

export default function ModernTable({ data, type, onAction }: ModernTableProps) {
  const getStatusColor = (status: string) => {
    const colors = {
      active: "bg-green-100 text-green-800 border-green-200",
      inactive: "bg-yellow-100 text-yellow-800 border-yellow-200",
      banned: "bg-red-100 text-red-800 border-red-200",
      running: "bg-green-100 text-green-800 border-green-200",
      stopped: "bg-gray-100 text-gray-800 border-gray-200",
      error: "bg-red-100 text-red-800 border-red-200",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      completed: "bg-green-100 text-green-800 border-green-200",
      approved: "bg-green-100 text-green-800 border-green-200",
      declined: "bg-red-100 text-red-800 border-red-200",
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const renderUserCard = (user: any) => (
    <Card key={user.id} className="p-3 hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-medium text-blue-600">
                {user.email?.[0]?.toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{user.email}</p>
                <p className="text-xs text-gray-500 truncate">{user.telegramId}</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
            <Badge className={getStatusColor(user.status)} variant="outline">
              {user.status}
            </Badge>
            <div className="text-xs text-gray-500">
              <p>{user.subscription}</p>
              <p>{user.botCount} bots</p>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="sm" onClick={() => onAction?.('view', user)}>
                <Eye className="h-3 w-3" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className={user.status === "active" ? "text-red-600" : "text-green-600"}
                onClick={() => onAction?.(user.status === "active" ? 'deactivate' : 'activate', user)}
              >
                {user.status === "active" ? <UserX className="h-3 w-3" /> : <UserCheck className="h-3 w-3" />}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderPaymentCard = (payment: any) => (
    <Card key={payment.id} className="p-3 hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-xs">₹</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">₹{payment.amount}</p>
                <p className="text-xs text-gray-500 truncate">{payment.profiles?.email}</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
            <Badge className={getStatusColor(payment.status)} variant="outline">
              {payment.status}
            </Badge>
            <div className="text-xs text-gray-500">
              <p>{payment.plan}</p>
              <p>{payment.method}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => onAction?.('view', payment)}>
              <Eye className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderBotCard = (bot: any) => (
    <Card key={bot.id} className="p-3 hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-sm">
                🤖
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{bot.username}</p>
                <p className="text-xs text-gray-500 truncate">{bot.owner}</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
            <Badge className={getStatusColor(bot.status)} variant="outline">
              {bot.status}
            </Badge>
            <div className="text-xs text-gray-500">
              <p>{bot.uptime}</p>
              <p>{bot.memoryUsage}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => onAction?.('manage', bot)}>
              <MoreVertical className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderPayoutCard = (payout: any) => (
    <Card key={payout.id} className="p-3 hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-sm">
                💰
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">₹{payout.amount}</p>
                <p className="text-xs text-gray-500 truncate">{payout.profiles?.email}</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
            <Badge className={getStatusColor(payout.status)} variant="outline">
              {payout.status}
            </Badge>
            <div className="text-xs text-gray-500">
              <p>{payout.method?.toUpperCase()}</p>
              <p>{new Date(payout.created_at).toLocaleDateString()}</p>
            </div>
            {payout.status === "pending" && (
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-green-600 text-xs px-2 py-1"
                  onClick={() => onAction?.('approve', payout)}
                >
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-red-600 text-xs px-2 py-1"
                  onClick={() => onAction?.('decline', payout)}
                >
                  Decline
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderCard = (item: any) => {
    switch (type) {
      case 'users': return renderUserCard(item);
      case 'payments': return renderPaymentCard(item);
      case 'bots': return renderBotCard(item);
      case 'payouts': return renderPayoutCard(item);
      default: return null;
    }
  };

  return (
    <div className="space-y-2">
      {data.map(renderCard)}
    </div>
  );
}
