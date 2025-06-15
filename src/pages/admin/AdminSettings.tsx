import React from "react";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Settings, Users, CreditCard, Bell, Shield, Server } from "lucide-react";
import { usePlatformSettings, useUpdatePlatformSetting } from "@/hooks/usePlatformSettings";
import { useToast } from "@/hooks/use-toast";

export default function AdminSettings() {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [autoBackup, setAutoBackup] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const { data: platformSettings = {}, isLoading: isLoadingSettings } = usePlatformSettings();
  const updateSetting = useUpdatePlatformSetting();
  const { toast } = useToast();
  const [razorpayKey, setRazorpayKey] = useState("");
  const [usdtPayoutKey, setUsdtPayoutKey] = useState("");

  // On load: fill from settings if present
  React.useEffect(() => {
    setRazorpayKey(platformSettings["razorpay_payout_key"] ?? "");
    setUsdtPayoutKey(platformSettings["usdt_trc20_payout_key"] ?? "");
  }, [isLoadingSettings, platformSettings]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Settings</h1>
        <Button>
          <Save className="h-4 w-4 mr-2" />
          Save All Changes
        </Button>
      </div>

      <Tabs defaultValue="platform" className="space-y-4">
        <TabsList>
          <TabsTrigger value="platform" className="flex items-center">
            <Settings className="h-4 w-4 mr-2" />
            Platform
          </TabsTrigger>
          <TabsTrigger value="pricing" className="flex items-center">
            <CreditCard className="h-4 w-4 mr-2" />
            Pricing
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center">
            <Shield className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center">
            <Server className="h-4 w-4 mr-2" />
            System
          </TabsTrigger>
        </TabsList>

        <TabsContent value="platform">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Configuration</CardTitle>
                <CardDescription>General platform settings and announcements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Platform Name</label>
                  <Input defaultValue="BotifyHost" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Support Email</label>
                  <Input defaultValue="support@botifyhost.com" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Platform Announcement</label>
                  <Textarea 
                    placeholder="Enter any platform-wide announcement..."
                    rows={3}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Maintenance Mode</label>
                    <p className="text-xs text-muted-foreground">Disable new registrations and deployments</p>
                  </div>
                  <Switch 
                    checked={maintenanceMode}
                    onCheckedChange={setMaintenanceMode}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Default Bot Settings</CardTitle>
                <CardDescription>Default configuration for new bot deployments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Default Memory Limit</label>
                  <Input defaultValue="256MB" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Default CPU Limit</label>
                  <Input defaultValue="0.5 cores" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Auto-restart Interval</label>
                  <Input defaultValue="24 hours" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Max Bots per User</label>
                  <Input defaultValue="5" type="number" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="pricing">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Pricing Plans</CardTitle>
                <CardDescription>Manage subscription plans and pricing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Monthly Plan</label>
                    <Input defaultValue="₹599" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">3 Months Plan</label>
                    <Input defaultValue="₹1499" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">6 Months Plan</label>
                    <Input defaultValue="₹2799" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Yearly Plan</label>
                    <Input defaultValue="₹4999" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Gateways + PAYOUT CONFIG */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Gateways</CardTitle>
                <CardDescription>Configure payment methods and payouts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Razorpay Key ID</label>
                  <Input placeholder="rzp_live_..." />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">PayPal Client ID</label>
                  <Input placeholder="PayPal client ID..." />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">USDT Wallet Address</label>
                  <Input placeholder="TRC20 wallet address..." />
                </div>
                
                {/* NEW: Payout Gateway API Config */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Razorpay Payout API Key (for withdrawals)</label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Razorpay Payout API Key"
                      value={razorpayKey}
                      onChange={e => setRazorpayKey(e.target.value)}
                    />
                    <Button
                      variant="outline"
                      onClick={() => {
                        updateSetting.mutate(
                          { key: "razorpay_payout_key", value: razorpayKey },
                          {
                            onSuccess: () =>
                              toast({
                                title: "Saved!",
                                description: "Razorpay payout API key has been saved.",
                              }),
                            onError: err =>
                              toast({
                                title: "Error",
                                description: String(
                                  (err as any).message || "Failed to save Razorpay payout key."
                                ),
                                variant: "destructive",
                              }),
                          }
                        );
                      }}
                      disabled={updateSetting.isPending}
                    >
                      Save
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Used to automate payout withdrawals directly to user bank/UPI.
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">USDT (TRC20) Payout Key/Address</label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="USDT TRC20 API Key or Wallet"
                      value={usdtPayoutKey}
                      onChange={e => setUsdtPayoutKey(e.target.value)}
                    />
                    <Button
                      variant="outline"
                      onClick={() => {
                        updateSetting.mutate(
                          { key: "usdt_trc20_payout_key", value: usdtPayoutKey },
                          {
                            onSuccess: () =>
                              toast({
                                title: "Saved!",
                                description: "USDT TRC20 payout key/address saved.",
                              }),
                            onError: err =>
                              toast({
                                title: "Error",
                                description: String(
                                  (err as any).message || "Failed to save USDT payout key.",
                                ),
                                variant: "destructive",
                              }),
                          }
                        );
                      }}
                      disabled={updateSetting.isPending}
                    >
                      Save
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Used for automatic USDT (TRC20) payout/withdrawals.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Email Settings</CardTitle>
                <CardDescription>Configure SMTP and email notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">SMTP Server</label>
                  <Input defaultValue="smtp.gmail.com" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Port</label>
                    <Input defaultValue="587" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Security</label>
                    <select className="w-full px-3 py-2 border rounded-md">
                      <option>TLS</option>
                      <option>SSL</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Username</label>
                  <Input placeholder="Email username" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Password</label>
                  <Input type="password" placeholder="Email password" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Choose what notifications to send</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Email Notifications</label>
                    <p className="text-xs text-muted-foreground">Send email notifications to admins</p>
                  </div>
                  <Switch 
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Payment Alerts</label>
                    <p className="text-xs text-muted-foreground">Alert on failed payments</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">System Alerts</label>
                    <p className="text-xs text-muted-foreground">Alert on system issues</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">User Notifications</label>
                    <p className="text-xs text-muted-foreground">Send welcome emails to new users</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Access Control</CardTitle>
                <CardDescription>Security and access settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Allowed IP Addresses</label>
                  <Textarea 
                    placeholder="Enter IP addresses (one per line)&#10;192.168.1.1&#10;10.0.0.1"
                    rows={4}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Two-Factor Authentication</label>
                    <p className="text-xs text-muted-foreground">Require 2FA for admin login</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Admin Roles</CardTitle>
                <CardDescription>Manage admin permissions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <span className="font-medium">Super Admin</span>
                      <p className="text-xs text-muted-foreground">Full access to all features</p>
                    </div>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <span className="font-medium">Support Admin</span>
                      <p className="text-xs text-muted-foreground">Access to tickets and user management</p>
                    </div>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <span className="font-medium">Billing Admin</span>
                      <p className="text-xs text-muted-foreground">Access to payments and billing</p>
                    </div>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  <Users className="h-4 w-4 mr-2" />
                  Add New Role
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="system">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>System Configuration</CardTitle>
                <CardDescription>Server and system settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Docker Registry</label>
                  <Input defaultValue="registry.botifyhost.com" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Bot Repository URL</label>
                  <Input defaultValue="https://github.com/botifyhost/telegram-music-bot" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Auto Backup</label>
                    <p className="text-xs text-muted-foreground">Daily database backups</p>
                  </div>
                  <Switch 
                    checked={autoBackup}
                    onCheckedChange={setAutoBackup}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Backup Retention (days)</label>
                  <Input defaultValue="30" type="number" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resource Limits</CardTitle>
                <CardDescription>Global resource constraints</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Max Concurrent Deployments</label>
                  <Input defaultValue="10" type="number" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Max Memory per Container</label>
                  <Input defaultValue="512MB" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Max CPU per Container</label>
                  <Input defaultValue="1.0 cores" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Container Timeout (minutes)</label>
                  <Input defaultValue="30" type="number" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
