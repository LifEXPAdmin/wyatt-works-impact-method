"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBlueprint } from "@/store/useBlueprint";
import { exportPDF, exportMarkdown } from "@/lib/export";
import { 
  Lightbulb, 
  FileText, 
  Download, 
  FileDown,
  Copy,
  CheckCircle,
  ExternalLink,
  BookOpen,
  Video,
  Link as LinkIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const promptChips = [
  "What's the main goal?",
  "Who is the target audience?",
  "What problem does this solve?",
  "How will you measure success?",
  "What resources do you need?",
  "What's the timeline?",
  "Who are the key stakeholders?",
  "What are the risks?",
  "How will you get feedback?",
  "What's the next step?"
];

const resources = [
  {
    title: "Brand Purpose Worksheet",
    type: "Template",
    description: "Define your one-sentence purpose",
    icon: FileText,
    href: "#"
  },
  {
    title: "Content Calendar Template",
    type: "Template", 
    description: "Plan your content strategy",
    icon: BookOpen,
    href: "#"
  },
  {
    title: "Video Content Guide",
    type: "Guide",
    description: "Step-by-step video creation",
    icon: Video,
    href: "#"
  },
  {
    title: "Partnership Outreach Script",
    type: "Script",
    description: "Professional outreach templates",
    icon: LinkIcon,
    href: "#"
  }
];

interface RightRailProps {
  onPromptClick?: (prompt: string) => void;
  onResourceClick?: (resource: { title: string; description: string }) => void;
}

export default function RightRail({ onPromptClick, onResourceClick }: RightRailProps) {
  const [activeTab, setActiveTab] = useState("prompts");
  const [exportLoading, setExportLoading] = useState<'pdf' | 'md' | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  
  const { activeProject } = useBlueprint();

  const handleExportPDF = async () => {
    const project = activeProject();
    if (!project) return;
    
    setExportLoading('pdf');
    try {
      const bytes = await exportPDF(project.blueprint);
      const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${project.name}-blueprint.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("PDF export failed:", error);
    } finally {
      setExportLoading(null);
    }
  };

  const handleExportMarkdown = async () => {
    const project = activeProject();
    if (!project) return;
    
    setExportLoading('md');
    try {
      const md = await exportMarkdown(project.blueprint);
      const blob = new Blob([md], { type: "text/markdown" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${project.name}-blueprint.md`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Markdown export failed:", error);
    } finally {
      setExportLoading(null);
    }
  };

  const handleCopyNotes = async () => {
    const project = activeProject();
    if (!project) return;
    
    try {
      const md = await exportMarkdown(project.blueprint);
      await navigator.clipboard.writeText(md);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  const handlePromptClick = (prompt: string) => {
    if (onPromptClick) {
      onPromptClick(prompt);
    }
  };

  const handleResourceClick = (resource: { title: string; description: string }) => {
    if (onResourceClick) {
      onResourceClick(resource);
    }
  };

  return (
    <motion.aside
      className="w-80 bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden"
      initial={{ x: 300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
        <TabsList className="grid w-full grid-cols-3 bg-[var(--bg)] rounded-none border-b border-[var(--border)]">
          <TabsTrigger value="prompts" className="text-xs">
            <Lightbulb className="w-3 h-3 mr-1" />
            Prompts
          </TabsTrigger>
          <TabsTrigger value="resources" className="text-xs">
            <FileText className="w-3 h-3 mr-1" />
            Resources
          </TabsTrigger>
          <TabsTrigger value="export" className="text-xs">
            <Download className="w-3 h-3 mr-1" />
            Export
          </TabsTrigger>
        </TabsList>

        <div className="flex-1 overflow-y-auto">
          <TabsContent value="prompts" className="p-4 space-y-4">
            <div>
              <h3 className="font-semibold text-sm mb-2">Smart Prompts</h3>
              <p className="text-xs text-zinc-400 mb-4">
                Click any prompt to add it to your notes
              </p>
              
              <div className="space-y-2">
                {promptChips.map((prompt, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <button
                      onClick={() => handlePromptClick(prompt)}
                      className="w-full text-left p-2 rounded-lg bg-[var(--bg)] border border-[var(--border)] hover:border-[var(--brand)] hover:bg-[var(--brand)]/5 transition-all duration-200 text-xs"
                    >
                      {prompt}
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--border)]">
              <h4 className="font-medium text-sm mb-2">Tips</h4>
              <div className="space-y-2 text-xs text-zinc-400">
                <div className="p-2 rounded-lg bg-[var(--brand)]/10 border border-[var(--brand)]/20">
                  <div className="font-medium text-[var(--brand)] mb-1">💡 Pro Tip</div>
                  <div>Keep notes short and action-oriented. Focus on decisions and next steps.</div>
                </div>
                <div className="p-2 rounded-lg bg-[var(--gold)]/10 border border-[var(--gold)]/20">
                  <div className="font-medium text-[var(--gold)] mb-1">⏰ Time Saver</div>
                  <div>Use **bold** for key decisions and - lists for action items.</div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="resources" className="p-4 space-y-4">
            <div>
              <h3 className="font-semibold text-sm mb-2">Resources</h3>
              <p className="text-xs text-zinc-400 mb-4">
                Templates and guides to help you succeed
              </p>
              
              <div className="space-y-3">
                {resources.map((resource, index) => {
                  const Icon = resource.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card 
                        className="p-3 bg-[var(--bg)] border-[var(--border)] hover:border-[var(--brand)] transition-all duration-200 cursor-pointer group"
                        onClick={() => handleResourceClick(resource)}
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-[var(--brand)]/10 group-hover:bg-[var(--brand)]/20 transition-colors">
                            <Icon className="w-4 h-4 text-[var(--brand)]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium text-sm truncate">{resource.title}</h4>
                              <Badge variant="outline" className="text-xs px-1 py-0">
                                {resource.type}
                              </Badge>
                            </div>
                            <p className="text-xs text-zinc-400">{resource.description}</p>
                          </div>
                          <ExternalLink className="w-3 h-3 text-zinc-400 group-hover:text-[var(--brand)] transition-colors" />
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--border)]">
              <Button 
                variant="outline" 
                className="w-full text-xs"
                onClick={() => window.open('/library', '_blank')}
              >
                <BookOpen className="w-3 h-3 mr-2" />
                View All Resources
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="export" className="p-4 space-y-4">
            <div>
              <h3 className="font-semibold text-sm mb-2">Export Options</h3>
              <p className="text-xs text-zinc-400 mb-4">
                Download your blueprint in different formats
              </p>
              
              <div className="space-y-3">
                <Button
                  onClick={handleExportPDF}
                  disabled={exportLoading === 'pdf' || !activeProject}
                  className="w-full bg-[var(--brand)] text-black hover:opacity-90 disabled:opacity-50"
                >
                  <FileDown className="w-4 h-4 mr-2" />
                  {exportLoading === 'pdf' ? 'Exporting...' : 'Export PDF'}
                </Button>
                
                <Button
                  onClick={handleExportMarkdown}
                  disabled={exportLoading === 'md' || !activeProject}
                  variant="outline"
                  className="w-full"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  {exportLoading === 'md' ? 'Exporting...' : 'Export Markdown'}
                </Button>
                
                <Button
                  onClick={handleCopyNotes}
                  disabled={!activeProject}
                  variant="outline"
                  className="w-full"
                >
                  <AnimatePresence mode="wait">
                    {copySuccess ? (
                      <motion.div
                        key="success"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="flex items-center"
                      >
                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                        Copied!
                      </motion.div>
                    ) : (
                      <motion.div
                        key="copy"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="flex items-center"
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy to Clipboard
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--border)]">
              <h4 className="font-medium text-sm mb-2">Export Info</h4>
              <div className="space-y-2 text-xs text-zinc-400">
                <div className="p-2 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
                  <div className="font-medium text-[var(--brand)] mb-1">📄 PDF Export</div>
                  <div>Professional layout with one phase per page, perfect for printing or sharing.</div>
                </div>
                <div className="p-2 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
                  <div className="font-medium text-[var(--gold)] mb-1">📝 Markdown Export</div>
                  <div>Plain text format that works in any editor. Great for version control.</div>
                </div>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </motion.aside>
  );
}