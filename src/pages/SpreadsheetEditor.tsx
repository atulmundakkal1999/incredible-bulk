import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Save, 
  Undo, 
  Redo, 
  Filter, 
  Search, 
  Download, 
  Upload,
  Settings,
  RefreshCw
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { AIChatInterface } from "@/components/spreadsheet/AIChatInterface";

export default function SpreadsheetEditor() {
  const [selectedCells, setSelectedCells] = useState<string[]>([]);
  
  // Mock data for demonstration
  const columns = [
    { id: 'title', name: 'Title', width: 200 },
    { id: 'price', name: 'Price', width: 100 },
    { id: 'inventory', name: 'Inventory', width: 100 },
    { id: 'sku', name: 'SKU', width: 120 },
    { id: 'vendor', name: 'Vendor', width: 150 },
    { id: 'type', name: 'Product Type', width: 150 },
    { id: 'tags', name: 'Tags', width: 200 },
    { id: 'status', name: 'Status', width: 100 },
  ];

  const mockProducts = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    title: `Product ${i + 1}`,
    price: `$${(Math.random() * 100 + 10).toFixed(2)}`,
    inventory: Math.floor(Math.random() * 100),
    sku: `SKU-${1000 + i}`,
    vendor: ['Acme Corp', 'Best Supplies', 'Quality Goods'][Math.floor(Math.random() * 3)],
    type: ['Electronics', 'Clothing', 'Home & Garden'][Math.floor(Math.random() * 3)],
    tags: ['featured', 'sale', 'new'].slice(0, Math.floor(Math.random() * 3) + 1).join(', '),
    status: Math.random() > 0.2 ? 'Active' : 'Draft',
  }));

  return (
    <div className="flex h-full gap-4 p-4">
      {/* Main Spreadsheet Area */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="border-b bg-background p-4 rounded-t-lg border border-b-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button size="sm" variant="outline">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
            <Button size="sm" variant="outline">
              <Undo className="h-4 w-4 mr-2" />
              Undo
            </Button>
            <Button size="sm" variant="outline">
              <Redo className="h-4 w-4 mr-2" />
              Redo
            </Button>
            <div className="h-4 w-px bg-border mx-2" />
            <Button size="sm" variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Sync with Shopify
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <Input 
              placeholder="Search products..." 
              className="w-64" 
            />
            <Button size="sm" variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button size="sm" variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Columns
            </Button>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="border-b bg-muted/50 px-4 py-2 text-sm text-muted-foreground">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span>Total: {mockProducts.length} products</span>
            <span>Selected: {selectedCells.length} cells</span>
            <Badge variant="outline" className="text-xs">
              Last sync: 2 hours ago
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="text-xs">23 pending changes</Badge>
            <Badge variant="outline" className="text-xs">
              <div className="w-2 h-2 bg-success rounded-full mr-1"></div>
              Connected
            </Badge>
          </div>
        </div>
      </div>

      {/* Spreadsheet Grid */}
      <div className="flex-1 overflow-auto">
        <div className="min-w-full">
          {/* Header Row */}
          <div className="flex sticky top-0 z-10">
            <div className="w-12 h-10 spreadsheet-header flex items-center justify-center text-xs">
              #
            </div>
            {columns.map((column) => (
              <div
                key={column.id}
                className="spreadsheet-header flex items-center justify-between px-3 h-10"
                style={{ width: column.width }}
              >
                <span className="font-medium">{column.name}</span>
                <Button size="sm" variant="ghost" className="h-4 w-4 p-0">
                  <Filter className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>

          {/* Data Rows */}
          {mockProducts.map((product, rowIndex) => (
            <div key={product.id} className="flex hover:bg-spreadsheet-hover">
              <div className="w-12 h-10 spreadsheet-header flex items-center justify-center text-xs font-medium">
                {rowIndex + 1}
              </div>
              {columns.map((column) => (
                <div
                  key={`${product.id}-${column.id}`}
                  className="spreadsheet-cell flex items-center px-3 h-10 cursor-cell"
                  style={{ width: column.width }}
                  onClick={() => {
                    const cellId = `${product.id}-${column.id}`;
                    setSelectedCells([cellId]);
                  }}
                >
                  <span className="text-sm truncate">
                    {product[column.id as keyof typeof product]}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

        {/* Formula Bar */}
        <div className="border-t bg-background p-2 rounded-b-lg border border-t-0">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium w-16">Formula:</span>
            <Input 
              className="flex-1" 
              placeholder="Enter formula or value..."
              disabled={selectedCells.length === 0}
            />
            <Button size="sm" disabled={selectedCells.length === 0}>
              Apply
            </Button>
          </div>
        </div>
      </div>

      {/* AI Chat Interface */}
      <div className="w-96 flex-shrink-0">
        <AIChatInterface 
          sheetContext={`${mockProducts.length} products loaded. Columns: ${columns.map(c => c.name).join(', ')}`}
        />
      </div>
    </div>
  );
}