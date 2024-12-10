import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { db, type Contact } from '../lib/db';
import { Button } from '../components/ui/Button';
import { ContactForm } from '../components/forms/ContactForm';
import { useFormModal } from '../lib/hooks/useFormModal';
import { formatPhoneNumber } from '../lib/utils/format';

export function Contacts() {
  const [searchTerm, setSearchTerm] = useState('');
  const { isOpen, editingId, openModal, closeModal } = useFormModal();

  const { data: contacts = [] } = useQuery(['contacts', searchTerm], async () => {
    if (!searchTerm) {
      return db.contacts.toArray();
    }
    
    const searchLower = searchTerm.toLowerCase();
    return db.contacts
      .filter(contact => 
        contact.firstName.toLowerCase().includes(searchLower) ||
        contact.lastName.toLowerCase().includes(searchLower) ||
        contact.email.toLowerCase().includes(searchLower)
      )
      .toArray();
  });

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Contacts</h1>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Button onClick={() => openModal()}>Add Contact</Button>
        </div>
      </div>
      
      <div className="mt-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <div className="max-w-md">
              <input
                type="text"
                placeholder="Search contacts..."
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Email
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Phone
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Company
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Title
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {contacts.map((contact: Contact) => (
                    <tr key={contact.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        {contact.firstName} {contact.lastName}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{contact.email}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {contact.phone ? formatPhoneNumber(contact.phone) : '-'}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{contact.company || '-'}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{contact.title || '-'}</td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <Button variant="ghost" onClick={() => openModal(contact.id)}>
                          Edit
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <ContactForm
        isOpen={isOpen}
        onClose={closeModal}
        editingId={editingId}
      />
    </div>
  );
}