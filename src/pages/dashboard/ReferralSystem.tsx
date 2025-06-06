
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Copy, Users, Gift, TrendingUp, Share2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function ReferralSystem() {
  const { toast } = useToast();
  const [referralCode] = useState("AHMAD123");
  const referralLink = `https://bothoster.in/?ref=${referralCode}`;

  const referralStats = {
    totalReferrals: 12,
    totalEarnings: 850,
    pendingPayouts: 250,
    thisMonthReferrals: 5,
    conversionRate: "15.2%"
  };

  const referralHistory = [
    { name: "Rahul Kumar", email: "rahul@email.com", date: "2 days ago", status: "active", earning: 50 },
    { name: "Priya Sharma", email: "priya@email.com", date: "5 days ago", status: "active", earning: 50 },
    { name: "Amit Singh", email: "amit@email.com", date: "1 week ago", status: "pending", earning: 0 },
    { name: "Neha Gupta", email: "neha@email.com", date: "2 weeks ago", status: "active", earning: 100 },
  ];

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast({
      title: "Link Copied!",
      description: "Referral link copied to clipboard",
    });
  };

  const shareWhatsApp = () => {
    const message = `🤖 Want to host your Telegram bot easily? Join BotHoster using my referral link and get 5% discount! ${referralLink}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Refer & Earn</h1>
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          ₹{referralStats.totalEarnings} Total Earned
        </Badge>
      </div>

      {/* Referral Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardDescription>Total Referrals</CardDescription>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{referralStats.totalReferrals}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardDescription>Total Earnings</CardDescription>
            <Gift className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{referralStats.totalEarnings}</div>
            <p className="text-xs text-green-600">+₹{referralStats.pendingPayouts} pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardDescription>This Month</CardDescription>
            <TrendingUp className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{referralStats.thisMonthReferrals}</div>
            <p className="text-xs text-muted-foreground">New referrals</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardDescription>Conversion Rate</CardDescription>
            <Share2 className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{referralStats.conversionRate}</div>
            <p className="text-xs text-muted-foreground">Signup rate</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Referral Link */}
        <Card>
          <CardHeader>
            <CardTitle>Your Referral Link</CardTitle>
            <CardDescription>Share this link to earn ₹50 per successful referral</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Input value={referralLink} readOnly />
              <Button onClick={copyReferralLink} size="icon">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button onClick={shareWhatsApp} variant="outline" className="w-full">
                Share on WhatsApp
              </Button>
              <Button 
                onClick={() => window.open(`https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=🤖 Join BotHoster using my referral link!`, '_blank')}
                variant="outline" 
                className="w-full"
              >
                Share on Telegram
              </Button>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">How it works:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Your friend gets 5% discount on signup</li>
                <li>• You earn ₹50 when they make first payment</li>
                <li>• Bonus ₹100 if they upgrade to Pro plan</li>
                <li>• Payments processed monthly via UPI</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Payout Info */}
        <Card>
          <CardHeader>
            <CardTitle>Payout Information</CardTitle>
            <CardDescription>Track your earnings and payment history</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <div>
                <p className="font-medium text-green-900">Available for Payout</p>
                <p className="text-sm text-green-700">Minimum ₹100 required</p>
              </div>
              <span className="text-xl font-bold text-green-600">₹{referralStats.totalEarnings - referralStats.pendingPayouts}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
              <div>
                <p className="font-medium text-yellow-900">Pending Review</p>
                <p className="text-sm text-yellow-700">Processing within 7 days</p>
              </div>
              <span className="text-xl font-bold text-yellow-600">₹{referralStats.pendingPayouts}</span>
            </div>
            <Button className="w-full" disabled={referralStats.totalEarnings - referralStats.pendingPayouts < 100}>
              Request Payout via UPI
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              Next payout: 1st of every month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Referral History */}
      <Card>
        <CardHeader>
          <CardTitle>Referral History</CardTitle>
          <CardDescription>People who joined using your referral link</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {referralHistory.map((referral, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{referral.name}</p>
                    <p className="text-sm text-muted-foreground">{referral.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">₹{referral.earning}</p>
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant={referral.status === 'active' ? 'default' : 'secondary'}
                      className={referral.status === 'active' ? 'bg-green-100 text-green-800' : ''}
                    >
                      {referral.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{referral.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
