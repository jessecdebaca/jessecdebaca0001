import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { db } from '../lib/db';
import { Button } from '../components/ui/Button';
import { CompanyForm } from '../components/forms/CompanyForm';
import { useFormModal } from '../lib/hooks/useFormModal';
import { SearchInput } from '../components/ui/SearchInput';
import { CompanyTable } from '../components/tables/CompanyTable';

export function Companies() {
  const [searchTerm, setSearchTerm] = useState('');
  const { isOpen, editingId, openModal, closeModal } = useFormModal();

  const { data: companies = [] } = useQuery(['companies', searchTerm], async () => {
    if (!searchTerm) {
      return db.companies.toArray();
    }
    
    const searchLower = searchTerm.toLowerCase();
    return db.companies
      .filter(company => 
        company.name.toLowerCase().includes(searchLower) ||
        (company.domain?.toLowerCase().includes(searchLower) ?? false) ||
        (company.industry?.toLowerCase().includes(searchLower) ?? false)
      )
      .toArray();
  });

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Companies</h1>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Button onClick={() => openModal()}>Add Company</Button>
        </div>
      </div>
      
      <div className="mt-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <SearchInput
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search companies..."
            />
          </div>
        </div>
        
        <CompanyTable companies={companies} onEdit={openModal} />
      </div>

      <CompanyForm
        isOpen={isOpen}
        onClose={closeModal}
        editingId={editingId}
      />
    </div>
  );
}