"use client";
import { useState } from "react";
import { Task, PhaseId } from "@/types/blueprint";
import { useBlueprint } from "@/store/useBlueprint";
import { motion, AnimatePresence } from "framer-motion";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TaskItem from "@/components/TaskItem";
import { Plus } from "lucide-react";

interface TaskListProps {
  tasks: Task[];
  phaseId: PhaseId;
}

export default function TaskList({ tasks, phaseId }: TaskListProps) {
  const { addTask } = useBlueprint();
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id && over) {
      const { reorderTasks } = useBlueprint.getState();
      
      // Check if we're reordering tasks or subtasks
      const activeTask = tasks.find(task => task.id === active.id);
      const overTask = tasks.find(task => task.id === over.id);
      
      if (activeTask && overTask) {
        // Reordering main tasks
        reorderTasks(phaseId, active.id as string, over.id as string);
      }
    }
  };

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      addTask(phaseId, newTaskTitle.trim());
      setNewTaskTitle("");
      setIsAddingTask(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTask();
    } else if (e.key === 'Escape') {
      setIsAddingTask(false);
      setNewTaskTitle("");
    }
  };

  return (
    <div className="space-y-4">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={tasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
          <AnimatePresence>
            {tasks.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                <TaskItem task={task} phaseId={phaseId} />
              </motion.div>
            ))}
          </AnimatePresence>
        </SortableContext>
      </DndContext>

      {/* Add Task Section */}
      <AnimatePresence>
        {isAddingTask ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="rounded-2xl border border-dashed border-[var(--border)] p-4"
          >
            <div className="flex items-center gap-3">
              <Input
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter task title..."
                className="flex-1 bg-transparent border-none p-0 text-lg font-medium focus:ring-0"
                autoFocus
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={handleAddTask}
                  disabled={!newTaskTitle.trim()}
                  className="bg-[var(--brand)] text-black hover:opacity-90"
                >
                  Add
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setIsAddingTask(false);
                    setNewTaskTitle("");
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              onClick={() => setIsAddingTask(true)}
              variant="outline"
              className="w-full border-dashed border-[var(--border)] hover:border-[var(--brand)] hover:bg-[var(--brand)]/5 rounded-2xl h-12"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Task
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}