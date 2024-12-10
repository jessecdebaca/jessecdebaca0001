import { useState } from 'react';

export function useFormModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const openModal = (id?: number) => {
    setEditingId(id ?? null);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setEditingId(null);
  };

  return {
    isOpen,
    editingId,
    openModal,
    closeModal,
  };
}