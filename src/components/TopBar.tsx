"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useBlueprint } from "@/store/useBlueprint";
import { 
  ChevronDown, 
  Plus, 
  Edit, 
  Copy, 
  Trash2, 
  WifiOff,
  Cloud,
  CheckCircle,
  AlertCircle,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function TopBar() {
  const { 
    projects, 
    activeProjectId, 
    saveStatus, 
    createProject, 
    renameProject, 
    duplicateProject, 
    deleteProject, 
    setActiveProject,
    progress,
    load
  } = useBlueprint();

  const [isOnline, setIsOnline] = useState(true);
  const [showRenameDialog, setShowRenameDialog] = useState(false);
  const [newName, setNewName] = useState("");

  const activeProject = projects.find(p => p.id === activeProjectId);
  const progressData = progress();

  useEffect(() => {
    load();
    
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [load]);

  const handleCreateProject = () => {
    const name = prompt("Project name:");
    if (name?.trim()) {
      createProject(name.trim());
    }
  };

  const handleRename = () => {
    if (!activeProject) return;
    setNewName(activeProject.name);
    setShowRenameDialog(true);
  };

  const confirmRename = () => {
    if (activeProjectId && newName.trim()) {
      renameProject(activeProjectId, newName.trim());
    }
    setShowRenameDialog(false);
  };

  const handleDuplicate = () => {
    if (activeProjectId) {
      duplicateProject(activeProjectId);
    }
  };

  const handleDelete = () => {
    if (activeProjectId && projects.length > 1) {
      if (confirm(`Delete "${activeProject?.name}"? This cannot be undone.`)) {
        deleteProject(activeProjectId);
      }
    }
  };

  const getSaveStatusIcon = () => {
    switch (saveStatus) {
      case 'saving':
        return <Loader2 className="w-4 h-4 animate-spin" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'syncing':
        return <Cloud className="w-4 h-4 animate-pulse" />;
      default:
        return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
  };

  const getSaveStatusText = () => {
    if (!isOnline) return "Offline—changes saved locally";
    
    switch (saveStatus) {
      case 'saving':
        return "Saving...";
      case 'error':
        return "Save failed";
      case 'syncing':
        return "Syncing...";
      default:
        return "Saved • Local";
    }
  };

  return (
    <motion.header
      className="sticky top-0 z-40 border-b border-[var(--border)] bg-[rgba(11,14,20,0.95)] backdrop-blur-md"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="mx-auto max-w-7xl px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left: Brand Link */}
          <Link
            href="/"
            className="font-bold text-xl tracking-tight hover:text-[var(--brand)] transition-colors"
          >
            Wyatt Works Method
          </Link>

          {/* Center: Project Switcher */}
          <div className="flex-1 max-w-md mx-8">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between bg-[var(--card)] border-[var(--border)] hover:bg-[var(--brand)]/10"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">📘</span>
                    <span className="font-medium truncate">
                      {activeProject?.name || "Select Project"}
                    </span>
                  </div>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 bg-[var(--card)] border-[var(--border)]">
                {projects.map((project) => (
                  <DropdownMenuItem
                    key={project.id}
                    onClick={() => setActiveProject(project.id)}
                    className={cn(
                      "cursor-pointer",
                      project.id === activeProjectId && "bg-[var(--brand)]/10"
                    )}
                  >
                    <span className="mr-2">📘</span>
                    <span className="flex-1 truncate">{project.name}</span>
                    {project.id === activeProjectId && (
                      <CheckCircle className="w-4 h-4 text-[var(--brand)]" />
                    )}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleCreateProject}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Project
                </DropdownMenuItem>
                {activeProject && (
                  <>
                    <DropdownMenuItem onClick={handleRename}>
                      <Edit className="w-4 h-4 mr-2" />
                      Rename Project
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleDuplicate}>
                      <Copy className="w-4 h-4 mr-2" />
                      Duplicate Project
                    </DropdownMenuItem>
                    {projects.length > 1 && (
                      <DropdownMenuItem 
                        onClick={handleDelete}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Project
                      </DropdownMenuItem>
                    )}
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Right: Progress & Status */}
          <div className="flex items-center gap-4">
            {/* Progress Ring */}
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8">
                <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 32 32">
                  <circle
                    cx="16"
                    cy="16"
                    r="14"
                    stroke="var(--border)"
                    strokeWidth="2"
                    fill="none"
                  />
                  <circle
                    cx="16"
                    cy="16"
                    r="14"
                    stroke="var(--brand)"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 14}`}
                    strokeDashoffset={`${2 * Math.PI * 14 * (1 - progressData.overall / 100)}`}
                    className="transition-all duration-300"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-medium text-[var(--brand)]">
                    {progressData.overall}%
                  </span>
                </div>
              </div>
              <span className="text-sm text-zinc-400">
                {progressData.overall}% Complete
              </span>
            </div>

            {/* Save Status */}
            <div className="flex items-center gap-2">
              {getSaveStatusIcon()}
              <span className="text-sm text-zinc-400">
                {getSaveStatusText()}
              </span>
              {!isOnline && (
                <Badge variant="outline" className="text-xs">
                  <WifiOff className="w-3 h-3 mr-1" />
                  Offline
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Rename Dialog */}
      <AnimatePresence>
        {showRenameDialog && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 w-96"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h3 className="text-lg font-semibold mb-4">Rename Project</h3>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full px-3 py-2 bg-[var(--bg)] border border-[var(--border)] rounded-lg mb-4 focus:border-[var(--brand)] focus:outline-none"
                placeholder="Project name"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') confirmRename();
                  if (e.key === 'Escape') setShowRenameDialog(false);
                }}
              />
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setShowRenameDialog(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={confirmRename}
                  disabled={!newName.trim()}
                  className="bg-[var(--brand)] text-black hover:opacity-90"
                >
                  Rename
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
