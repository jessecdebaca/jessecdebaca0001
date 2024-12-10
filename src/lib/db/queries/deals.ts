import { supabase } from '../supabase';
import type { Database } from '../types';

type Deal = Database['public']['Tables']['deals']['Row'];

export async function getDeals(userId: Promise<string>): Promise<Deal[]> {
  const id = await userId;
  const { data, error } = await supabase
    .from('deals')
    .select('*, contacts(*), companies(*)')
    .eq('user_id', id)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function createDeal(data: Partial<Deal>, userId: Promise<string>) {
  const id = await userId;
  const { error } = await supabase
    .from('deals')
    .insert([{ ...data, user_id: id }]);

  if (error) throw error;
}

export async function updateDeal(dealId: number, data: Partial<Deal>, userId: Promise<string>) {
  const id = await userId;
  const { error } = await supabase
    .from('deals')
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq('id', dealId)
    .eq('user_id', id);

  if (error) throw error;
}

export async function deleteDeal(dealId: number, userId: Promise<string>) {
  const id = await userId;
  const { error } = await supabase
    .from('deals')
    .delete()
    .eq('id', dealId)
    .eq('user_id', id);

  if (error) throw error;
}