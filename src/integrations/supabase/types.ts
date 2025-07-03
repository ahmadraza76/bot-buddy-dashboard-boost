export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin_alerts: {
        Row: {
          bot_id: string | null
          created_at: string
          error_type: string | null
          id: string
          message: string
          reason: string | null
          severity: string | null
          status: string
          type: string
          user_id: string | null
        }
        Insert: {
          bot_id?: string | null
          created_at?: string
          error_type?: string | null
          id?: string
          message: string
          reason?: string | null
          severity?: string | null
          status?: string
          type: string
          user_id?: string | null
        }
        Update: {
          bot_id?: string | null
          created_at?: string
          error_type?: string | null
          id?: string
          message?: string
          reason?: string | null
          severity?: string | null
          status?: string
          type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_alerts_bot_id_fkey"
            columns: ["bot_id"]
            isOneToOne: false
            referencedRelation: "bots"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "admin_alerts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_logs: {
        Row: {
          action: string
          bot_id: string | null
          created_at: string | null
          id: string
          message: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          bot_id?: string | null
          created_at?: string | null
          id?: string
          message?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          bot_id?: string | null
          created_at?: string | null
          id?: string
          message?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_logs_bot_id_fkey"
            columns: ["bot_id"]
            isOneToOne: false
            referencedRelation: "bots"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "admin_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_actions: {
        Row: {
          action_type: string
          ai_confidence: number | null
          bot_id: string | null
          error_detected: string | null
          id: string
          manual_override: boolean | null
          solution_applied: string | null
          success: boolean | null
          timestamp: string
          user_id: string | null
        }
        Insert: {
          action_type: string
          ai_confidence?: number | null
          bot_id?: string | null
          error_detected?: string | null
          id?: string
          manual_override?: boolean | null
          solution_applied?: string | null
          success?: boolean | null
          timestamp?: string
          user_id?: string | null
        }
        Update: {
          action_type?: string
          ai_confidence?: number | null
          bot_id?: string | null
          error_detected?: string | null
          id?: string
          manual_override?: boolean | null
          solution_applied?: string | null
          success?: boolean | null
          timestamp?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_actions_bot_id_fkey"
            columns: ["bot_id"]
            isOneToOne: false
            referencedRelation: "bots"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_actions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_chat_history: {
        Row: {
          bot_id: string
          context: string | null
          created_at: string
          id: string
          message: string
          role: string
          timestamp: string
          user_id: string
        }
        Insert: {
          bot_id: string
          context?: string | null
          created_at?: string
          id?: string
          message: string
          role: string
          timestamp?: string
          user_id: string
        }
        Update: {
          bot_id?: string
          context?: string | null
          created_at?: string
          id?: string
          message?: string
          role?: string
          timestamp?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_ai_chat_history_bot_id"
            columns: ["bot_id"]
            isOneToOne: false
            referencedRelation: "bots"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_ai_chat_history_user_id"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      api_keys: {
        Row: {
          api_key: string
          created_at: string | null
          expires_at: string | null
          id: string
          key_name: string
          last_used: string | null
          permissions: Json | null
          user_id: string | null
        }
        Insert: {
          api_key: string
          created_at?: string | null
          expires_at?: string | null
          id?: string
          key_name: string
          last_used?: string | null
          permissions?: Json | null
          user_id?: string | null
        }
        Update: {
          api_key?: string
          created_at?: string | null
          expires_at?: string | null
          id?: string
          key_name?: string
          last_used?: string | null
          permissions?: Json | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "api_keys_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      bot_logs: {
        Row: {
          action_taken: string | null
          bot_id: string | null
          created_at: string
          id: string
          log_level: string
          message: string
          processed_by_ai: boolean | null
          source: string | null
          timestamp: string
        }
        Insert: {
          action_taken?: string | null
          bot_id?: string | null
          created_at?: string
          id?: string
          log_level?: string
          message: string
          processed_by_ai?: boolean | null
          source?: string | null
          timestamp?: string
        }
        Update: {
          action_taken?: string | null
          bot_id?: string | null
          created_at?: string
          id?: string
          log_level?: string
          message?: string
          processed_by_ai?: boolean | null
          source?: string | null
          timestamp?: string
        }
        Relationships: [
          {
            foreignKeyName: "bot_logs_bot_id_fkey"
            columns: ["bot_id"]
            isOneToOne: false
            referencedRelation: "bots"
            referencedColumns: ["id"]
          },
        ]
      }
      bot_sessions: {
        Row: {
          bot_status: string | null
          created_at: string | null
          id: string
          phone: string | null
          session_string: string
          user_id: string | null
        }
        Insert: {
          bot_status?: string | null
          created_at?: string | null
          id?: string
          phone?: string | null
          session_string: string
          user_id?: string | null
        }
        Update: {
          bot_status?: string | null
          created_at?: string | null
          id?: string
          phone?: string | null
          session_string?: string
          user_id?: string | null
        }
        Relationships: []
      }
      bots: {
        Row: {
          api_key: string | null
          auto_heal_enabled: boolean | null
          bot_token: string | null
          container_id: string | null
          container_logs: string | null
          cpu_usage: string | null
          created_at: string | null
          deployment_status: string | null
          error_count: number | null
          health_score: number | null
          id: string
          last_activity: string | null
          last_error: string | null
          memory_usage: string | null
          restart_count: number | null
          status: Database["public"]["Enums"]["bot_status"] | null
          sudo_user_id: string | null
          updated_at: string | null
          uptime_start: string | null
          user_id: string | null
          username: string
        }
        Insert: {
          api_key?: string | null
          auto_heal_enabled?: boolean | null
          bot_token?: string | null
          container_id?: string | null
          container_logs?: string | null
          cpu_usage?: string | null
          created_at?: string | null
          deployment_status?: string | null
          error_count?: number | null
          health_score?: number | null
          id?: string
          last_activity?: string | null
          last_error?: string | null
          memory_usage?: string | null
          restart_count?: number | null
          status?: Database["public"]["Enums"]["bot_status"] | null
          sudo_user_id?: string | null
          updated_at?: string | null
          uptime_start?: string | null
          user_id?: string | null
          username: string
        }
        Update: {
          api_key?: string | null
          auto_heal_enabled?: boolean | null
          bot_token?: string | null
          container_id?: string | null
          container_logs?: string | null
          cpu_usage?: string | null
          created_at?: string | null
          deployment_status?: string | null
          error_count?: number | null
          health_score?: number | null
          id?: string
          last_activity?: string | null
          last_error?: string | null
          memory_usage?: string | null
          restart_count?: number | null
          status?: Database["public"]["Enums"]["bot_status"] | null
          sudo_user_id?: string | null
          updated_at?: string | null
          uptime_start?: string | null
          user_id?: string | null
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "bots_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      healing_actions: {
        Row: {
          action: string
          bot_id: string
          error_type: string
          fix_details: Json | null
          id: string
          logs: string | null
          status: string
          timestamp: string
          user_id: string
        }
        Insert: {
          action: string
          bot_id: string
          error_type: string
          fix_details?: Json | null
          id?: string
          logs?: string | null
          status: string
          timestamp?: string
          user_id: string
        }
        Update: {
          action?: string
          bot_id?: string
          error_type?: string
          fix_details?: Json | null
          id?: string
          logs?: string | null
          status?: string
          timestamp?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "healing_actions_bot_id_fkey"
            columns: ["bot_id"]
            isOneToOne: false
            referencedRelation: "bots"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "healing_actions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      incidents: {
        Row: {
          created_at: string | null
          description: string | null
          duration: string | null
          id: string
          incident_date: string | null
          severity: Database["public"]["Enums"]["incident_severity"] | null
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          duration?: string | null
          id?: string
          incident_date?: string | null
          severity?: Database["public"]["Enums"]["incident_severity"] | null
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          duration?: string | null
          id?: string
          incident_date?: string | null
          severity?: Database["public"]["Enums"]["incident_severity"] | null
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          bot_id: string | null
          created_at: string
          id: string
          message: string
          read: boolean | null
          sent_to_telegram: boolean | null
          title: string
          type: string
          user_id: string | null
        }
        Insert: {
          bot_id?: string | null
          created_at?: string
          id?: string
          message: string
          read?: boolean | null
          sent_to_telegram?: boolean | null
          title: string
          type?: string
          user_id?: string | null
        }
        Update: {
          bot_id?: string | null
          created_at?: string
          id?: string
          message?: string
          read?: boolean | null
          sent_to_telegram?: boolean | null
          title?: string
          type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_bot_id_fkey"
            columns: ["bot_id"]
            isOneToOne: false
            referencedRelation: "bots"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: string
          created_at: string | null
          id: string
          method: Database["public"]["Enums"]["payment_method"]
          plan: Database["public"]["Enums"]["subscription_type"]
          status: Database["public"]["Enums"]["payment_status"] | null
          transaction_id: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          amount: string
          created_at?: string | null
          id?: string
          method: Database["public"]["Enums"]["payment_method"]
          plan: Database["public"]["Enums"]["subscription_type"]
          status?: Database["public"]["Enums"]["payment_status"] | null
          transaction_id: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: string
          created_at?: string | null
          id?: string
          method?: Database["public"]["Enums"]["payment_method"]
          plan?: Database["public"]["Enums"]["subscription_type"]
          status?: Database["public"]["Enums"]["payment_status"] | null
          transaction_id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      payout_requests: {
        Row: {
          amount: number
          created_at: string
          details: Json
          id: string
          method: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          details?: Json
          id?: string
          method: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          details?: Json
          id?: string
          method?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payout_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      platform_settings: {
        Row: {
          key: string
          updated_at: string | null
          value: string | null
        }
        Insert: {
          key: string
          updated_at?: string | null
          value?: string | null
        }
        Update: {
          key?: string
          updated_at?: string | null
          value?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          balance: number
          bot_token: string | null
          created_at: string | null
          email: string
          id: string
          join_date: string | null
          last_seen: string | null
          status: Database["public"]["Enums"]["user_status"] | null
          subscription_type:
            | Database["public"]["Enums"]["subscription_type"]
            | null
          telegram_id: string | null
          updated_at: string | null
        }
        Insert: {
          balance?: number
          bot_token?: string | null
          created_at?: string | null
          email: string
          id: string
          join_date?: string | null
          last_seen?: string | null
          status?: Database["public"]["Enums"]["user_status"] | null
          subscription_type?:
            | Database["public"]["Enums"]["subscription_type"]
            | null
          telegram_id?: string | null
          updated_at?: string | null
        }
        Update: {
          balance?: number
          bot_token?: string | null
          created_at?: string | null
          email?: string
          id?: string
          join_date?: string | null
          last_seen?: string | null
          status?: Database["public"]["Enums"]["user_status"] | null
          subscription_type?:
            | Database["public"]["Enums"]["subscription_type"]
            | null
          telegram_id?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          status: Database["public"]["Enums"]["service_status"] | null
          updated_at: string | null
          uptime_percentage: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          status?: Database["public"]["Enums"]["service_status"] | null
          updated_at?: string | null
          uptime_percentage?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          status?: Database["public"]["Enums"]["service_status"] | null
          updated_at?: string | null
          uptime_percentage?: number | null
        }
        Relationships: []
      }
      support_tickets: {
        Row: {
          assigned_to: string | null
          created_at: string | null
          description: string | null
          id: string
          priority: Database["public"]["Enums"]["ticket_priority"] | null
          status: Database["public"]["Enums"]["ticket_status"] | null
          title: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          priority?: Database["public"]["Enums"]["ticket_priority"] | null
          status?: Database["public"]["Enums"]["ticket_status"] | null
          title: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          assigned_to?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          priority?: Database["public"]["Enums"]["ticket_priority"] | null
          status?: Database["public"]["Enums"]["ticket_status"] | null
          title?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "support_tickets_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_tickets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      system_health: {
        Row: {
          id: string
          metadata: Json | null
          metric_name: string
          metric_value: number
          timestamp: string
          unit: string | null
        }
        Insert: {
          id?: string
          metadata?: Json | null
          metric_name: string
          metric_value: number
          timestamp?: string
          unit?: string | null
        }
        Update: {
          id?: string
          metadata?: Json | null
          metric_name?: string
          metric_value?: number
          timestamp?: string
          unit?: string | null
        }
        Relationships: []
      }
      user_otp_sessions: {
        Row: {
          created_at: string
          expires_at: string
          id: string
          otp_attempts: number
          phone: string
          phone_code_hash: string
          user_id: string | null
          verified: boolean
        }
        Insert: {
          created_at?: string
          expires_at: string
          id?: string
          otp_attempts?: number
          phone: string
          phone_code_hash: string
          user_id?: string | null
          verified?: boolean
        }
        Update: {
          created_at?: string
          expires_at?: string
          id?: string
          otp_attempts?: number
          phone?: string
          phone_code_hash?: string
          user_id?: string | null
          verified?: boolean
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_bot_health_score: {
        Args: { bot_id_param: string }
        Returns: number
      }
      has_admin_role: {
        Args: { user_id: string }
        Returns: boolean
      }
      trigger_ai_healing: {
        Args: { bot_id_param: string; error_message: string }
        Returns: undefined
      }
      update_all_bot_health_scores: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      bot_status: "running" | "stopped" | "error"
      incident_severity: "minor" | "major" | "maintenance"
      payment_method: "UPI" | "PayPal" | "USDT"
      payment_status: "completed" | "pending" | "failed" | "refunded"
      service_status: "operational" | "degraded" | "outage"
      subscription_type: "Monthly" | "Yearly" | "3 Months"
      ticket_priority: "low" | "medium" | "high" | "urgent"
      ticket_status: "open" | "in_progress" | "resolved" | "closed"
      user_status: "active" | "inactive" | "banned"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      bot_status: ["running", "stopped", "error"],
      incident_severity: ["minor", "major", "maintenance"],
      payment_method: ["UPI", "PayPal", "USDT"],
      payment_status: ["completed", "pending", "failed", "refunded"],
      service_status: ["operational", "degraded", "outage"],
      subscription_type: ["Monthly", "Yearly", "3 Months"],
      ticket_priority: ["low", "medium", "high", "urgent"],
      ticket_status: ["open", "in_progress", "resolved", "closed"],
      user_status: ["active", "inactive", "banned"],
    },
  },
} as const
