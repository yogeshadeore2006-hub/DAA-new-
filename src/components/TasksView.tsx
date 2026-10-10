import React, { useState } from 'react';
import { Task, Resource, Priority } from '../types';
import { Plus, Trash2, Edit2, RotateCcw, Search, Filter } from 'lucide-react';
import { TaskModal } from './TaskModal';

interface TasksViewProps {
  tasks: Task[];
  resources: Resource[];
  onAddTask: (task: Task) => void;
  onUpdateTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
  onClearAll: () => void;
  onLoadSample: () => void;
  onRunScheduling: () => void;
}

export const TasksView: React.FC<TasksViewProps> = ({
  tasks,
  resources,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
  onClearAll,
  onLoadSample,
  onRunScheduling
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<string>('All');

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          task.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          task.resourceType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = priorityFilter === 'All' || task.priority === priorityFilter;
    return matchesSearch && matchesPriority;
  });

  const handleEdit = (task: Task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setTaskToEdit(null);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">Task Management</h2>
          <p className="text-sm text-slate-500">Define and configure tasks for greedy EDF scheduling analysis.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onLoadSample}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors shadow-2xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Load Sample Data</span>
          </button>
          <button
            onClick={onClearAll}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-red-600 bg-white border border-red-200 rounded-xl hover:bg-red-50 transition-colors shadow-2xs"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear All</span>
          </button>
          <button
            onClick={handleAddNew}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Task</span>
          </button>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search tasks by ID, name, resource..."
            className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Filter className="w-3.5 h-3.5" />
            <span>Priority:</span>
          </div>
          <select
            value={priorityFilter}
            onChange={e => setPriorityFilter(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          >
            <option value="All">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      {/* Tasks Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <th className="px-6 py-3">Task ID</th>
                <th className="px-6 py-3">Task Name</th>
                <th className="px-6 py-3">Priority</th>
                <th className="px-6 py-3">Duration</th>
                <th className="px-6 py-3">Deadline</th>
                <th className="px-6 py-3">Required Resource</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTasks.map(task => {
                const resObj = resources.find(r => r.id === task.requiredResource);
                return (
                  <tr key={task.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-3 font-mono font-medium text-indigo-600">{task.id}</td>
                    <td className="px-6 py-3 font-medium text-slate-900">{task.name}</td>
                    <td className="px-6 py-3">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold ${
                        task.priority === 'High' ? 'bg-red-50 text-red-700' :
                        task.priority === 'Medium' ? 'bg-amber-50 text-amber-700' : 'bg-green-50 text-green-700'
                      }`}>
                        {task.priority}
                      </span>
                    </td>
                    <td className="px-6 py-3 tabular-nums">{task.duration} hrs</td>
                    <td className="px-6 py-3 tabular-nums">Unit {task.deadline}</td>
                    <td className="px-6 py-3 text-slate-600">
                      {resObj ? `${resObj.name} (${resObj.type})` : task.requiredResource}
                    </td>
                    <td className="px-6 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(task)}
                          className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-slate-100 transition-colors"
                          title="Edit Task"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDeleteTask(task.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                          title="Delete Task"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filteredTasks.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                    No tasks found matching criteria. Add a task or load sample data.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onRunScheduling}
          className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-sm transition-all"
        >
          Generate Optimal Schedule Now →
        </button>
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={taskToEdit ? onUpdateTask : onAddTask}
        taskToEdit={taskToEdit}
        resources={resources}
        existingTasks={tasks}
      />
    </div>
  );
};
