import React, { useState } from 'react';
import { ScheduledTask } from '../types';
import { Calendar, Play, Filter, Search, CheckCircle, AlertTriangle } from 'lucide-react';

interface ScheduleViewProps {
  scheduledTasks: ScheduledTask[];
  onRunScheduling: () => void;
}

export const ScheduleView: React.FC<ScheduleViewProps> = ({ scheduledTasks, onRunScheduling }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredTasks = scheduledTasks.filter(task => {
    const matchesSearch = task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          task.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          task.assignedResource.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">Optimized Schedule</h2>
          <p className="text-sm text-slate-500">Generated using Greedy Earliest Deadline First (EDF) Algorithm.</p>
        </div>
        <button
          onClick={onRunScheduling}
          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>Regenerate Schedule</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search schedule by task, ID, resource..."
            className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Filter className="w-3.5 h-3.5" />
            <span>Status:</span>
          </div>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          >
            <option value="All">All Statuses</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Deadline Missed">Deadline Missed</option>
            <option value="Resource Conflict">Resource Conflict</option>
            <option value="Unscheduled">Unscheduled</option>
          </select>
        </div>
      </div>

      {/* Schedule Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <th className="px-6 py-3">Task ID & Name</th>
                <th className="px-6 py-3">Priority</th>
                <th className="px-6 py-3">Duration</th>
                <th className="px-6 py-3">Deadline</th>
                <th className="px-6 py-3">Assigned Resource</th>
                <th className="px-6 py-3">Start Time</th>
                <th className="px-6 py-3">End Time</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTasks.map(task => (
                <tr key={task.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-3">
                    <span className="font-mono font-medium text-indigo-600">{task.id}</span>
                    <span className="ml-2 font-medium text-slate-900">{task.name}</span>
                  </td>
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
                  <td className="px-6 py-3 font-medium text-slate-700">{task.assignedResource}</td>
                  <td className="px-6 py-3 tabular-nums font-mono">{task.startTime}</td>
                  <td className="px-6 py-3 tabular-nums font-mono">{task.endTime}</td>
                  <td className="px-6 py-3">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                      task.status === 'Scheduled' ? 'bg-emerald-50 text-emerald-700' :
                      task.status === 'Deadline Missed' ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'
                    }`}>
                      {task.status === 'Scheduled' ? <CheckCircle className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                      <span>{task.status}</span>
                    </span>
                    {task.conflictReason && (
                      <p className="text-[10px] text-slate-400 mt-0.5">{task.conflictReason}</p>
                    )}
                  </td>
                </tr>
              ))}
              {filteredTasks.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-slate-500">
                    No scheduled tasks found matching criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
