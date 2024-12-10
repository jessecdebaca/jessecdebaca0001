import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../ui/Button';
import { Dialog } from '@headlessui/react';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { db, type Deal } from '../../lib/db';

const dealSchema = z.object({
  name: z.string().min(1, 'Deal name is required'),
  value: z.number().min(0, 'Value must be positive'),
  stage: z.enum(['lead', 'opportunity', 'proposal', 'negotiation', 'closed-won', 'closed-lost']),
  contactId: z.number().optional(),
  companyId: z.number().optional(),
  closeDate: z.string().optional(),
});

type DealFormData = z.infer<typeof dealSchema>;

interface DealFormProps {
  isOpen: boolean;
  onClose: () => void;
  editingId?: number | null;
}

export function DealForm({ isOpen, onClose, editingId }: DealFormProps) {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<DealFormData>({
    resolver: zodResolver(dealSchema),
  });

  const { data: contacts = [] } = useQuery(['contacts'], () => db.contacts.toArray());
  const { data: companies = [] } = useQuery(['companies'], () => db.companies.toArray());

  const mutation = useMutation({
    mutationFn: async (data: DealFormData) => {
      const deal: Omit<Deal, 'id'> = {
        ...data,
        value: Number(data.value),
        closeDate: data.closeDate ? new Date(data.closeDate) : undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      if (editingId) {
        await db.deals.update(editingId, deal);
      } else {
        await db.deals.add(deal);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['deals']);
      onClose();
      reset();
    },
  });

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-sm rounded bg-white p-6">
          <Dialog.Title className="text-lg font-medium leading-6 text-gray-900 mb-4">
            {editingId ? 'Edit Deal' : 'Add Deal'}
          </Dialog.Title>
          
          <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Deal Name</label>
              <input
                {...register('name')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Value</label>
              <input
                type="number"
                {...register('value', { valueAsNumber: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.value && (
                <p className="mt-1 text-sm text-red-600">{errors.value.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Stage</label>
              <select
                {...register('stage')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="lead">Lead</option>
                <option value="opportunity">Opportunity</option>
                <option value="proposal">Proposal</option>
                <option value="negotiation">Negotiation</option>
                <option value="closed-won">Closed Won</option>
                <option value="closed-lost">Closed Lost</option>
              </select>
              {errors.stage && (
                <p className="mt-1 text-sm text-red-600">{errors.stage.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Contact</label>
              <select
                {...register('contactId', { valueAsNumber: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Select contact</option>
                {contacts.map((contact) => (
                  <option key={contact.id} value={contact.id}>
                    {contact.firstName} {contact.lastName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Company</label>
              <select
                {...register('companyId', { valueAsNumber: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Select company</option>
                {companies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Close Date</label>
              <input
                type="date"
                {...register('closeDate')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="mt-4 flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                {editingId ? 'Update' : 'Create'}
              </Button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}