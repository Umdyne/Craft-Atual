import { createClient } from '@supabase/supabase-js';

export class useSupabase {
  private supabase: any;

  constructor() {
    this.supabase = createClient('https://fcxulefcublfmvdqrwof.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjeHVsZWZjdWJsZm12ZHFyd29mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM4NjU3NTksImV4cCI6MjA0OTQ0MTc1OX0.bSHj6QP-MXuYxCZGFfBGwsHM8vmTiOdTwyPV4mPpvJ8');
  }

  async verificarUsuario(username: string, password: string): Promise<boolean> {
    const { data, error } = await this.supabase
      .from('users')
      .select('*.*')
      .eq('username', username)
      .eq('password', password)
      .single();

    if (error) {
      console.error(error);
      return false;
    }

    return data;
  }

  async getUsuario(id: string): Promise<boolean> {
    const { data, error } = await this.supabase
      .from('users')
      .select('*.*')
      .eq('id', id)
      .single();

    if (error) {
      console.error(error);
      return false;
    }

    return data;
  }

  async getLojas(id: string): Promise<boolean> {
    const { data, error } = await this.supabase
      .from('stores')
      .select('*.*')
      .eq('user', id)
      ;

    if (error) {
      console.error(error);
      return false;
    }

    return data;
  }

  async createUser(name: string, username: string, email: string, password: string): Promise<boolean> {
    try {
      const { data, error } = await this.supabase
        .from('users') // Tabela de usuários
        .insert([{name, username, email, password }]); // Inserindo os dados
  
      if (error) {
        console.error('Erro ao criar usuário:', error);
        return false; // Indica falha
      }
  
      console.log('Usuário criado com sucesso:', data);
      return true; // Indica sucesso
    } catch (error) {
      console.error('Erro inesperado ao criar usuário:', error);
      return false; // Indica falha
    }
  }
  
  
//   async signUp(email: string, password: string): Promise<Session | null> {
//     try {
//       const { error, data } = await this.supabase.auth.signUp({
//         email,
//         password,
//       });
//       if (error) throw error;
//       return data?.session ?? null;
//     } catch (error) {
//       console.error(error);
//       return null;
//     }
//   }

//   async signIn(email: string, password: string): Promise<Session | null> {
//     try {
//       const { error, data } = await this.supabase.auth.signInWithPassword({
//         email,
//         password,
//       });
//       if (error) throw error;
//       return data?.session ?? null;
//     } catch (error) {
//       console.error(error);
//       return null;
//     }
//   }

//   async signOut(): Promise<void> {
//     try {
//       await this.supabase.auth.signOut();
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   async getSession(): Promise<Session | null> {
//     try {
//       const { data, error } = await this.supabase.auth.getSession();
//       if (error) throw error;
//       return data?.session ?? null;
//     } catch (error) {
//       console.error(error);
//       return null;
//     }
//   }
}