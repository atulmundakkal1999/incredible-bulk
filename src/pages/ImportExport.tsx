import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Upload, 
  Download, 
  FileText, 
  CheckCircle2, 
  XCircle,
  Clock,
  File
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ImportExport() {
  const [uploadProgress, setUploadProgress] = useState(0);

  // Mock history data
  const importHistory = [
    { id: 1, filename: 'products_jan_2024.csv', date: '2024-01-15', status: 'success', records: 245 },
    { id: 2, filename: 'inventory_update.xlsx', date: '2024-01-10', status: 'success', records: 180 },
    { id: 3, filename: 'new_products.csv', date: '2024-01-05', status: 'failed', records: 0 },
  ];

  const exportHistory = [
    { id: 1, filename: 'all_products_export.csv', date: '2024-01-14', status: 'completed', records: 1250 },
    { id: 2, filename: 'inventory_report.xlsx', date: '2024-01-12', status: 'completed', records: 1250 },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-success" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-destructive" />;
      case 'processing':
        return <Clock className="h-4 w-4 text-warning" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Import/Export Center</h1>
        <p className="text-muted-foreground">
          Manage bulk data imports and exports for your store
        </p>
      </div>

      <Tabs defaultValue="import" className="space-y-6">
        <TabsList>
          <TabsTrigger value="import">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </TabsTrigger>
          <TabsTrigger value="export">
            <Download className="h-4 w-4 mr-2" />
            Export
          </TabsTrigger>
          <TabsTrigger value="history">
            <Clock className="h-4 w-4 mr-2" />
            History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="import" className="space-y-6">
          {/* Import Section */}
          <Card>
            <CardHeader>
              <CardTitle>Import Products</CardTitle>
              <CardDescription>
                Upload a CSV or Excel file to bulk import or update products
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed rounded-lg p-12 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">
                  Drop your file here, or click to browse
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Supported formats: CSV, XLSX (Max 10MB)
                </p>
                <Button>Choose File</Button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Import Options</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Import Type</label>
                    <Select defaultValue="products">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="products">Products</SelectItem>
                        <SelectItem value="variants">Variants</SelectItem>
                        <SelectItem value="inventory">Inventory</SelectItem>
                        <SelectItem value="metafields">Metafields</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">If Product Exists</label>
                    <Select defaultValue="update">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="update">Update existing</SelectItem>
                        <SelectItem value="skip">Skip</SelectItem>
                        <SelectItem value="create">Create duplicate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Need a template?</p>
                  <p className="text-xs text-muted-foreground">
                    Download our CSV template with the correct format
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Download Template
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="export" className="space-y-6">
          {/* Export Section */}
          <Card>
            <CardHeader>
              <CardTitle>Export Products</CardTitle>
              <CardDescription>
                Download your product data in CSV or Excel format
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Export Type</label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Products</SelectItem>
                      <SelectItem value="active">Active Products Only</SelectItem>
                      <SelectItem value="draft">Draft Products Only</SelectItem>
                      <SelectItem value="selected">Selected Products</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">File Format</label>
                  <Select defaultValue="csv">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="csv">CSV (.csv)</SelectItem>
                      <SelectItem value="xlsx">Excel (.xlsx)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium">Include Fields</label>
                <div className="grid grid-cols-3 gap-3">
                  {['Title', 'Price', 'Inventory', 'SKU', 'Vendor', 'Type', 'Tags', 'Status', 'Metafields'].map((field) => (
                    <div key={field} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={field}
                        defaultChecked
                        className="rounded border-input"
                      />
                      <label htmlFor={field} className="text-sm">
                        {field}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">Ready to export</p>
                  <p className="text-sm text-muted-foreground">
                    Estimated: 1,250 products
                  </p>
                </div>
                <Button>
                  <Download className="h-4 w-4 mr-2" />
                  Export Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          {/* History Section */}
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Import History</CardTitle>
                <CardDescription>Recent import operations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {importHistory.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(item.status)}
                        <File className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{item.filename}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.date} • {item.records} records
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={item.status === 'success' ? 'default' : 'destructive'}>
                          {item.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Export History</CardTitle>
                <CardDescription>Recent export operations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {exportHistory.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(item.status)}
                        <File className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{item.filename}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.date} • {item.records} records
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
