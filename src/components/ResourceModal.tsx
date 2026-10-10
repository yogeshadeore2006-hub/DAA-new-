import React, { useState, useEffect } from 'react';
import { Resource } from '../types';
import { X } from 'lucide-react';

interface ResourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (resource: Resource) => void;
  resourceToEdit?: Resource | null;
  existingResources: Resource[];
}

export const ResourceModal: React.FC<ResourceModalProps> = ({
  isOpen,
  onClose,
  onSave,
  resourceToEdit,
  existingResources
}) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState('Developer');
  const [capacity, setCapacity] = useState(1);
  const [availability, setAvailability] = useState<Resource['availability']>('Available');
  const [error, setError] = useState('');

  useEffect(() => {
    if (resourceToEdit) {
      setId(resourceToEdit.id);
      setName(resourceToEdit.name);
      setType(resourceToEdit.type);
      setCapacity(resourceToEdit.capacity);
      setAvailability(resourceToEdit.availability);
    } else {
      const nextNum = existingResources.length + 1;
      setId(`R${nextNum}`);
      setName('');
      setType('Developer');
      setCapacity(1);
      setAvailability('Available');
    }
    setError('');
  }, [resourceToEdit, isOpen, existingResources]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id.trim() || !name.trim()) {
      setError('Resource ID and Name are required.');
      return;
    }

    if (!resourceToEdit && existingResources.some(r => r.id === id)) {
      setError(`Resource ID '${id}' already exists.`);
      return;
    }

    onSave({
      id: id.trim(),
      name: name.trim(),
      type: type.trim(),
      capacity: Number(capacity),
      availability
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden border border-slate-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="text-lg font-semibold text-slate-900">
            {resourceToEdit ? 'Edit Resource' : 'Add New Resource'}
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Resource ID</label>
              <input
                type="text"
                value={id}
                disabled={!!resourceToEdit}
                onChange={e => setId(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-slate-100"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Resource Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Senior Dev Unit"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Resource Type</label>
              <select
                value={type}
                onChange={e => setType(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                <option value="Developer">Developer</option>
                <option value="Designer">Designer</option>
                <option value="Tester">Tester</option>
                <option value="Server">Server</option>
                <option value="Computer">Computer</option>
                <option value="Machine">Machine</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Capacity</label>
              <input
                type="number"
                min="1"
                max="10"
                value={capacity}
                onChange={e => setCapacity(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Availability Status</label>
            <select
              value={availability}
              onChange={e => setAvailability(e.target.value as Resource['availability'])}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            >
              <option value="Available">Available</option>
              <option value="Busy">Busy</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-xs"
            >
              {resourceToEdit ? 'Save Changes' : 'Add Resource'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
