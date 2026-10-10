import React, { useState, useEffect } from 'react';
import { Task, Resource, ScheduledTask, SimulationStep } from './types';
import { initialTasks, initialResources } from './data/initialData';
import { runGreedyEDFScheduling } from './utils/algorithm';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { TasksView } from './components/TasksView';
import { ResourcesView } from './components/ResourcesView';
import { ScheduleView } from './components/ScheduleView';
import { GanttView } from './components/GanttView';
import { AlgorithmView } from './components/AlgorithmView';
import { AnalyticsView } from './components/AnalyticsView';
import { ComparisonView } from './components/ComparisonView';
import { AboutView } from './components/AboutView';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('smarttask_tasks');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return initialTasks;
  });

  const [resources, setResources] = useState<Resource[]>(() => {
    const saved = localStorage.getItem('smarttask_resources');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return initialResources;
  });

  const [scheduledResult, setScheduledResult] = useState<{
    scheduledTasks: ScheduledTask[];
    simulationSteps: SimulationStep[];
  }>(() => {
    return runGreedyEDFScheduling(tasks, resources);
  });

  // Save to localStorage when tasks or resources change
  useEffect(() => {
    localStorage.setItem('smarttask_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('smarttask_resources', JSON.stringify(resources));
  }, [resources]);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Recalculate schedule whenever tasks or resources update
  const handleRunScheduling = () => {
    const res = runGreedyEDFScheduling(tasks, resources);
    setScheduledResult(res);
    setActiveTab('schedule');
    setToastMessage(`Successfully optimized schedule using Greedy EDF heuristic! ${res.scheduledTasks.filter(t => t.status === 'Scheduled').length} tasks scheduled.`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Auto-run scheduling on mount or task/resource change
  useEffect(() => {
    const res = runGreedyEDFScheduling(tasks, resources);
    setScheduledResult(res);
  }, [tasks, resources]);

  // Task CRUD
  const handleAddTask = (newTask: Task) => {
    setTasks(prev => [...prev, newTask]);
  };

  const handleUpdateTask = (updated: Task) => {
    setTasks(prev => prev.map(t => t.id === updated.id ? updated : t));
  };

  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const handleClearAllTasks = () => {
    if (window.confirm('Are you sure you want to clear all tasks?')) {
      setTasks([]);
    }
  };

  const handleLoadSample = () => {
    setTasks(initialTasks);
    setResources(initialResources);
  };

  // Resource CRUD
  const handleAddResource = (newRes: Resource) => {
    setResources(prev => [...prev, newRes]);
  };

  const handleUpdateResource = (updated: Resource) => {
    setResources(prev => prev.map(r => r.id === updated.id ? updated : r));
  };

  const handleDeleteResource = (id: string) => {
    setResources(prev => prev.filter(r => r.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans antialiased selection:bg-indigo-600 selection:text-white">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onRunScheduling={handleRunScheduling}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {toastMessage && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm font-semibold flex items-center justify-between shadow-xs animate-fade-in">
            <span>{toastMessage}</span>
          </div>
        )}
        {activeTab === 'dashboard' && (
          <Dashboard
            tasks={tasks}
            resources={resources}
            scheduledTasks={scheduledResult.scheduledTasks}
            onRunScheduling={handleRunScheduling}
            setActiveTab={setActiveTab}
          />
        )}
        {activeTab === 'tasks' && (
          <TasksView
            tasks={tasks}
            resources={resources}
            onAddTask={handleAddTask}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
            onClearAll={handleClearAllTasks}
            onLoadSample={handleLoadSample}
            onRunScheduling={handleRunScheduling}
          />
        )}
        {activeTab === 'resources' && (
          <ResourcesView
            resources={resources}
            onAddResource={handleAddResource}
            onUpdateResource={handleUpdateResource}
            onDeleteResource={handleDeleteResource}
          />
        )}
        {activeTab === 'schedule' && (
          <ScheduleView
            scheduledTasks={scheduledResult.scheduledTasks}
            onRunScheduling={handleRunScheduling}
          />
        )}
        {activeTab === 'gantt' && (
          <GanttView
            resources={resources}
            scheduledTasks={scheduledResult.scheduledTasks}
          />
        )}
        {activeTab === 'algorithm' && (
          <AlgorithmView
            simulationSteps={scheduledResult.simulationSteps}
          />
        )}
        {activeTab === 'analytics' && (
          <AnalyticsView
            tasks={tasks}
            resources={resources}
            scheduledTasks={scheduledResult.scheduledTasks}
          />
        )}
        {activeTab === 'comparison' && (
          <ComparisonView
            tasks={tasks}
            resources={resources}
          />
        )}
        {activeTab === 'about' && (
          <AboutView />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <p>SmartTask – Task Scheduling & Resource Allocation System · DAA Academic Project using Greedy Algorithm (EDF)</p>
      </footer>
    </div>
  );
}
