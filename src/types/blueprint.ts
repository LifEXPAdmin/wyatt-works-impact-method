export type PhaseId = 'spark' | 'forge' | 'flow' | 'impact';

export type Task = {
  id: string;
  title: string;
  description?: string;
  done: boolean;
  notes?: string;
  tips?: string[];
  children?: Task[];
};

export type Phase = {
  id: PhaseId;
  title: string;
  summary: string;
  tasks: Task[];
};

export type Blueprint = {
  id: string;
  name: string;
  phases: Phase[];
  updatedAt: number;
  version: number;
};

export type Project = {
  id: string;           // uuid
  name: string;         // editable by user
  blueprint: Blueprint; // core data
  createdAt: number;
  updatedAt: number;
};

export type SaveStatus = 'saved' | 'saving' | 'error' | 'syncing';
