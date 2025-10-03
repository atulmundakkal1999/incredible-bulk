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
    const { shop, code } = await req.json()

    if (!shop || !code) {
      return new Response(
        JSON.stringify({ error: 'Missing shop or code parameter' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const shopifyApiKey = Deno.env.get('SHOPIFY_API_KEY')
    const shopifyApiSecret = Deno.env.get('SHOPIFY_API_SECRET')

    if (!shopifyApiKey || !shopifyApiSecret) {
      return new Response(
        JSON.stringify({ error: 'Shopify API credentials not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Exchange code for access token
    const tokenResponse = await fetch(`https://${shop}/admin/oauth/access_token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: shopifyApiKey,
        client_secret: shopifyApiSecret,
        code: code,
      }),
    })

    if (!tokenResponse.ok) {
      const error = await tokenResponse.text()
      console.error('Token exchange failed:', error)
      return new Response(
        JSON.stringify({ error: 'Failed to exchange code for access token' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const { access_token } = await tokenResponse.json()

    // Get shop details
    const shopResponse = await fetch(`https://${shop}/admin/api/2024-01/shop.json`, {
      headers: {
        'X-Shopify-Access-Token': access_token,
      },
    })

    const shopData = await shopResponse.json()
    const shopInfo = shopData.shop

    // Store in database
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    const { data, error } = await supabase
      .from('shops')
      .upsert({
        shop_domain: shop,
        access_token: access_token,
        shop_name: shopInfo.name,
        shop_email: shopInfo.email,
        shop_owner: shopInfo.shop_owner,
        currency: shopInfo.currency,
        timezone: shopInfo.timezone,
        plan_name: shopInfo.plan_name,
        is_active: true,
        last_sync_at: new Date().toISOString(),
      }, {
        onConflict: 'shop_domain',
      })
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return new Response(
        JSON.stringify({ error: 'Failed to store shop data' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ success: true, shop: data }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
