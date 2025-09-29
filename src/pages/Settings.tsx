import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  Store, 
  CheckCircle2,
  AlertCircle,
  Bell,
  Database,
  Shield
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Settings() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Manage your Shopify connection and app preferences
        </p>
      </div>

      {/* Shopify Connection */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Store className="h-5 w-5" />
                Shopify Connection
              </CardTitle>
              <CardDescription>Your store connection status and details</CardDescription>
            </div>
            <Badge variant="default" className="flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" />
              Connected
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Store Domain</Label>
              <Input value="mystore.myshopify.com" disabled />
            </div>
            <div className="space-y-2">
              <Label>Plan</Label>
              <Input value="Shopify Plus" disabled />
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-3">
              <Database className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">API Rate Limit</p>
                <p className="text-sm text-muted-foreground">
                  Current usage: 234/1000 calls per minute
                </p>
              </div>
            </div>
            <div className="text-sm text-success">Healthy</div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline">
              Reconnect Store
            </Button>
            <Button variant="destructive">
              Disconnect
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Spreadsheet Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Spreadsheet Preferences</CardTitle>
          <CardDescription>Configure default spreadsheet behavior</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto-save changes</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically save changes every 2 minutes
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Show preview before applying</Label>
                <p className="text-sm text-muted-foreground">
                  Review changes before syncing to Shopify
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Enable undo/redo</Label>
                <p className="text-sm text-muted-foreground">
                  Keep revision history for rollback
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Default rows per page</Label>
            <Select defaultValue="50">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="25">25 rows</SelectItem>
                <SelectItem value="50">50 rows</SelectItem>
                <SelectItem value="100">100 rows</SelectItem>
                <SelectItem value="200">200 rows</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </CardTitle>
          <CardDescription>Manage your notification preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Low inventory alerts</Label>
              <p className="text-sm text-muted-foreground">
                Get notified when products are low in stock
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Sync completion</Label>
              <p className="text-sm text-muted-foreground">
                Notify when bulk operations complete
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Error alerts</Label>
              <p className="text-sm text-muted-foreground">
                Get alerted about sync errors and failures
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Data Validation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Data Validation
          </CardTitle>
          <CardDescription>Configure validation rules for data entry</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Require SKU for all products</Label>
              <p className="text-sm text-muted-foreground">
                Prevent saving products without SKU
              </p>
            </div>
            <Switch />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Validate price ranges</Label>
              <p className="text-sm text-muted-foreground">
                Check for unusual price values
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Check duplicate SKUs</Label>
              <p className="text-sm text-muted-foreground">
                Warn when duplicate SKUs are detected
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Danger Zone
          </CardTitle>
          <CardDescription>Irreversible actions - proceed with caution</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-4 border border-destructive rounded-lg">
            <div>
              <p className="font-medium">Clear all change history</p>
              <p className="text-sm text-muted-foreground">
                Remove all revision history permanently
              </p>
            </div>
            <Button variant="destructive" size="sm">
              Clear History
            </Button>
          </div>
          
          <div className="flex items-center justify-between p-4 border border-destructive rounded-lg">
            <div>
              <p className="font-medium">Reset all settings</p>
              <p className="text-sm text-muted-foreground">
                Restore default configuration
              </p>
            </div>
            <Button variant="destructive" size="sm">
              Reset Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
