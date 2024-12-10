import { supabase } from './supabase';
import type { Database } from './types';
import {
  getCompanies,
  getContacts,
  getDeals,
  createCompany,
  updateCompany,
  deleteCompany,
  createContact,
  updateContact,
  deleteContact,
  createDeal,
  updateDeal,
  deleteDeal,
} from './queries';

export type { Database };
export type Company = Database['public']['Tables']['companies']['Row'];
export type Contact = Database['public']['Tables']['contacts']['Row'];
export type Deal = Database['public']['Tables']['deals']['Row'];

export const db = {
  companies: {
    toArray: () => getCompanies(supabase.auth.getUser().then(({ data }) => data.user?.id || '')),
    add: (data: Partial<Company>) => createCompany(data, supabase.auth.getUser().then(({ data }) => data.user?.id || '')),
    update: (id: number, data: Partial<Company>) => updateCompany(id, data, supabase.auth.getUser().then(({ data }) => data.user?.id || '')),
    delete: (id: number) => deleteCompany(id, supabase.auth.getUser().then(({ data }) => data.user?.id || '')),
  },
  contacts: {
    toArray: () => getContacts(supabase.auth.getUser().then(({ data }) => data.user?.id || '')),
    add: (data: Partial<Contact>) => createContact(data, supabase.auth.getUser().then(({ data }) => data.user?.id || '')),
    update: (id: number, data: Partial<Contact>) => updateContact(id, data, supabase.auth.getUser().then(({ data }) => data.user?.id || '')),
    delete: (id: number) => deleteContact(id, supabase.auth.getUser().then(({ data }) => data.user?.id || '')),
  },
  deals: {
    toArray: () => getDeals(supabase.auth.getUser().then(({ data }) => data.user?.id || '')),
    add: (data: Partial<Deal>) => createDeal(data, supabase.auth.getUser().then(({ data }) => data.user?.id || '')),
    update: (id: number, data: Partial<Deal>) => updateDeal(id, data, supabase.auth.getUser().then(({ data }) => data.user?.id || '')),
    delete: (id: number) => deleteDeal(id, supabase.auth.getUser().then(({ data }) => data.user?.id || '')),
  },
};