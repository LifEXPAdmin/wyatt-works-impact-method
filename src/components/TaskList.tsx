"use client";
import { useState, useRef, useEffect } from "react";
import { Task, PhaseId } from "@/types/blueprint";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useBlueprint } from "@/store/useBlueprint";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  MoreVertical, 
  ChevronUp, 
  ChevronDown, 
  Copy, 
  Trash2
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskListProps {
  tasks: Task[];
  phaseId?: PhaseId;
  parentTaskId?: string;
  level?: number;
}

export default function TaskList({ tasks, phaseId, parentTaskId, level = 0 }: TaskListProps) {
  const { 
    toggleTask, 
    updateNotes, 
    addTask, 
    addSubtask, 
    duplicateTask, 
    deleteTask,
    reorderTasks,
    save 
  } = useBlueprint();
  
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const textareaRefs = useRef<{ [key: string]: HTMLTextAreaElement | null }>({});

  // Auto-resize textareas
  useEffect(() => {
    const resizeTextarea = (textarea: HTMLTextAreaElement) => {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    };

    Object.values(textareaRefs.current).forEach(textarea => {
      if (textarea) resizeTextarea(textarea);
    });
  }, [tasks]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) {
        switch (e.key) {
          case 's':
            e.preventDefault();
            save();
            // Show toast notification
            break;
          case 'Enter':
            e.preventDefault();
            if (editingTaskId) {
              const textarea = textareaRefs.current[editingTaskId];
              if (textarea) {
                const cursorPos = textarea.selectionStart;
                const text = textarea.value;
                const newText = text.slice(0, cursorPos) + '\n' + text.slice(cursorPos);
                updateNotes(editingTaskId, newText);
              }
            }
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [editingTaskId, save, updateNotes]);

  const handleTaskClick = (taskId: string) => {
    toggleTask(taskId);
  };

  const handleNotesChange = (taskId: string, notes: string) => {
    updateNotes(taskId, notes);
  };

  const handleAddTask = () => {
    if (phaseId) {
      addTask(phaseId, parentTaskId);
    }
  };

  const handleAddSubtask = (taskId: string) => {
    addSubtask(taskId);
  };

  const handleDuplicateTask = (taskId: string) => {
    duplicateTask(taskId);
  };

  const handleDeleteTask = (taskId: string) => {
    if (confirm("Delete this task? This action cannot be undone.")) {
      deleteTask(taskId);
    }
  };

  const handleMoveTask = (index: number, direction: 'up' | 'down') => {
    if (!phaseId) return;
    
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex >= 0 && newIndex < tasks.length) {
      reorderTasks(phaseId, index, newIndex);
    }
  };


  return (
    <div className="space-y-3">
      {tasks.map((task, index) => (
        <motion.div
          key={task.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "group rounded-xl border transition-all duration-200",
            task.done 
              ? "border-green-500/30 bg-green-500/5" 
              : "border-[var(--border)] bg-[var(--card)] hover:border-[var(--brand)]/50",
            level > 0 && "ml-6 border-l-2 border-l-[var(--brand)]/30"
          )}
        >
          <div className="p-4">
            <div className="flex items-start gap-3">
              {/* Checkbox */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Checkbox
                  checked={task.done}
                  onCheckedChange={() => handleTaskClick(task.id)}
                  className="mt-1"
                />
              </motion.div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                {/* Title */}
                <motion.div
                  className={cn(
                    "font-medium transition-all duration-200",
                    task.done && "line-through text-zinc-500"
                  )}
                  animate={{ 
                    textDecoration: task.done ? "line-through" : "none",
                    opacity: task.done ? 0.7 : 1
                  }}
                >
                  {task.title}
                </motion.div>

                {/* Description */}
                {task.description && (
                  <p className="text-sm text-zinc-400 mt-1">{task.description}</p>
                )}

                {/* Tips */}
                {task.tips?.length && !task.done && (
                  <div className="mt-2 p-2 rounded-lg bg-[var(--brand)]/10 border border-[var(--brand)]/20">
                    <div className="text-xs font-medium text-[var(--brand)] mb-1">
                      💡 Try this:
                    </div>
                    <div className="text-xs text-zinc-300">
                      {task.tips.join(" • ")}
                    </div>
                  </div>
                )}

                {/* Notes Editor */}
                <AnimatePresence>
                  {(!task.done || task.notes) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-3"
                    >
                      <Textarea
                        ref={(el) => { textareaRefs.current[task.id] = el; }}
                        value={task.notes ?? ""}
                        onChange={(e) => handleNotesChange(task.id, e.target.value)}
                        onFocus={() => setEditingTaskId(task.id)}
                        onBlur={() => setEditingTaskId(null)}
                        placeholder="Add notes (supports **bold**, *italic*, - lists)..."
                        className={cn(
                          "min-h-[60px] resize-none transition-all duration-200",
                          task.done && "opacity-50"
                        )}
                        disabled={task.done}
                      />
                      
                      {/* Markdown hints */}
                      {editingTaskId === task.id && (
                        <div className="mt-2 text-xs text-zinc-500">
                          <span className="text-zinc-400">Markdown:</span> **bold** *italic* - list
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Subtasks */}
                {task.children?.length ? (
                  <div className="mt-4">
                    <TaskList 
                      tasks={task.children} 
                      phaseId={phaseId}
                      parentTaskId={task.id}
                      level={level + 1}
                    />
                  </div>
                ) : null}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {/* Reorder buttons */}
                {level === 0 && (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleMoveTask(index, 'up')}
                      disabled={index === 0}
                      className="w-6 h-6 p-0"
                    >
                      <ChevronUp className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleMoveTask(index, 'down')}
                      disabled={index === tasks.length - 1}
                      className="w-6 h-6 p-0"
                    >
                      <ChevronDown className="w-3 h-3" />
                    </Button>
                  </>
                )}

                {/* More menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="w-6 h-6 p-0">
                      <MoreVertical className="w-3 h-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-[var(--card)] border-[var(--border)]">
                    <DropdownMenuItem onClick={() => handleAddSubtask(task.id)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Subtask
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleAddTask}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Task Below
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleDuplicateTask(task.id)}>
                      <Copy className="w-4 h-4 mr-2" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => handleDeleteTask(task.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Add Task Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <Button
          onClick={handleAddTask}
          variant="outline"
          className="w-full border-dashed border-[var(--border)] hover:border-[var(--brand)] hover:bg-[var(--brand)]/5"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Task
        </Button>
      </motion.div>
    </div>
  );
}
