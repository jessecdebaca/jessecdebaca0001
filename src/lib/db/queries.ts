import { supabase } from './supabase';
import type { Database } from './types';

type Company = Database['public']['Tables']['companies']['Row'];
type Contact = Database['public']['Tables']['contacts']['Row'];
type Deal = Database['public']['Tables']['deals']['Row'];

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

export async function getContacts(userId: Promise<string>): Promise<Contact[]> {
  const id = await userId;
  const { data, error } = await supabase
    .from('contacts')
    .select('*, companies(*)')
    .eq('user_id', id)
    .order('last_name');

  if (error) throw error;
  return data || [];
}

export async function createContact(data: Partial<Contact>, userId: Promise<string>) {
  const id = await userId;
  const { error } = await supabase
    .from('contacts')
    .insert([{ ...data, user_id: id }]);

  if (error) throw error;
}

export async function updateContact(contactId: number, data: Partial<Contact>, userId: Promise<string>) {
  const id = await userId;
  const { error } = await supabase
    .from('contacts')
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq('id', contactId)
    .eq('user_id', id);

  if (error) throw error;
}

export async function deleteContact(contactId: number, userId: Promise<string>) {
  const id = await userId;
  const { error } = await supabase
    .from('contacts')
    .delete()
    .eq('id', contactId)
    .eq('user_id', id);

  if (error) throw error;
}

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