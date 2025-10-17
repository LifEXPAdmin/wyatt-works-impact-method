export type PhaseId = 'spark' | 'forge' | 'flow' | 'impact';

export type Subtask = {
  id: string;
  title: string;
  done: boolean;
  notes?: string;
  tips?: string[];        // quick hints
};

export type Task = {
  id: string;
  title: string;
  description?: string;   // one-line summary
  done: boolean;
  notes?: string;         // user notes
  tips?: string[];        // guidance bullets
  resources?: { label: string; url: string }[];
  children?: Subtask[];   // nested bullets
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
  id: string;
  name: string;
  blueprint: Blueprint;
  createdAt: number;
  updatedAt: number;
};

export type SaveStatus = 'saved' | 'saving' | 'error' | 'syncing';