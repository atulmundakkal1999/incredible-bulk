import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Grid, BarChart3, FileSpreadsheet, Zap, Shield, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6 mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-primary/10">
              <FileSpreadsheet className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Incredible Bulk
            </h1>
          </div>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            The most powerful Excel-like spreadsheet editor for Shopify. Manage thousands of products, 
            variants, inventory, and pricing with real-time synchronization and advanced filtering.
          </p>
          
          <div className="flex gap-4 justify-center items-center flex-wrap">
            <Button asChild size="lg" className="gap-2">
              <Link to="/dashboard">
                <Grid className="h-5 w-5" />
                Open Dashboard
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link to="/editor">
                <FileSpreadsheet className="h-5 w-5" />
                Start Editing
              </Link>
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="p-2 rounded-lg bg-primary/10 w-fit">
                <FileSpreadsheet className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Excel-like Interface</CardTitle>
              <CardDescription>
                Familiar spreadsheet experience with advanced filtering, sorting, and bulk operations
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="p-2 rounded-lg bg-primary/10 w-fit">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Real-time Sync</CardTitle>
              <CardDescription>
                Bidirectional synchronization with your Shopify store without manual imports/exports
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="p-2 rounded-lg bg-primary/10 w-fit">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Bulk Operations</CardTitle>
              <CardDescription>
                Update thousands of products, variants, prices, and inventory levels simultaneously
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="p-2 rounded-lg bg-primary/10 w-fit">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Safe Workflows</CardTitle>
              <CardDescription>
                Preview changes, validation rules, and comprehensive undo/redo system
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="p-2 rounded-lg bg-primary/10 w-fit">
                <Grid className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Advanced Filters</CardTitle>
              <CardDescription>
                Multi-criteria filtering by vendor, type, tags, price ranges, and inventory levels
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="p-2 rounded-lg bg-primary/10 w-fit">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Formula Support</CardTitle>
              <CardDescription>
                Excel-like formulas for automated calculations, pricing strategies, and data manipulation
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Status Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Store Connection
                <Badge variant="outline">Not Connected</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Connect your Shopify store to start managing products in bulk
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Connect Store
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Products Synced
                <Badge variant="secondary">0</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Products ready for bulk editing
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Last Sync
                <Badge variant="outline">Never</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Most recent synchronization with Shopify
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
