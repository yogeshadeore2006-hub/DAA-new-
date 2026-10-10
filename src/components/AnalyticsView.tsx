import React from 'react';
import { Task, Resource, ScheduledTask } from '../types';
import { BarChart2, PieChart, Users, TrendingUp, CheckCircle, Clock } from 'lucide-react';

interface AnalyticsViewProps {
  tasks: Task[];
  resources: Resource[];
  scheduledTasks: ScheduledTask[];
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ tasks, resources, scheduledTasks }) => {
  const highCount = tasks.filter(t => t.priority === 'High').length;
  const medCount = tasks.filter(t => t.priority === 'Medium').length;
  const lowCount = tasks.filter(t => t.priority === 'Low').length;

  const scheduledCount = scheduledTasks.filter(t => t.status === 'Scheduled').length;
  const missedCount = scheduledTasks.filter(t => t.status === 'Deadline Missed').length;
  const conflictCount = scheduledTasks.filter(t => t.status === 'Resource Conflict').length;

  // Resource workload calculation
  const resourceWorkload = resources.map(res => {
    const assignedTasks = scheduledTasks.filter(t => t.assignedResource === res.name || t.requiredResource === res.id);
    const totalHours = assignedTasks.reduce((acc, t) => acc + (t.duration || 0), 0);
    return {
      resource: res,
      hours: totalHours,
      count: assignedTasks.length
    };
  });

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-950">Data Analysis & Insights</h2>
        <p className="text-sm text-slate-500">Comprehensive statistical breakdown of task distributions and resource utilization.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Priority Distribution */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-slate-900 flex items-center gap-2">
              <PieChart className="w-4 h-4 text-indigo-600" />
              <span>Task Distribution by Priority</span>
            </h3>
            <span className="text-xs text-slate-500">{tasks.length} Total Tasks</span>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                <span>High Priority</span>
                <span className="tabular-nums">{highCount} ({tasks.length ? Math.round((highCount / tasks.length) * 100) : 0}%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-red-500 h-full rounded-full" style={{ width: `${tasks.length ? (highCount / tasks.length) * 100 : 0}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                <span>Medium Priority</span>
                <span className="tabular-nums">{medCount} ({tasks.length ? Math.round((medCount / tasks.length) * 100) : 0}%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: `${tasks.length ? (medCount / tasks.length) * 100 : 0}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                <span>Low Priority</span>
                <span className="tabular-nums">{lowCount} ({tasks.length ? Math.round((lowCount / tasks.length) * 100) : 0}%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${tasks.length ? (lowCount / tasks.length) * 100 : 0}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Schedule Success Breakdown */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-slate-900 flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-indigo-600" />
              <span>Schedule Status Breakdown</span>
            </h3>
            <span className="text-xs text-slate-500">{scheduledTasks.length} Evaluated</span>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                <span>Successfully Scheduled</span>
                <span className="tabular-nums">{scheduledCount}</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${tasks.length ? (scheduledCount / tasks.length) * 100 : 0}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                <span>Deadline Missed</span>
                <span className="tabular-nums">{missedCount}</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: `${tasks.length ? (missedCount / tasks.length) * 100 : 0}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                <span>Resource Conflict</span>
                <span className="tabular-nums">{conflictCount}</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-red-500 h-full rounded-full" style={{ width: `${tasks.length ? (conflictCount / tasks.length) * 100 : 0}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Resource Workload Distribution */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="font-semibold text-slate-900 flex items-center gap-2">
          <Users className="w-4 h-4 text-indigo-600" />
          <span>Resource Workload Allocation (Total Hours)</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {resourceWorkload.map(({ resource, hours, count }) => (
            <div key={resource.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-xs text-slate-900">{resource.name}</span>
                <span className="text-[10px] font-medium bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded">{resource.type}</span>
              </div>
              <div className="flex items-end justify-between pt-2">
                <div>
                  <p className="text-2xl font-bold text-slate-900 tabular-nums">{hours} <span className="text-xs font-normal text-slate-500">hrs</span></p>
                  <p className="text-[10px] text-slate-500">{count} tasks assigned</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                  {resources.length ? Math.round((hours / 15) * 100) : 0}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
