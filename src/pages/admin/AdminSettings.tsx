
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
  const [facebookUrl, setFacebookUrl] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const { data: platformSettings = {}, isLoading: isLoadingSettings } = usePlatformSettings();
  const updateSetting = useUpdatePlatformSetting();
  const { toast } = useToast();
  const [razorpayKey, setRazorpayKey] = useState("");
  const [usdtPayoutKey, setUsdtPayoutKey] = useState("");

  // On load: fill from settings if present
  React.useEffect(() => {
    setRazorpayKey(platformSettings["razorpay_payout_key"] ?? "");
    setUsdtPayoutKey(platformSettings["usdt_trc20_payout_key"] ?? "");
    setFacebookUrl(platformSettings["facebook_url"] ?? "");
    setTwitterUrl(platformSettings["twitter_url"] ?? "");
    setInstagramUrl(platformSettings["instagram_url"] ?? "");
    setYoutubeUrl(platformSettings["youtube_url"] ?? "");
    setLinkedinUrl(platformSettings["linkedin_url"] ?? "");
  }, [isLoadingSettings, platformSettings]);

  return (
    <div className="px-2 py-2 sm:px-0 space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h1 className="text-lg sm:text-2xl font-bold text-gray-900">Admin Settings</h1>
          <p className="text-xs sm:text-sm text-gray-500">Configure platform settings and preferences</p>
        </div>
        <Button size="sm" className="w-full sm:w-auto">
          <Save className="h-3 w-3 mr-2" />
          Save All
        </Button>
      </div>

      <Tabs defaultValue="platform" className="space-y-3">
        <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6 text-xs">
          <TabsTrigger value="platform" className="flex items-center gap-1 px-2">
            <Settings className="h-3 w-3" />
            <span className="hidden sm:inline">Platform</span>
          </TabsTrigger>
          <TabsTrigger value="pricing" className="flex items-center gap-1 px-2">
            <CreditCard className="h-3 w-3" />
            <span className="hidden sm:inline">Pricing</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-1 px-2">
            <Bell className="h-3 w-3" />
            <span className="hidden sm:inline">Notify</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-1 px-2">
            <Shield className="h-3 w-3" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center gap-1 px-2">
            <Server className="h-3 w-3" />
            <span className="hidden sm:inline">System</span>
          </TabsTrigger>
          <TabsTrigger value="social" className="flex items-center gap-1 px-2">
            <Users className="h-3 w-3" />
            <span className="hidden sm:inline">Social</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="platform">
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm sm:text-base">Platform Configuration</CardTitle>
                <CardDescription className="text-xs sm:text-sm">General platform settings and announcements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-medium">Platform Name</label>
                  <Input defaultValue="BotifyHost" className="text-xs sm:text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-medium">Support Email</label>
                  <Input defaultValue="support@botifyhost.com" className="text-xs sm:text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-medium">Platform Announcement</label>
                  <Textarea 
                    placeholder="Enter any platform-wide announcement..."
                    rows={3}
                    className="text-xs sm:text-sm"
                  />
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <label className="text-xs sm:text-sm font-medium">Maintenance Mode</label>
                    <p className="text-xs text-gray-500">Disable new registrations</p>
                  </div>
                  <Switch 
                    checked={maintenanceMode}
                    onCheckedChange={setMaintenanceMode}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm sm:text-base">Default Bot Settings</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Default configuration for new bot deployments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-medium">Memory Limit</label>
                    <Input defaultValue="256MB" className="text-xs sm:text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-medium">CPU Limit</label>
                    <Input defaultValue="0.5 cores" className="text-xs sm:text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-medium">Auto-restart</label>
                    <Input defaultValue="24 hours" className="text-xs sm:text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-medium">Max Bots/User</label>
                    <Input defaultValue="5" type="number" className="text-xs sm:text-sm" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="pricing">
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm sm:text-base">Pricing Plans</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Manage subscription plans and pricing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-medium">Monthly Plan</label>
                    <Input defaultValue="₹599" className="text-xs sm:text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-medium">3 Months Plan</label>
                    <Input defaultValue="₹1499" className="text-xs sm:text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-medium">6 Months Plan</label>
                    <Input defaultValue="₹2799" className="text-xs sm:text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-medium">Yearly Plan</label>
                    <Input defaultValue="₹4999" className="text-xs sm:text-sm" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm sm:text-base">Payment Gateways</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Configure payment methods and payouts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-medium">Razorpay Key ID</label>
                  <Input placeholder="rzp_live_..." className="text-xs sm:text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-medium">PayPal Client ID</label>
                  <Input placeholder="PayPal client ID..." className="text-xs sm:text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-medium">USDT Wallet Address</label>
                  <Input placeholder="TRC20 wallet address..." className="text-xs sm:text-sm" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-medium">Razorpay Payout API Key</label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Input
                      placeholder="Razorpay Payout API Key"
                      value={razorpayKey}
                      onChange={e => setRazorpayKey(e.target.value)}
                      className="text-xs sm:text-sm flex-1"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full sm:w-auto"
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
                  <p className="text-xs text-gray-500">
                    Used to automate payout withdrawals directly to user bank/UPI.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-medium">USDT (TRC20) Payout Key</label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Input
                      placeholder="USDT TRC20 API Key or Wallet"
                      value={usdtPayoutKey}
                      onChange={e => setUsdtPayoutKey(e.target.value)}
                      className="text-xs sm:text-sm flex-1"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full sm:w-auto"
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
                  <p className="text-xs text-gray-500">
                    Used for automatic USDT (TRC20) payout/withdrawals.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm sm:text-base">Email Settings</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Configure SMTP and email notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-medium">SMTP Server</label>
                  <Input defaultValue="smtp.gmail.com" className="text-xs sm:text-sm" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-medium">Port</label>
                    <Input defaultValue="587" className="text-xs sm:text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-medium">Security</label>
                    <select className="w-full px-3 py-2 border rounded-md text-xs sm:text-sm">
                      <option>TLS</option>
                      <option>SSL</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-medium">Username</label>
                  <Input placeholder="Email username" className="text-xs sm:text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-medium">Password</label>
                  <Input type="password" placeholder="Email password" className="text-xs sm:text-sm" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm sm:text-base">Notification Preferences</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Choose what notifications to send</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <label className="text-xs sm:text-sm font-medium">Email Notifications</label>
                    <p className="text-xs text-gray-500">Send email notifications to admins</p>
                  </div>
                  <Switch 
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <label className="text-xs sm:text-sm font-medium">Payment Alerts</label>
                    <p className="text-xs text-gray-500">Alert on failed payments</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <label className="text-xs sm:text-sm font-medium">System Alerts</label>
                    <p className="text-xs text-gray-500">Alert on system issues</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <label className="text-xs sm:text-sm font-medium">User Notifications</label>
                    <p className="text-xs text-gray-500">Send welcome emails to new users</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security">
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm sm:text-base">Access Control</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Security and access settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-medium">Allowed IP Addresses</label>
                  <Textarea 
                    placeholder="Enter IP addresses (one per line)&#10;192.168.1.1&#10;10.0.0.1"
                    rows={4}
                    className="text-xs sm:text-sm"
                  />
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <label className="text-xs sm:text-sm font-medium">Two-Factor Authentication</label>
                    <p className="text-xs text-gray-500">Require 2FA for admin login</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm sm:text-base">Admin Roles</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Manage admin permissions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <span className="text-xs sm:text-sm font-medium">Super Admin</span>
                      <p className="text-xs text-gray-500">Full access to all features</p>
                    </div>
                    <Button variant="outline" size="sm" className="text-xs">Edit</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <span className="text-xs sm:text-sm font-medium">Support Admin</span>
                      <p className="text-xs text-gray-500">Access to tickets and user management</p>
                    </div>
                    <Button variant="outline" size="sm" className="text-xs">Edit</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <span className="text-xs sm:text-sm font-medium">Billing Admin</span>
                      <p className="text-xs text-gray-500">Access to payments and billing</p>
                    </div>
                    <Button variant="outline" size="sm" className="text-xs">Edit</Button>
                  </div>
                </div>
                <Button variant="outline" className="w-full text-xs">
                  <Users className="h-3 w-3 mr-2" />
                  Add New Role
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="system">
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm sm:text-base">System Configuration</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Server and system settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-medium">Docker Registry</label>
                  <Input defaultValue="registry.botifyhost.com" className="text-xs sm:text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-medium">Bot Repository URL</label>
                  <Input defaultValue="https://github.com/botifyhost/telegram-music-bot" className="text-xs sm:text-sm" />
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <label className="text-xs sm:text-sm font-medium">Auto Backup</label>
                    <p className="text-xs text-gray-500">Daily database backups</p>
                  </div>
                  <Switch 
                    checked={autoBackup}
                    onCheckedChange={setAutoBackup}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-medium">Backup Retention (days)</label>
                  <Input defaultValue="30" type="number" className="text-xs sm:text-sm" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm sm:text-base">Resource Limits</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Global resource constraints</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-medium">Max Concurrent Deployments</label>
                    <Input defaultValue="10" type="number" className="text-xs sm:text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-medium">Max Memory per Container</label>
                    <Input defaultValue="512MB" className="text-xs sm:text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-medium">Max CPU per Container</label>
                    <Input defaultValue="1.0 cores" className="text-xs sm:text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-medium">Container Timeout (minutes)</label>
                    <Input defaultValue="30" type="number" className="text-xs sm:text-sm" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="social">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm sm:text-base">Social Media Links</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Update your platform's public social media URLs. Leave blank to hide a platform.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs sm:text-sm font-medium">Facebook</label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input
                    placeholder="https://facebook.com/yourpage"
                    value={facebookUrl}
                    onChange={e => setFacebookUrl(e.target.value)}
                    className="text-xs sm:text-sm flex-1"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-auto"
                    onClick={() =>
                      updateSetting.mutate(
                        { key: "facebook_url", value: facebookUrl },
                        {
                          onSuccess: () => toast({ title: "Facebook link saved!" }),
                          onError: err => toast({
                            title: "Error",
                            description: String((err as any).message || "Failed to save Facebook link."),
                            variant: "destructive",
                          }),
                        }
                      )}
                    disabled={updateSetting.isPending}
                  >
                    Save
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs sm:text-sm font-medium">Twitter / X</label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input
                    placeholder="https://x.com/yourprofile"
                    value={twitterUrl}
                    onChange={e => setTwitterUrl(e.target.value)}
                    className="text-xs sm:text-sm flex-1"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-auto"
                    onClick={() =>
                      updateSetting.mutate(
                        { key: "twitter_url", value: twitterUrl },
                        {
                          onSuccess: () => toast({ title: "Twitter link saved!" }),
                          onError: err => toast({
                            title: "Error",
                            description: String((err as any).message || "Failed to save Twitter link."),
                            variant: "destructive",
                          }),
                        }
                      )}
                    disabled={updateSetting.isPending}
                  >
                    Save
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs sm:text-sm font-medium">Instagram</label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input
                    placeholder="https://instagram.com/yourprofile"
                    value={instagramUrl}
                    onChange={e => setInstagramUrl(e.target.value)}
                    className="text-xs sm:text-sm flex-1"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-auto"
                    onClick={() =>
                      updateSetting.mutate(
                        { key: "instagram_url", value: instagramUrl },
                        {
                          onSuccess: () => toast({ title: "Instagram link saved!" }),
                          onError: err => toast({
                            title: "Error",
                            description: String((err as any).message || "Failed to save Instagram link."),
                            variant: "destructive",
                          }),
                        }
                      )}
                    disabled={updateSetting.isPending}
                  >
                    Save
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs sm:text-sm font-medium">YouTube</label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input
                    placeholder="https://youtube.com/yourchannel"
                    value={youtubeUrl}
                    onChange={e => setYoutubeUrl(e.target.value)}
                    className="text-xs sm:text-sm flex-1"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-auto"
                    onClick={() =>
                      updateSetting.mutate(
                        { key: "youtube_url", value: youtubeUrl },
                        {
                          onSuccess: () => toast({ title: "YouTube link saved!" }),
                          onError: err => toast({
                            title: "Error",
                            description: String((err as any).message || "Failed to save YouTube link."),
                            variant: "destructive",
                          }),
                        }
                      )}
                    disabled={updateSetting.isPending}
                  >
                    Save
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs sm:text-sm font-medium">LinkedIn</label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input
                    placeholder="https://linkedin.com/company/yourcompany"
                    value={linkedinUrl}
                    onChange={e => setLinkedinUrl(e.target.value)}
                    className="text-xs sm:text-sm flex-1"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-auto"
                    onClick={() =>
                      updateSetting.mutate(
                        { key: "linkedin_url", value: linkedinUrl },
                        {
                          onSuccess: () => toast({ title: "LinkedIn link saved!" }),
                          onError: err => toast({
                            title: "Error",
                            description: String((err as any).message || "Failed to save LinkedIn link."),
                            variant: "destructive",
                          }),
                        }
                      )}
                    disabled={updateSetting.isPending}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
