import { Blueprint } from "@/types/blueprint";

export const sampleBlueprint: Blueprint = {
  id: "default",
  name: "Sample Blueprint",
  updatedAt: Date.now(),
  version: 1,
  phases: [
    { 
      id: "spark", 
      title: "The Spark", 
      summary: "Clarify vision & target.", 
      tasks: [
        { 
          id: "sp-1", 
          title: "Define your one-sentence purpose", 
          done: false, 
          description: "Write a single sentence that captures who you serve and what changes after they use your product/service.",
          tips: ["Who do you serve?", "What changes after they use it?", "Be specific about the transformation"]
        },
        { 
          id: "sp-2", 
          title: "Name + tagline draft", 
          done: false, 
          description: "Create a memorable name and tagline that speaks to the outcome you deliver.",
          tips: ["Memorable, speaks to outcome", "Easy to pronounce and remember", "Check domain availability"]
        },
        {
          id: "sp-3",
          title: "Identify your ideal customer",
          done: false,
          description: "Define the specific person who needs your solution most urgently.",
          tips: ["Demographics and psychographics", "Pain points they experience", "Where they spend time online"]
        },
        {
          id: "sp-4",
          title: "Research competitor landscape",
          done: false,
          description: "Understand what others in your space are doing and find your unique angle.",
          tips: ["Analyze their messaging", "Identify gaps in the market", "Find your differentiation"]
        }
      ]
    },
    { 
      id: "forge", 
      title: "The Forge", 
      summary: "Make it real.", 
      tasks: [
        { 
          id: "fo-1", 
          title: "Buy domain & set up landing", 
          done: false,
          description: "Secure your domain and create a simple landing page that captures interest.",
          tips: ["Keep it simple initially", "Focus on clear value proposition", "Include email capture"]
        },
        { 
          id: "fo-2", 
          title: "Brand kit: colors, logo, thumbnails", 
          done: false,
          description: "Develop consistent visual identity across all touchpoints.",
          tips: ["Choose 2-3 primary colors", "Create simple logo variations", "Design template for content thumbnails"]
        },
        {
          id: "fo-3",
          title: "Set up social media accounts",
          done: false,
          description: "Secure your brand name across key social platforms.",
          tips: ["Use consistent handle across platforms", "Complete all profile information", "Start with 2-3 platforms max"]
        },
        {
          id: "fo-4",
          title: "Create initial content library",
          done: false,
          description: "Build a foundation of content that demonstrates your expertise.",
          tips: ["Plan 10-15 pieces of foundational content", "Mix of formats (text, video, audio)", "Address common questions in your space"]
        }
      ]
    },
    { 
      id: "flow", 
      title: "The Flow", 
      summary: "Create consistent momentum.", 
      tasks: [
        { 
          id: "fl-1", 
          title: "Plan weekly long-form video", 
          done: false,
          description: "Establish a regular schedule for creating valuable video content.",
          tips: ["Pick one consistent day/time", "Plan topics 2-3 weeks ahead", "Keep it educational, not promotional"]
        },
        { 
          id: "fl-2", 
          title: "Define mid-video CTA", 
          done: false, 
          description: "Create a clear call-to-action that appears in the middle of your videos.",
          tips: ["Comment 'Guide' to get the checklist", "Keep it simple and memorable", "Make it valuable, not salesy"]
        },
        {
          id: "fl-3",
          title: "Build email list with lead magnet",
          done: false,
          description: "Create a valuable free resource to attract and capture email addresses.",
          tips: ["Make it highly valuable", "Easy to consume (checklist, guide, template)", "Directly related to your expertise"]
        },
        {
          id: "fl-4",
          title: "Engage with your audience daily",
          done: false,
          description: "Consistently interact with your audience across platforms.",
          tips: ["Reply to comments within 24 hours", "Ask questions to encourage engagement", "Share behind-the-scenes content"]
        }
      ]
    },
    { 
      id: "impact", 
      title: "The Impact", 
      summary: "Launch offers & partnerships.", 
      tasks: [
        { 
          id: "im-1", 
          title: "Set first paid offer", 
          done: false,
          description: "Create your first product or service that generates revenue.",
          tips: ["Start with something simple", "Price it based on value delivered", "Make it easy to purchase"]
        },
        { 
          id: "im-2", 
          title: "Partnership outreach (1/mo)", 
          done: false,
          description: "Reach out to potential partners who serve the same audience.",
          tips: ["Focus on mutual value", "Start with smaller creators", "Be specific about collaboration ideas"]
        },
        {
          id: "im-3",
          title: "Launch referral program",
          done: false,
          description: "Create a system for your customers to refer others to your business.",
          tips: ["Make rewards meaningful", "Keep it simple to understand", "Automate the process when possible"]
        },
        {
          id: "im-4",
          title: "Scale with systems and automation",
          done: false,
          description: "Build systems that allow your business to grow without constant manual work.",
          tips: ["Document your processes", "Use tools to automate repetitive tasks", "Create standard operating procedures"]
        }
      ]
    },
  ]
};
