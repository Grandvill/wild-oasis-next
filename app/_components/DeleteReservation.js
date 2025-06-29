'use client';

import { TrashIcon } from '@heroicons/react/24/solid';
import { useTransition, useState } from 'react';
import SpinnerMini from './SpinnerMini';

function DeleteReservation({ bookingId, onDelete }) {
  const [isPending, startTransition] = useTransition();
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleDelete() {
    setIsModalOpen(true);
  }

  function confirmDelete() {
    startTransition(() => {
      onDelete(bookingId);
      setIsModalOpen(false);
    });
  }

  function cancelDelete() {
    setIsModalOpen(false);
  }

  return (
    <>
      <button
        onClick={handleDelete}
        disabled={isPending}
        className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900 disabled:opacity-50"
      >
        {!isPending ? (
          <>
            <TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
            <span className="mt-1">Delete</span>
          </>
        ) : (
          <span className="mx-auto">
            <SpinnerMini />
          </span>
        )}
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Confirm Deletion</h2>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this reservation? This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button onClick={cancelDelete} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded transition-colors">
                Cancel
              </button>
              <button onClick={confirmDelete} className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DeleteReservation;
