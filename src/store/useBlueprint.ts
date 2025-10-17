import { create } from "zustand";
import { Project, PhaseId, Task, SaveStatus } from "@/types/blueprint";
import { sampleBlueprint } from "@/lib/sample-data";

type State = {
  projects: Project[];
  activeProjectId: string | null;
  saveStatus: SaveStatus;
  load: () => void;
  save: () => void;
  
  // Project CRUD
  createProject: (name?: string) => string;
  renameProject: (id: string, name: string) => void;
  deleteProject: (id: string) => void;
  duplicateProject: (id: string) => string;
  setActiveProject: (id: string) => void;
  
  // Task operations
  toggleTask: (taskId: string) => void;
  updateNotes: (taskId: string, notes: string) => void;
  reorderTasks: (phaseId: PhaseId, fromIndex: number, toIndex: number) => void;
  addTask: (phaseId: PhaseId, parentTaskId?: string) => void;
  addSubtask: (parentTaskId: string) => void;
  duplicateTask: (taskId: string) => void;
  deleteTask: (taskId: string) => void;
  
  // Computed values
  activeProject: () => Project | null;
  progress: () => { overall: number; byPhase: Record<PhaseId, number> };
  getPhase: (phaseId: PhaseId) => { phase: { id: PhaseId; title: string; summary: string; tasks: Task[] }; progress: number; tasksCompleted: number; totalTasks: number; notesCount: number } | null;
};

const KEY = "wwm-projects-v1";

const generateId = () => crypto.randomUUID();

