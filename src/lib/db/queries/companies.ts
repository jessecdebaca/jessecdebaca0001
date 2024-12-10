import { supabase } from '../supabase';
import type { Database } from '../types';

type Company = Database['public']['Tables']['companies']['Row'];

export async function getCompanies(userId: Promise<string>): Promise<Company[]> {
  const id = await userId;
  const { data, error } = await supabase
    .from('companies')
    .select('*')
    .eq('user_id', id)
    .order('name');

  if (error) throw error;
  return data || [];
}

export async function createCompany(data: Partial<Company>, userId: Promise<string>) {
  const id = await userId;
  const { error } = await supabase
    .from('companies')
    .insert([{ ...data, user_id: id }]);

  if (error) throw error;
}

export async function updateCompany(companyId: number, data: Partial<Company>, userId: Promise<string>) {
  const id = await userId;
  const { error } = await supabase
    .from('companies')
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq('id', companyId)
    .eq('user_id', id);

  if (error) throw error;
}

export async function deleteCompany(companyId: number, userId: Promise<string>) {
  const id = await userId;
  const { error } = await supabase
    .from('companies')
    .delete()
    .eq('id', companyId)
    .eq('user_id', id);

  if (error) throw error;
}