"use client";
import { useBlueprint } from "@/store/useBlueprint";
import { exportPDF, exportMarkdown } from "@/lib/export";

export default function RightRail() {
  const blueprint = useBlueprint((s) => s.blueprint);

  const handleExportPDF = async () => {
    if (!blueprint) return;
    const bytes = await exportPDF(blueprint);
    // @ts-expect-error - Uint8Array is compatible with Blob constructor
    const blob = new Blob([bytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "wyatt-works-method.pdf";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportMD = async () => {
    if (!blueprint) return;
    const md = await exportMarkdown(blueprint);
    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "wyatt-works-method.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-[var(--border)] p-4 bg-[var(--card)]">
        <div className="text-sm font-medium">Guided Prompts</div>
        <p className="text-sm text-zinc-400 mt-1">
          Capture decisions, deadlines, and dependencies. Keep notes short and
          action-oriented.
        </p>
      </div>
      <div className="rounded-xl border border-[var(--border)] p-4 bg-[var(--card)]">
        <div className="text-sm font-medium">Export</div>
        <p className="text-sm text-zinc-400 mt-1">
          Download your blueprint as PDF or Markdown anytime.
        </p>
        <div className="mt-3 flex gap-2">
          <button
            onClick={handleExportPDF}
            className="px-3 py-2 rounded-lg bg-[var(--brand)] text-black text-sm font-medium"
          >
            Export PDF
          </button>
          <button
            onClick={handleExportMD}
            className="px-3 py-2 rounded-lg border border-[var(--border)] text-sm"
          >
            Export MD
          </button>
        </div>
      </div>
    </div>
  );
}
