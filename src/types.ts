export type Priority = 'High' | 'Medium' | 'Low';

export type TaskStatus = 'Scheduled' | 'Unscheduled' | 'Deadline Missed' | 'Resource Conflict';

export interface Task {
  id: string;
  name: string;
  priority: Priority;
  duration: number; // in hours
  deadline: number; // absolute deadline time unit
  requiredResource: string; // resource ID or name
  resourceType: string;
}

export interface Resource {
  id: string;
  name: string;
  type: string;
  capacity: number; // max concurrent tasks or capacity units
  availability: 'Available' | 'Busy' | 'Maintenance';
}

export interface ScheduledTask extends Task {
  startTime: number;
  endTime: number;
  assignedResource: string;
  status: TaskStatus;
  conflictReason?: string;
}

export interface SimulationStep {
  stepNumber: number;
  title: string;
  description: string;
  selectedTask?: Task;
  reason: string;
  currentSchedule: ScheduledTask[];
  activeQueue: Task[];
}

export interface StrategyComparison {
  strategyName: string;
  completionRate: number; // percentage
  deadlineSuccessRate: number; // percentage
  avgWaitingTime: number; // hours
  resourceUtilization: number; // percentage
  isOptimal: boolean;
}
