import React, { useState, useEffect } from 'react';
import { Task, Resource, Priority } from '../types';
import { X } from 'lucide-react';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Task) => void;
  taskToEdit?: Task | null;
  resources: Resource[];
  existingTasks: Task[];
}

export const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  onSave,
  taskToEdit,
  resources,
  existingTasks
}) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [priority, setPriority] = useState<Priority>('Medium');
  const [duration, setDuration] = useState(2);
  const [deadline, setDeadline] = useState(10);
  const [requiredResource, setRequiredResource] = useState('');
  const [resourceType, setResourceType] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (taskToEdit) {
      setId(taskToEdit.id);
      setName(taskToEdit.name);
      setPriority(taskToEdit.priority);
      setDuration(taskToEdit.duration);
      setDeadline(taskToEdit.deadline);
      setRequiredResource(taskToEdit.requiredResource);
      setResourceType(taskToEdit.resourceType);
    } else {
      const nextIdNum = existingTasks.length + 1;
      setId(`T${nextIdNum}`);
      setName('');
      setPriority('Medium');
      setDuration(2);
      setDeadline(10);
      setRequiredResource(resources[0]?.id || '');
      setResourceType(resources[0]?.type || 'Developer');
    }
    setError('');
  }, [taskToEdit, isOpen, resources, existingTasks]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id.trim() || !name.trim()) {
      setError('Task ID and Task Name are required.');
      return;
    }

    if (!taskToEdit && existingTasks.some(t => t.id === id)) {
      setError(`Task ID '${id}' already exists. Please choose a unique ID.`);
      return;
    }

    const selectedRes = resources.find(r => r.id === requiredResource);

    onSave({
      id: id.trim(),
      name: name.trim(),
      priority,
      duration: Number(duration),
      deadline: Number(deadline),
      requiredResource: requiredResource || resources[0]?.id || 'R1',
      resourceType: selectedRes ? selectedRes.type : resourceType || 'Developer'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden border border-slate-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="text-lg font-semibold text-slate-900">
            {taskToEdit ? 'Edit Task' : 'Add New Task'}
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
              <label className="block text-xs font-medium text-slate-700 mb-1">Task ID</label>
              <input
                type="text"
                value={id}
                disabled={!!taskToEdit}
                onChange={e => setId(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-slate-100"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Task Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Frontend UI"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Priority</label>
              <select
                value={priority}
                onChange={e => setPriority(e.target.value as Priority)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Required Resource</label>
              <select
                value={requiredResource}
                onChange={e => setRequiredResource(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                {resources.map(r => (
                  <option key={r.id} value={r.id}>
                    {r.name} ({r.type})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Duration (Hours)</label>
              <input
                type="number"
                min="1"
                max="48"
                value={duration}
                onChange={e => setDuration(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Deadline (Time Unit)</label>
              <input
                type="number"
                min="1"
                max="100"
                value={deadline}
                onChange={e => setDeadline(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
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
              {taskToEdit ? 'Save Changes' : 'Add Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
