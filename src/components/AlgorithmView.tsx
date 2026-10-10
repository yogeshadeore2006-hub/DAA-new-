import React, { useState } from 'react';
import { SimulationStep } from '../types';
import { Shield, Play, ChevronRight, CheckCircle, Clock } from 'lucide-react';

interface AlgorithmViewProps {
  simulationSteps: SimulationStep[];
}

export const AlgorithmView: React.FC<AlgorithmViewProps> = ({ simulationSteps }) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const currentStep = simulationSteps[activeStepIndex] || simulationSteps[0];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-950">Greedy Algorithm Visualization</h2>
        <p className="text-sm text-slate-500">Step-by-step execution trace of the Earliest Deadline First (EDF) heuristic.</p>
      </div>

      {/* Complexity Banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-mono font-bold">
              O
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Time Complexity</h3>
              <p className="text-sm font-mono font-bold text-indigo-600">O(n log n)</p>
            </div>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            The algorithm sorts all tasks primarily by deadline in <span className="font-semibold">O(n log n)</span> time. Subsequent greedy allocation runs in linear time <span className="font-semibold">O(n)</span>, making overall execution extremely efficient.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-mono font-bold">
              S
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Space Complexity</h3>
              <p className="text-sm font-mono font-bold text-emerald-600">O(n)</p>
            </div>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Requires linear space <span className="font-semibold">O(n)</span> to store the task queue, resource availability timelines, and generated schedule records in memory.
          </p>
        </div>
      </div>

      {/* Step-by-Step Interactive Visualizer */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-indigo-600" />
            <h3 className="font-semibold text-slate-900">Execution Step {activeStepIndex + 1} of {simulationSteps.length}</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveStepIndex(Math.max(0, activeStepIndex - 1))}
              disabled={activeStepIndex === 0}
              className="px-3 py-1.5 text-xs font-medium bg-slate-100 hover:bg-slate-200 disabled:opacity-40 rounded-lg transition-colors"
            >
              Previous Step
            </button>
            <button
              onClick={() => setActiveStepIndex(Math.min(simulationSteps.length - 1, activeStepIndex + 1))}
              disabled={activeStepIndex === simulationSteps.length - 1}
              className="px-3 py-1.5 text-xs font-medium bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white rounded-lg transition-colors"
            >
              Next Step
            </button>
          </div>
        </div>

        {currentStep && (
          <div className="p-6 space-y-6">
            <div className="bg-indigo-50/60 border border-indigo-100 p-4 rounded-xl">
              <h4 className="font-semibold text-indigo-900 text-sm mb-1">{currentStep.title}</h4>
              <p className="text-xs text-indigo-700 leading-relaxed">{currentStep.description}</p>
              <div className="mt-3 pt-3 border-t border-indigo-200/50 text-xs font-medium text-indigo-900">
                <span className="font-bold">Greedy Heuristic Decision:</span> {currentStep.reason}
              </div>
            </div>

            {/* Selected Task Highlight */}
            {currentStep.selectedTask && (
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-mono font-bold">
                    {currentStep.selectedTask.id}
                  </div>
                  <div>
                    <h5 className="font-semibold text-slate-900">{currentStep.selectedTask.name}</h5>
                    <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5">
                      <span>Priority: <strong className="text-slate-800">{currentStep.selectedTask.priority}</strong></span>
                      <span>·</span>
                      <span>Duration: <strong className="text-slate-800">{currentStep.selectedTask.duration}h</strong></span>
                      <span>·</span>
                      <span>Deadline: <strong className="text-slate-800">Unit {currentStep.selectedTask.deadline}</strong></span>
                    </div>
                  </div>
                </div>
                <div className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold rounded-lg flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Feasible & Selected</span>
                </div>
              </div>
            )}

            {/* Current Schedule State Table */}
            <div>
              <h5 className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-3">Current Schedule State</h5>
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                      <th className="px-4 py-2">Task</th>
                      <th className="px-4 py-2">Resource</th>
                      <th className="px-4 py-2">Start</th>
                      <th className="px-4 py-2">End</th>
                      <th className="px-4 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {currentStep.currentSchedule.map(t => (
                      <tr key={t.id} className="hover:bg-slate-50/50">
                        <td className="px-4 py-2 font-mono font-medium text-indigo-600">{t.id} - {t.name}</td>
                        <td className="px-4 py-2">{t.assignedResource}</td>
                        <td className="px-4 py-2 tabular-nums">{t.startTime}h</td>
                        <td className="px-4 py-2 tabular-nums">{t.endTime}h</td>
                        <td className="px-4 py-2">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                            t.status === 'Scheduled' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                          }`}>
                            {t.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {currentStep.currentSchedule.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-4 py-6 text-center text-slate-400 italic">
                          Initial state: No tasks scheduled yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
