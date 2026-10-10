import { Task, Resource } from '../types';

export const initialTasks: Task[] = [
  {
    id: 'T1',
    name: 'Website Design',
    priority: 'High',
    duration: 3,
    deadline: 10,
    requiredResource: 'R2',
    resourceType: 'Designer'
  },
  {
    id: 'T2',
    name: 'Database Setup',
    priority: 'High',
    duration: 2,
    deadline: 7,
    requiredResource: 'R4',
    resourceType: 'Server'
  },
  {
    id: 'T3',
    name: 'Testing',
    priority: 'Medium',
    duration: 2,
    deadline: 12,
    requiredResource: 'R3',
    resourceType: 'Tester'
  },
  {
    id: 'T4',
    name: 'Documentation',
    priority: 'Low',
    duration: 1,
    deadline: 15,
    requiredResource: 'R5',
    resourceType: 'Computer'
  },
  {
    id: 'T5',
    name: 'API Development',
    priority: 'High',
    duration: 4,
    deadline: 11,
    requiredResource: 'R1',
    resourceType: 'Developer'
  }
];

export const initialResources: Resource[] = [
  {
    id: 'R1',
    name: 'Senior Dev Unit',
    type: 'Developer',
    capacity: 2,
    availability: 'Available'
  },
  {
    id: 'R2',
    name: 'UI/UX Studio',
    type: 'Designer',
    capacity: 1,
    availability: 'Available'
  },
  {
    id: 'R3',
    name: 'QA Automation Rig',
    type: 'Tester',
    capacity: 1,
    availability: 'Available'
  },
  {
    id: 'R4',
    name: 'Cloud Server Cluster',
    type: 'Server',
    capacity: 3,
    availability: 'Available'
  },
  {
    id: 'R5',
    name: 'Workstation Terminal',
    type: 'Computer',
    capacity: 2,
    availability: 'Available'
  }
];
