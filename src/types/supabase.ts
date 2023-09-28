export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          address: string | null
          avatar_url: string | null
          first_name: string | null
          id: string
          last_name: string | null
          latitude: number | null
          location: unknown | null
          longitude: number | null
          phone: string | null
          search_radius: number | null
          unit: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          avatar_url?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          latitude?: number | null
          location?: unknown | null
          longitude?: number | null
          phone?: string | null
          search_radius?: number | null
          unit?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          avatar_url?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          latitude?: number | null
          location?: unknown | null
          longitude?: number | null
          phone?: string | null
          search_radius?: number | null
          unit?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_all_profile: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          type: string
          address: string
          first_name: string
          last_name: string
          location: string
          phone: string
          avatar_url: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
