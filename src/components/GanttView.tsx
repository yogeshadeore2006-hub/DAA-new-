import React from 'react';
import { Resource, ScheduledTask } from '../types';
import { Cpu, Calendar } from 'lucide-react';

interface GanttViewProps {
  resources: Resource[];
  scheduledTasks: ScheduledTask[];
}

export const GanttView: React.FC<GanttViewProps> = ({ resources, scheduledTasks }) => {
  // Group scheduled tasks by resource
  const resourceTimelines = resources.map(res => {
    const tasksForRes = scheduledTasks.filter(
      t => (t.assignedResource === res.name || t.requiredResource === res.id) && (t.status === 'Scheduled' || t.status === 'Deadline Missed')
    ).sort((a, b) => a.startTime - b.startTime);
    return {
      resource: res,
      tasks: tasksForRes
    };
  });

  // Calculate max timeline length
  const maxTime = Math.max(
    20,
    ...scheduledTasks.map(t => t.endTime || 0)
  );

  const timeUnits = Array.from({ length: maxTime + 1 }, (_, i) => i);

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">Resource Timeline & Gantt Chart</h2>
          <p className="text-sm text-slate-500">Visual allocation of tasks across available hardware and personnel.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 overflow-x-auto">
        {/* Time axis header */}
        <div className="min-w-[700px]">
          <div className="flex items-center border-b border-slate-200 pb-3 mb-4">
            <div className="w-48 shrink-0 font-semibold text-xs text-slate-600">Resource / Unit</div>
            <div className="flex-1 grid grid-flow-col auto-cols-fr text-center text-[10px] text-slate-400 font-mono">
              {timeUnits.map(u => (
                <div key={u} className="border-l border-slate-100 py-1">{u}h</div>
              ))}
            </div>
          </div>

          {/* Resource rows */}
          <div className="space-y-6">
            {resourceTimelines.map(({ resource, tasks }) => (
              <div key={resource.id} className="flex items-center gap-4">
                <div className="w-48 shrink-0">
                  <div className="font-semibold text-xs text-slate-900 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{resource.name}</span>
                  </div>
                  <p className="text-[10px] text-slate-500">{resource.type} · Cap: {resource.capacity}</p>
                </div>

                <div className="flex-1 relative h-12 bg-slate-50 rounded-xl border border-slate-200 overflow-hidden flex items-center">
                  {/* Grid lines background */}
                  <div className="absolute inset-0 grid grid-flow-col auto-cols-fr pointer-events-none">
                    {timeUnits.map(u => (
                      <div key={u} className="border-l border-slate-200/60 h-full" />
                    ))}
                  </div>

                  {/* Task blocks */}
                  {tasks.map(task => {
                    const leftPercent = (task.startTime / maxTime) * 100;
                    const widthPercent = (task.duration / maxTime) * 100;
                    const isLate = task.status === 'Deadline Missed';

                    return (
                      <div
                        key={task.id}
                        style={{
                          left: `${leftPercent}%`,
                          width: `${Math.max(widthPercent, 6)}%`
                        }}
                        className={`absolute h-9 rounded-lg px-2 flex flex-col justify-center text-white shadow-xs transition-all hover:scale-[1.02] ${
                          isLate ? 'bg-amber-600' : 'bg-indigo-600'
                        }`}
                        title={`${task.id}: ${task.name} (${task.startTime}h - ${task.endTime}h)`}
                      >
                        <div className="flex items-center justify-between text-[10px] font-bold">
                          <span className="truncate">{task.id}</span>
                          <span className="opacity-80">{task.duration}h</span>
                        </div>
                        <div className="text-[9px] truncate opacity-90">{task.name}</div>
                      </div>
                    );
                  })}

                  {tasks.length === 0 && (
                    <div className="w-full text-center text-xs text-slate-400 italic">
                      No tasks assigned to this resource
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-6 mt-8 pt-4 border-t border-slate-100 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <div className="w-3.5 h-3.5 rounded bg-indigo-600" />
            <span>Scheduled Task (EDF)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3.5 h-3.5 rounded bg-amber-600" />
            <span>Deadline Missed Warning</span>
          </div>
        </div>
      </div>
    </div>
  );
};
