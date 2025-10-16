import { create } from "zustand";
import { Blueprint, PhaseId, Task } from "@/types/blueprint";

type State = {
  blueprint: Blueprint | null;
  load: () => void;
  toggleTask: (taskId: string) => void;
  updateNotes: (taskId: string, notes: string) => void;
  setBlueprint: (bp: Blueprint) => void;
  progress: () => { overall: number; byPhase: Record<PhaseId, number> };
};

const KEY = "wwm-blueprint-v1";

export const useBlueprint = create<State>((set, get) => ({
  blueprint: null,
  load: () => {
    const raw = typeof window !== "undefined" ? localStorage.getItem(KEY) : null;
    if (raw) {
      try {
        set({ blueprint: JSON.parse(raw) });
      } catch (error) {
        console.error("Failed to load blueprint from localStorage:", error);
      }
    }
  },
  setBlueprint: (bp) => {
    set({ blueprint: bp });
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(KEY, JSON.stringify(bp));
      } catch (error) {
        console.error("Failed to save blueprint to localStorage:", error);
      }
    }
  },
  toggleTask: (taskId) => {
    const bp = structuredClone(get().blueprint);
    if (!bp) return;
    
    for (const phase of bp.phases) {
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
    bp.updatedAt = Date.now();
    get().setBlueprint(bp);
  },
  updateNotes: (taskId, notes) => {
    const bp = structuredClone(get().blueprint);
    if (!bp) return;
    
    for (const phase of bp.phases) {
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
    bp.updatedAt = Date.now();
    get().setBlueprint(bp);
  },
  progress: () => {
    const bp = get().blueprint;
    const result = { 
      overall: 0, 
      byPhase: { spark: 0, forge: 0, flow: 0, impact: 0 } as Record<PhaseId, number> 
    };
    
    if (!bp) return result;
    
    let total = 0, done = 0;
    
    for (const phase of bp.phases) {
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
  }
}));
