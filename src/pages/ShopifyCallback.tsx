import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, CheckCircle, XCircle } from "lucide-react";

export default function ShopifyCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [message, setMessage] = useState('Processing authorization...');

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code');
      const shop = searchParams.get('shop');

      if (!code || !shop) {
        setStatus('error');
        setMessage('Missing authorization code or shop parameter');
        toast.error('Authorization failed', {
          description: 'Missing required parameters'
        });
        setTimeout(() => navigate('/settings'), 3000);
        return;
      }

      try {
        // Call the shopify-auth edge function
        const { data, error } = await supabase.functions.invoke('shopify-auth', {
          body: { shop, code }
        });

        if (error) {
          throw error;
        }

        if (data.success) {
          setStatus('success');
          setMessage('Successfully connected to Shopify!');
          toast.success('Connected to Shopify', {
            description: 'Your store is now connected'
          });

          // Start sync
          const { error: syncError } = await supabase.functions.invoke('shopify-sync', {
            body: { shopDomain: shop }
          });

          if (syncError) {
            console.error('Sync error:', syncError);
            toast.warning('Initial sync failed', {
              description: 'You can try syncing again from the settings page'
            });
          } else {
            toast.success('Products synced', {
              description: 'Your products have been imported'
            });
          }

          setTimeout(() => navigate('/dashboard'), 2000);
        } else {
          throw new Error('Authentication failed');
        }
      } catch (error) {
        console.error('Callback error:', error);
        setStatus('error');
        setMessage(error instanceof Error ? error.message : 'Failed to connect to Shopify');
        toast.error('Connection failed', {
          description: 'Please try again or contact support'
        });
        setTimeout(() => navigate('/settings'), 3000);
      }
    };

    handleCallback();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            {status === 'processing' && <Loader2 className="h-12 w-12 animate-spin text-primary" />}
            {status === 'success' && <CheckCircle className="h-12 w-12 text-green-500" />}
            {status === 'error' && <XCircle className="h-12 w-12 text-red-500" />}
          </div>
          <CardTitle>
            {status === 'processing' && 'Connecting to Shopify'}
            {status === 'success' && 'Connection Successful'}
            {status === 'error' && 'Connection Failed'}
          </CardTitle>
          <CardDescription>{message}</CardDescription>
        </CardHeader>
        <CardContent className="text-center text-sm text-muted-foreground">
          {status === 'processing' && 'Please wait while we set up your connection...'}
          {status === 'success' && 'Redirecting to dashboard...'}
          {status === 'error' && 'Redirecting to settings...'}
        </CardContent>
      </Card>
    </div>
  );
}
