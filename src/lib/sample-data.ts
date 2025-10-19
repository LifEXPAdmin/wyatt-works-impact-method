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
          id: "fo-product-core",
          title: "Build your core product/service",
          description: "Create the actual deliverable that solves your audience's problem. Use AI to think through product development systematically.",
          done: false,
          notes: "This is where you transform your idea into something real that people can actually use. Focus on creating something that delivers genuine value to your specific audience. Don't overcomplicate - start with the core problem you're solving and build from there.",
          tips: [
            "AI Prompt: 'Help me design a [product/service type] that solves [specific problem] for [your avatar]. What are the essential features, user experience, and delivery method? Include pricing strategy and competitive advantages.'",
            "Start with MVP - minimum viable product that solves the core problem",
            "Focus on core value delivery over fancy features",
            "Use AI to think through product development systematically",
            "Consider both digital and physical delivery methods",
            "Think about scalability from day one"
          ],
          children: [
            { 
              id: "fo-product-1", 
              title: "AI product design: Define core features and user experience", 
              done: false, 
              notes: "Use AI to brainstorm features you might not think of. Focus on what your avatar actually needs, not what you think is cool.",
              tips: [
                "AI Prompt: 'I want to create a [product/service] for [your avatar] who struggles with [specific problem]. List 20 essential features, 10 nice-to-have features, and 5 features to avoid. Explain the user journey from discovery to success.'",
                "Focus on solving the main problem effectively",
                "Consider the user's technical skill level",
                "Think about accessibility and ease of use"
              ] 
            },
            { 
              id: "fo-product-2", 
              title: "Human creation: Build your MVP version", 
              done: false, 
              notes: "This is where you actually build something. Start simple - you can always add features later. Focus on making it work well for your core use case.",
              tips: [
                "Start simple, iterate based on feedback",
                "Use tools you're comfortable with",
                "Focus on core functionality first",
                "Don't worry about perfection - worry about functionality"
              ] 
            },
            { 
              id: "fo-product-3", 
              title: "AI testing plan: Create user testing strategy", 
              done: false, 
              notes: "Testing is crucial. Use AI to help you think through what to test and how to test it. You need real feedback from real users.",
              tips: [
                "AI Prompt: 'I've built a [product/service] for [your avatar]. Create a comprehensive testing plan including what to test, who to test with, what questions to ask, and how to measure success.'",
                "Define how to validate with real users",
                "Test with people who match your avatar",
                "Focus on usability and value delivery"
              ] 
            },
            { 
              id: "fo-product-4", 
              title: "Human refinement: Improve based on testing", 
              done: false, 
              notes: "Take the feedback seriously. Your users will tell you what's working and what's not. Don't get defensive - get better.",
              tips: [
                "Focus on user feedback and pain points",
                "Prioritize changes that improve core value",
                "Don't try to please everyone",
                "Focus on the biggest pain points first"
              ] 
            },
            { 
              id: "fo-product-5", 
              title: "AI optimization: Optimize for maximum value delivery", 
              done: false, 
              notes: "Once you have something that works, use AI to help you optimize it. Look for ways to deliver more value with less effort.",
              tips: [
                "AI Prompt: 'My [product/service] currently [current state]. How can I optimize it to deliver more value to [your avatar] while reducing complexity and effort? Focus on automation, efficiency, and user experience improvements.'",
                "Enhance user experience and outcomes",
                "Look for automation opportunities",
                "Focus on the 80/20 rule - what 20% of features deliver 80% of value?"
              ] 
            }
          ]
        },
        {
          id: "fo-brand-identity",
          title: "Create complete brand identity",
          description: "Visual identity that reflects your values and resonates with your audience. Use AI to explore creative directions.",
          done: false,
          notes: "Your brand identity is how people recognize and remember you. It's not just colors and fonts - it's the feeling people get when they interact with your brand. Make sure it authentically represents who you are and what you stand for.",
          tips: [
            "AI Prompt: 'Help me create a brand identity for [your business] that serves [your avatar]. Include color psychology, typography choices, visual style, and brand personality that reflects [your values]. Create 5 different directions with specific color palettes and style descriptions.'",
            "Colors should evoke the right emotions for your audience",
            "Typography should match your voice and personality",
            "Use AI to explore creative directions you might not consider",
            "Consider how your brand will look across different platforms",
            "Think about accessibility and readability"
          ],
          children: [
            { 
              id: "fo-brand-1", 
              title: "AI brand exploration: Generate 5 different brand directions", 
              done: false, 
              notes: "Let AI help you explore directions you might not think of. Don't limit yourself to what you think you should do - explore what could work.",
              tips: [
                "AI Prompt: 'I'm creating a brand for [your business] that serves [your avatar]. Generate 5 completely different brand directions including: 1) Professional & trustworthy, 2) Creative & innovative, 3) Warm & approachable, 4) Bold & disruptive, 5) Minimalist & elegant. For each, include color psychology, typography suggestions, and visual style descriptions.'",
                "Include color psychology and visual style",
                "Consider different personality types",
                "Think about your competition and how to stand out"
              ] 
            },
            { 
              id: "fo-brand-2", 
              title: "Human selection: Choose direction that feels authentic", 
              done: false, 
              notes: "This is where your human judgment is crucial. Pick the direction that feels like 'you' - not what you think you should be, but what you actually are.",
              tips: [
                "Pick what reflects your values and resonates",
                "Consider which direction you could maintain long-term",
                "Think about how it makes you feel",
                "Consider your audience's preferences"
              ] 
            },
            { 
              id: "fo-brand-3", 
              title: "AI color palette: Create 3-color palette with psychology", 
              done: false, 
              notes: "Colors have psychological effects. Use AI to help you understand what colors will evoke the right emotions in your audience.",
              tips: [
                "AI Prompt: 'I've chosen [brand direction] for my [business type]. Create a 3-color palette (primary, secondary, accent) that will evoke [specific emotions] in [your avatar]. Explain the psychology behind each color choice and how they work together.'",
                "Primary, secondary, accent colors with meaning",
                "Consider accessibility and contrast",
                "Think about how colors work across different media"
              ] 
            },
            { 
              id: "fo-brand-4", 
              title: "Human logo creation: Design wordmark and symbol", 
              done: false, 
              notes: "Your logo is often the first thing people see. Keep it simple, memorable, and scalable. It should work at any size and in any context.",
              tips: [
                "Keep it simple and memorable",
                "Make sure it works in black and white",
                "Consider how it will look on different backgrounds",
                "Test it at different sizes"
              ] 
            },
            { 
              id: "fo-brand-5", 
              title: "AI style guide: Create comprehensive brand guidelines", 
              done: false, 
              notes: "Document everything so you can be consistent. This will save you time and ensure your brand looks professional across all touchpoints.",
              tips: [
                "AI Prompt: 'Create a comprehensive brand style guide for [your business] including: logo usage rules, color specifications, typography guidelines, spacing rules, do's and don'ts, and examples of correct and incorrect usage.'",
                "Document colors, fonts, usage rules",
                "Include examples of correct and incorrect usage",
                "Make it easy for others to follow"
              ] 
            }
          ]
        },
        {
          id: "fo-digital-presence",
          title: "Build your digital foundation",
          description: "Website, domain, and essential digital assets. Use AI to optimize for your specific audience.",
          done: false,
          tips: [
            "AI Prompt: 'Help me plan a website structure for [your business] that serves [your avatar]. What pages do I need? What should the user journey be?'",
            "Start with essential pages only",
            "Optimize for your audience's needs",
            "Use AI to optimize for your specific audience"
          ],
          children: [
            { id: "fo-digital-1", title: "AI website planning: Design site structure and user journey", done: false, tips: ["Focus on essential pages and clear navigation"] },
            { id: "fo-digital-2", title: "Human domain selection: Choose and purchase domain", done: false, tips: ["Match your brand name, check availability"] },
            { id: "fo-digital-3", title: "AI content creation: Write homepage and key page copy", done: false, tips: ["Focus on value proposition and clear CTAs"] },
            { id: "fo-digital-4", title: "Human development: Build and deploy website", done: false, tips: ["Keep it simple, focus on functionality"] },
            { id: "fo-digital-5", title: "AI optimization: Optimize for SEO and user experience", done: false, tips: ["Improve loading speed and mobile experience"] }
          ]
        },
        {
          id: "fo-social-foundation",
          title: "Establish social media presence",
          description: "Set up and optimize your social platforms. Use AI to create platform-specific strategies.",
          done: false,
          tips: [
            "AI Prompt: 'Help me create a social media strategy for [your business] on [platform]. What content types work best? How should I engage with [your avatar]?'",
            "Choose 2-3 platforms max",
            "Optimize for each platform's culture",
            "Use AI to create platform-specific strategies"
          ],
          children: [
            { id: "fo-social-1", title: "AI platform analysis: Choose best platforms for your audience", done: false, tips: ["Focus on where your avatar spends time"] },
            { id: "fo-social-2", title: "Human account setup: Create and optimize profiles", done: false, tips: ["Consistent branding, clear bio, professional images"] },
            { id: "fo-social-3", title: "AI content strategy: Create platform-specific content plans", done: false, tips: ["Different content for different platforms"] },
            { id: "fo-social-4", title: "Human profile optimization: Complete all profile sections", done: false, tips: ["Bio, links, highlights, pinned content"] },
            { id: "fo-social-5", title: "AI engagement plan: Create engagement and community strategy", done: false, tips: ["How to build relationships and community"] }
          ]
        },
        {
          id: "fo-content-framework",
          title: "Develop content creation framework",
          description: "Systematic approach to creating valuable content. Use AI to build efficient content workflows.",
          done: false,
          tips: [
            "AI Prompt: 'Help me create a content framework for [your business] that serves [your avatar]. What content formats work best? How can I create content efficiently?'",
            "Focus on value over volume",
            "Create reusable templates",
            "Use AI to build efficient content workflows"
          ],
          children: [
            { id: "fo-content-1", title: "AI content audit: Analyze what content your avatar needs", done: false, tips: ["Focus on their biggest questions and pain points"] },
            { id: "fo-content-2", title: "Human template creation: Build content templates and frameworks", done: false, tips: ["Create reusable formats for efficiency"] },
            { id: "fo-content-3", title: "AI workflow design: Create content creation and approval process", done: false, tips: ["Streamline from idea to publication"] },
            { id: "fo-content-4", title: "Human tool selection: Choose content creation tools", done: false, tips: ["Video, design, writing tools that fit your style"] },
            { id: "fo-content-5", title: "AI quality system: Create content quality and consistency standards", done: false, tips: ["Ensure all content meets your brand standards"] }
          ]
        },
        {
          id: "fo-audience-research",
          title: "Deep dive into your audience",
          description: "Understand your audience's behavior, preferences, and pain points. Use AI to uncover insights you might miss.",
          done: false,
          tips: [
            "AI Prompt: 'Help me research [your avatar] more deeply. What are their daily routines, frustrations, goals, and how do they consume content?'",
            "Go beyond demographics",
            "Understand their content consumption habits",
            "Use AI to uncover insights you might miss"
          ],
          children: [
            { id: "fo-audience-1", title: "AI behavior analysis: Map audience daily routines and habits", done: false, tips: ["Understand when and how they consume content"] },
            { id: "fo-audience-2", title: "Human validation: Interview 3-5 people who match your avatar", done: false, tips: ["Get real insights from real people"] },
            { id: "fo-audience-3", title: "AI preference mapping: Understand content format preferences", done: false, tips: ["What types of content do they engage with most"] },
            { id: "fo-audience-4", title: "Human pain point analysis: Identify biggest frustrations", done: false, tips: ["Focus on problems your product solves"] },
            { id: "fo-audience-5", title: "AI insight synthesis: Create comprehensive audience profile", done: false, tips: ["Combine all research into actionable insights"] }
          ]
        },
        {
          id: "fo-value-delivery",
          title: "Design your value delivery system",
          description: "How you'll consistently deliver value to your audience. Use AI to optimize the delivery experience.",
          done: false,
          tips: [
            "AI Prompt: 'Help me design a value delivery system for [your business]. How can I consistently provide value to [your avatar] through [your product/service]?'",
            "Focus on consistent quality",
            "Make value delivery scalable",
            "Use AI to optimize the delivery experience"
          ],
          children: [
            { id: "fo-value-1", title: "AI delivery mapping: Map the complete value delivery journey", done: false, tips: ["From first contact to ongoing value"] },
            { id: "fo-value-2", title: "Human system design: Create delivery processes and systems", done: false, tips: ["Make it consistent and reliable"] },
            { id: "fo-value-3", title: "AI quality standards: Define quality benchmarks and checkpoints", done: false, tips: ["Ensure consistent high-quality delivery"] },
            { id: "fo-value-4", title: "Human feedback loops: Create systems to gather and act on feedback", done: false, tips: ["Continuously improve based on user input"] },
            { id: "fo-value-5", title: "AI optimization: Optimize for maximum impact and efficiency", done: false, tips: ["Improve outcomes while reducing effort"] }
          ]
        },
        {
          id: "fo-competitive-positioning",
          title: "Establish competitive positioning",
          description: "Define how you're different and better than alternatives. Use AI to find your unique positioning.",
          done: false,
          tips: [
            "AI Prompt: 'Help me analyze my competitive landscape for [your business]. What are the common approaches, and how can I position myself as uniquely valuable?'",
            "Focus on what makes you different",
            "Avoid competing on price alone",
            "Use AI to find your unique positioning"
          ],
          children: [
            { id: "fo-positioning-1", title: "AI competitive analysis: Analyze direct and indirect competitors", done: false, tips: ["Understand their approaches and positioning"] },
            { id: "fo-positioning-2", title: "Human differentiation: Identify your unique advantages", done: false, tips: ["What makes you different and better"] },
            { id: "fo-positioning-3", title: "AI positioning strategy: Create compelling positioning statement", done: false, tips: ["Clear, differentiated, and believable"] },
            { id: "fo-positioning-4", title: "Human validation: Test positioning with your avatar", done: false, tips: ["Get feedback on clarity and appeal"] },
            { id: "fo-positioning-5", title: "AI messaging framework: Create consistent messaging across channels", done: false, tips: ["Ensure all communication reinforces positioning"] }
          ]
        },
        {
          id: "fo-operational-systems",
          title: "Build operational foundation",
          description: "Systems and processes to run your business efficiently. Use AI to identify essential operations.",
          done: false,
          tips: [
            "AI Prompt: 'Help me identify the essential operational systems I need for [your business type]. What processes, tools, and systems will I need to run efficiently?'",
            "Start with core operations",
            "Document everything",
            "Use AI to identify essential operations"
          ],
          children: [
            { id: "fo-operations-1", title: "AI system mapping: Identify all essential business operations", done: false, tips: ["From customer acquisition to delivery"] },
            { id: "fo-operations-2", title: "Human tool selection: Choose tools and software for each system", done: false, tips: ["Start simple, scale as needed"] },
            { id: "fo-operations-3", title: "AI process design: Create standard operating procedures", done: false, tips: ["Document key processes for consistency"] },
            { id: "fo-operations-4", title: "Human system setup: Implement and test all systems", done: false, tips: ["Ensure everything works together smoothly"] },
            { id: "fo-operations-5", title: "AI optimization: Optimize workflows for efficiency", done: false, tips: ["Reduce friction and improve outcomes"] }
          ]
        },
        {
          id: "fo-quality-assurance",
          title: "Establish quality standards",
          description: "Define and implement quality standards for everything you create. Use AI to create quality frameworks.",
          done: false,
          tips: [
            "AI Prompt: 'Help me create quality standards for [your business]. What should I measure? How can I ensure consistent quality across all deliverables?'",
            "Define measurable standards",
            "Create quality checklists",
            "Use AI to create quality frameworks"
          ],
          children: [
            { id: "fo-quality-1", title: "AI standard definition: Create quality benchmarks for all deliverables", done: false, tips: ["Define what 'good' looks like"] },
            { id: "fo-quality-2", title: "Human checklist creation: Build quality assurance checklists", done: false, tips: ["Make quality checking systematic"] },
            { id: "fo-quality-3", title: "AI testing protocols: Design testing and validation processes", done: false, tips: ["How to verify quality before delivery"] },
            { id: "fo-quality-4", title: "Human implementation: Train yourself on quality standards", done: false, tips: ["Make quality a habit, not an afterthought"] },
            { id: "fo-quality-5", title: "AI continuous improvement: Create feedback loops for quality enhancement", done: false, tips: ["Continuously improve based on results"] }
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
