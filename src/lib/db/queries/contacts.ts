import { supabase } from '../supabase';
import type { Database } from '../types';

type Contact = Database['public']['Tables']['contacts']['Row'];

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