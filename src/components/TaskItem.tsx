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
  const [isExpanded, setIsExpanded] = useState(true); // Always expanded by default for better mobile UX
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [showNotes, setShowNotes] = useState(phaseId === "spark" && task.id === "sp-purpose");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const copyPromptToClipboard = async (prompt: string) => {
    try {
      await navigator.clipboard.writeText(prompt);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy prompt:', err);
    }
  };

  // Get the main AI prompt for this task
  const getMainPrompt = () => {
    const aiPrompt = task.tips?.find(tip => tip.startsWith("AI Prompt:"));
    return aiPrompt ? aiPrompt.replace("AI Prompt: ", "") : "Help me with this task: " + task.title;
  };

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
        "group task-container transition-all duration-300",
        task.done 
          ? "border-[var(--brand)] bg-[var(--brand)]/5 shadow-[0_0_24px_rgba(46,168,255,0.25)]" 
          : "border-[var(--brand)]/30 bg-[var(--card)] hover:border-[var(--brand)]/60 hover:shadow-[0_0_12px_rgba(46,168,255,0.15)]",
        isDragging && "opacity-50"
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="p-2 sm:p-4">
        <div className="flex items-start gap-1 sm:gap-2">
          {/* Drag Handle - Hidden on mobile */}
          <div
            {...attributes}
            {...listeners}
            className="hidden sm:block mt-1 cursor-grab hover:cursor-grabbing text-zinc-400 hover:text-zinc-300 transition-colors"
            data-tour="drag"
          >
            <GripVertical className="w-4 h-4" />
          </div>

          {/* Mobile Checkbox - Compact circle */}
          <div className="mt-1 sm:hidden">
            <button
              onClick={handleTaskClick}
              className={cn(
                "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 touch-target",
                task.done 
                  ? "border-[var(--brand)] bg-[var(--brand)]" 
                  : "border-zinc-400 hover:border-[var(--brand)]"
              )}
            >
              {task.done && (
                <div className="w-2 h-2 bg-white rounded-full" />
              )}
            </button>
          </div>

          {/* Desktop Checkbox */}
          <div className="hidden sm:block mt-1">
            <Checkbox
              checked={task.done}
              onCheckedChange={handleTaskClick}
              className="w-5 h-5"
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Title */}
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-start gap-2 flex-1 min-w-0">
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
                      "text-sm sm:text-base font-semibold cursor-pointer hover:text-[var(--brand)] transition-colors mobile-text-wrap break-words hyphens-auto leading-tight",
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

              {/* Top Right Actions */}
              <div className="flex items-center gap-1 flex-shrink-0">
                {/* AI Prompt Button */}
                {task.tips?.length && !task.done && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPrompt(!showPrompt)}
                    className="w-6 h-6 p-0 text-[var(--brand)] hover:bg-[var(--brand)]/20"
                    data-tour="lightbulb"
                  >
                    💡
                  </Button>
                )}

                {/* Notes Button */}
                {(!task.done || task.notes) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowNotes(!showNotes)}
                    className="w-6 h-6 p-0 text-zinc-400 hover:text-[var(--brand)]"
                    data-tour="notes"
                  >
                    <ChevronRight 
                      className={cn(
                        "w-3 h-3 transition-transform duration-200",
                        showNotes && "rotate-90"
                      )} 
                    />
                  </Button>
                )}
              </div>
            </div>

            {/* Description */}
            {task.description && (
              <p className="text-xs sm:text-sm text-zinc-400 mb-2 break-words whitespace-pre-wrap hyphens-auto leading-relaxed">{task.description}</p>
            )}

            {/* AI Prompt Section - Now shown below when expanded */}
            {showPrompt && task.tips?.length && !task.done && (
              <div className="mb-2">
                <div className="space-y-2">
                  <div className="flex items-start gap-2 p-2 bg-zinc-800/50 rounded border border-zinc-700/50">
                    <span className="text-xs text-zinc-300 break-words whitespace-pre-wrap hyphens-auto leading-relaxed flex-1">
                      {getMainPrompt()}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyPromptToClipboard(getMainPrompt())}
                      className="text-xs h-6 px-2 text-[var(--brand)] hover:bg-[var(--brand)]/20 touch-target flex-shrink-0"
                    >
                      📋 Copy
                    </Button>
                  </div>
                  <p className="text-xs text-zinc-400 italic">
                    ⚠️ Customize with your specific details - don&apos;t just copy-paste!
                  </p>
                </div>
              </div>
            )}

            {/* Subtask Progress Bar */}
            {subtaskProgress.total > 0 && (
              <div className="mb-2">
                <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                  <span>Subtask Progress</span>
                  <span>{subtaskProgress.percentage}%</span>
                </div>
                <Progress value={subtaskProgress.percentage} className="h-1" />
              </div>
            )}

            {/* Notes Section - Now shown below when expanded */}
            {showNotes && (!task.done || task.notes) && (
              <div className="mb-2">
                <Textarea
                  ref={textareaRef}
                  value={task.notes ?? ""}
                  onChange={(e) => handleNotesChange(e.target.value)}
                  placeholder="Add notes..."
                  className={cn(
                    "min-h-[60px] sm:min-h-[80px] resize-none rounded-xl mobile-text-sm",
                    task.done && "opacity-50"
                  )}
                  disabled={task.done}
                />
              </div>
            )}

            {/* Subtasks */}
            {task.children && task.children.length > 0 && (
              <div className="mt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="mb-3 text-zinc-400 hover:text-zinc-300 touch-target"
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
                      className="space-y-1 ml-1 sm:ml-2"
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
              <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity" data-tour="menu">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[var(--card)] border-[var(--border)]">
              <DropdownMenuItem onClick={() => setIsEditing(true)}>
                <Edit2 className="w-4 h-4 mr-2" />
                Rename Task
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowDeleteConfirm(true)} className="text-red-500">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Task
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowDeleteConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold mb-2">Delete Task?</h3>
              <p className="text-zinc-400 mb-4">
                Are you sure you want to delete &quot;{task.title}&quot;? This will also delete all subtasks and notes. This action cannot be undone.
              </p>
              <div className="flex gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteConfirm(false)}
                  className="touch-target"
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    deleteTask(task.id);
                    setShowDeleteConfirm(false);
                  }}
                  className="touch-target"
                >
                  Delete
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
  const { toggleSubtask, renameSubtask, deleteSubtask, updateSubtaskNotes } = useBlueprint();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(subtask.title);
  const [showPrompt, setShowPrompt] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const notesRef = useRef<HTMLTextAreaElement>(null);

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

  // Auto-resize textarea
  useEffect(() => {
    if (notesRef.current) {
      notesRef.current.style.height = 'auto';
      notesRef.current.style.height = `${notesRef.current.scrollHeight}px`;
    }
  }, [subtask.notes]);

  const handleNotesChange = (notes: string) => {
    updateSubtaskNotes(subtask.id, notes);
  };

  const copyPromptToClipboard = async (prompt: string) => {
    try {
      await navigator.clipboard.writeText(prompt);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy prompt:', err);
    }
  };

  // Get suggested prompt for this subtask
  const getSuggestedPrompt = () => {
    const promptMap: Record<string, string> = {
      "AI brainstorm: Get 20 purpose statement options": "I'm building a business that helps [your target audience] with [their main problem]. I need 20 different ways to phrase my one-sentence purpose statement that clearly communicates the transformation I create. \n\nPlease generate options that:\n- Focus on the specific outcome/transformation\n- Are under 14 words\n- Avoid generic buzzwords\n- Use concrete, specific language\n- Include variations like 'I help [who] go from [current state] to [desired state]'\n\nMake each option feel authentic and specific to my unique value proposition.",
      
      "Human selection: Pick your top 5 favorites": "I've generated 20 purpose statement options and need help narrowing down to my top 5. Here are the options: [paste your 20 options]\n\nPlease help me:\n- Identify which ones feel most authentic to my voice\n- Spot any that sound generic or buzzword-heavy\n- Choose ones that clearly communicate my unique value\n- Consider how each would resonate with my target audience\n- Rank them from strongest to weakest\n\nI want to pick the ones that feel most 'me' while being clear about the transformation I provide.",
      
      "AI refinement: Optimize strongest to ≤ 14 words": "I've chosen my strongest purpose statement: '[your chosen statement]'\n\nPlease help me refine it to be:\n- Exactly 14 words or fewer\n- More specific and concrete\n- Clearer about the transformation\n- More memorable and punchy\n- Less generic sounding\n\nGenerate 5 refined versions that maintain the core message but make it more compelling and specific. Focus on replacing vague words with concrete ones.",
      
      "Human testing: Share with 2 people in your audience": "I need to test my purpose statement with real people in my target audience. My statement is: '[your refined statement]'\n\nPlease help me create:\n- 3-5 specific questions to ask them\n- A simple way to test memorability (can they repeat it back?)\n- Methods to gauge emotional response\n- A scoring system to evaluate feedback\n- Follow-up questions based on their responses\n\nFocus on testing with [your specific target audience] to see if it resonates and is clear.",
      
      "AI final polish: Create 3 compelling versions": "Based on feedback from testing, I need to create 3 final versions of my purpose statement. My current version is: '[your tested statement]'\n\nPlease create 3 polished versions that:\n- Incorporate the feedback I received\n- Each has a slightly different angle/emphasis\n- Are optimized for different contexts (website, elevator pitch, social media)\n- Maintain authenticity while being more compelling\n- Are ready to use professionally\n\nMake each version complete and polished, ready for different uses."
    };
    return promptMap[subtask.title] || "Help me with this task: " + subtask.title;
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      className={cn(
        "subtask-container transition-all duration-200",
        subtask.done 
          ? "border-[var(--brand)] bg-[var(--brand)]/5 shadow-[0_0_16px_rgba(46,168,255,0.2)]" 
          : "border-[var(--brand)]/30 bg-[var(--bg)] hover:border-[var(--brand)]/60 hover:shadow-[0_0_8px_rgba(46,168,255,0.1)]",
        isDragging && "opacity-50"
      )}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.15 }}
    >
      <div className="p-1 sm:p-2">
        {/* Main Row */}
        <div className="flex items-start gap-1 sm:gap-2">
          {/* Drag Handle - Hidden on mobile */}
          <div
            {...attributes}
            {...listeners}
            className="hidden sm:block mt-1 cursor-grab hover:cursor-grabbing text-zinc-400 hover:text-zinc-300 transition-colors"
          >
            <GripVertical className="w-3 h-3" />
          </div>

          {/* Mobile Checkbox - Compact circle */}
          <div className="mt-1 sm:hidden">
            <button
              onClick={() => toggleSubtask(subtask.id)}
              className={cn(
                "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 touch-target",
                subtask.done 
                  ? "border-green-500 bg-green-500" 
                  : "border-zinc-400 hover:border-green-500"
              )}
            >
              {subtask.done && (
                <div className="w-1.5 h-1.5 bg-white rounded-full" />
              )}
            </button>
          </div>

          {/* Desktop Checkbox */}
          <div className="hidden sm:block mt-1">
            <Checkbox
              checked={subtask.done}
              onCheckedChange={() => toggleSubtask(subtask.id)}
              className="w-4 h-4"
            />
          </div>

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
                  "text-xs sm:text-sm cursor-pointer hover:text-[var(--brand)] transition-colors mobile-text-wrap break-words hyphens-auto leading-tight",
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

          {/* Action Buttons */}
          <div className="flex items-center gap-1">
            {/* Suggested Prompt Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowPrompt(!showPrompt)}
              className="w-6 h-6 p-0 text-zinc-400 hover:text-[var(--brand)]"
              title="Show suggested AI prompt"
            >
              💡
            </Button>

            {/* Notes Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowNotes(!showNotes)}
              className="w-6 h-6 p-0 text-zinc-400 hover:text-[var(--brand)]"
              data-tour="notes"
            >
              <ChevronRight 
                className={cn(
                  "w-3 h-3 transition-transform duration-200",
                  showNotes && "rotate-90"
                )} 
              />
            </Button>

            {/* Delete Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDeleteConfirm(true)}
              className="w-6 h-6 p-0 text-zinc-400 hover:text-red-500"
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        </div>

        {/* Suggested Prompt */}
        <AnimatePresence>
          {showPrompt && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-3 p-3 bg-[var(--brand)]/10 border border-[var(--brand)]/20 rounded-lg max-h-64 overflow-y-auto"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <h4 className="text-xs font-semibold text-[var(--brand)]">💡 AI Prompt</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyPromptToClipboard(getSuggestedPrompt())}
                  className="text-xs h-6 px-2 text-[var(--brand)] hover:bg-[var(--brand)]/20 touch-target"
                >
                  📋 Copy
                </Button>
              </div>
              <p className="text-xs text-zinc-300 mb-2 break-words whitespace-pre-wrap hyphens-auto leading-relaxed">
                {getSuggestedPrompt()}
              </p>
              <p className="text-xs text-zinc-400 italic">
                ⚠️ Customize with your specific details - don&apos;t just copy-paste!
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notes Section */}
        <AnimatePresence>
          {showNotes && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-3"
            >
              <Textarea
                ref={notesRef}
                value={subtask.notes ?? ""}
                onChange={(e) => handleNotesChange(e.target.value)}
                placeholder="Add notes for this step..."
                className="min-h-[50px] sm:min-h-[60px] resize-none rounded-lg mobile-text-sm"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Delete Confirmation Dialog */}
        <AnimatePresence>
          {showDeleteConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowDeleteConfirm(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-lg font-semibold mb-2">Delete Subtask?</h3>
                <p className="text-zinc-400 mb-4">
                  Are you sure you want to delete &quot;{subtask.title}&quot;? This action cannot be undone.
                </p>
                <div className="flex gap-3 justify-end">
                  <Button
                    variant="outline"
                    onClick={() => setShowDeleteConfirm(false)}
                    className="touch-target"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      deleteSubtask(subtask.id);
                      setShowDeleteConfirm(false);
                    }}
                    className="touch-target"
                  >
                    Delete
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
