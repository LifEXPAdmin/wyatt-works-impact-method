import { create } from "zustand";
import { Project, PhaseId, Task, Subtask, SaveStatus } from "@/types/blueprint";
import { sampleBlueprint } from "@/lib/sample-data";
import { arrayMove } from "@dnd-kit/sortable";

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
  addTask: (phaseId: PhaseId, title?: string) => void;
  addSubtask: (taskId: string, title?: string) => void;
  renameTask: (taskId: string, title: string) => void;
  renameSubtask: (subtaskId: string, title: string) => void;
  toggleTask: (taskId: string) => void;
  toggleSubtask: (subtaskId: string) => void;
  updateNotes: (taskId: string, notes: string) => void;
  deleteTask: (taskId: string) => void;
  deleteSubtask: (subtaskId: string) => void;
  
  // Drag and drop
  reorderTasks: (phaseId: PhaseId, activeId: string, overId: string) => void;
  reorderSubtasks: (taskId: string, activeId: string, overId: string) => void;
  
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
      if (raw) {
        const data = JSON.parse(raw);
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
    if (projects.length === 0) {
      get().createProject("My Blueprint");
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

    set(state => ({
      projects: [...state.projects, newProject],
      activeProjectId: id,
    }));
    
    get().save();
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
    const duplicatedProject: Project = structuredClone(original);
    
    duplicatedProject.id = newId;
    duplicatedProject.name = `${original.name} (Copy)`;
    duplicatedProject.createdAt = now;
    duplicatedProject.updatedAt = now;
    duplicatedProject.blueprint.id = newId;
    duplicatedProject.blueprint.name = `${original.name} (Copy)`;
    duplicatedProject.blueprint.updatedAt = now;

    set(state => ({
      projects: [...state.projects, duplicatedProject],
      activeProjectId: newId,
    }));
    get().save();
    return newId;
  },

  setActiveProject: (id: string) => {
    set({ activeProjectId: id });
    get().save();
  },

  addTask: (phaseId: PhaseId, title = "New Task") => {
    set(state => ({
      projects: state.projects.map(p => {
        if (p.id !== state.activeProjectId) return p;

        const newTask: Task = {
          id: generateId(),
          title,
          done: false,
          description: "",
          notes: "",
        };

        const updatedPhases = p.blueprint.phases.map(phase => {
          if (phase.id !== phaseId) return phase;
          return { ...phase, tasks: [...phase.tasks, newTask] };
        });

        return { 
          ...p, 
          updatedAt: Date.now(),
          blueprint: { ...p.blueprint, phases: updatedPhases } 
        };
      }),
    }));
    get().save();
  },

  addSubtask: (taskId: string, title = "New Subtask") => {
    set(state => ({
      projects: state.projects.map(p => {
        if (p.id !== state.activeProjectId) return p;

        const newSubtask: Subtask = {
          id: generateId(),
          title,
          done: false,
        };

        const addSubtaskRecursive = (tasks: Task[]): Task[] => {
          return tasks.map(task => {
            if (task.id === taskId) {
              return {
                ...task,
                children: [...(task.children || []), newSubtask],
              };
            }
            if (task.children) {
              return {
                ...task,
                children: addSubtaskRecursive(task.children),
              };
            }
            return task;
          });
        };

        const updatedPhases = p.blueprint.phases.map(phase => ({
          ...phase,
          tasks: addSubtaskRecursive(phase.tasks),
        }));

        return { 
          ...p, 
          updatedAt: Date.now(),
          blueprint: { ...p.blueprint, phases: updatedPhases } 
        };
      }),
    }));
    get().save();
  },

  renameTask: (taskId: string, title: string) => {
    set(state => ({
      projects: state.projects.map(p => {
        if (p.id !== state.activeProjectId) return p;

        const renameTaskRecursive = (tasks: Task[]): Task[] => {
          return tasks.map(task => {
            if (task.id === taskId) {
              return { ...task, title };
            }
            if (task.children) {
              return {
                ...task,
                children: renameTaskRecursive(task.children),
              };
            }
            return task;
          });
        };

        const updatedPhases = p.blueprint.phases.map(phase => ({
          ...phase,
          tasks: renameTaskRecursive(phase.tasks),
        }));

        return { 
          ...p, 
          updatedAt: Date.now(),
          blueprint: { ...p.blueprint, phases: updatedPhases } 
        };
      }),
    }));
    get().save();
  },

  renameSubtask: (subtaskId: string, title: string) => {
    set(state => ({
      projects: state.projects.map(p => {
        if (p.id !== state.activeProjectId) return p;

        const renameSubtaskRecursive = (tasks: Task[]): Task[] => {
          return tasks.map(task => {
            if (task.children) {
              return {
                ...task,
                children: task.children.map(subtask => 
                  subtask.id === subtaskId ? { ...subtask, title } : subtask
                ),
              };
            }
            return task;
          });
        };

        const updatedPhases = p.blueprint.phases.map(phase => ({
          ...phase,
          tasks: renameSubtaskRecursive(phase.tasks),
        }));

        return { 
          ...p, 
          updatedAt: Date.now(),
          blueprint: { ...p.blueprint, phases: updatedPhases } 
        };
      }),
    }));
    get().save();
  },

  toggleTask: (taskId: string) => {
    set(state => ({
      projects: state.projects.map(p => {
        if (p.id !== state.activeProjectId) return p;

        const toggleTaskRecursive = (tasks: Task[]): Task[] => {
          return tasks.map(task => {
            if (task.id === taskId) {
              return { ...task, done: !task.done };
            }
            if (task.children) {
              return {
                ...task,
                children: toggleTaskRecursive(task.children),
              };
            }
            return task;
          });
        };

        const updatedPhases = p.blueprint.phases.map(phase => ({
          ...phase,
          tasks: toggleTaskRecursive(phase.tasks),
        }));

        return { 
          ...p, 
          updatedAt: Date.now(),
          blueprint: { ...p.blueprint, phases: updatedPhases } 
        };
      }),
    }));
    get().save();
  },

  toggleSubtask: (subtaskId: string) => {
    set(state => ({
      projects: state.projects.map(p => {
        if (p.id !== state.activeProjectId) return p;

        const toggleSubtaskRecursive = (tasks: Task[]): Task[] => {
          return tasks.map(task => {
            if (task.children) {
              return {
                ...task,
                children: task.children.map(subtask => 
                  subtask.id === subtaskId ? { ...subtask, done: !subtask.done } : subtask
                ),
              };
            }
            return task;
          });
        };

        const updatedPhases = p.blueprint.phases.map(phase => ({
          ...phase,
          tasks: toggleSubtaskRecursive(phase.tasks),
        }));

        return { 
          ...p, 
          updatedAt: Date.now(),
          blueprint: { ...p.blueprint, phases: updatedPhases } 
        };
      }),
    }));
    get().save();
  },

  updateNotes: (taskId: string, notes: string) => {
    set(state => ({
      projects: state.projects.map(p => {
        if (p.id !== state.activeProjectId) return p;

        const updateNotesRecursive = (tasks: Task[]): Task[] => {
          return tasks.map(task => {
            if (task.id === taskId) {
              return { ...task, notes };
            }
            if (task.children) {
              return {
                ...task,
                children: updateNotesRecursive(task.children),
              };
            }
            return task;
          });
        };

        const updatedPhases = p.blueprint.phases.map(phase => ({
          ...phase,
          tasks: updateNotesRecursive(phase.tasks),
        }));

        return { 
          ...p, 
          updatedAt: Date.now(),
          blueprint: { ...p.blueprint, phases: updatedPhases } 
        };
      }),
    }));
    get().save();
  },

  deleteTask: (taskId: string) => {
    set(state => ({
      projects: state.projects.map(p => {
        if (p.id !== state.activeProjectId) return p;

        const deleteTaskRecursive = (tasks: Task[]): Task[] => {
          return tasks.filter(task => task.id !== taskId).map(task => {
            if (task.children) {
              return {
                ...task,
                children: deleteTaskRecursive(task.children),
              };
            }
            return task;
          });
        };

        const updatedPhases = p.blueprint.phases.map(phase => ({
          ...phase,
          tasks: deleteTaskRecursive(phase.tasks),
        }));

        return { 
          ...p, 
          updatedAt: Date.now(),
          blueprint: { ...p.blueprint, phases: updatedPhases } 
        };
      }),
    }));
    get().save();
  },

  deleteSubtask: (subtaskId: string) => {
    set(state => ({
      projects: state.projects.map(p => {
        if (p.id !== state.activeProjectId) return p;

        const deleteSubtaskRecursive = (tasks: Task[]): Task[] => {
          return tasks.map(task => {
            if (task.children) {
              return {
                ...task,
                children: task.children.filter(subtask => subtask.id !== subtaskId),
              };
            }
            return task;
          });
        };

        const updatedPhases = p.blueprint.phases.map(phase => ({
          ...phase,
          tasks: deleteSubtaskRecursive(phase.tasks),
        }));

        return { 
          ...p, 
          updatedAt: Date.now(),
          blueprint: { ...p.blueprint, phases: updatedPhases } 
        };
      }),
    }));
    get().save();
  },

  reorderTasks: (phaseId: PhaseId, activeId: string, overId: string) => {
    set(state => ({
      projects: state.projects.map(p => {
        if (p.id !== state.activeProjectId) return p;

        const updatedPhases = p.blueprint.phases.map(phase => {
          if (phase.id !== phaseId) return phase;

          const oldIndex = phase.tasks.findIndex(task => task.id === activeId);
          const newIndex = phase.tasks.findIndex(task => task.id === overId);
          
          if (oldIndex === -1 || newIndex === -1) return phase;

          const newTasks = arrayMove(phase.tasks, oldIndex, newIndex);
          return { ...phase, tasks: newTasks };
        });

        return { 
          ...p, 
          updatedAt: Date.now(),
          blueprint: { ...p.blueprint, phases: updatedPhases } 
        };
      }),
    }));
    get().save();
  },

  reorderSubtasks: (taskId: string, activeId: string, overId: string) => {
    set(state => ({
      projects: state.projects.map(p => {
        if (p.id !== state.activeProjectId) return p;

        const reorderSubtasksRecursive = (tasks: Task[]): Task[] => {
          return tasks.map(task => {
            if (task.id === taskId && task.children) {
              const oldIndex = task.children.findIndex(subtask => subtask.id === activeId);
              const newIndex = task.children.findIndex(subtask => subtask.id === overId);
              
              if (oldIndex === -1 || newIndex === -1) return task;

              const newChildren = arrayMove(task.children, oldIndex, newIndex);
              return { ...task, children: newChildren };
            }
            return task;
          });
        };

        const updatedPhases = p.blueprint.phases.map(phase => ({
          ...phase,
          tasks: reorderSubtasksRecursive(phase.tasks),
        }));

        return { 
          ...p, 
          updatedAt: Date.now(),
          blueprint: { ...p.blueprint, phases: updatedPhases } 
        };
      }),
    }));
    get().save();
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

    let totalTasks = 0;
    let completedTasks = 0;

    activeProject.blueprint.phases.forEach(phase => {
      let phaseTotalTasks = 0;
      let phaseCompletedTasks = 0;

      const countTasks = (tasks: Task[]) => {
        tasks.forEach(task => {
          phaseTotalTasks++;
          totalTasks++;
          if (task.done) {
            phaseCompletedTasks++;
            completedTasks++;
          }
          if (task.children) {
            countTasks(task.children);
          }
        });
      };

      countTasks(phase.tasks);
      result.byPhase[phase.id] = phaseTotalTasks > 0 ? Math.round((phaseCompletedTasks / phaseTotalTasks) * 100) : 0;
    });

    result.overall = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    return result;
  },

  getPhase: (phaseId: PhaseId) => {
    const activeProject = get().activeProject();
    if (!activeProject) return null;

    const phase = activeProject.blueprint.phases.find(p => p.id === phaseId);
    if (!phase) return null;

    let totalTasks = 0;
    let tasksCompleted = 0;
    let notesCount = 0;

    const countMetrics = (tasks: Task[]) => {
      tasks.forEach(task => {
        totalTasks++;
        if (task.done) {
          tasksCompleted++;
        }
        if (task.notes && task.notes.trim() !== "") {
          notesCount++;
        }
        if (task.children) {
          countMetrics(task.children);
        }
      });
    };

    countMetrics(phase.tasks);

    const progress = totalTasks > 0 ? Math.round((tasksCompleted / totalTasks) * 100) : 0;

    return {
      phase: { ...phase, tasks: phase.tasks },
      progress,
      tasksCompleted,
      totalTasks,
      notesCount,
    };
  },
}));