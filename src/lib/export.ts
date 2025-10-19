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
  
  // Title page - centered and beautiful
  const titleText = sanitizeText("Wyatt Works Method");
  const titleWidth = boldFont.widthOfTextAtSize(titleText, 32);
  const titleX = (595 - titleWidth) / 2;
  
  page.drawText(titleText, { 
    x: titleX, y: 500, 
    font: boldFont, size: 32, 
    color: brandColor 
  });
  
  const subtitleText = sanitizeText(blueprint.name);
  const subtitleWidth = boldFont.widthOfTextAtSize(subtitleText, 28);
  const subtitleX = (595 - subtitleWidth) / 2;
  
  page.drawText(subtitleText, { 
    x: subtitleX, y: 450, 
    font: boldFont, size: 28, 
    color: textColor 
  });
  
  // Add decorative line
  page.drawLine({
    start: { x: 150, y: 420 },
    end: { x: 445, y: 420 },
    thickness: 2,
    color: brandColor
  });
  
  // Add tagline
  const taglineText = "Your Complete Business Blueprint";
  const taglineWidth = font.widthOfTextAtSize(taglineText, 16);
  const taglineX = (595 - taglineWidth) / 2;
  
  page.drawText(taglineText, { 
    x: taglineX, y: 380, 
    font: italicFont, size: 16, 
    color: mutedColor 
  });
  
  // Add date
  const updatedDate = new Date(blueprint.updatedAt).toLocaleDateString();
  const dateText = sanitizeText(`Created: ${updatedDate}`);
  const dateWidth = font.widthOfTextAtSize(dateText, 12);
  const dateX = (595 - dateWidth) / 2;
  
  page.drawText(dateText, { 
    x: dateX, y: 320, 
    font: font, size: 12, 
    color: mutedColor 
  });
  
  // Add progress summary
  const totalTasks = blueprint.phases.reduce((sum, phase) => sum + phase.tasks.length, 0);
  const totalSubtasks = blueprint.phases.reduce((sum, phase) => 
    sum + phase.tasks.reduce((taskSum, task) => taskSum + (task.children?.length || 0), 0), 0
  );
  
  const summaryText = `${totalTasks} Main Tasks • ${totalSubtasks} Sub-tasks • 4 Phases`;
  const summaryWidth = font.widthOfTextAtSize(summaryText, 14);
  const summaryX = (595 - summaryWidth) / 2;
  
  page.drawText(summaryText, { 
    x: summaryX, y: 280, 
    font: font, size: 14, 
    color: textColor 
  });
  
  // Add phase overview
  y = 220;
  page.drawText("Phase Overview:", { 
    x: 50, y, 
    font: boldFont, size: 16, 
    color: textColor 
  });
  y -= 30;
  
  blueprint.phases.forEach((phase, index) => {
    const phaseText = `${index + 1}. ${phase.title} - ${phase.summary}`;
    page.drawText(sanitizeText(phaseText), { 
      x: 70, y, 
      font: font, size: 12, 
      color: textColor 
    });
    y -= 20;
  });
  
  y = 50; // Reset for next page
  
  for (const phase of blueprint.phases) {
    // Always start each phase on a fresh page
    page = doc.addPage([595, 842]);
    y = 750;
    
    // Phase title with subtle background
    page.drawRectangle({
      x: 50,
      y: y - 35,
      width: 495,
      height: 40,
      color: brandColor,
      opacity: 0.05
    });
    
    // Draw a decorative line above
    page.drawLine({
      start: { x: 50, y: y - 10 },
      end: { x: 545, y: y - 10 },
      thickness: 1,
      color: brandColor,
      opacity: 0.3
    });
    
    // Phase title - centered
    const phaseTitle = sanitizeText(phase.title);
    const phaseTitleWidth = boldFont.widthOfTextAtSize(phaseTitle, 20);
    const phaseTitleX = (595 - phaseTitleWidth) / 2;
    
    page.drawText(phaseTitle, { 
      x: phaseTitleX, y: y - 5, 
      font: boldFont, size: 20, 
      color: brandColor 
    });
    y -= 45;
    
    // Phase summary - centered
    if (phase.summary) {
      const phaseSummary = sanitizeText(phase.summary);
      const summaryWidth = font.widthOfTextAtSize(phaseSummary, 14);
      const summaryX = (595 - summaryWidth) / 2;
      
      page.drawText(phaseSummary, { 
        x: summaryX, y, 
        font: italicFont, size: 14, 
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
        page.drawText(sanitizeText(`${prefix} ${task.title}`), { 
          x: indent, y, 
          font: task.done ? italicFont : font, 
          size: 12, 
          color: taskColor 
        });
        y -= 20;
        
        // Task description
        if (task.description) {
          page.drawText(sanitizeText(task.description), { 
            x: indent + 20, y, 
            font: italicFont, size: 10, 
            color: mutedColor 
          });
          y -= 15;
        }
        
        // Task notes (only if user has added notes OR if it's the first Spark task)
        const isFirstSparkTask = phase.id === "spark" && task.id === "sp-purpose";
        if ((task.notes && task.notes.trim()) || isFirstSparkTask) {
          if (y < 100) {
            page = doc.addPage([595, 842]);
            y = 750;
          }
          
          // Special instructions for first Spark task
          if (isFirstSparkTask) {
            const instructions = [
              "Take notes here! Use the dropdown arrow to open or collapse notes on every task and subtask.",
              "Click the lightbulb for AI prompt ideas to help you with each step.",
              "The AI prompts are designed to give you specific, actionable guidance.",
              "Customize the prompts with your specific details - don't just copy-paste!",
              "Use the notes to track your progress, insights, and next steps."
            ];
            
            page.drawText("Instructions:", { 
              x: indent + 20, y, 
              font: boldFont, size: 10, 
              color: brandColor 
            });
            y -= 15;
            
            for (const instruction of instructions) {
              page.drawText(`  • ${sanitizeText(instruction)}`, { 
                x: indent + 20, y, 
                font: font, size: 9, 
                color: textColor 
              });
              y -= 12;
            }
            y -= 5;
          }
          
          // User notes if they exist
          if (task.notes && task.notes.trim()) {
            const lines = task.notes.split("\n");
            for (const line of lines.slice(0, 5)) { // Limit notes length
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
        }
        
        // Render subtasks
        if (task.children && task.children.length > 0) {
          renderTasks(task.children, depth + 1);
        }
        
        y -= 8; // Reduced space between main tasks
      }
    };
    
    renderTasks(phase.tasks);
    y -= 10; // Reduced space after phase
  }
  
  // Footer on each page
  const pages = doc.getPages();
  for (let i = 0; i < pages.length; i++) {
    const currentPage = pages[i];
    currentPage.drawText(sanitizeText("method.wyatt-works.com"), {
      x: 50,
      y: 30,
      font: font,
      size: 8,
      color: mutedColor
    });
    currentPage.drawText(sanitizeText(`Page ${i + 1} of ${pages.length}`), {
      x: 500,
      y: 30,
      font: font,
      size: 8,
      color: mutedColor
    });
  }
  
  return doc.save();
}

function sanitizeText(text: string): string {
  // Replace Unicode characters with ASCII equivalents for PDF compatibility
  return text
    .replace(/≤/g, '<=') // Less than or equal to
    .replace(/≥/g, '>=') // Greater than or equal to
    .replace(/≠/g, '!=') // Not equal to
    .replace(/±/g, '+/-') // Plus minus
    .replace(/°/g, 'deg') // Degree symbol
    .replace(/©/g, '(c)') // Copyright
    .replace(/®/g, '(R)') // Registered trademark
    .replace(/™/g, '(TM)') // Trademark
    .replace(/"/g, '"') // Smart quotes
    .replace(/"/g, '"') // Smart quotes
    .replace(/'/g, "'") // Smart apostrophe
    .replace(/'/g, "'") // Smart apostrophe
    .replace(/–/g, '-') // En dash
    .replace(/—/g, '--') // Em dash
    .replace(/…/g, '...') // Ellipsis
    .replace(/•/g, '*') // Bullet point
    .replace(/→/g, '->') // Right arrow
    .replace(/←/g, '<-') // Left arrow
    .replace(/↑/g, '^') // Up arrow
    .replace(/↓/g, 'v') // Down arrow
    .replace(/✓/g, '[X]') // Checkmark
    .replace(/✗/g, '[X]') // X mark
    .replace(/○/g, '[ ]') // Empty circle
    .replace(/●/g, '[X]') // Filled circle
    .replace(/★/g, '*') // Star
    .replace(/☆/g, '*') // Empty star
    .replace(/♥/g, '<3') // Heart
    .replace(/♦/g, '<>') // Diamond
    .replace(/♠/g, '^') // Spade
    .replace(/♣/g, '^') // Club
    .replace(/€/g, 'EUR') // Euro
    .replace(/£/g, 'GBP') // Pound
    .replace(/¥/g, 'JPY') // Yen
    .replace(/₹/g, 'INR') // Rupee
    .replace(/₽/g, 'RUB') // Ruble
    .replace(/α/g, 'alpha') // Greek alpha
    .replace(/β/g, 'beta') // Greek beta
    .replace(/γ/g, 'gamma') // Greek gamma
    .replace(/δ/g, 'delta') // Greek delta
    .replace(/ε/g, 'epsilon') // Greek epsilon
    .replace(/π/g, 'pi') // Greek pi
    .replace(/σ/g, 'sigma') // Greek sigma
    .replace(/τ/g, 'tau') // Greek tau
    .replace(/φ/g, 'phi') // Greek phi
    .replace(/ω/g, 'omega'); // Greek omega
}

function formatMarkdownLine(text: string): string {
  // Simple markdown formatting for PDF
  return sanitizeText(text)
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