export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      change_history: {
        Row: {
          change_type: string
          created_at: string
          entity_id: string
          entity_type: string
          field_name: string
          id: string
          new_value: string | null
          old_value: string | null
          operation_id: string | null
          shop_id: string
          shopify_entity_id: number | null
        }
        Insert: {
          change_type: string
          created_at?: string
          entity_id: string
          entity_type: string
          field_name: string
          id?: string
          new_value?: string | null
          old_value?: string | null
          operation_id?: string | null
          shop_id: string
          shopify_entity_id?: number | null
        }
        Update: {
          change_type?: string
          created_at?: string
          entity_id?: string
          entity_type?: string
          field_name?: string
          id?: string
          new_value?: string | null
          old_value?: string | null
          operation_id?: string | null
          shop_id?: string
          shopify_entity_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "change_history_operation_id_fkey"
            columns: ["operation_id"]
            isOneToOne: false
            referencedRelation: "sync_operations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "change_history_shop_id_fkey"
            columns: ["shop_id"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
        ]
      }
      product_metafields: {
        Row: {
          created_at: string
          description: string | null
          id: string
          key: string
          namespace: string
          product_id: string
          shop_id: string
          shopify_metafield_id: number | null
          updated_at: string
          value: string | null
          value_type: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          key: string
          namespace: string
          product_id: string
          shop_id: string
          shopify_metafield_id?: number | null
          updated_at?: string
          value?: string | null
          value_type?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          key?: string
          namespace?: string
          product_id?: string
          shop_id?: string
          shopify_metafield_id?: number | null
          updated_at?: string
          value?: string | null
          value_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_metafields_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_metafields_shop_id_fkey"
            columns: ["shop_id"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
        ]
      }
      product_variants: {
        Row: {
          barcode: string | null
          compare_at_price: number | null
          created_at: string
          fulfillment_service: string | null
          id: string
          inventory_management: string | null
          inventory_policy: string | null
          inventory_quantity: number | null
          option1: string | null
          option2: string | null
          option3: string | null
          position: number | null
          price: number | null
          product_id: string
          requires_shipping: boolean | null
          shop_id: string
          shopify_variant_id: number
          sku: string | null
          taxable: boolean | null
          title: string | null
          updated_at: string
          weight: number | null
          weight_unit: string | null
        }
        Insert: {
          barcode?: string | null
          compare_at_price?: number | null
          created_at?: string
          fulfillment_service?: string | null
          id?: string
          inventory_management?: string | null
          inventory_policy?: string | null
          inventory_quantity?: number | null
          option1?: string | null
          option2?: string | null
          option3?: string | null
          position?: number | null
          price?: number | null
          product_id: string
          requires_shipping?: boolean | null
          shop_id: string
          shopify_variant_id: number
          sku?: string | null
          taxable?: boolean | null
          title?: string | null
          updated_at?: string
          weight?: number | null
          weight_unit?: string | null
        }
        Update: {
          barcode?: string | null
          compare_at_price?: number | null
          created_at?: string
          fulfillment_service?: string | null
          id?: string
          inventory_management?: string | null
          inventory_policy?: string | null
          inventory_quantity?: number | null
          option1?: string | null
          option2?: string | null
          option3?: string | null
          position?: number | null
          price?: number | null
          product_id?: string
          requires_shipping?: boolean | null
          shop_id?: string
          shopify_variant_id?: number
          sku?: string | null
          taxable?: boolean | null
          title?: string | null
          updated_at?: string
          weight?: number | null
          weight_unit?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_variants_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_variants_shop_id_fkey"
            columns: ["shop_id"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          body_html: string | null
          created_at: string
          created_at_shopify: string | null
          handle: string | null
          id: string
          product_type: string | null
          published_at: string | null
          published_scope: string | null
          shop_id: string
          shopify_product_id: number
          status: string | null
          tags: string[] | null
          template_suffix: string | null
          title: string
          updated_at: string
          updated_at_shopify: string | null
          vendor: string | null
        }
        Insert: {
          body_html?: string | null
          created_at?: string
          created_at_shopify?: string | null
          handle?: string | null
          id?: string
          product_type?: string | null
          published_at?: string | null
          published_scope?: string | null
          shop_id: string
          shopify_product_id: number
          status?: string | null
          tags?: string[] | null
          template_suffix?: string | null
          title: string
          updated_at?: string
          updated_at_shopify?: string | null
          vendor?: string | null
        }
        Update: {
          body_html?: string | null
          created_at?: string
          created_at_shopify?: string | null
          handle?: string | null
          id?: string
          product_type?: string | null
          published_at?: string | null
          published_scope?: string | null
          shop_id?: string
          shopify_product_id?: number
          status?: string | null
          tags?: string[] | null
          template_suffix?: string | null
          title?: string
          updated_at?: string
          updated_at_shopify?: string | null
          vendor?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_shop_id_fkey"
            columns: ["shop_id"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
        ]
      }
      shops: {
        Row: {
          access_token: string
          created_at: string
          currency: string | null
          id: string
          is_active: boolean | null
          last_sync_at: string | null
          plan_name: string | null
          shop_domain: string
          shop_email: string | null
          shop_name: string | null
          shop_owner: string | null
          timezone: string | null
          updated_at: string
        }
        Insert: {
          access_token: string
          created_at?: string
          currency?: string | null
          id?: string
          is_active?: boolean | null
          last_sync_at?: string | null
          plan_name?: string | null
          shop_domain: string
          shop_email?: string | null
          shop_name?: string | null
          shop_owner?: string | null
          timezone?: string | null
          updated_at?: string
        }
        Update: {
          access_token?: string
          created_at?: string
          currency?: string | null
          id?: string
          is_active?: boolean | null
          last_sync_at?: string | null
          plan_name?: string | null
          shop_domain?: string
          shop_email?: string | null
          shop_name?: string | null
          shop_owner?: string | null
          timezone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      sync_operations: {
        Row: {
          completed_at: string | null
          created_at: string
          error_message: string | null
          failed_records: number | null
          id: string
          operation_type: string
          processed_records: number | null
          shop_id: string
          started_at: string | null
          status: string
          total_records: number | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          error_message?: string | null
          failed_records?: number | null
          id?: string
          operation_type: string
          processed_records?: number | null
          shop_id: string
          started_at?: string | null
          status?: string
          total_records?: number | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          error_message?: string | null
          failed_records?: number | null
          id?: string
          operation_type?: string
          processed_records?: number | null
          shop_id?: string
          started_at?: string | null
          status?: string
          total_records?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "sync_operations_shop_id_fkey"
            columns: ["shop_id"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
