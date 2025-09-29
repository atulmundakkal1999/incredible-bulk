import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Clock, 
  RotateCcw, 
  Search,
  Filter,
  ChevronRight,
  User
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function History() {
  const [selectedRevision, setSelectedRevision] = useState<number | null>(null);

  // Mock revision history
  const revisions = [
    {
      id: 1,
      timestamp: '2024-01-15 14:30:22',
      user: 'Admin User',
      operation: 'Bulk Price Update',
      changes: 45,
      description: 'Updated prices for Electronics category',
      details: [
        { field: 'Price', oldValue: '$99.99', newValue: '$89.99', product: 'Wireless Headphones' },
        { field: 'Price', oldValue: '$149.99', newValue: '$129.99', product: 'Smart Watch' },
        { field: 'Price', oldValue: '$79.99', newValue: '$69.99', product: 'Bluetooth Speaker' },
      ]
    },
    {
      id: 2,
      timestamp: '2024-01-15 13:15:10',
      user: 'Admin User',
      operation: 'Inventory Update',
      changes: 120,
      description: 'Updated inventory quantities after stock check',
      details: [
        { field: 'Inventory', oldValue: '50', newValue: '75', product: 'T-Shirt Blue XL' },
        { field: 'Inventory', oldValue: '30', newValue: '60', product: 'Jeans Dark Wash' },
      ]
    },
    {
      id: 3,
      timestamp: '2024-01-14 16:45:33',
      user: 'Admin User',
      operation: 'Tag Management',
      changes: 89,
      description: 'Added "winter-sale" tag to seasonal products',
      details: [
        { field: 'Tags', oldValue: 'featured', newValue: 'featured, winter-sale', product: 'Winter Jacket' },
      ]
    },
    {
      id: 4,
      timestamp: '2024-01-14 10:20:15',
      user: 'Admin User',
      operation: 'Product Import',
      changes: 234,
      description: 'Imported new products from CSV file',
      details: []
    },
    {
      id: 5,
      timestamp: '2024-01-13 09:30:45',
      user: 'Admin User',
      operation: 'Bulk Status Change',
      changes: 23,
      description: 'Changed status from Draft to Active',
      details: [
        { field: 'Status', oldValue: 'Draft', newValue: 'Active', product: 'New Arrival #123' },
      ]
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Change History</h1>
        <p className="text-muted-foreground">
          Track all changes and revert to previous versions
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by operation, user, or product..." 
                className="pl-9"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Operation Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Operations</SelectItem>
                <SelectItem value="price">Price Updates</SelectItem>
                <SelectItem value="inventory">Inventory Updates</SelectItem>
                <SelectItem value="tags">Tag Changes</SelectItem>
                <SelectItem value="import">Imports</SelectItem>
                <SelectItem value="status">Status Changes</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="7days">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="90days">Last 90 days</SelectItem>
                <SelectItem value="all">All time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          {revisions.map((revision, index) => (
            <Card 
              key={revision.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedRevision === revision.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setSelectedRevision(revision.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{revision.timestamp}</span>
                      <Badge variant="outline" className="text-xs">
                        {revision.changes} changes
                      </Badge>
                    </div>
                    <h3 className="font-semibold mb-1">{revision.operation}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {revision.description}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <User className="h-3 w-3" />
                      <span>{revision.user}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Revert
                    </Button>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Details Panel */}
        <div>
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Change Details</CardTitle>
              <CardDescription>
                {selectedRevision 
                  ? 'Detailed information about the selected change' 
                  : 'Select a change to view details'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedRevision ? (
                <div className="space-y-4">
                  {revisions
                    .find(r => r.id === selectedRevision)
                    ?.details.map((detail, idx) => (
                      <div key={idx} className="p-3 border rounded-lg space-y-2">
                        <p className="font-medium text-sm">{detail.product}</p>
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">Field: {detail.field}</p>
                          <div className="flex items-center gap-2 text-xs">
                            <span className="px-2 py-1 bg-destructive/10 text-destructive rounded">
                              {detail.oldValue}
                            </span>
                            <span>→</span>
                            <span className="px-2 py-1 bg-success/10 text-success rounded">
                              {detail.newValue}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  
                  {revisions.find(r => r.id === selectedRevision)?.details.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-8">
                      Detailed change log not available for this operation
                    </p>
                  )}

                  <Button className="w-full" variant="destructive">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Revert This Change
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Clock className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Click on a revision to view its details
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
