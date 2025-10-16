"use client";
import { Task } from "@/types/blueprint";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useBlueprint } from "@/store/useBlueprint";
import { motion } from "framer-motion";

export default function TaskList({ tasks }: { tasks: Task[] }) {
  const toggle = useBlueprint((s) => s.toggleTask);
  const updateNotes = useBlueprint((s) => s.updateNotes);

  return (
    <div className="space-y-4">
      {tasks.map((t) => (
        <motion.div
          key={t.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-[var(--border)] p-4 bg-[var(--card)]"
        >
          <div className="flex items-start gap-3">
            <Checkbox
              checked={t.done}
              onCheckedChange={() => toggle(t.id)}
            />
            <div className="flex-1">
              <div className="font-medium">{t.title}</div>
              {t.description && (
                <p className="text-sm text-zinc-400 mt-1">{t.description}</p>
              )}
              {t.tips?.length ? (
                <div className="mt-2 text-xs text-zinc-400">
                  <span className="text-zinc-300">Try this:</span>{" "}
                  {t.tips.join(" • ")}
                </div>
              ) : null}
              <Textarea
                value={t.notes ?? ""}
                onChange={(e) => updateNotes(t.id, e.target.value)}
                placeholder="Notes (autosave)…"
                className="mt-3"
              />
              {t.children?.length ? (
                <div className="mt-4 pl-6 border-l border-[var(--border)]">
                  <TaskList tasks={t.children} />
                </div>
              ) : null}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
