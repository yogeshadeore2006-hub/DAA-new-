import React, { useState } from 'react';
import { Resource } from '../types';
import { Plus, Trash2, Edit2, Users } from 'lucide-react';
import { ResourceModal } from './ResourceModal';

interface ResourcesViewProps {
  resources: Resource[];
  onAddResource: (resource: Resource) => void;
  onUpdateResource: (resource: Resource) => void;
  onDeleteResource: (id: string) => void;
}

export const ResourcesView: React.FC<ResourcesViewProps> = ({
  resources,
  onAddResource,
  onUpdateResource,
  onDeleteResource
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resourceToEdit, setResourceToEdit] = useState<Resource | null>(null);

  const handleEdit = (resource: Resource) => {
    setResourceToEdit(resource);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setResourceToEdit(null);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">Resource Management</h2>
          <p className="text-sm text-slate-500">Configure team personnel, servers, and hardware capacity for task allocation.</p>
        </div>
        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Resource</span>
        </button>
      </div>

      {/* Resources Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <th className="px-6 py-3">Resource ID</th>
                <th className="px-6 py-3">Resource Name</th>
                <th className="px-6 py-3">Type</th>
                <th className="px-6 py-3">Capacity</th>
                <th className="px-6 py-3">Availability</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {resources.map(resource => (
                <tr key={resource.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-3 font-mono font-medium text-indigo-600">{resource.id}</td>
                  <td className="px-6 py-3 font-medium text-slate-900 flex items-center gap-2">
                    <Users className="w-4 h-4 text-slate-400" />
                    <span>{resource.name}</span>
                  </td>
                  <td className="px-6 py-3">
                    <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700">
                      {resource.type}
                    </span>
                  </td>
                  <td className="px-6 py-3 tabular-nums font-semibold">{resource.capacity} Units</td>
                  <td className="px-6 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      resource.availability === 'Available' ? 'bg-emerald-50 text-emerald-700' :
                      resource.availability === 'Busy' ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'
                    }`}>
                      {resource.availability}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(resource)}
                        className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-slate-100 transition-colors"
                        title="Edit Resource"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDeleteResource(resource.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                        title="Delete Resource"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {resources.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    No resources configured. Add resources to enable greedy allocation.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ResourceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={resourceToEdit ? onUpdateResource : onAddResource}
        resourceToEdit={resourceToEdit}
        existingResources={resources}
      />
    </div>
  );
};
