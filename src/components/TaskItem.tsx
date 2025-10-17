"use client";
import { useState, useRef, useEffect } from "react";
import { Task, Subtask } from "@/types/blueprint";
import { useBlueprint } from "@/store/useBlueprint";
import { motion, AnimatePresence } from "framer-motion";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Plus, 
  MoreVertical, 
  GripVertical,
  ChevronDown,
  ChevronRight,
  X,
  Edit2,
  Trash2
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskItemProps {
  task: Task;
  phaseId: string;
}

export default function TaskItem({ task, phaseId }: TaskItemProps) {
  const { 
    toggleTask, 
    updateNotes, 
    addSubtask,
    renameTask,
    deleteTask
  } = useBlueprint();
  
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [isExpanded, setIsExpanded] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [task.notes]);

  // Calculate subtask progress
  const subtaskProgress = task.children ? {
    completed: task.children.filter(subtask => subtask.done).length,
    total: task.children.length,
    percentage: task.children.length > 0 
      ? Math.round((task.children.filter(subtask => subtask.done).length / task.children.length) * 100)
      : 0
  } : { completed: 0, total: 0, percentage: 0 };

  const handleTaskClick = () => {
    toggleTask(task.id);
  };

  const handleNotesChange = (notes: string) => {
    updateNotes(task.id, notes);
  };

  const handleAddSubtask = () => {
    addSubtask(task.id);
  };

  const handleRenameTask = () => {
    if (editTitle.trim()) {
      renameTask(task.id, editTitle.trim());
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleRenameTask();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditTitle(task.title);
    }
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group rounded-2xl border transition-all duration-300",
        task.done 
          ? "border-[var(--brand)] bg-[var(--brand)]/5 shadow-[0_0_24px_rgba(46,168,255,0.25)]" 
          : "border-[var(--border)] bg-[var(--card)] hover:border-[var(--brand)]/50",
        isDragging && "opacity-50"
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="p-6">
        <div className="flex items-start gap-4">
          {/* Drag Handle */}
          <div
            {...attributes}
            {...listeners}
            className="mt-1 cursor-grab hover:cursor-grabbing text-zinc-400 hover:text-zinc-300 transition-colors"
          >
            <GripVertical className="w-4 h-4" />
          </div>

          {/* Checkbox */}
          <div className="mt-1">
            <Checkbox
              checked={task.done}
              onCheckedChange={handleTaskClick}
              className="w-5 h-5"
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Title */}
            <div className="flex items-center gap-2 mb-2">
              {isEditing ? (
                <Input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  onBlur={handleRenameTask}
                  onKeyDown={handleKeyDown}
                  className="text-lg font-semibold bg-transparent border-none p-0 h-auto focus:ring-0"
                  autoFocus
                />
              ) : (
                <h3
                  className={cn(
                    "text-lg font-semibold cursor-pointer hover:text-[var(--brand)] transition-colors",
                    task.done && "line-through text-zinc-500"
                  )}
                  onDoubleClick={() => {
                    setIsEditing(true);
                    setEditTitle(task.title);
                  }}
                >
                  {task.title}
                </h3>
              )}
              
              {/* Subtask Progress Badge */}
              {subtaskProgress.total > 0 && (
                <Badge variant="outline" className="text-xs">
                  {subtaskProgress.completed}/{subtaskProgress.total}
                </Badge>
              )}
            </div>

            {/* Description */}
            {task.description && (
              <p className="text-sm text-zinc-400 mb-3">{task.description}</p>
            )}

            {/* Tips */}
            {task.tips?.length && !task.done && (
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {task.tips.map((tip, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      💡 {tip}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Subtask Progress Bar */}
            {subtaskProgress.total > 0 && (
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                  <span>Subtask Progress</span>
                  <span>{subtaskProgress.percentage}%</span>
                </div>
                <Progress value={subtaskProgress.percentage} className="h-1" />
              </div>
            )}

            {/* Notes Editor */}
            {(!task.done || task.notes) && (
              <div className="mb-4">
                <Textarea
                  ref={textareaRef}
                  value={task.notes ?? ""}
                  onChange={(e) => handleNotesChange(e.target.value)}
                  placeholder="Add notes..."
                  className={cn(
                    "min-h-[80px] resize-none rounded-xl",
                    task.done && "opacity-50"
                  )}
                  disabled={task.done}
                />
              </div>
            )}

            {/* Subtasks */}
            {task.children && task.children.length > 0 && (
              <div className="mt-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="mb-3 text-zinc-400 hover:text-zinc-300"
                >
                  {isExpanded ? <ChevronDown className="w-4 h-4 mr-1" /> : <ChevronRight className="w-4 h-4 mr-1" />}
                  {task.children.length} subtasks
                </Button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-2 ml-4"
                    >
                      {task.children.map((subtask) => (
                        <SubtaskItem
                          key={subtask.id}
                          subtask={subtask}
                          taskId={task.id}
                          phaseId={phaseId}
                        />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Add Subtask Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleAddSubtask}
              className="mt-3 text-zinc-400 hover:text-[var(--brand)]"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add sub-bullet
            </Button>
          </div>

          {/* Actions Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[var(--card)] border-[var(--border)]">
              <DropdownMenuItem onClick={() => setIsEditing(true)}>
                <Edit2 className="w-4 h-4 mr-2" />
                Rename Task
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => deleteTask(task.id)} className="text-red-500">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Task
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.div>
  );
}

// SubtaskItem component
interface SubtaskItemProps {
  subtask: Subtask;
  taskId: string;
  phaseId: string;
}

function SubtaskItem({ subtask }: SubtaskItemProps) {
  const { toggleSubtask, renameSubtask, deleteSubtask } = useBlueprint();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(subtask.title);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: subtask.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleRenameSubtask = () => {
    if (editTitle.trim()) {
      renameSubtask(subtask.id, editTitle.trim());
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleRenameSubtask();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditTitle(subtask.title);
    }
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex items-center gap-3 p-3 rounded-lg border transition-all duration-200",
        subtask.done 
          ? "border-green-500/30 bg-green-500/5" 
          : "border-[var(--border)] bg-[var(--bg)] hover:border-[var(--brand)]/50",
        isDragging && "opacity-50"
      )}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.15 }}
    >
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab hover:cursor-grabbing text-zinc-400 hover:text-zinc-300 transition-colors"
      >
        <GripVertical className="w-3 h-3" />
      </div>

      {/* Checkbox */}
      <Checkbox
        checked={subtask.done}
        onCheckedChange={() => toggleSubtask(subtask.id)}
        className="w-4 h-4"
      />

      {/* Title */}
      <div className="flex-1 min-w-0">
        {isEditing ? (
          <Input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onBlur={handleRenameSubtask}
            onKeyDown={handleKeyDown}
            className="text-sm bg-transparent border-none p-0 h-auto focus:ring-0"
            autoFocus
          />
        ) : (
          <span
            className={cn(
              "text-sm cursor-pointer hover:text-[var(--brand)] transition-colors",
              subtask.done && "line-through text-zinc-500"
            )}
            onDoubleClick={() => {
              setIsEditing(true);
              setEditTitle(subtask.title);
            }}
          >
            {subtask.title}
          </span>
        )}
      </div>

      {/* Tips Popover */}
      {subtask.tips?.length && (
        <div className="flex gap-1">
          {subtask.tips.map((tip, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              💡
            </Badge>
          ))}
        </div>
      )}

      {/* Delete Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => deleteSubtask(subtask.id)}
        className="w-6 h-6 p-0 text-zinc-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <X className="w-3 h-3" />
      </Button>
    </motion.div>
  );
}
