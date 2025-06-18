
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, UserCheck, UserX, CheckCircle, XCircle, Clock } from "lucide-react";

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
    <Card key={user.id} className="bg-white shadow-sm hover:shadow-md transition-shadow border">
      <CardContent className="p-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-1">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-xs">
              {user.email?.[0]?.toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{user.email}</p>
              <p className="text-xs text-gray-500 truncate">{user.telegramId}</p>
              <div className="flex items-center gap-2 mt-1 text-xs text-gray-600">
                <span>Joined: {user.joinDate}</span>
                <span>•</span>
                <span>{user.botCount} bots</span>
                <span>•</span>
                <span>Last: {user.lastSeen}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <div className="text-center">
              <Badge className={`${getStatusColor(user.status)} px-2 py-1 text-xs font-medium`} variant="outline">
                {user.status.toUpperCase()}
              </Badge>
              <p className="text-xs text-gray-500 mt-1">{user.subscription}</p>
            </div>
            <div className="flex gap-1">
              <Button 
                variant="outline" 
                size="sm" 
                className="h-7 px-2 text-xs rounded-md border-gray-200 hover:bg-gray-50"
                onClick={() => onAction?.('view', user)}
              >
                <Eye className="h-3 w-3" />
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className={`h-7 px-2 text-xs rounded-md border-gray-200 ${
                  user.status === "active" ? "hover:bg-red-50 hover:border-red-200 hover:text-red-600" : "hover:bg-green-50 hover:border-green-200 hover:text-green-600"
                }`}
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
    <Card key={payment.id} className="bg-white shadow-sm hover:shadow-md transition-shadow border">
      <CardContent className="p-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-1">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center text-white font-semibold text-xs">
              ₹
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-base font-bold text-gray-900">₹{payment.amount}</p>
              <p className="text-xs text-gray-500 truncate">{payment.profiles?.email}</p>
              <div className="flex items-center gap-2 mt-1 text-xs text-gray-600">
                <span>Plan: {payment.plan}</span>
                <span>•</span>
                <span>Method: {payment.method}</span>
                <span>•</span>
                <span>{new Date(payment.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <Badge className={`${getStatusColor(payment.status)} px-2 py-1 text-xs font-medium`} variant="outline">
              {payment.status.toUpperCase()}
            </Badge>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-7 px-2 text-xs rounded-md border-gray-200 hover:bg-gray-50"
              onClick={() => onAction?.('view', payment)}
            >
              <Eye className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderPayoutCard = (payout: any) => (
    <Card key={payout.id} className="bg-white shadow-sm hover:shadow-md transition-shadow border">
      <CardContent className="p-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-1">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center text-white font-semibold text-xs">
              💰
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-base font-bold text-gray-900">₹{payout.amount}</p>
              <p className="text-xs text-gray-500 truncate">{payout.profiles?.email}</p>
              <div className="flex items-center gap-2 mt-1 text-xs text-gray-600">
                <span>Method: {payout.method?.toUpperCase()}</span>
                <span>•</span>
                <span>Requested: {new Date(payout.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <Badge className={`${getStatusColor(payout.status)} px-2 py-1 text-xs font-medium`} variant="outline">
              {payout.status.toUpperCase()}
            </Badge>
            {payout.status === "pending" && (
              <div className="flex gap-1">
                <Button
                  size="sm"
                  className="h-7 px-2 bg-green-600 hover:bg-green-700 text-white text-xs rounded-md"
                  onClick={() => onAction?.('approve', payout)}
                >
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 px-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 text-xs rounded-md"
                  onClick={() => onAction?.('decline', payout)}
                >
                  <XCircle className="h-3 w-3 mr-1" />
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
      case 'payouts': return renderPayoutCard(item);
      default: return null;
    }
  };

  if (data.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <Clock className="h-6 w-6 text-gray-400" />
        </div>
        <p className="text-sm text-gray-600">No data available</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {data.map(renderCard)}
    </div>
  );
}
