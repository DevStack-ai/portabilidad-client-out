// prisma.ts (or any other filename you prefer)

export interface Admin {
    id?: number; // Optional since `id` is auto-incremented
    username?: string;
    password?: string;
  }
  
  export interface NipRequest {
    id?: number; // Optional since `id` is auto-incremented
    phone: string;
    status: number;
    errorMsg?: string;
    created_at: Date; // Assuming `DateTime` maps to Date in TypeScript
    updated_at?: Date;
    created_by?: number;
    updated_by?: number;
    userId: number;
    // Omit relationship fields (user) as they're not directly part of the interface
  }
  
  export interface PortaRequest {
    id?: number; // Optional since `id` is auto-incremented
    phone: string;
    sgo_ported_phone?: string;
    user_id: number;
    origin: number;
    nip: string;
    document_type: number;
    c_provincia?: number;
    c_folio?: number;
    c_asiento?: number;
    c_letra?: string;
    passport?: string;
    ruc?: string;
    name: string;
    contact_phone?: string;
    email?: string;
    provincia: string;
    distrito: string;
    corregimiento: string;
    barrio: string;
    address: string;
    home_type?: string;
    home_number?: string;
    doc_front_path?: string;
    doc_back_path?: string;
    spn_path?: string;
    signature?: string;
    rpa_status?: number;
    rpa_message?: string;
    status: number;
    nip_req_id?: number;
    created_at?: Date;
    updated_at?: Date;
    created_by?: number;
    updated_by?: number;
    sgo_account?: string;
    simcard?: string;

    puser?: {
      username: string;
      area: string;
    }
    porigin?: {
      name: string;
    }
    // Omit relationship fields (user, origin) as they're not directly part of the interface
  }
  
  export interface User {
    id?: number; // Optional since `id` is auto-incremented
    username: string;
    password: string;
    area?: string;
    sgo_username?: string;
    sgo_password?: string;
    sgo_area?: string;
    created_at?: Date;
    updated_at?: Date;
    created_by?: number;
    updated_by?: number;
    // Omit relationship fields (nipRequests, portaRequests) as they're not directly part of the interface
  }
  
  export interface Origin {
    id?: number; // Optional since `id` is auto-incremented
    name?: string;
    created_at: string; // Assuming `created_at` remains a string in TypeScript
  }
  