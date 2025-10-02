import { useState, useRef, useEffect } from "react";
import {
  Card,
  TextField,
  Button,
  BlockStack,
  Text,
  Box,
  InlineStack,
  Icon,
} from "@shopify/polaris";
import { SendIcon, PersonIcon, MagicIcon } from "@shopify/polaris-icons";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

interface AIChatInterfaceProps {
  sheetContext?: string;
}

export function AIChatInterface({ sheetContext }: AIChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your AI spreadsheet assistant. I can help you sort, filter, calculate, and update your data using natural language commands. Try asking me something like 'Sort products by price' or 'Show items under $50'.",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(crypto.randomUUID());
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: input.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("process-prompt", {
        body: {
          prompt: input.trim(),
          sessionId,
          sheetContext: sheetContext || "No sheet loaded",
        },
      });

      if (error) throw error;

      if (data?.error) {
        throw new Error(data.error);
      }

      const assistantMessage: Message = {
        role: "assistant",
        content: data.response,
        timestamp: data.timestamp,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);

      const errorMessage: Message = {
        role: "assistant",
        content: "I apologize, but I encountered an error processing your request. Please try again.",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Card>
      <BlockStack gap="400">
        <InlineStack align="start" blockAlign="center" gap="200">
          <Icon source={MagicIcon} tone="info" />
          <Text as="h2" variant="headingMd">
            AI Assistant
          </Text>
        </InlineStack>

        {/* Messages Area */}
        <div
          ref={scrollRef}
          style={{
            minHeight: "500px",
            maxHeight: "600px",
            overflowY: "auto",
            padding: "1rem",
            backgroundColor: "var(--p-color-bg-surface-secondary)",
            borderRadius: "var(--p-border-radius-200)",
          }}
        >
          <BlockStack gap="300">
            {messages.map((message, index) => (
              <Box
                key={index}
                padding="300"
                background={message.role === "user" ? "bg-fill-brand" : "bg-surface"}
                borderRadius="200"
              >
                <InlineStack gap="200" blockAlign="start">
                  <Icon 
                    source={message.role === "user" ? PersonIcon : MagicIcon} 
                    tone={message.role === "user" ? "base" : "info"}
                  />
                  <BlockStack gap="100">
                    <Text
                      as="p"
                      variant="bodyMd"
                    >
                      {message.content}
                    </Text>
                    <Text as="span" variant="bodySm" tone="subdued">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </Text>
                  </BlockStack>
                </InlineStack>
              </Box>
            ))}
            {isLoading && (
              <Box padding="300" background="bg-surface" borderRadius="200">
                <InlineStack gap="200" blockAlign="center">
                  <Icon source={MagicIcon} tone="info" />
                  <Text as="p" variant="bodyMd">
                    Processing...
                  </Text>
                </InlineStack>
              </Box>
            )}
          </BlockStack>
        </div>

        {/* Input Area */}
        <BlockStack gap="200">
          <div onKeyDown={handleKeyPress}>
            <TextField
              label=""
              value={input}
              onChange={(value) => setInput(value)}
              placeholder="Ask me to sort, filter, or update your data..."
              multiline={2}
              autoComplete="off"
              disabled={isLoading}
            />
          </div>
          <Button
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            icon={SendIcon}
            fullWidth
            loading={isLoading}
          >
            Send
          </Button>
          <Text as="p" variant="bodySm" tone="subdued">
            Press Enter to send, Shift+Enter for new line
          </Text>
        </BlockStack>
      </BlockStack>
    </Card>
  );
}
