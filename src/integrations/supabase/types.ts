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
      admins: {
        Row: {
          created_at: string
          email: string
          id: string
          password_hash: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          password_hash: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          password_hash?: string
          updated_at?: string
        }
        Relationships: []
      }
      files: {
        Row: {
          category: string
          id: string
          name: string
          size: string
          storage_path: string
          type: string
          uploaded_at: string
          user_id: string | null
        }
        Insert: {
          category: string
          id?: string
          name: string
          size: string
          storage_path: string
          type: string
          uploaded_at?: string
          user_id?: string | null
        }
        Update: {
          category?: string
          id?: string
          name?: string
          size?: string
          storage_path?: string
          type?: string
          uploaded_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "files_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      onboarding: {
        Row: {
          created_at: string
          current_phase: number | null
          phase0_completed: boolean | null
          phase0_feedback: string | null
          phase1_completed: boolean | null
          phase1_feedback: string | null
          phase2_completed: boolean | null
          phase2_feedback: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_phase?: number | null
          phase0_completed?: boolean | null
          phase0_feedback?: string | null
          phase1_completed?: boolean | null
          phase1_feedback?: string | null
          phase2_completed?: boolean | null
          phase2_feedback?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_phase?: number | null
          phase0_completed?: boolean | null
          phase0_feedback?: string | null
          phase1_completed?: boolean | null
          phase1_feedback?: string | null
          phase2_completed?: boolean | null
          phase2_feedback?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "onboarding_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      onboarding_details: {
        Row: {
          bank_statements: boolean | null
          company_agreements: boolean | null
          cos_sent: boolean | null
          created_at: string
          cv_submitted: boolean | null
          dbs: boolean | null
          documents_uploaded: boolean | null
          hmrc_checklist: boolean | null
          interview_completed: boolean | null
          job_status: string | null
          offer_letter_sent: boolean | null
          onboarding_complete: boolean | null
          other_documents_uploaded: boolean | null
          passport_uploaded: boolean | null
          pcc_uploaded: boolean | null
          pension_scheme: boolean | null
          personal_details_completed: boolean | null
          right_to_work: boolean | null
          right_to_work_sent: boolean | null
          share_code: boolean | null
          travel_details_updated: boolean | null
          travel_documents_uploaded: boolean | null
          uk_address: string | null
          uk_contact_number: string | null
          uk_contact_updated: boolean | null
          updated_at: string
          user_id: string
          vaccination_proof: boolean | null
          visa_copy_uploaded: boolean | null
          visa_status: string | null
        }
        Insert: {
          bank_statements?: boolean | null
          company_agreements?: boolean | null
          cos_sent?: boolean | null
          created_at?: string
          cv_submitted?: boolean | null
          dbs?: boolean | null
          documents_uploaded?: boolean | null
          hmrc_checklist?: boolean | null
          interview_completed?: boolean | null
          job_status?: string | null
          offer_letter_sent?: boolean | null
          onboarding_complete?: boolean | null
          other_documents_uploaded?: boolean | null
          passport_uploaded?: boolean | null
          pcc_uploaded?: boolean | null
          pension_scheme?: boolean | null
          personal_details_completed?: boolean | null
          right_to_work?: boolean | null
          right_to_work_sent?: boolean | null
          share_code?: boolean | null
          travel_details_updated?: boolean | null
          travel_documents_uploaded?: boolean | null
          uk_address?: string | null
          uk_contact_number?: string | null
          uk_contact_updated?: boolean | null
          updated_at?: string
          user_id: string
          vaccination_proof?: boolean | null
          visa_copy_uploaded?: boolean | null
          visa_status?: string | null
        }
        Update: {
          bank_statements?: boolean | null
          company_agreements?: boolean | null
          cos_sent?: boolean | null
          created_at?: string
          cv_submitted?: boolean | null
          dbs?: boolean | null
          documents_uploaded?: boolean | null
          hmrc_checklist?: boolean | null
          interview_completed?: boolean | null
          job_status?: string | null
          offer_letter_sent?: boolean | null
          onboarding_complete?: boolean | null
          other_documents_uploaded?: boolean | null
          passport_uploaded?: boolean | null
          pcc_uploaded?: boolean | null
          pension_scheme?: boolean | null
          personal_details_completed?: boolean | null
          right_to_work?: boolean | null
          right_to_work_sent?: boolean | null
          share_code?: boolean | null
          travel_details_updated?: boolean | null
          travel_documents_uploaded?: boolean | null
          uk_address?: string | null
          uk_contact_number?: string | null
          uk_contact_updated?: boolean | null
          updated_at?: string
          user_id?: string
          vaccination_proof?: boolean | null
          visa_copy_uploaded?: boolean | null
          visa_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "onboarding_details_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          address: string | null
          city: string | null
          country: string | null
          country_of_residence: string | null
          created_at: string
          date_of_birth: string | null
          family_name: string | null
          gender: string | null
          given_name: string | null
          nationality: string | null
          other_names: string | null
          passport_expiry_date: string | null
          passport_issue_date: string | null
          passport_number: string | null
          passport_place_of_issue: string | null
          phone: string | null
          place_of_birth: string | null
          postal_code: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          address?: string | null
          city?: string | null
          country?: string | null
          country_of_residence?: string | null
          created_at?: string
          date_of_birth?: string | null
          family_name?: string | null
          gender?: string | null
          given_name?: string | null
          nationality?: string | null
          other_names?: string | null
          passport_expiry_date?: string | null
          passport_issue_date?: string | null
          passport_number?: string | null
          passport_place_of_issue?: string | null
          phone?: string | null
          place_of_birth?: string | null
          postal_code?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string | null
          city?: string | null
          country?: string | null
          country_of_residence?: string | null
          created_at?: string
          date_of_birth?: string | null
          family_name?: string | null
          gender?: string | null
          given_name?: string | null
          nationality?: string | null
          other_names?: string | null
          passport_expiry_date?: string | null
          passport_issue_date?: string | null
          passport_number?: string | null
          passport_place_of_issue?: string | null
          phone?: string | null
          place_of_birth?: string | null
          postal_code?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          email: string
          id: string
          password_hash: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          password_hash: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          password_hash?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
