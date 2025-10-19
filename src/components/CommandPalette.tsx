"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBlueprint } from "@/store/useBlueprint";
import { exportPDF, exportMarkdown } from "@/lib/export";
import { 
  Search, 
  Plus, 
  Edit, 
  Copy, 
  Trash2, 
  FileText, 
  FileDown,
  Sparkles,
  Hammer,
  Zap,
  Target,
  Command
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Command {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
  keywords: string[];
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const { 
    createProject, 
    renameProject, 
    duplicateProject, 
    deleteProject,
    projects,
    activeProjectId
  } = useBlueprint();

  const activeProject = projects.find(p => p.id === activeProjectId);

  const commands: Command[] = [
    // Project actions
    {
      id: "create-project",
      title: "Create New Project",
      description: "Start a new blueprint project",
      icon: Plus,
      action: () => {
        const name = prompt("Project name:");
        if (name?.trim()) {
          createProject(name.trim());
        }
        onClose();
      },
      keywords: ["create", "new", "project", "blueprint"]
    },
    {
      id: "rename-project",
      title: "Rename Project",
      description: `Rename "${activeProject?.name || "current project"}"`,
      icon: Edit,
      action: () => {
        if (activeProjectId && activeProject) {
          const name = prompt("New project name:", activeProject.name);
          if (name?.trim()) {
            renameProject(activeProjectId, name.trim());
          }
        }
        onClose();
      },
      keywords: ["rename", "edit", "project", "name"]
    },
    {
      id: "duplicate-project",
      title: "Duplicate Project",
      description: `Create a copy of "${activeProject?.name || "current project"}"`,
      icon: Copy,
      action: () => {
        if (activeProjectId) {
          duplicateProject(activeProjectId);
        }
        onClose();
      },
      keywords: ["duplicate", "copy", "project"]
    },
    {
      id: "delete-project",
      title: "Delete Project",
      description: `Delete "${activeProject?.name || "current project"}"`,
      icon: Trash2,
      action: () => {
        if (activeProjectId && projects.length > 1) {
          if (confirm(`Delete "${activeProject?.name}"? This cannot be undone.`)) {
            deleteProject(activeProjectId);
          }
        }
        onClose();
      },
      keywords: ["delete", "remove", "project"]
    },
    
    // Navigation
    {
      id: "go-to-spark",
      title: "Go to Spark",
      description: "Navigate to The Spark phase",
      icon: Sparkles,
      action: () => {
        // Navigate to spark phase
        onClose();
      },
      keywords: ["spark", "phase", "navigate", "go"]
    },
    {
      id: "go-to-forge",
      title: "Go to Forge",
      description: "Navigate to The Build phase",
      icon: Hammer,
      action: () => {
        // Navigate to forge phase
        onClose();
      },
      keywords: ["forge", "phase", "navigate", "go"]
    },
    {
      id: "go-to-flow",
      title: "Go to Flow",
      description: "Navigate to The Launch phase",
      icon: Zap,
      action: () => {
        // Navigate to flow phase
        onClose();
      },
      keywords: ["flow", "phase", "navigate", "go"]
    },
    {
      id: "go-to-impact",
      title: "Go to Impact",
      description: "Navigate to The Scale phase",
      icon: Target,
      action: () => {
        // Navigate to impact phase
        onClose();
      },
      keywords: ["impact", "phase", "navigate", "go"]
    },

    // Export actions
    {
      id: "export-pdf",
      title: "Export PDF",
      description: "Download blueprint as PDF",
      icon: FileDown,
      action: async () => {
        if (activeProject) {
          try {
            const bytes = await exportPDF(activeProject.blueprint);
            const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${activeProject.name}-blueprint.pdf`;
            a.click();
            URL.revokeObjectURL(url);
          } catch (error) {
            console.error("PDF export failed:", error);
          }
        }
        onClose();
      },
      keywords: ["export", "pdf", "download", "print"]
    },
    {
      id: "export-markdown",
      title: "Export Markdown",
      description: "Download blueprint as Markdown",
      icon: FileText,
      action: async () => {
        if (activeProject) {
          try {
            const md = await exportMarkdown(activeProject.blueprint);
            const blob = new Blob([md], { type: "text/markdown" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${activeProject.name}-blueprint.md`;
            a.click();
            URL.revokeObjectURL(url);
          } catch (error) {
            console.error("Markdown export failed:", error);
          }
        }
        onClose();
      },
      keywords: ["export", "markdown", "download", "text"]
    }
  ];

  const filteredCommands = commands.filter(command =>
    command.title.toLowerCase().includes(query.toLowerCase()) ||
    command.description.toLowerCase().includes(query.toLowerCase()) ||
    command.keywords.some(keyword => keyword.toLowerCase().includes(query.toLowerCase()))
  );

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex(prev => 
            prev < filteredCommands.length - 1 ? prev + 1 : 0
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex(prev => 
            prev > 0 ? prev - 1 : filteredCommands.length - 1
          );
          break;
        case "Enter":
          e.preventDefault();
          if (filteredCommands[selectedIndex]) {
            filteredCommands[selectedIndex].action();
          }
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onClose]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="fixed top-1/4 left-1/2 transform -translate-x-1/2 w-full max-w-lg mx-4"
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--border)]">
              <Search className="w-4 h-4 text-zinc-400" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search commands..."
                className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-zinc-400"
              />
              <div className="flex items-center gap-1 text-xs text-zinc-400">
                <Command className="w-3 h-3" />
                <span>K</span>
              </div>
            </div>

            {/* Commands List */}
            <div className="max-h-80 overflow-y-auto">
              {filteredCommands.length > 0 ? (
                <div className="py-2">
                  {filteredCommands.map((command, index) => {
                    const Icon = command.icon;
                    return (
                      <motion.button
                        key={command.id}
                        onClick={command.action}
                        className={cn(
                          "w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-[var(--bg)] transition-colors",
                          index === selectedIndex && "bg-[var(--bg)]"
                        )}
                        whileHover={{ backgroundColor: "var(--bg)" }}
                      >
                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[var(--brand)]/10 flex items-center justify-center">
                          <Icon className="w-4 h-4 text-[var(--brand)]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm">{command.title}</div>
                          <div className="text-xs text-zinc-400 truncate">
                            {command.description}
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              ) : (
                <div className="px-4 py-8 text-center text-zinc-400">
                  <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <div className="text-sm">No commands found</div>
                  <div className="text-xs mt-1">Try a different search term</div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2 border-t border-[var(--border)] bg-[var(--bg)]">
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <div className="flex items-center gap-4">
                  <span>↑↓ Navigate</span>
                  <span>↵ Select</span>
                  <span>⎋ Close</span>
                </div>
                <div>{filteredCommands.length} command{filteredCommands.length !== 1 ? 's' : ''}</div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
