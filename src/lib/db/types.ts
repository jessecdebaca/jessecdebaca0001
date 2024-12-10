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
      companies: {
        Row: {
          id: number
          name: string
          domain: string | null
          industry: string | null
          size: string | null
          address: string | null
          created_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          id?: number
          name: string
          domain?: string | null
          industry?: string | null
          size?: string | null
          address?: string | null
          created_at?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          id?: number
          name?: string
          domain?: string | null
          industry?: string | null
          size?: string | null
          address?: string | null
          created_at?: string
          updated_at?: string
          user_id?: string
        }
      }
      contacts: {
        Row: {
          id: number
          first_name: string
          last_name: string
          email: string
          phone: string | null
          company_id: number | null
          title: string | null
          notes: string | null
          created_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          id?: number
          first_name: string
          last_name: string
          email: string
          phone?: string | null
          company_id?: number | null
          title?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          id?: number
          first_name?: string
          last_name?: string
          email?: string
          phone?: string | null
          company_id?: number | null
          title?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
          user_id?: string
        }
      }
      deals: {
        Row: {
          id: number
          name: string
          value: number
          stage: string
          contact_id: number | null
          company_id: number | null
          close_date: string | null
          created_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          id?: number
          name: string
          value: number
          stage: string
          contact_id?: number | null
          company_id?: number | null
          close_date?: string | null
          created_at?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          id?: number
          name?: string
          value?: number
          stage?: string
          contact_id?: number | null
          company_id?: number | null
          close_date?: string | null
          created_at?: string
          updated_at?: string
          user_id?: string
        }
      }
    }
  }
}