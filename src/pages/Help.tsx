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
  Keyboard
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
    </div>
  );
}
