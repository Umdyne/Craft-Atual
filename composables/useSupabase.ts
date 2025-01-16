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

  async getLojasC(id: string): Promise<boolean> {
    const { data, error } = await this.supabase
      .from('stores')
      .select('*.*')
      .eq('categorie', id)
      ;

    if (error) {
      console.error(error);
      return false;
    }

    return data;
  }

  async getLoja(id: any): Promise<boolean> {
    const { data, error } = await this.supabase
      .from('stores')
      .select('*.*')
      .eq('id', id)
      .single()
      ;

    if (error) {
      console.error(error);
      return false;
    }

    return data;
  }

  async getProdutos(id: any): Promise<boolean> {
    const { data, error } = await this.supabase
      .from('product')
      .select('*.*')
      .eq('loja', id)
      ;

    if (error) {
      console.error(error);
      return false;
    }

    return data;
  }

  async searchProdutos(criteria: { name?: string; categorie?: number}): Promise<any[]> {
    const query = this.supabase.from('product').select('*.*');
  
    // Adicionar filtros dinamicamente
    if (criteria.name) {
      query.ilike('name', `%${criteria.name}%`); // Busca pelo nome (case insensitive)
    }
    if (criteria.categorie) {
      query.eq('categorie', criteria.categorie); // Filtrar por categoria
    }
    
  
    const { data, error } = await query;
  
    if (error) {
      console.error(error);
      return [];
    }
  
    return data || [];
  }

  async getCategorias(): Promise<boolean> {
    const { data, error } = await this.supabase
      .from('categories')
      .select('*.*')
      
      ;

    if (error) {
      console.error(error);
      return false;
    }

    return data;
  }

  async createStore(name: string, categorie: string, contact: string, description: string, user: string): Promise<boolean> {
    try {
      const { data, error } = await this.supabase
        .from('stores') // Tabela de Lojas
        .insert([{name, categorie, contact, description, user }]); // Inserindo os dados
  
      if (error) {
        console.error('Erro ao criar Loja:', error);
        return false; // Indica falha
      }
  
      console.log('Loja criada com sucesso:', data);
      return true; // Indica sucesso
    } catch (error) {
      console.error('Erro inesperado ao criar loja:', error);
      return false; // Indica falha
    }
  }

  async searchLojas(criteria: { name?: string; categorie?: number }): Promise<any[]> {
    const query = this.supabase.from('stores').select('*.*');
  
    // Adicionar filtros dinamicamente
    if (criteria.name) {
      query.ilike('name', `%${criteria.name}%`); // Busca pelo nome (case insensitive)
    }
    if (criteria.categorie) {
      query.eq('categorie', criteria.categorie); // Filtrar por categoria
    }
  
    const { data, error } = await query;
  
    if (error) {
      console.error(error);
      return [];
    }
  
    return data || [];
  }
  


  async createUser(
    name: string,
    username: string,
    email: string,
    password: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      const { data, error } = await this.supabase
        .from('users') // Tabela de usuários
        .insert([{ name, username, email, password }]); // Inserindo os dados

      if (error) {
        // Verifica se o erro é relacionado a duplicação de chave única
        if (
          error.message.includes('duplicate key') ||
          error.message.toLowerCase().includes('already exists')
        ) {
          return {
            success: false,
            message: 'Já existe um usuário com este e-mail ou username.',
          };
        }

        console.error('Erro ao criar usuário:', error);
        return { success: false, message: 'Erro ao criar usuário.' };
      }

      console.log('Usuário criado com sucesso:', data);
      return { success: true, message: 'Usuário criado com sucesso!' };
    } catch (error) {
      console.error('Erro inesperado ao criar usuário:', error);
      return { success: false, message: 'Erro inesperado ao criar usuário.' };
    }
  }
}
  

