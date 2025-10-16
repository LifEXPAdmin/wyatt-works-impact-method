import { Blueprint } from "@/types/blueprint";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export async function exportMarkdown(bp: Blueprint): Promise<string> {
  const lines: string[] = ["# Wyatt Works Method Blueprint", ""];
  
  for (const p of bp.phases) {
    lines.push(`## ${p.title}`, p.summary, "");
    
    const stack = [...p.tasks];
    while (stack.length) {
      const t = stack.shift()!;
      lines.push(`- [${t.done ? "x" : " "}] ${t.title}`);
      
      if (t.description) {
        lines.push(`  - ${t.description}`);
      }
      
      if (t.tips && t.tips.length > 0) {
        lines.push(`  - Tips: ${t.tips.join(", ")}`);
      }
      
      if (t.notes) {
        lines.push(`  - Notes: ${t.notes}`);
      }
      
      if (t.children && t.children.length > 0) {
        stack.unshift(...t.children);
      }
    }
    
    lines.push("");
  }
  
  return lines.join("\n");
}

export async function exportPDF(bp: Blueprint): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdf.embedFont(StandardFonts.HelveticaBold);
  
  let page = pdf.addPage([612, 792]);
  const { height } = page.getSize();
  let y = height - 40;
  
  // Title
  page.drawText("Wyatt Works Method Blueprint", {
    x: 40,
    y,
    size: 18,
    font: boldFont,
    color: rgb(0.18, 0.66, 1)
  });
  y -= 28;
  
  for (const p of bp.phases) {
    // Check if we need a new page
    if (y < 100) {
      page = pdf.addPage([612, 792]);
      y = height - 40;
    }
    
    // Phase title
    page.drawText(p.title, {
      x: 40,
      y,
      size: 14,
      font: boldFont,
      color: rgb(0.95, 0.77, 0.26)
    });
    y -= 20;
    
    // Phase summary
    page.drawText(p.summary, {
      x: 52,
      y,
      size: 10,
      font,
      color: rgb(0.7, 0.7, 0.7)
    });
    y -= 20;
    
    // Tasks
    const stack = [...p.tasks];
    while (stack.length) {
      const t = stack.shift()!;
      
      // Check if we need a new page
      if (y < 60) {
        page = pdf.addPage([612, 792]);
        y = height - 40;
      }
      
      const prefix = t.done ? "[x]" : "[ ]";
      page.drawText(`${prefix} ${t.title}`, {
        x: 52,
        y,
        size: 10,
        font,
        color: rgb(0.9, 0.9, 0.9)
      });
      y -= 14;
      
      if (t.description) {
        const descLines = wrapText(t.description, 70);
        for (const line of descLines) {
          if (y < 60) {
            page = pdf.addPage([612, 792]);
            y = height - 40;
          }
          page.drawText(`  ${line}`, {
            x: 64,
            y,
            size: 9,
            font,
            color: rgb(0.7, 0.7, 0.7)
          });
          y -= 12;
        }
      }
      
      if (t.tips && t.tips.length > 0) {
        if (y < 60) {
          page = pdf.addPage([612, 792]);
          y = height - 40;
        }
        page.drawText(`  Tips: ${t.tips.join(", ")}`, {
          x: 64,
          y,
          size: 9,
          font,
          color: rgb(0.6, 0.8, 1)
        });
        y -= 12;
      }
      
      if (t.notes) {
        const notesLines = wrapText(t.notes, 70);
        for (const line of notesLines) {
          if (y < 60) {
            page = pdf.addPage([612, 792]);
            y = height - 40;
          }
          page.drawText(`  Notes: ${line}`, {
            x: 64,
            y,
            size: 9,
            font,
            color: rgb(0.5, 0.7, 0.5)
          });
          y -= 12;
        }
      }
      
      if (t.children && t.children.length > 0) {
        stack.unshift(...t.children);
      }
      
      y -= 8;
    }
    
    y -= 16;
  }
  
  const bytes = await pdf.save();
  return bytes;
}

function wrapText(text: string, maxLength: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';
  
  for (const word of words) {
    if (currentLine.length + word.length + 1 <= maxLength) {
      currentLine += (currentLine ? ' ' : '') + word;
    } else {
      if (currentLine) {
        lines.push(currentLine);
      }
      currentLine = word;
    }
  }
  
  if (currentLine) {
    lines.push(currentLine);
  }
  
  return lines;
}
