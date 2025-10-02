import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Book,
  Video,
  MessageCircle,
  ExternalLink,
  ChevronRight,
  Keyboard,
  Code,
  Database,
  Cpu,
  Cloud
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Help() {
  const [searchQuery, setSearchQuery] = useState("");

  const faqs = [
    {
      question: "How do I import products from a CSV file?",
      answer: "Go to Import/Export Center, click the Import tab, and drag your CSV file into the dropzone. Make sure your CSV follows our template format. You can download a template from the same page."
    },
    {
      question: "Can I undo bulk changes after syncing to Shopify?",
      answer: "Yes! Go to the History page, find the change you want to revert, and click the Revert button. This will restore the previous values and sync them back to your Shopify store."
    },
    {
      question: "How do I edit multiple products at once?",
      answer: "In the Spreadsheet Editor, select the cells you want to edit. You can use Ctrl+Click to select multiple cells, or Shift+Click to select a range. Then use the Formula bar to apply changes to all selected cells."
    },
    {
      question: "What happens if my Shopify API rate limit is reached?",
      answer: "The app will automatically queue your changes and process them gradually to stay within Shopify's API limits. You can monitor the current rate limit usage in Settings."
    },
    {
      question: "How often does the app sync with Shopify?",
      answer: "Changes are synced immediately when you save. The app also performs a background sync every 5 minutes to check for changes made directly in Shopify admin."
    },
  ];

  const tutorials = [
    { title: "Getting Started with Incredible Bulk", duration: "5:32", category: "Basics" },
    { title: "Bulk Price Updates Tutorial", duration: "8:15", category: "Advanced" },
    { title: "Using Formulas for Calculations", duration: "6:44", category: "Advanced" },
    { title: "Import/Export Best Practices", duration: "7:20", category: "Basics" },
    { title: "Managing Inventory in Bulk", duration: "5:58", category: "Basics" },
  ];

  const shortcuts = [
    { keys: ["Ctrl", "S"], action: "Save changes" },
    { keys: ["Ctrl", "Z"], action: "Undo" },
    { keys: ["Ctrl", "Y"], action: "Redo" },
    { keys: ["Ctrl", "F"], action: "Find and replace" },
    { keys: ["Ctrl", "A"], action: "Select all" },
    { keys: ["Ctrl", "C"], action: "Copy" },
    { keys: ["Ctrl", "V"], action: "Paste" },
    { keys: ["Delete"], action: "Clear cell" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Help & Support</h1>
        <p className="text-muted-foreground">
          Find answers, learn new features, and get help
        </p>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search documentation, tutorials, FAQs..." 
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Quick Links */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <Book className="h-8 w-8 mb-2 text-primary" />
            <CardTitle>Documentation</CardTitle>
            <CardDescription>
              Complete guides and reference materials
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="ghost" className="w-full justify-between">
              View Documentation
              <ExternalLink className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <Video className="h-8 w-8 mb-2 text-primary" />
            <CardTitle>Video Tutorials</CardTitle>
            <CardDescription>
              Step-by-step video guides
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="ghost" className="w-full justify-between">
              Watch Tutorials
              <ExternalLink className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <MessageCircle className="h-8 w-8 mb-2 text-primary" />
            <CardTitle>Contact Support</CardTitle>
            <CardDescription>
              Get help from our support team
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="ghost" className="w-full justify-between">
              Contact Us
              <ExternalLink className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* FAQs */}
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardDescription>Quick answers to common questions</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Video Tutorials */}
      <Card>
        <CardHeader>
          <CardTitle>Video Tutorials</CardTitle>
          <CardDescription>Learn by watching step-by-step guides</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {tutorials.map((tutorial, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Video className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{tutorial.title}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{tutorial.duration}</span>
                      <span>•</span>
                      <Badge variant="outline" className="text-xs">
                        {tutorial.category}
                      </Badge>
                    </div>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Keyboard Shortcuts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Keyboard className="h-5 w-5" />
            Keyboard Shortcuts
          </CardTitle>
          <CardDescription>Work faster with keyboard shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-3">
            {shortcuts.map((shortcut, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <span className="text-sm">{shortcut.action}</span>
                <div className="flex gap-1">
                  {shortcut.keys.map((key, keyIndex) => (
                    <kbd 
                      key={keyIndex}
                      className="px-2 py-1 text-xs font-semibold bg-muted border rounded"
                    >
                      {key}
                    </kbd>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Knowledge Base */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Book className="h-5 w-5" />
            Knowledge Base
          </CardTitle>
          <CardDescription>Technical documentation and architecture details</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="overview">
              <AccordionTrigger>What is AI IncredibleBulk?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-3">
                <p>
                  AI IncredibleBulk is a Shopify app that automates spreadsheet management using natural language prompts. 
                  Users can input commands like "Sort inventory by price descending" via a chat-like UI, and the app leverages 
                  AI to interpret these commands, analyze spreadsheets, and execute operations without coding.
                </p>
                <p className="font-semibold text-foreground">Key Features:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Natural language interface for spreadsheet operations</li>
                  <li>Real-time integration with Google Sheets and Microsoft Excel Online</li>
                  <li>AI-driven automation for sorting, filtering, and formula application</li>
                  <li>Stateful sessions for multi-turn interactions</li>
                  <li>Seamless Shopify admin dashboard integration</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="tech-stack">
              <AccordionTrigger className="flex items-center gap-2">
                <Code className="h-4 w-4" />
                Technology Stack
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold text-foreground mb-2">Frontend:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>React.js 18.x with TypeScript</li>
                      <li>Shopify Polaris for UI components</li>
                      <li>React Router for navigation</li>
                      <li>Tailwind CSS for styling</li>
                      <li>Vite for build tooling</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-2">Backend:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>Supabase Edge Functions (Deno runtime)</li>
                      <li>Supabase PostgreSQL database</li>
                      <li>Shopify GraphQL API integration</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-2">AI Layer:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>Lovable AI Gateway (Google Gemini models)</li>
                      <li>Natural language prompt processing</li>
                      <li>Context-aware spreadsheet operations</li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="architecture">
              <AccordionTrigger className="flex items-center gap-2">
                <Cpu className="h-4 w-4" />
                System Architecture
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold text-foreground mb-2">Data Flow:</p>
                    <ol className="list-decimal list-inside space-y-2 ml-2">
                      <li>User inputs natural language prompt in chat UI</li>
                      <li>Frontend sends request to Supabase Edge Function</li>
                      <li>Edge function processes prompt via Lovable AI Gateway</li>
                      <li>AI analyzes spreadsheet structure and generates operations</li>
                      <li>Operations are executed on data sources (Google Sheets/Excel)</li>
                      <li>Results are returned and displayed in the UI</li>
                    </ol>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-2">Key Components:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li><strong>AIChatInterface:</strong> Chat UI for natural language input</li>
                      <li><strong>SpreadsheetEditor:</strong> Excel-like grid interface</li>
                      <li><strong>process-prompt:</strong> Edge function for AI processing</li>
                      <li><strong>Shopify Integration:</strong> Product sync and management</li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="database">
              <AccordionTrigger className="flex items-center gap-2">
                <Database className="h-4 w-4" />
                Database Schema
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold text-foreground mb-2">Core Tables:</p>
                    <ul className="list-disc list-inside space-y-2 ml-2">
                      <li><strong>shops:</strong> Shopify store connections and access tokens</li>
                      <li><strong>products:</strong> Product data synced from Shopify</li>
                      <li><strong>product_variants:</strong> Product variant details (SKU, price, inventory)</li>
                      <li><strong>product_metafields:</strong> Custom product metadata</li>
                      <li><strong>sync_operations:</strong> Tracking sync status and progress</li>
                      <li><strong>change_history:</strong> Audit trail of all data modifications</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-2">Security:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>Row Level Security (RLS) policies enabled</li>
                      <li>Encrypted access tokens for API connections</li>
                      <li>Shopify OAuth for authentication</li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="integrations">
              <AccordionTrigger className="flex items-center gap-2">
                <Cloud className="h-4 w-4" />
                External Integrations
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold text-foreground mb-2">Shopify:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>GraphQL API for product data</li>
                      <li>Webhooks for real-time sync</li>
                      <li>App Bridge for admin dashboard integration</li>
                      <li>OAuth authentication</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-2">Google Sheets (Planned):</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>Real-time read/write access</li>
                      <li>Rate limits: 300 reads/min, 60 writes/min</li>
                      <li>OAuth for user authorization</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-2">Microsoft Excel Online (Planned):</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>Microsoft Graph API integration</li>
                      <li>Rate limits: 300 reads/min, 60 writes/min</li>
                      <li>Azure AD authentication</li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="ai-capabilities">
              <AccordionTrigger>AI Capabilities</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold text-foreground mb-2">Natural Language Processing:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>Understands commands like "Sort by price", "Filter products", "Calculate totals"</li>
                      <li>Context-aware multi-turn conversations</li>
                      <li>Supports complex queries with multiple conditions</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-2">Supported Operations:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>Sorting and filtering data</li>
                      <li>Formula calculations</li>
                      <li>Data transformations</li>
                      <li>Bulk updates and modifications</li>
                      <li>Data validation and cleanup</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-2">Safety Features:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>User confirmation for destructive actions</li>
                      <li>Sandboxed code execution</li>
                      <li>Change history and undo functionality</li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="performance">
              <AccordionTrigger>Performance & Scalability</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-foreground mb-2">Target Metrics:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>AI prompt processing: ~5-10 seconds</li>
                      <li>API response time: &lt;5 seconds</li>
                      <li>Uptime: 99.9% availability</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-2">Optimization Strategies:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>Batch API requests for bulk operations</li>
                      <li>Caching for frequently accessed data</li>
                      <li>Exponential backoff for rate limit management</li>
                      <li>CDN caching via Vercel infrastructure</li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