export const useBlueprint = create<State>((set, get) => ({
  projects: [],
  activeProjectId: null,
  saveStatus: 'saved',

  load: () => {
    if (typeof window === "undefined") return;
    
    try {
      const raw = localStorage.getItem(KEY);
      console.log("Raw localStorage data:", raw);
      if (raw) {
        const data = JSON.parse(raw);
        console.log("Parsed data:", data);
        set({ 
          projects: data.projects || [], 
          activeProjectId: data.activeProjectId || null 
        });
      }
    } catch (error) {
      console.error("Failed to load projects from localStorage:", error);
    }
    
    // Seed with default project if none exist
    const { projects } = get();
    console.log("Current projects:", projects);
    if (projects.length === 0) {
      console.log("Creating default project...");
      const projectId = get().createProject("My Blueprint");
      console.log("Created project with ID:", projectId);
    }
  },

  save: () => {
    if (typeof window === "undefined") return;
    
    set({ saveStatus: 'saving' });
    
    try {
      const { projects, activeProjectId } = get();
      localStorage.setItem(KEY, JSON.stringify({ projects, activeProjectId }));
      set({ saveStatus: 'saved' });
    } catch (error) {
      console.error("Failed to save projects to localStorage:", error);
      set({ saveStatus: 'error' });
    }
  },

  createProject: (name = "New Project") => {
    console.log("Creating project:", name);
    const id = generateId();
    const now = Date.now();
    
    const newProject: Project = {
      id,
      name,
      blueprint: {
        ...sampleBlueprint,
        id,
        name,
        updatedAt: now,
      },
      createdAt: now,
      updatedAt: now,
    };

    console.log("New project created:", newProject);

    set(state => ({
      projects: [...state.projects, newProject],
      activeProjectId: id,
    }));
    
    console.log("Project added to state");
    get().save();
    console.log("Project saved");
    return id;
  },

  renameProject: (id: string, name: string) => {
    set(state => ({
      projects: state.projects.map(p => 
        p.id === id ? { ...p, name, updatedAt: Date.now() } : p
      ),
    }));
    get().save();
  },

  deleteProject: (id: string) => {
    set(state => {
      const newProjects = state.projects.filter(p => p.id !== id);
      const newActiveId = state.activeProjectId === id 
        ? (newProjects.length > 0 ? newProjects[0].id : null)
        : state.activeProjectId;
      
      return {
        projects: newProjects,
        activeProjectId: newActiveId,
      };
    });
    get().save();
  },

  duplicateProject: (id: string) => {
    const original = get().projects.find(p => p.id === id);
    if (!original) return "";

    const newId = generateId();
    const now = Date.now();
    
    const duplicated: Project = {
      ...original,
      id: newId,
      name: `${original.name} (Copy)`,
      createdAt: now,
      updatedAt: now,
      blueprint: {
        ...original.blueprint,
        id: newId,
        name: `${original.name} (Copy)`,
        updatedAt: now,
      },
    };

    set(state => ({
      projects: [...state.projects, duplicated],
      activeProjectId: newId,
    }));
    
    get().save();
    return newId;
  },

  setActiveProject: (id: string) => {
    set({ activeProjectId: id });
    get().save();
  },

  toggleTask: (taskId: string) => {
    const activeProject = get().activeProject();
    if (!activeProject) return;

    const blueprint = structuredClone(activeProject.blueprint);
    
    for (const phase of blueprint.phases) {
      const stack: Task[] = [...phase.tasks];
      while (stack.length) {
        const t = stack.pop()!;
        if (t.id === taskId) {
          t.done = !t.done;
        }
        if (t.children) {
          stack.push(...t.children);
        }
      }
    }
    
    blueprint.updatedAt = Date.now();
    
    set(state => ({
      projects: state.projects.map(p => 
        p.id === activeProject.id 
          ? { ...p, blueprint, updatedAt: Date.now() }
          : p
      ),
    }));
    
    get().save();
  },

  updateNotes: (taskId: string, notes: string) => {
    const activeProject = get().activeProject();
    if (!activeProject) return;

    const blueprint = structuredClone(activeProject.blueprint);
    
    for (const phase of blueprint.phases) {
      const stack: Task[] = [...phase.tasks];
      while (stack.length) {
        const t = stack.pop()!;
        if (t.id === taskId) {
          t.notes = notes;
        }
        if (t.children) {
          stack.push(...t.children);
        }
      }
    }
    
    blueprint.updatedAt = Date.now();
    
    set(state => ({
      projects: state.projects.map(p => 
        p.id === activeProject.id 
          ? { ...p, blueprint, updatedAt: Date.now() }
          : p
      ),
    }));
    
    get().save();
  },

  reorderTasks: (phaseId: PhaseId, fromIndex: number, toIndex: number) => {
    const activeProject = get().activeProject();
    if (!activeProject) return;

    const blueprint = structuredClone(activeProject.blueprint);
    const phase = blueprint.phases.find(p => p.id === phaseId);
    if (!phase) return;

    const [movedTask] = phase.tasks.splice(fromIndex, 1);
    phase.tasks.splice(toIndex, 0, movedTask);
    
    blueprint.updatedAt = Date.now();
    
    set(state => ({
      projects: state.projects.map(p => 
        p.id === activeProject.id 
          ? { ...p, blueprint, updatedAt: Date.now() }
          : p
      ),
    }));
    
    get().save();
  },

  addTask: (phaseId: PhaseId, parentTaskId?: string) => {
    const activeProject = get().activeProject();
    if (!activeProject) return;

    const blueprint = structuredClone(activeProject.blueprint);
    const phase = blueprint.phases.find(p => p.id === phaseId);
    if (!phase) return;

    const newTask: Task = {
      id: generateId(),
      title: "New Task",
      done: false,
    };

    if (parentTaskId) {
      const addToParent = (tasks: Task[]): boolean => {
        for (const task of tasks) {
          if (task.id === parentTaskId) {
            if (!task.children) task.children = [];
            task.children.push(newTask);
            return true;
          }
          if (task.children && addToParent(task.children)) {
            return true;
          }
        }
        return false;
      };
      addToParent(phase.tasks);
    } else {
      phase.tasks.push(newTask);
    }
    
    blueprint.updatedAt = Date.now();
    
    set(state => ({
      projects: state.projects.map(p => 
        p.id === activeProject.id 
          ? { ...p, blueprint, updatedAt: Date.now() }
          : p
      ),
    }));
    
    get().save();
  },

  addSubtask: (parentTaskId: string) => {
    const activeProject = get().activeProject();
    if (!activeProject) return;
    
    // Find which phase contains this task
    for (const phase of activeProject.blueprint.phases) {
      const findTask = (tasks: Task[]): Task | null => {
        for (const task of tasks) {
          if (task.id === parentTaskId) return task;
          if (task.children) {
            const found = findTask(task.children);
            if (found) return found;
          }
        }
        return null;
      };
      
      const parentTask = findTask(phase.tasks);
      if (parentTask) {
        get().addTask(phase.id, parentTaskId);
        return;
      }
    }
  },

  duplicateTask: (taskId: string) => {
    // Implementation for duplicating tasks
    console.log("Duplicate task:", taskId);
  },

  deleteTask: (taskId: string) => {
    // Implementation for deleting tasks
    console.log("Delete task:", taskId);
  },

  activeProject: () => {
    const { projects, activeProjectId } = get();
    return projects.find(p => p.id === activeProjectId) || null;
  },

  progress: () => {
    const activeProject = get().activeProject();
    const result = { 
      overall: 0, 
      byPhase: { spark: 0, forge: 0, flow: 0, impact: 0 } as Record<PhaseId, number> 
    };
    
    if (!activeProject) return result;
    
    let total = 0, done = 0;
    
    for (const phase of activeProject.blueprint.phases) {
      let pTotal = 0, pDone = 0;
      const stack: Task[] = [...phase.tasks];
      
      while (stack.length) {
        const t = stack.pop()!;
        pTotal++;
        if (t.done) pDone++;
        if (t.children) {
          stack.push(...t.children);
        }
      }
      
      result.byPhase[phase.id] = pTotal ? Math.round((pDone / pTotal) * 100) : 0;
      total += pTotal;
      done += pDone;
    }
    
    result.overall = total ? Math.round((done / total) * 100) : 0;
    return result;
  },

  getPhase: (phaseId: PhaseId) => {
    const activeProject = get().activeProject();
    if (!activeProject) return null;

    const phase = activeProject.blueprint.phases.find(p => p.id === phaseId);
    if (!phase) return null;

    let totalTasks = 0, tasksCompleted = 0, notesCount = 0;
    
    const countTasks = (tasks: Task[]) => {
      for (const task of tasks) {
        totalTasks++;
        if (task.done) tasksCompleted++;
        if (task.notes && task.notes.trim()) notesCount++;
        if (task.children) countTasks(task.children);
      }
    };
    
    countTasks(phase.tasks);
    
    const progress = totalTasks ? Math.round((tasksCompleted / totalTasks) * 100) : 0;
    
    return {
      phase,
      progress,
      tasksCompleted,
      totalTasks,
      notesCount,
    };
  },
}));
