import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { db } from '../lib/db';
import { Button } from '../components/ui/Button';
import { DealForm } from '../components/forms/DealForm';
import { useFormModal } from '../lib/hooks/useFormModal';
import { SearchInput } from '../components/ui/SearchInput';
import { DealTable } from '../components/tables/DealTable';

export function Deals() {
  const [searchTerm, setSearchTerm] = useState('');
  const { isOpen, editingId, openModal, closeModal } = useFormModal();

  const { data: deals = [] } = useQuery(['deals', searchTerm], async () => {
    if (!searchTerm) {
      return db.deals.toArray();
    }
    
    const searchLower = searchTerm.toLowerCase();
    return db.deals
      .filter(deal => 
        deal.name.toLowerCase().includes(searchLower) ||
        deal.stage.toLowerCase().includes(searchLower)
      )
      .toArray();
  });

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Deals</h1>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Button onClick={() => openModal()}>Add Deal</Button>
        </div>
      </div>
      
      <div className="mt-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <SearchInput
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search deals..."
            />
          </div>
        </div>
        
        <DealTable deals={deals} onEdit={openModal} />
      </div>

      <DealForm
        isOpen={isOpen}
        onClose={closeModal}
        editingId={editingId}
      />
    </div>
  );
}