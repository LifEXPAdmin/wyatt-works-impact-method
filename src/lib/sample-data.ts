import { Blueprint } from "@/types/blueprint";

export const sampleBlueprint: Blueprint = {
  id: "default",
  name: "My Blueprint",
  updatedAt: Date.now(),
  version: 2,
  phases: [
    {
      id: "spark",
      title: "The Spark",
      summary: "Clarify vision & target.",
      tasks: [
            {
              id: "sp-purpose",
              title: "Define your one-sentence purpose",
              description: "Who you serve + transformation they get. Use AI to brainstorm options, then choose what feels authentic.",
              done: false,
              tips: [
                "AI Prompt: 'I want to help [general audience] with [general problem]. Give me 20 different ways to phrase my one-sentence purpose, focusing on the transformation I create.'",
                "Format: I help [who] go from [now] to [after].",
                "Keep it concrete; avoid buzzwords.",
                "Use AI to generate options, but YOU choose what feels authentic."
              ],
              children: [
                { id: "sp-purpose-1", title: "AI brainstorm: Get 20 purpose statement options", done: false, tips: ["Be specific about your audience and problem"] },
                { id: "sp-purpose-2", title: "Human selection: Pick your top 5 favorites", done: false, tips: ["Add your personal voice and authentic elements"] },
                { id: "sp-purpose-3", title: "AI refinement: Optimize strongest to ≤ 14 words", done: false, tips: ["Ask AI to help avoid buzzwords and generic language"] },
                { id: "sp-purpose-4", title: "Human testing: Share with 2 people in your audience", done: false, tips: ["Get real feedback on emotional impact"] },
                { id: "sp-purpose-5", title: "AI final polish: Create 3 compelling versions", done: false, tips: ["Based on feedback, create final options"] }
              ]
            },
            {
              id: "sp-name",
              title: "Name + tagline draft",
              description: "Memorable name that hints at outcome. Use AI to generate creative options you might not think of.",
              done: false,
              tips: [
                "AI Prompt: 'Help me brainstorm 50 creative names for [your business type] that [your value proposition]. Focus on names that are memorable, brandable, and hint at the outcome I deliver.'",
                "Say it out loud",
                "Check domain + socials",
                "Avoid hard spellings",
                "Use AI to generate creative options you might not think of"
              ],
              children: [
                { id: "sp-name-1", title: "AI brainstorm: Generate 50 creative name options", done: false, tips: ["Be specific about your business type and value proposition"] },
                { id: "sp-name-2", title: "Human filtering: Check domain + social handle availability", done: false, tips: ["Test pronunciation and spelling"] },
                { id: "sp-name-3", title: "AI tagline creation: Generate 20 taglines for chosen name", done: false, tips: ["Focus on key benefits and outcomes"] },
                { id: "sp-name-4", title: "Human testing: Say out loud and test with others", done: false, tips: ["Get feedback on memorability and clarity"] },
                { id: "sp-name-5", title: "AI final polish: Refine name + tagline combination", done: false, tips: ["Make it more memorable and impactful"] }
              ]
            },
            {
              id: "sp-icp",
              title: "Identify your ideal customer",
              description: "Who needs this most urgently. Use AI to think deeper about your audience than you might on your own.",
              done: false,
              tips: [
                "AI Prompt: 'I want to help [your purpose]. What are the 5 most common types of people who need this help? Give me detailed profiles including demographics, psychographics, and pain points.'",
                "Demographics + psychographics",
                "Jobs-to-be-done",
                "Where they hang out",
                "Use AI to think deeper about your audience than you might on your own"
              ],
              children: [
                { id: "sp-icp-1", title: "AI research: Get 5 detailed audience profiles", done: false, tips: ["Include demographics, psychographics, and pain points"] },
                { id: "sp-icp-2", title: "Human selection: Pick the one that resonates most", done: false, tips: ["Add personal insights and observations"] },
                { id: "sp-icp-3", title: "AI deep dive: Create detailed avatar with daily routines", done: false, tips: ["Include fears, aspirations, and language they use"] },
                { id: "sp-icp-4", title: "Human validation: Find 3 real people who match", done: false, tips: ["Test your avatar against real examples"] },
                { id: "sp-icp-5", title: "AI refinement: Make avatar more specific and actionable", done: false, tips: ["Based on real examples, refine the details"] }
              ]
            },
            {
              id: "sp-problem",
              title: "Write the problem statement",
              description: "Plain language, no jargon. Use AI to see the problem from multiple angles.",
              done: false,
              tips: [
                "AI Prompt: 'Help me understand the deeper problems behind [surface problem]. What are the root causes, emotional costs, and hidden consequences?'",
                "Start with: People like [X] struggle to [Y] because [Z].",
                "Make it emotional, not just logical",
                "Use AI to see the problem from multiple angles"
              ],
              children: [
                { id: "sp-problem-1", title: "AI exploration: Understand deeper problems and root causes", done: false, tips: ["Include emotional costs and hidden consequences"] },
                { id: "sp-problem-2", title: "Human prioritization: Rank by urgency and emotional impact", done: false, tips: ["Focus on the most pressing problems"] },
                { id: "sp-problem-3", title: "AI statement crafting: Write 5 different problem statements", done: false, tips: ["Make them emotional, specific, and compelling"] },
                { id: "sp-problem-4", title: "Human testing: Share with your avatar to see which hits hardest", done: false, tips: ["Get feedback on emotional impact"] },
                { id: "sp-problem-5", title: "AI final version: Refine to be more emotionally compelling", done: false, tips: ["Make it specific and personal"] }
              ]
            },
            {
              id: "sp-value-prop",
              title: "Craft your value proposition",
              description: "Why your approach is different & better. Use AI to find your unique angle.",
              done: false,
              tips: [
                "AI Prompt: 'Help me analyze how others solve [your problem]. What are the common approaches, and where are the gaps?'",
                "Unique mechanism",
                "Social proof later",
                "Use AI to find your unique angle"
              ],
              children: [
                { id: "sp-value-1", title: "AI competitive analysis: Analyze how others solve the problem", done: false, tips: ["Identify common approaches and gaps"] },
                { id: "sp-value-2", title: "Human differentiation: Identify what makes you different", done: false, tips: ["Focus on your unique approach"] },
                { id: "sp-value-3", title: "AI value crafting: Create 5 different value propositions", done: false, tips: ["Highlight your unique approach"] },
                { id: "sp-value-4", title: "Human testing: Test with your avatar", done: false, tips: ["Get feedback on believability and appeal"] },
                { id: "sp-value-5", title: "AI final version: Refine to be more compelling and believable", done: false, tips: ["Make it specific and achievable"] }
              ]
            },
            {
              id: "sp-success",
              title: "Define success metrics",
              description: "What 'working' looks like in 90 days. Use AI to think about metrics you might miss.",
              done: false,
              tips: [
                "AI Prompt: 'For a [your business type] that [your purpose], what are the most important metrics to track? Include both leading and lagging indicators.'",
                "Pick 3: email list, watch time, first sale, retention",
                "Use AI to think about metrics you might miss"
              ],
              children: [
                { id: "sp-success-1", title: "AI metric brainstorming: Get comprehensive metric suggestions", done: false, tips: ["Include both leading and lagging indicators"] },
                { id: "sp-success-2", title: "Human prioritization: Pick your top 3 metrics", done: false, tips: ["Choose metrics that matter to your business"] },
                { id: "sp-success-3", title: "AI target setting: Set realistic 90-day targets", done: false, tips: ["Break down by month with achievable milestones"] },
                { id: "sp-success-4", title: "Human system setup: Create your tracking system", done: false, tips: ["Set up tools and processes to measure"] },
                { id: "sp-success-5", title: "AI review process: Create weekly review system", done: false, tips: ["Plan how to track and adjust regularly"] }
              ]
            },
            {
              id: "sp-competitors",
              title: "Research competitor landscape",
              description: "Understand what's already out there to find your unique angle. Use AI to analyze competitors more thoroughly.",
              done: false,
              tips: [
                "AI Prompt: 'Help me identify 10 competitors for [your business type] that [your purpose]. Include both direct and indirect competitors.'",
                "Analyze their messaging",
                "Identify gaps in the market",
                "Use AI to analyze competitors more thoroughly"
              ],
              children: [
                { id: "sp-competitors-1", title: "AI competitor identification: Get 10 competitor profiles", done: false, tips: ["Include both direct and indirect competitors"] },
                { id: "sp-competitors-2", title: "Human analysis: Study their messaging and content", done: false, tips: ["Look at their value propositions and positioning"] },
                { id: "sp-competitors-3", title: "AI gap analysis: Find what competitors are missing", done: false, tips: ["Identify gaps and underserved niches"] },
                { id: "sp-competitors-4", title: "Human positioning: Find your unique angle", done: false, tips: ["Focus on what makes you different"] },
                { id: "sp-competitors-5", title: "AI strategy: Create differentiation strategy", done: false, tips: ["Position yourself against competitors"] }
              ]
            },
            {
              id: "sp-content-pillars",
              title: "Create your content pillars",
              description: "Know what you'll talk about before you start creating content. Use AI to think about content from your audience's perspective.",
              done: false,
              tips: [
                "AI Prompt: 'Help me brainstorm 30 content ideas for [your avatar] who [your problem]. What do they need to know, understand, and feel?'",
                "Answer top questions",
                "Mix formats",
                "Use AI to think about content from your audience's perspective"
              ],
              children: [
                { id: "sp-content-1", title: "AI content brainstorming: Generate 30 content ideas", done: false, tips: ["Focus on what your avatar needs to know"] },
                { id: "sp-content-2", title: "Human grouping: Organize into 3-5 content pillars", done: false, tips: ["Each pillar should serve a different purpose"] },
                { id: "sp-content-3", title: "AI pillar refinement: Make pillars more specific", done: false, tips: ["Define what each pillar achieves"] },
                { id: "sp-content-4", title: "Human calendar: Create 30-day content calendar", done: false, tips: ["Plan your content mix"] },
                { id: "sp-content-5", title: "AI optimization: Optimize for maximum engagement", done: false, tips: ["Balance education, inspiration, and entertainment"] }
              ]
            },
            {
              id: "sp-foundation-systems",
              title: "Set up your foundation systems",
              description: "Basic systems in place before you start creating content. Use AI to think about systems you might need.",
              done: false,
              tips: [
                "AI Prompt: 'For a [your business type] that [your purpose], what systems and tools do I need to set up? Include content creation, distribution, and tracking.'",
                "Choose your primary platform",
                "Set up basic profiles",
                "Use AI to think about systems you might need"
              ],
              children: [
                { id: "sp-systems-1", title: "AI system planning: Get comprehensive system recommendations", done: false, tips: ["Include content creation, distribution, and tracking"] },
                { id: "sp-systems-2", title: "Human selection: Choose your tools and platforms", done: false, tips: ["Start with one platform, master it, then expand"] },
                { id: "sp-systems-3", title: "AI workflow creation: Create content workflow", done: false, tips: ["Include creation, review, and distribution"] },
                { id: "sp-systems-4", title: "Human setup: Set up your systems", done: false, tips: ["Keep branding consistent across platforms"] },
                { id: "sp-systems-5", title: "AI optimization: Optimize workflow for efficiency", done: false, tips: ["Create templates to save time"] }
              ]
            },
            {
              id: "sp-first-content",
              title: "Create your first content piece",
              description: "Proof of concept - can you actually deliver on your promise? Use AI to create something truly remarkable.",
              done: false,
              tips: [
                "AI Prompt: 'Help me plan my first [content type] about [your topic]. What should the structure be? What key points should I cover?'",
                "Start simple, don't overcomplicate",
                "Focus on value, not perfection",
                "Use AI to create something truly remarkable"
              ],
              children: [
                { id: "sp-first-1", title: "AI content planning: Plan structure and key points", done: false, tips: ["Define the format and main topics"] },
                { id: "sp-first-2", title: "Human creation: Create content with AI guidance", done: false, tips: ["Focus on value delivery"] },
                { id: "sp-first-3", title: "AI review: Review for clarity and engagement", done: false, tips: ["Get feedback on structure and flow"] },
                { id: "sp-first-4", title: "Human refinement: Make improvements based on feedback", done: false, tips: ["Add your personal touch"] },
                { id: "sp-first-5", title: "AI distribution: Create distribution plan", done: false, tips: ["Plan how to reach your avatar effectively"] }
              ]
            },
            {
              id: "sp-brand-voice",
              title: "Define your brand voice & tone",
              description: "How you communicate should reflect your values and resonate with your audience. Use AI to explore different voice options.",
              done: false,
              tips: [
                "AI Prompt: 'Help me define 5 different brand voices for [your business type] that serves [your avatar]. Include tone, personality traits, and communication style.'",
                "Reflect your values",
                "Resonate with your audience",
                "Use AI to explore different voice options"
              ],
              children: [
                { id: "sp-voice-1", title: "AI voice exploration: Generate 5 different brand voices", done: false, tips: ["Include tone, personality, and communication style"] },
                { id: "sp-voice-2", title: "Human selection: Pick the voice that feels authentic", done: false, tips: ["Choose what reflects your values"] },
                { id: "sp-voice-3", title: "AI refinement: Develop detailed voice guidelines", done: false, tips: ["Create specific examples and guidelines"] },
                { id: "sp-voice-4", title: "Human testing: Test with your avatar", done: false, tips: ["Get feedback on resonance and clarity"] },
                { id: "sp-voice-5", title: "AI documentation: Create voice style guide", done: false, tips: ["Document examples and guidelines for consistency"] }
              ]
            }
      ]
    },

    {
      id: "forge",
      title: "The Forge",
      summary: "Make it real.",
      tasks: [
        {
          id: "fo-domain",
          title: "Buy domain & set up landing",
          description: "Simple page with one core CTA.",
          done: false,
          tips: ["Single headline + subhead + one CTA", "Email capture optional"],
          children: [
            { id: "fo-domain-1", title: "Purchase domain", done: false },
            { id: "fo-domain-2", title: "Deploy landing (Vercel/Next)", done: false },
            { id: "fo-domain-3", title: "Add analytics (Plausible)", done: false }
          ]
        },
        {
          id: "fo-brand",
          title: "Brand kit: colors, logo, thumbnails",
          description: "Consistent visual identity.",
          done: false,
          tips: ["Choose 2–3 colors", "Design simple wordmark", "Thumbnail template"],
          children: [
            { id: "fo-brand-1", title: "Pick palette (primary/neutral/accent)", done: false },
            { id: "fo-brand-2", title: "Create wordmark logo", done: false },
            { id: "fo-brand-3", title: "YouTube thumbnail base template", done: false }
          ]
        },
        {
          id: "fo-socials",
          title: "Set up social accounts",
          description: "Lock your handle & bios.",
          done: false,
          tips: ["Same handle everywhere", "Bio = outcome you deliver"],
          children: [
            { id: "fo-socials-1", title: "Create/claim handles (YouTube, IG, X, TikTok)", done: false },
            { id: "fo-socials-2", title: "Upload banner/avatar", done: false },
            { id: "fo-socials-3", title: "Pin intro post", done: false }
          ]
        },
        {
          id: "fo-content-lib",
          title: "Create initial content library",
          description: "10–15 foundation pieces.",
          done: false,
          tips: ["Answer top questions", "Mix formats"],
          children: [
            { id: "fo-content-1", title: "List 15 FAQs from audience", done: false },
            { id: "fo-content-2", title: "Write 5 scripts/outlines", done: false },
            { id: "fo-content-3", title: "Record first long-form video", done: false }
          ]
        }
      ]
    },

    {
      id: "flow",
      title: "The Flow",
      summary: "Create consistent momentum.",
      tasks: [
        {
          id: "fl-weekly-video",
          title: "Plan weekly long-form video",
          description: "One cornerstone per week.",
          done: false,
          tips: ["Same day/time weekly", "3 weeks of topics ready"],
          children: [
            { id: "fl-weekly-1", title: "Create repeating calendar block", done: false },
            { id: "fl-weekly-2", title: "Draft next 3 titles", done: false },
            { id: "fl-weekly-3", title: "Prepare A/B thumbnail concepts", done: false }
          ]
        },
        {
          id: "fl-mid-cta",
          title: "Define mid-video CTA",
          description: "Organic, simple, valuable.",
          done: false,
          tips: ["Ex: Comment 'Guide' to get the checklist", "Place around Minute 4–6"],
          children: [
            { id: "fl-mid-cta-1", title: "Write 2 CTA lines", done: false },
            { id: "fl-mid-cta-2", title: "Add on-screen lower-third", done: false }
          ]
        },
        {
          id: "fl-email",
          title: "Build email list with lead magnet",
          description: "Deliver the blueprint PDF/MD.",
          done: false,
          tips: ["Make it truly useful", "Short and actionable"],
          children: [
            { id: "fl-email-1", title: "Set up capture form", done: false },
            { id: "fl-email-2", title: "Auto-deliver PDF via email", done: false }
          ]
        },
        {
          id: "fl-engage",
          title: "Engage daily with your audience",
          description: "Reply, ask, listen.",
          done: false,
          tips: ["Reply within 24h", "Ask questions", "Share behind-the-scenes"],
          children: [
            { id: "fl-engage-1", title: "Set 15-min daily engage block", done: false },
            { id: "fl-engage-2", title: "Create 5 engagement questions", done: false }
          ]
        }
      ]
    },

    {
      id: "impact",
      title: "The Impact",
      summary: "Launch offers & partnerships.",
      tasks: [
        {
          id: "im-offer",
          title: "Set first paid offer",
          description: "Simple, clear, easy to buy.",
          done: false,
          tips: ["Price based on value", "Start small, iterate"],
          children: [
            { id: "im-offer-1", title: "Define offer & deliverables", done: false },
            { id: "im-offer-2", title: "Create checkout page", done: false }
          ]
        },
        {
          id: "im-partner",
          title: "Partnership outreach (1/mo)",
          description: "Mutual value; start small.",
          done: false,
          tips: ["Be specific about collaboration idea"],
          children: [
            { id: "im-partner-1", title: "List 10 targets", done: false },
            { id: "im-partner-2", title: "Send 3 pitches", done: false }
          ]
        },
        {
          id: "im-referrals",
          title: "Launch referral program",
          description: "Make sharing meaningful & simple.",
          done: false,
          tips: ["Easy to explain in 1 sentence"],
          children: [
            { id: "im-referrals-1", title: "Define reward", done: false },
            { id: "im-referrals-2", title: "Create referral page", done: false }
          ]
        },
        {
          id: "im-systems",
          title: "Scale with systems & automation",
          description: "Document processes to grow without chaos.",
          done: false,
          tips: ["SOPs + light automation"],
          children: [
            { id: "im-systems-1", title: "Write 3 SOPs (publish cadence, comments, uploads)", done: false },
            { id: "im-systems-2", title: "Automate 1 repetitive task", done: false }
          ]
        }
      ]
    }
  ]
};
