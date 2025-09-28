-- Core database schema for Incredible Bulk Shopify App

-- Store connected Shopify shops
CREATE TABLE public.shops (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  shop_domain TEXT NOT NULL UNIQUE,
  access_token TEXT NOT NULL,
  shop_name TEXT,
  shop_email TEXT,
  plan_name TEXT,
  shop_owner TEXT,
  currency TEXT DEFAULT 'USD',
  timezone TEXT,
  is_active BOOLEAN DEFAULT true,
  last_sync_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Store product data for spreadsheet editing
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  shop_id UUID NOT NULL REFERENCES public.shops(id) ON DELETE CASCADE,
  shopify_product_id BIGINT NOT NULL,
  title TEXT NOT NULL,
  handle TEXT,
  body_html TEXT,
  vendor TEXT,
  product_type TEXT,
  tags TEXT[],
  status TEXT DEFAULT 'active',
  created_at_shopify TIMESTAMP WITH TIME ZONE,
  updated_at_shopify TIMESTAMP WITH TIME ZONE,
  published_at TIMESTAMP WITH TIME ZONE,
  template_suffix TEXT,
  published_scope TEXT DEFAULT 'web',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(shop_id, shopify_product_id)
);

-- Store product variants for inventory and pricing management
CREATE TABLE public.product_variants (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  shop_id UUID NOT NULL REFERENCES public.shops(id) ON DELETE CASCADE,
  shopify_variant_id BIGINT NOT NULL,
  title TEXT DEFAULT 'Default Title',
  price DECIMAL(10,2),
  compare_at_price DECIMAL(10,2),
  sku TEXT,
  barcode TEXT,
  inventory_quantity INTEGER DEFAULT 0,
  inventory_management TEXT,
  inventory_policy TEXT DEFAULT 'deny',
  fulfillment_service TEXT DEFAULT 'manual',
  weight DECIMAL(8,2),
  weight_unit TEXT DEFAULT 'g',
  requires_shipping BOOLEAN DEFAULT true,
  taxable BOOLEAN DEFAULT true,
  position INTEGER DEFAULT 1,
  option1 TEXT,
  option2 TEXT,
  option3 TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(shop_id, shopify_variant_id)
);

-- Store metafields for custom product attributes
CREATE TABLE public.product_metafields (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  shop_id UUID NOT NULL REFERENCES public.shops(id) ON DELETE CASCADE,
  shopify_metafield_id BIGINT,
  namespace TEXT NOT NULL,
  key TEXT NOT NULL,
  value TEXT,
  value_type TEXT DEFAULT 'string',
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Track sync operations and changes
CREATE TABLE public.sync_operations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  shop_id UUID NOT NULL REFERENCES public.shops(id) ON DELETE CASCADE,
  operation_type TEXT NOT NULL, -- 'import', 'export', 'sync'
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'failed'
  total_records INTEGER DEFAULT 0,
  processed_records INTEGER DEFAULT 0,
  failed_records INTEGER DEFAULT 0,
  error_message TEXT,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Store change history for undo/redo functionality
CREATE TABLE public.change_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  shop_id UUID NOT NULL REFERENCES public.shops(id) ON DELETE CASCADE,
  operation_id UUID REFERENCES public.sync_operations(id),
  entity_type TEXT NOT NULL, -- 'product', 'variant', 'metafield'
  entity_id UUID NOT NULL,
  shopify_entity_id BIGINT,
  field_name TEXT NOT NULL,
  old_value TEXT,
  new_value TEXT,
  change_type TEXT NOT NULL, -- 'create', 'update', 'delete'
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.shops ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_metafields ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sync_operations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.change_history ENABLE ROW LEVEL SECURITY;

-- Create policies (for now allowing all operations - will be refined with Shopify auth)
CREATE POLICY "Allow all operations on shops" ON public.shops FOR ALL USING (true);
CREATE POLICY "Allow all operations on products" ON public.products FOR ALL USING (true);
CREATE POLICY "Allow all operations on product_variants" ON public.product_variants FOR ALL USING (true);
CREATE POLICY "Allow all operations on product_metafields" ON public.product_metafields FOR ALL USING (true);
CREATE POLICY "Allow all operations on sync_operations" ON public.sync_operations FOR ALL USING (true);
CREATE POLICY "Allow all operations on change_history" ON public.change_history FOR ALL USING (true);

-- Create indexes for performance
CREATE INDEX idx_products_shop_id ON public.products(shop_id);
CREATE INDEX idx_products_shopify_id ON public.products(shopify_product_id);
CREATE INDEX idx_variants_product_id ON public.product_variants(product_id);
CREATE INDEX idx_variants_shop_id ON public.product_variants(shop_id);
CREATE INDEX idx_variants_shopify_id ON public.product_variants(shopify_variant_id);
CREATE INDEX idx_metafields_product_id ON public.product_metafields(product_id);
CREATE INDEX idx_sync_operations_shop_id ON public.sync_operations(shop_id);
CREATE INDEX idx_change_history_shop_id ON public.change_history(shop_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_shops_updated_at
  BEFORE UPDATE ON public.shops
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_product_variants_updated_at
  BEFORE UPDATE ON public.product_variants
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();