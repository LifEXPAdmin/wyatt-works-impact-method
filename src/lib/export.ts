import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { Blueprint, Task } from "@/types/blueprint";

export async function exportPDF(blueprint: Blueprint): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const boldFont = await doc.embedFont(StandardFonts.HelveticaBold);
  const italicFont = await doc.embedFont(StandardFonts.HelveticaOblique);
  
  // Brand colors
  const brandColor = rgb(0.2, 0.6, 1); // Blue
  const textColor = rgb(0.1, 0.1, 0.1);
  const mutedColor = rgb(0.4, 0.4, 0.4);
  
  let page = doc.addPage([595, 842]); // A4
  let y = 750;
  
  // Header
  page.drawText("Wyatt Works Method", { 
    x: 50, y, 
    font: boldFont, size: 20, 
    color: brandColor 
  });
  y -= 30;
  
  page.drawText(blueprint.name, { 
    x: 50, y, 
    font: boldFont, size: 24, 
    color: textColor 
  });
  y -= 40;
  
  // Metadata
  const updatedDate = new Date(blueprint.updatedAt).toLocaleDateString();
  page.drawText(`Updated: ${updatedDate}`, { 
    x: 50, y, 
    font: font, size: 10, 
    color: mutedColor 
  });
  y -= 60;
  
  for (const phase of blueprint.phases) {
    // Check if we need a new page
    if (y < 150) {
      page = doc.addPage([595, 842]);
      y = 750;
    }
    
    // Phase title with background
    page.drawRectangle({
      x: 45,
      y: y - 25,
      width: 505,
      height: 30,
      color: brandColor,
      opacity: 0.1
    });
    
    page.drawText(phase.title, { 
      x: 55, y: y - 5, 
      font: boldFont, size: 16, 
      color: brandColor 
    });
    y -= 45;
    
    // Phase summary
    if (phase.summary) {
      page.drawText(phase.summary, { 
        x: 55, y, 
        font: italicFont, size: 11, 
        color: mutedColor 
      });
      y -= 25;
    }
    
    // Tasks
    const renderTasks = (tasks: Task[], depth: number = 0) => {
      for (const task of tasks) {
        // Check if we need a new page
        if (y < 100) {
          page = doc.addPage([595, 842]);
          y = 750;
        }
        
        const indent = 55 + (depth * 20);
        const prefix = task.done ? "[X]" : "[ ]";
        const taskColor = task.done ? mutedColor : textColor;
        
        // Task title
        page.drawText(`${prefix} ${task.title}`, { 
          x: indent, y, 
          font: task.done ? italicFont : font, 
          size: 12, 
          color: taskColor 
        });
        y -= 20;
        
        // Task description
        if (task.description) {
          page.drawText(task.description, { 
            x: indent + 20, y, 
            font: italicFont, size: 10, 
            color: mutedColor 
          });
          y -= 15;
        }
        
        // Task notes
        if (task.notes) {
          const lines = task.notes.split("\n");
          for (const line of lines.slice(0, 10)) { // Limit notes length
            if (y < 80) {
              page = doc.addPage([595, 842]);
              y = 750;
            }
            
            const formattedLine = formatMarkdownLine(line);
            page.drawText(`  ${formattedLine}`, { 
              x: indent + 20, y, 
              font: font, size: 9, 
              color: rgb(0.3, 0.3, 0.3) 
            });
            y -= 12;
          }
          y -= 5;
        }
        
        // Render subtasks
        if (task.children && task.children.length > 0) {
          renderTasks(task.children, depth + 1);
        }
        
        y -= 5;
      }
    };
    
    renderTasks(phase.tasks);
    y -= 20;
  }
  
  // Footer on each page
  const pages = doc.getPages();
  for (let i = 0; i < pages.length; i++) {
    const currentPage = pages[i];
    currentPage.drawText("method.wyatt-works.com", {
      x: 50,
      y: 30,
      font: font,
      size: 8,
      color: mutedColor
    });
    currentPage.drawText(`Page ${i + 1} of ${pages.length}`, {
      x: 500,
      y: 30,
      font: font,
      size: 8,
      color: mutedColor
    });
  }
  
  return doc.save();
}

function formatMarkdownLine(text: string): string {
  // Simple markdown formatting for PDF
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold markers
    .replace(/\*(.*?)\*/g, '$1') // Remove italic markers
    .replace(/^- (.*$)/gm, '- $1') // Convert list items
    .substring(0, 80); // Limit line length
}

export async function exportMarkdown(blueprint: Blueprint): Promise<string> {
  let md = `# ${blueprint.name}\n\n`;
  md += `> Generated from Wyatt Works Method on ${new Date(blueprint.updatedAt).toLocaleDateString()}\n\n`;
  md += `---\n\n`;
  
  for (const phase of blueprint.phases) {
    md += `## ${phase.title}\n\n`;
    
    if (phase.summary) {
      md += `*${phase.summary}*\n\n`;
    }
    
    const renderTasks = (tasks: Task[], depth: number = 0) => {
      for (const task of tasks) {
        const indent = "  ".repeat(depth);
        const prefix = task.done ? "- [x]" : "- [ ]";
        md += `${indent}${prefix} ${task.title}\n`;
        
        if (task.description) {
          md += `${indent}  *${task.description}*\n`;
        }
        
        if (task.notes && task.notes.trim()) {
          const notes = task.notes
            .split('\n')
            .map(line => `${indent}  ${line}`)
            .join('\n');
          md += `${notes}\n\n`;
        }
        
        if (task.children && task.children.length > 0) {
          renderTasks(task.children, depth + 1);
        }
      }
    };
    
    renderTasks(phase.tasks);
    md += "\n---\n\n";
  }
  
  md += `## Progress Summary\n\n`;
  
  // Calculate progress
  let totalTasks = 0;
  let completedTasks = 0;
  
  for (const phase of blueprint.phases) {
    const countTasks = (tasks: Task[]) => {
      for (const task of tasks) {
        totalTasks++;
        if (task.done) completedTasks++;
        if (task.children) countTasks(task.children);
      }
    };
    countTasks(phase.tasks);
  }
  
  const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  md += `- **Overall Progress**: ${completedTasks}/${totalTasks} tasks (${progress}%)\n`;
  
  for (const phase of blueprint.phases) {
    let phaseTotal = 0;
    let phaseCompleted = 0;
    
    const countPhaseTasks = (tasks: Task[]) => {
      for (const task of tasks) {
        phaseTotal++;
        if (task.done) phaseCompleted++;
        if (task.children) countPhaseTasks(task.children);
      }
    };
    countPhaseTasks(phase.tasks);
    
    const phaseProgress = phaseTotal > 0 ? Math.round((phaseCompleted / phaseTotal) * 100) : 0;
    md += `- **${phase.title}**: ${phaseCompleted}/${phaseTotal} tasks (${phaseProgress}%)\n`;
  }
  
  md += `\n---\n\n`;
  md += `*This blueprint was created using the [Wyatt Works Method](https://method.wyatt-works.com) - a systematic approach to building impactful brands.*\n`;
  
  return md;
}