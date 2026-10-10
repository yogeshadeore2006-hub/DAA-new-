import React from 'react';
import { BookOpen, Shield, Award, CheckCircle, Cpu } from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="space-y-8 pb-12 max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-950">About the Project & DAA Theory</h2>
        <p className="text-sm text-slate-500">Design and Analysis of Algorithms (DAA) Academic Project Documentation.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-8 space-y-8">
        {/* Problem Statement */}
        <section className="space-y-3">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Shield className="w-5 h-5 text-indigo-600" />
            <span>Problem Statement</span>
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200/60 font-medium">
            “Efficiently schedule multiple tasks while allocating limited resources using a Greedy Algorithm.”
          </p>
          <p className="text-xs text-slate-600 leading-relaxed">
            In modern software engineering, cloud architecture, and manufacturing pipelines, multiple competing jobs request limited hardware and personnel resources. Without rigorous scheduling heuristics, system bottlenecks occur, deadlines are breached, and resource utilization drops.
          </p>
        </section>

        {/* Objective */}
        <section className="space-y-3">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-600" />
            <span>Project Objective</span>
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 font-medium">
            “To minimize scheduling conflicts, improve resource utilization, and complete as many tasks as possible before their deadlines.”
          </p>
        </section>

        {/* Algorithm Used */}
        <section className="space-y-3">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-indigo-600" />
            <span>Greedy Algorithm – Earliest Deadline First (EDF)</span>
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            The Earliest Deadline First (EDF) algorithm is a greedy scheduling heuristic that selects the task with the earliest absolute deadline at each decision step.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <h4 className="font-semibold text-xs text-slate-900">Advantages</h4>
              <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                <li>Mathematically optimal for single-processor lateness minimization.</li>
                <li>Simple and deterministic execution.</li>
                <li>Prioritizes urgent time-sensitive operations.</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <h4 className="font-semibold text-xs text-slate-900">Real-World Applications</h4>
              <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                <li>Real-time operating system task schedulers.</li>
                <li>Cloud server load balancing.</li>
                <li>Automated manufacturing assembly lines.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Complexity Analysis */}
        <section className="space-y-3 pt-4 border-t border-slate-100">
          <h3 className="text-lg font-bold text-slate-900">Algorithm Complexity Analysis</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-indigo-100 bg-indigo-50/30">
              <span className="text-xs font-semibold text-indigo-700 uppercase tracking-wider">Time Complexity</span>
              <p className="text-2xl font-bold font-mono text-slate-900 mt-1">O(n log n)</p>
              <p className="text-xs text-slate-600 mt-1">Dominating cost comes from sorting the task array by deadline.</p>
            </div>
            <div className="p-4 rounded-xl border border-emerald-100 bg-emerald-50/30">
              <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">Space Complexity</span>
              <p className="text-2xl font-bold font-mono text-slate-900 mt-1">O(n)</p>
              <p className="text-xs text-slate-600 mt-1">Storage required for task records and resource tracking tables.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
