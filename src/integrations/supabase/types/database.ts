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
      candidates: {
        Row: CandidatesRow;
        Insert: CandidatesInsert;
        Update: CandidatesUpdate;
        Relationships: [];
      };
      reports: {
        Row: ReportsRow;
        Insert: ReportsInsert;
        Update: ReportsUpdate;
        Relationships: ReportsRelationships[];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

interface CandidatesRow {
  id: string;
  name: string;
  username: string;
  created_at: string | null;
  cv_submitted: boolean | null;
  interview_status: string | null;
  offer_letter_sent: boolean | null;
  cos_sent: boolean | null;
  right_to_work: boolean | null;
  onboarding_complete: boolean | null;
  email: string | null;
  has_reset_password: boolean | null;
  onboarding: Json | null;
  status: string | null;
  personal_info: Json | null;
}

interface CandidatesInsert {
  id?: string;
  name: string;
  username: string;
  created_at?: string | null;
  cv_submitted?: boolean | null;
  interview_status?: string | null;
  offer_letter_sent?: boolean | null;
  cos_sent?: boolean | null;
  right_to_work?: boolean | null;
  onboarding_complete?: boolean | null;
  email?: string | null;
  has_reset_password?: boolean | null;
  onboarding?: Json | null;
  status?: string | null;
  personal_info?: Json | null;
}

interface CandidatesUpdate {
  id?: string;
  name?: string;
  username?: string;
  created_at?: string | null;
  cv_submitted?: boolean | null;
  interview_status?: string | null;
  offer_letter_sent?: boolean | null;
  cos_sent?: boolean | null;
  right_to_work?: boolean | null;
  onboarding_complete?: boolean | null;
  email?: string | null;
  has_reset_password?: boolean | null;
  onboarding?: Json | null;
  status?: string | null;
  personal_info?: Json | null;
}

interface ReportsRow {
  id: string;
  user_id: string | null;
  type: string;
  description: string;
  status: string | null;
  created_at: string | null;
}

interface ReportsInsert {
  id?: string;
  user_id?: string | null;
  type: string;
  description: string;
  status?: string | null;
  created_at?: string | null;
}

interface ReportsUpdate {
  id?: string;
  user_id?: string | null;
  type?: string;
  description?: string;
  status?: string | null;
  created_at?: string | null;
}

interface ReportsRelationships {
  foreignKeyName: "reports_user_id_fkey";
  columns: ["user_id"];
  isOneToOne: false;
  referencedRelation: "candidates";
  referencedColumns: ["id"];
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;