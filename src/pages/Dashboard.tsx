import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  FileSpreadsheet, 
  Upload, 
  Download, 
  Clock, 
  Package, 
  TrendingUp,
  AlertCircle,
  CheckCircle,
  RefreshCw
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Overview of your store and bulk editing activities
              </p>
            </div>
            <div className="flex gap-3">
              <Button asChild>
                <Link to="/editor">
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  Open Editor
                </Link>
              </Button>
              <Button variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Sync Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">
                +0% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Changes</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">
                Ready to sync
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sync Status</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Up to date</div>
              <p className="text-xs text-muted-foreground">
                Last sync: Never
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
              <AlertCircle className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">
                Requires attention
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest sync operations and bulk edits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-center py-12 text-center text-muted-foreground">
                    <div>
                      <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No recent activity</p>
                      <p className="text-sm">Start by connecting your Shopify store</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common tasks and operations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <Button asChild variant="outline" className="h-auto p-4 justify-start">
                    <Link to="/editor">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <FileSpreadsheet className="h-4 w-4" />
                          <span className="font-medium">Open Spreadsheet</span>
                        </div>
                        <p className="text-xs text-muted-foreground text-left">
                          Start bulk editing products
                        </p>
                      </div>
                    </Link>
                  </Button>

                  <Button asChild variant="outline" className="h-auto p-4 justify-start">
                    <Link to="/import-export">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Upload className="h-4 w-4" />
                          <span className="font-medium">Import Data</span>
                        </div>
                        <p className="text-xs text-muted-foreground text-left">
                          Upload CSV or Excel files
                        </p>
                      </div>
                    </Link>
                  </Button>

                  <Button asChild variant="outline" className="h-auto p-4 justify-start">
                    <Link to="/import-export">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Download className="h-4 w-4" />
                          <span className="font-medium">Export Data</span>
                        </div>
                        <p className="text-xs text-muted-foreground text-left">
                          Download current products
                        </p>
                      </div>
                    </Link>
                  </Button>

                  <Button asChild variant="outline" className="h-auto p-4 justify-start">
                    <Link to="/products">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Package className="h-4 w-4" />
                          <span className="font-medium">Browse Products</span>
                        </div>
                        <p className="text-xs text-muted-foreground text-left">
                          View and search products
                        </p>
                      </div>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Store Connection Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Store Connection</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Status</span>
                    <Badge variant="outline">Not Connected</Badge>
                  </div>
                  <Button className="w-full">
                    Connect Shopify Store
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Connect your store to start bulk editing products
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Sync Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Sync Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Products</span>
                      <span>0/0</span>
                    </div>
                    <Progress value={0} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Variants</span>
                      <span>0/0</span>
                    </div>
                    <Progress value={0} className="h-2" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Last sync: Never
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Tips & Shortcuts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium">Keyboard Shortcuts</p>
                    <p className="text-muted-foreground">Ctrl+S to save changes</p>
                  </div>
                  <Separator />
                  <div>
                    <p className="font-medium">Bulk Edit</p>
                    <p className="text-muted-foreground">Select multiple cells to edit at once</p>
                  </div>
                  <Separator />
                  <div>
                    <p className="font-medium">Filters</p>
                    <p className="text-muted-foreground">Use advanced filters to focus on specific products</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;