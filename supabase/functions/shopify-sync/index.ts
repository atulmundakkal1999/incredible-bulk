import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { shopDomain } = await req.json()

    if (!shopDomain) {
      return new Response(
        JSON.stringify({ error: 'Missing shop domain' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Get shop from database
    const { data: shop, error: shopError } = await supabase
      .from('shops')
      .select('*')
      .eq('shop_domain', shopDomain)
      .single()

    if (shopError || !shop) {
      return new Response(
        JSON.stringify({ error: 'Shop not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Create sync operation
    const { data: syncOp, error: syncError } = await supabase
      .from('sync_operations')
      .insert({
        shop_id: shop.id,
        operation_type: 'full_sync',
        status: 'in_progress',
        started_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (syncError) {
      console.error('Failed to create sync operation:', syncError)
    }

    // Fetch products from Shopify
    const allProducts: any[] = []
    let hasNextPage = true
    let pageInfo: string | null = null

    while (hasNextPage) {
      const url: string = pageInfo
        ? `https://${shop.shop_domain}/admin/api/2024-01/products.json?limit=250&page_info=${pageInfo}`
        : `https://${shop.shop_domain}/admin/api/2024-01/products.json?limit=250`

      const response: Response = await fetch(url, {
        headers: {
          'X-Shopify-Access-Token': shop.access_token,
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.statusText}`)
      }

      const data = await response.json()
      allProducts.push(...data.products)

      // Check for pagination
      const linkHeader: string | null = response.headers.get('Link')
      if (linkHeader && linkHeader.includes('rel="next"')) {
        const match: RegExpMatchArray | null = linkHeader.match(/<[^>]*page_info=([^>&]*)>; rel="next"/)
        pageInfo = match ? match[1] : null
        hasNextPage = !!pageInfo
      } else {
        hasNextPage = false
      }
    }

    console.log(`Fetched ${allProducts.length} products`)

    // Store products and variants
    let processedCount = 0
    for (const product of allProducts) {
      // Insert product
      const { data: dbProduct, error: productError } = await supabase
        .from('products')
        .upsert({
          shop_id: shop.id,
          shopify_product_id: product.id,
          title: product.title,
          handle: product.handle,
          body_html: product.body_html,
          vendor: product.vendor,
          product_type: product.product_type,
          tags: product.tags ? product.tags.split(',').map((t: string) => t.trim()) : [],
          status: product.status,
          published_scope: product.published_scope,
          published_at: product.published_at,
          created_at_shopify: product.created_at,
          updated_at_shopify: product.updated_at,
        }, {
          onConflict: 'shop_id,shopify_product_id',
        })
        .select()
        .single()

      if (productError) {
        console.error('Product insert error:', productError)
        continue
      }

      // Insert variants
      if (product.variants) {
        for (const variant of product.variants) {
          await supabase
            .from('product_variants')
            .upsert({
              shop_id: shop.id,
              product_id: dbProduct.id,
              shopify_variant_id: variant.id,
              title: variant.title,
              sku: variant.sku,
              barcode: variant.barcode,
              price: variant.price,
              compare_at_price: variant.compare_at_price,
              inventory_quantity: variant.inventory_quantity,
              weight: variant.weight,
              weight_unit: variant.weight_unit,
              option1: variant.option1,
              option2: variant.option2,
              option3: variant.option3,
              taxable: variant.taxable,
              requires_shipping: variant.requires_shipping,
              inventory_management: variant.inventory_management,
              inventory_policy: variant.inventory_policy,
              fulfillment_service: variant.fulfillment_service,
              position: variant.position,
            }, {
              onConflict: 'shop_id,shopify_variant_id',
            })
        }
      }

      processedCount++
    }

    // Update sync operation
    if (syncOp) {
      await supabase
        .from('sync_operations')
        .update({
          status: 'completed',
          completed_at: new Date().toISOString(),
          total_records: allProducts.length,
          processed_records: processedCount,
        })
        .eq('id', syncOp.id)
    }

    // Update shop last sync
    await supabase
      .from('shops')
      .update({ last_sync_at: new Date().toISOString() })
      .eq('id', shop.id)

    return new Response(
      JSON.stringify({
        success: true,
        productsSync: processedCount,
        totalProducts: allProducts.length,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Sync error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
