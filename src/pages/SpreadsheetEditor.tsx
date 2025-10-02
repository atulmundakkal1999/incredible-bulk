import { useState, useCallback } from "react";
import {
  Page,
  Card,
  Button,
  ButtonGroup,
  TextField,
  Badge,
  DataTable,
  Text,
  InlineStack,
  BlockStack,
  Box,
  Divider,
} from "@shopify/polaris";
import {
  SaveIcon,
  UndoIcon,
  RedoIcon,
  FilterIcon,
  SearchIcon,
  RefreshIcon,
  SettingsIcon,
} from "@shopify/polaris-icons";
import { AIChatInterface } from "@/components/spreadsheet/AIChatInterface";

export default function SpreadsheetEditor() {
  const [selectedCells, setSelectedCells] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [formulaValue, setFormulaValue] = useState("");

  const handleSearchChange = useCallback(
    (newValue: string) => setSearchValue(newValue),
    []
  );

  const handleFormulaChange = useCallback(
    (newValue: string) => setFormulaValue(newValue),
    []
  );

  // Mock data for demonstration
  const mockProducts = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    title: `Product ${i + 1}`,
    price: `$${(Math.random() * 100 + 10).toFixed(2)}`,
    inventory: Math.floor(Math.random() * 100).toString(),
    sku: `SKU-${1000 + i}`,
    vendor: ["Acme Corp", "Best Supplies", "Quality Goods"][
      Math.floor(Math.random() * 3)
    ],
    type: ["Electronics", "Clothing", "Home & Garden"][
      Math.floor(Math.random() * 3)
    ],
    tags: ["featured", "sale", "new"]
      .slice(0, Math.floor(Math.random() * 3) + 1)
      .join(", "),
    status: Math.random() > 0.2 ? "Active" : "Draft",
  }));

  const rows = mockProducts.map((product) => [
    product.title,
    product.price,
    product.inventory,
    product.sku,
    product.vendor,
    product.type,
    product.tags,
    <Badge key={product.id} tone={product.status === "Active" ? "success" : "info"}>
      {product.status}
    </Badge>,
  ]);

  return (
    <Page
      title="Spreadsheet Editor"
      subtitle={`${mockProducts.length} products loaded`}
      primaryAction={{
        content: "Save Changes",
        icon: SaveIcon,
      }}
      secondaryActions={[
        {
          content: "Undo",
          icon: UndoIcon,
        },
        {
          content: "Redo",
          icon: RedoIcon,
        },
        {
          content: "Sync with Shopify",
          icon: RefreshIcon,
        },
      ]}
    >
      <BlockStack gap="400">
        {/* Toolbar */}
        <Card>
          <BlockStack gap="400">
            <InlineStack align="space-between" blockAlign="center">
              <ButtonGroup>
                <Button icon={FilterIcon}>Filter</Button>
                <Button icon={SettingsIcon}>Columns</Button>
              </ButtonGroup>
              <Box minWidth="300px">
                <TextField
                  label=""
                  value={searchValue}
                  onChange={handleSearchChange}
                  placeholder="Search products..."
                  prefix={<SearchIcon />}
                  autoComplete="off"
                  clearButton
                  onClearButtonClick={() => setSearchValue("")}
                />
              </Box>
            </InlineStack>

            <Divider />

            {/* Status Bar */}
            <InlineStack align="space-between" blockAlign="center">
              <InlineStack gap="400" blockAlign="center">
                <Text as="span" variant="bodySm" tone="subdued">
                  Total: {mockProducts.length} products
                </Text>
                <Text as="span" variant="bodySm" tone="subdued">
                  Selected: {selectedCells.length} cells
                </Text>
                <Badge tone="info">Last sync: 2 hours ago</Badge>
              </InlineStack>
              <InlineStack gap="200">
                <Badge tone="warning">23 pending changes</Badge>
                <Badge tone="success">Connected</Badge>
              </InlineStack>
            </InlineStack>
          </BlockStack>
        </Card>

        {/* Main Content Area */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: "1rem" }}>
          {/* Spreadsheet */}
          <BlockStack gap="400">
            <Card padding="0">
              <DataTable
                columnContentTypes={[
                  "text",
                  "text",
                  "numeric",
                  "text",
                  "text",
                  "text",
                  "text",
                  "text",
                ]}
                headings={[
                  "Title",
                  "Price",
                  "Inventory",
                  "SKU",
                  "Vendor",
                  "Product Type",
                  "Tags",
                  "Status",
                ]}
                rows={rows}
                hoverable
              />
            </Card>

            {/* Formula Bar */}
            <Card>
              <BlockStack gap="200">
                <Text as="h3" variant="headingSm">
                  Formula Bar
                </Text>
                <InlineStack gap="200" blockAlign="center">
                  <Box minWidth="100%">
                    <TextField
                      label=""
                      value={formulaValue}
                      onChange={handleFormulaChange}
                      placeholder="Enter formula or value..."
                      disabled={selectedCells.length === 0}
                      autoComplete="off"
                    />
                  </Box>
                  <Button disabled={selectedCells.length === 0}>Apply</Button>
                </InlineStack>
              </BlockStack>
            </Card>
          </BlockStack>

          {/* AI Chat Interface */}
          <div>
            <AIChatInterface
              sheetContext={`${mockProducts.length} products loaded. Columns: Title, Price, Inventory, SKU, Vendor, Product Type, Tags, Status`}
            />
          </div>
        </div>
      </BlockStack>
    </Page>
  );
}
