export interface Experience {
  role: string;
  company: string;
  companyUrl: string;
  period: string;
  location?: string;
  current?: boolean;
  bullets: string[];
  tech: string[];
}

export const experiences: Experience[] = [
  {
    role: "Senior AI Engineer",
    company: "100ms.ai",
    companyUrl: "https://www.100ms.ai",
    period: "Nov 2025 - Present",
    location: "Bengaluru, India",
    current: true,
    bullets: [
      "Building AI agents that automate Adverse Event(AE) and Pharmaceutical Quality Complaint(PQC) workflows -replacing days of manual work per complaint with end-to-end automation",
      "A call recorded with a patient is transcribed, required data is extracted via LLMs, reviewed by operators, submitted through email or web portals; response is parsed for relevant info that'd be relayed back to the stakeholders",
      "Owning features across the full stack -React dashboards, Python AI agents, Go/Temporal orchestration, and gRPC services -learning to navigate four codebases and ship cohesive features",
    ],
    tech: [
      "Golang",
      "Django",
      "React",
      "Python",
      "Temporal",
      "gRPC",
      "Playwright",
      "RPA",
      "Browserbase",
    ],
  },
  {
    role: "Senior Software Engineer",
    company: "Silq",
    companyUrl: "https://www.silq.com",
    period: "Apr 2025 - Oct 2025",
    bullets: [
      "Shipped core product features end-to-end -Task Management, comments, Rate Ingestion, and Auto-Quoting -directly impacting underwriter workflows",
      "Contributed upstream fixes to an open-source datepicker (onesilq/react-date-range), improving date handling across the platform",
    ],
    tech: ["React", "Relay", "GraphQL", "Django"],
  },
  {
    role: "Full Stack Engineer - Video Streaming",
    company: "Pragmatic Play",
    companyUrl: "https://www.pragmaticplay.com",
    period: "Oct 2024 - Apr 2025",
    bullets: [
      "Optimized live video delivery -tuned encoders, CDN routing, ABR ladders, and player configs -reducing buffering and enabling expansion into new regions",
    ],
    tech: ["Video Streaming", "CDN", "Encoders", "HLS"],
  },
  {
    role: "Software Engineer - Web SDK Team",
    company: "100ms.live",
    companyUrl: "https://www.100ms.live",
    period: "Jun 2021 - Oct 2024",
    bullets: [
      "Grew from first full-time role to owning the JavaScript and React SDKs used by thousands of developers to build real-time video apps",
      "Designed the reactive state management layer from scratch -selectors, hooks, store reconciliation -the foundation that made the SDK ergonomic for React developers",
      "Shipped collaborative whiteboard, pre-call diagnostics, real-time polls/quizzes, and viewer-on-stage -each feature taught me to think in distributed systems and real-time UX",
      "Built a WebRTC quality analytics pipeline (subscriber stats, jitter buffer metrics, QoE tracking) that gave the team visibility into call quality across millions of sessions",
      "Learned to build developer tools that balance power with simplicity -wrote docs, examples, and migration guides that reduced support tickets significantly",
    ],
    tech: ["TypeScript", "React", "Next.js", "Svelte", "WebRTC", "Go"],
  },
  {
    role: "Web Developer Intern",
    company: "Gumstack",
    companyUrl: "https://www.gumstack.com",
    period: "Jul 2020 - Dec 2020",
    bullets: [
      "Built end-to-end session booking -availability, templates, payments -my first taste of shipping product features to real users",
      "Implemented multi-channel notifications (email, SMS, WhatsApp) for events, learning to work with third-party APIs and async workflows",
    ],
    tech: ["Ruby on Rails", "React", "Bootstrap"],
  },
];
