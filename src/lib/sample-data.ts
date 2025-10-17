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
          description: "Who you serve + transformation they get.",
          done: false,
          tips: [
            "Format: I help [who] go from [now] to [after].",
            "Keep it concrete; avoid buzzwords."
          ],
          children: [
            { id: "sp-purpose-1", title: "Write 5 rough versions", done: false, tips: ["Aim for short, punchy lines"] },
            { id: "sp-purpose-2", title: "Pick the strongest & refine to ≤ 14 words", done: false },
            { id: "sp-purpose-3", title: "Gut-check with 2 friends in your audience", done: false }
          ]
        },
        {
          id: "sp-name",
          title: "Name + tagline draft",
          description: "Memorable name that hints at outcome.",
          done: false,
          tips: ["Say it out loud", "Check domain + socials", "Avoid hard spellings"],
          children: [
            { id: "sp-name-1", title: "Brainstorm 20 names", done: false },
            { id: "sp-name-2", title: "Check domain + social handle availability", done: false },
            { id: "sp-name-3", title: "Write a 5-word tagline", done: false }
          ]
        },
        {
          id: "sp-icp",
          title: "Identify your ideal customer",
          description: "Who needs this most urgently.",
          done: false,
          tips: ["Demographics + psychographics", "Jobs-to-be-done", "Where they hang out"],
          children: [
            { id: "sp-icp-1", title: "List 3 core pains", done: false },
            { id: "sp-icp-2", title: "List 3 desired outcomes", done: false },
            { id: "sp-icp-3", title: "List 3 watering holes (YouTube, Reddit…)", done: false }
          ]
        },
        {
          id: "sp-problem",
          title: "Write the problem statement",
          description: "Plain language, no jargon.",
          done: false,
          tips: ["Start with: People like [X] struggle to [Y] because [Z]."],
          children: [
            { id: "sp-problem-1", title: "Draft 3 versions", done: false },
            { id: "sp-problem-2", title: "Pick the clearest one", done: false }
          ]
        },
        {
          id: "sp-value-prop",
          title: "Craft your value proposition",
          description: "Why your approach is different & better.",
          done: false,
          tips: ["Unique mechanism", "Social proof later"],
          children: [
            { id: "sp-value-1", title: "Unique mechanism (1 sentence)", done: false },
            { id: "sp-value-2", title: "3 proof points you can back up", done: false }
          ]
        },
        {
          id: "sp-success",
          title: "Define success metrics",
          description: "What 'working' looks like in 90 days.",
          done: false,
          tips: ["Pick 3: email list, watch time, first sale, retention"],
          children: [
            { id: "sp-success-1", title: "Choose 3 metrics", done: false },
            { id: "sp-success-2", title: "Set weekly targets", done: false }
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