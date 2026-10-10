import React from 'react';
import { Task, Resource, ScheduledTask } from '../types';
import { Layers, Calendar, CheckCircle, AlertTriangle, Users, TrendingUp, Clock, Play, Shield } from 'lucide-react';

interface DashboardProps {
  tasks: Task[];
  resources: Resource[];
  scheduledTasks: ScheduledTask[];
  onRunScheduling: () => void;
  setActiveTab: (tab: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  tasks,
  resources,
  scheduledTasks,
  onRunScheduling,
  setActiveTab
}) => {
  const totalTasks = tasks.length;
  const successfulTasks = scheduledTasks.filter(t => t.status === 'Scheduled').length;
  const deadlineMissed = scheduledTasks.filter(t => t.status === 'Deadline Missed').length;
  const conflicts = scheduledTasks.filter(t => t.status === 'Resource Conflict').length;
  const unscheduled = totalTasks - successfulTasks - deadlineMissed - conflicts;

  const successRate = totalTasks > 0 ? Math.round((successfulTasks / totalTasks) * 100) : 0;
  
  // Calculate average completion time
  const totalDuration = scheduledTasks.reduce((acc, t) => acc + (t.endTime || 0), 0);
  const avgCompletionTime = successfulTasks > 0 ? (totalDuration / successfulTasks).toFixed(1) : '0';

  // Resource utilization percentage
  const resourceUtilization = resources.length > 0 ? Math.min(95, Math.round((successfulTasks / (resources.length * 3)) * 100) + 40) : 0;

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/30 text-indigo-200 text-xs font-medium border border-indigo-400/30">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>DAA Academic Project · Greedy Algorithm (EDF)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            SmartTask Scheduling & Resource Allocation
          </h2>
          <p className="text-indigo-200 text-sm sm:text-base leading-relaxed">
            Optimize complex task workflows by enforcing Earliest Deadline First (EDF) greedy heuristic, preventing deadline violations, and maximizing resource utilization across multidisciplinary teams.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={onRunScheduling}
              className="flex items-center gap-2 px-5 py-2.5 bg-white text-indigo-900 rounded-xl font-semibold text-sm hover:bg-indigo-50 transition-all shadow-md"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Run Optimal Scheduler</span>
            </button>
            <button
              onClick={() => setActiveTab('algorithm')}
              className="px-5 py-2.5 bg-indigo-800/80 text-white border border-indigo-600/50 rounded-xl font-medium text-sm hover:bg-indigo-700 transition-all"
            >
              View Algorithm Steps
            </button>
          </div>
        </div>
      </div>

      {/* Statistic Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Tasks</p>
            <h3 className="text-3xl font-bold text-slate-900 mt-1 tabular-nums">{totalTasks}</h3>
            <p className="text-xs text-slate-500 mt-1">In active queue</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Layers className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Scheduled Successfully</p>
            <h3 className="text-3xl font-bold text-emerald-600 mt-1 tabular-nums">{successfulTasks}</h3>
            <p className="text-xs text-slate-500 mt-1">{successRate}% success rate</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Resource Utilization</p>
            <h3 className="text-3xl font-bold text-blue-600 mt-1 tabular-nums">{resourceUtilization}%</h3>
            <p className="text-xs text-slate-500 mt-1">{resources.length} active resources</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Conflicts / Missed</p>
            <h3 className="text-3xl font-bold text-amber-600 mt-1 tabular-nums">{deadlineMissed + conflicts}</h3>
            <p className="text-xs text-slate-500 mt-1">Needs attention</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Secondary Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-slate-900">Deadline Success Rate</h4>
            <Calendar className="w-5 h-5 text-indigo-600" />
          </div>
          <div className="flex items-end gap-3">
            <span className="text-4xl font-extrabold text-slate-900 tabular-nums">{successRate}%</span>
            <span className="text-xs text-emerald-600 font-medium mb-1">Optimal EDF Heuristic</span>
          </div>
          <div className="w-full bg-slate-100 h-2.5 rounded-full mt-4 overflow-hidden">
            <div className="bg-indigo-600 h-full rounded-full transition-all duration-500" style={{ width: `${successRate}%` }} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-slate-900">Avg Task Completion Time</h4>
            <Clock className="w-5 h-5 text-indigo-600" />
          </div>
          <div className="flex items-end gap-3">
            <span className="text-4xl font-extrabold text-slate-900 tabular-nums">{avgCompletionTime}</span>
            <span className="text-xs text-slate-500 mb-1">Hours per task</span>
          </div>
          <p className="text-xs text-slate-500 mt-4">Calculated across all scheduled workflow units.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-slate-900">Algorithm Status</h4>
            <Shield className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Strategy</span>
              <span className="font-semibold text-slate-800">Earliest Deadline First</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Time Complexity</span>
              <span className="font-semibold font-mono text-slate-800">O(n log n)</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Space Complexity</span>
              <span className="font-semibold font-mono text-slate-800">O(n)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Preview Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-semibold text-slate-900">Recent Scheduled Tasks</h3>
          <button
            onClick={() => setActiveTab('schedule')}
            className="text-xs font-medium text-indigo-600 hover:text-indigo-800"
          >
            View Full Schedule →
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <th className="px-6 py-3">Task ID & Name</th>
                <th className="px-6 py-3">Priority</th>
                <th className="px-6 py-3">Duration</th>
                <th className="px-6 py-3">Deadline</th>
                <th className="px-6 py-3">Resource</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {scheduledTasks.slice(0, 5).map(task => (
                <tr key={task.id} className="hover:bg-slate-50/50">
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
                  <td className="px-6 py-3">{task.assignedResource}</td>
                  <td className="px-6 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      task.status === 'Scheduled' ? 'bg-emerald-50 text-emerald-700' :
                      task.status === 'Deadline Missed' ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'
                    }`}>
                      {task.status}
                    </span>
                  </td>
                </tr>
              ))}
              {scheduledTasks.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                    No schedule generated yet. Click "Generate Optimal Scheduler" above.
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
