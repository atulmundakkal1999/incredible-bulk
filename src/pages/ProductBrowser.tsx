import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Edit,
  Trash2,
  ExternalLink
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export default function ProductBrowser() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

  // Mock data
  const mockProducts = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: `Product ${i + 1}`,
    price: `$${(Math.random() * 100 + 10).toFixed(2)}`,
    inventory: Math.floor(Math.random() * 100),
    sku: `SKU-${1000 + i}`,
    vendor: ['Acme Corp', 'Best Supplies', 'Quality Goods'][Math.floor(Math.random() * 3)],
    type: ['Electronics', 'Clothing', 'Home & Garden'][Math.floor(Math.random() * 3)],
    status: Math.random() > 0.2 ? 'Active' : 'Draft',
    image: '/placeholder.svg'
  }));

  const handleSelectProduct = (id: number) => {
    setSelectedProducts(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === mockProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(mockProducts.map(p => p.id));
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Search and Filter Bar */}
      <div className="border-b bg-background p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search products by title, SKU, or vendor..." 
                className="pl-9"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Product Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="clothing">Clothing</SelectItem>
                <SelectItem value="home">Home & Garden</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode("grid")}
              className={viewMode === "grid" ? "bg-accent" : ""}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode("list")}
              className={viewMode === "list" ? "bg-accent" : ""}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {selectedProducts.length > 0 && (
        <div className="border-b bg-muted/50 p-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">
              {selectedProducts.length} product{selectedProducts.length !== 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Bulk Edit
              </Button>
              <Button size="sm" variant="outline">
                Export Selected
              </Button>
              <Button size="sm" variant="destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Products Display */}
      <div className="flex-1 overflow-auto p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Checkbox 
              checked={selectedProducts.length === mockProducts.length}
              onCheckedChange={handleSelectAll}
            />
            <span className="text-sm text-muted-foreground">
              Showing {mockProducts.length} products
            </span>
          </div>
        </div>

        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {mockProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="w-full h-48 object-cover"
                  />
                  <Checkbox 
                    className="absolute top-2 left-2 bg-background"
                    checked={selectedProducts.includes(product.id)}
                    onCheckedChange={() => handleSelectProduct(product.id)}
                  />
                  <Badge 
                    className="absolute top-2 right-2"
                    variant={product.status === 'Active' ? 'default' : 'secondary'}
                  >
                    {product.status}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold truncate mb-1">{product.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{product.sku}</p>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-primary">{product.price}</span>
                    <span className="text-sm text-muted-foreground">
                      Stock: {product.inventory}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="ghost">
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {mockProducts.map((product) => (
              <Card key={product.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <Checkbox 
                      checked={selectedProducts.includes(product.id)}
                      onCheckedChange={() => handleSelectProduct(product.id)}
                    />
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1 grid grid-cols-5 gap-4">
                      <div>
                        <p className="font-semibold">{product.title}</p>
                        <p className="text-sm text-muted-foreground">{product.sku}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Type</p>
                        <p className="text-sm">{product.type}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Vendor</p>
                        <p className="text-sm">{product.vendor}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Price</p>
                        <p className="text-sm font-semibold">{product.price}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Inventory</p>
                        <p className="text-sm">{product.inventory}</p>
                      </div>
                    </div>
                    <Badge variant={product.status === 'Active' ? 'default' : 'secondary'}>
                      {product.status}
                    </Badge>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
