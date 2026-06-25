export type ProjectTier = "featured" | "standard" | "compact";
export type ProjectDomain =
  | "ml-ai"
  | "security"
  | "systems"
  | "fullstack"
  | "research";

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  tier: ProjectTier;
  domain: ProjectDomain;
  domains: string[];
  tech: string[];
  metrics?: string[];
  links?: { github?: string; demo?: string; paper?: string };
  score: number;
  year?: string;
}

export const projects: Project[] = [
  // ── FEATURED ──────────────────────────────────────────────────────────────
  {
    id: "signbridge",
    name: "SignBridge",
    tagline: "Real-time ASL recognition with live hardware loop",
    description:
      "Four-tier architecture: MediaPipe hand landmarks → Random Forest classifier with 8-frame sliding-window majority voting → Flask-SocketIO web interface → Raspberry Pi Pico OLED via MicroPython. Bidirectional — signs become text, text triggers OLED gestures. Ships with a 75,000-word prefix-trie prediction dictionary.",
    tier: "featured",
    domain: "ml-ai",
    domains: ["AI / ML", "Embedded Systems"],
    tech: ["Python", "MediaPipe", "scikit-learn", "Flask-SocketIO", "Raspberry Pi Pico", "MicroPython", "OpenCV"],
    metrics: [">95% accuracy", "<50ms inference", "8-frame majority window", "75K trie dictionary"],
    score: 9.2,
    year: "2025",
    links: { github: "https://github.com/francisreubenr-rvu/SignBridge" },
  },
  {
    id: "emet",
    name: "EMET",
    tagline: "Enterprise zero-day cybersecurity intelligence platform",
    description:
      "Ingests Nmap, Rustscan, Nuclei, and Nikto output and transforms raw scanner data into EPSS/CISA KEV-scored risk intelligence. LangChain RAG drives AI-powered remediation guidance. Multi-tenant RBAC, Docker deployment, and SOC2/ISO27001/HIPAA/GDPR compliance mapping with Jira and ServiceNow integration.",
    tier: "featured",
    domain: "security",
    domains: ["Cybersecurity", "Full-Stack"],
    tech: ["Next.js", "FastAPI", "PostgreSQL", "Redis", "LangChain", "Gemini", "Docker", "Nuclei", "Nmap"],
    metrics: ["4 scanner integrations", "EPSS + CISA KEV scoring", "Multi-tenant RBAC", "RAG remediation"],
    score: 9.0,
    year: "2025",
    links: { github: "https://github.com/francisreubenr-rvu/Emet" },
  },
  {
    id: "strings",
    name: "Strings",
    tagline: "Webcam-powered guitar learning with real-time CV and audio",
    description:
      "Browser-native guitar tutor using MediaPipe Hands for finger placement overlays and a custom FFT chromagram (Pitchy + Web Audio API) for live chord recognition. 27-chapter curriculum, public-domain song library, AI tutor via OpenRouter, chromatic tuner with cents display, freemium model, and leaderboard.",
    tier: "featured",
    domain: "ml-ai",
    domains: ["AI / ML", "Full-Stack", "Audio"],
    tech: ["Next.js 15", "Supabase", "MediaPipe Hands", "Web Audio API", "FFT Chromagram", "OpenRouter", "Tailwind CSS"],
    metrics: ["27 chapters · 135 lessons · 12 songs", "100% client-side", "Real-time chord recognition", "Freemium + leaderboard"],
    score: 8.8,
    year: "2025",
    links: { github: "https://github.com/francisreubenr-rvu/strings-guitar" },
  },
  {
    id: "ruview",
    name: "RuView",
    tagline: "Contactless human sensing through walls via WiFi CSI",
    description:
      "ESP32-S3 captures WiFi Channel State Information and runs DSP pipelines to detect presence, breathing, heart rate, activity, and sleep staging — no cameras, no wearables, through walls. Spiking neural networks adapt to environment in <30 seconds. Ed25519 cryptographic attestation chain. 8 KB quantized model on HuggingFace.",
    tier: "featured",
    domain: "systems",
    domains: ["Embedded Systems", "AI / ML"],
    tech: ["Rust 1.85+", "ESP32-S3", "WiFi CSI", "Spiking Neural Networks", "HuggingFace", "Docker", "Ed25519"],
    metrics: ["100% presence accuracy", "1,463 tests passed", "8 KB model (4-bit)", "<30s environment adaptation"],
    score: 8.7,
    year: "2025",
    links: { github: "#" },
  },

  // ── STANDARD ──────────────────────────────────────────────────────────────
  {
    id: "openclaude",
    name: "OpenClaude",
    tagline: "Terminal-first AI coding agent with 6-provider support",
    description:
      "Open alternative to Claude Code supporting OpenAI, Gemini, GitHub Models, Codex, Ollama, and Atomic Chat through a unified workflow. Ships with prompts, bash/file tools, grep/glob, agents, tasks, MCP orchestration, slash commands, and a VS Code extension for launch integration.",
    tier: "standard",
    domain: "fullstack",
    domains: ["Developer Tools", "AI / ML"],
    tech: ["TypeScript", "Node.js", "MCP", "VS Code Extension API", "Python"],
    metrics: ["6+ provider support", "Full MCP orchestration"],
    score: 8.5,
    year: "2025",
    links: { github: "https://github.com/francisreubenr-rvu" },
  },
  {
    id: "claw-code",
    name: "Claw Code",
    tagline: "Complete Rust workspace reimplementation of Claude Code",
    description:
      "Seven-crate modular Cargo workspace: api-client, runtime, tools, commands, plugins, compat-harness, and interactive REPL. MCP orchestration, OAuth, and a plugin pipeline. Built as an overnight sprint when source leaked.",
    tier: "standard",
    domain: "systems",
    domains: ["Systems Programming", "Developer Tools"],
    tech: ["Rust", "Cargo workspace", "MCP", "OAuth", "REPL"],
    metrics: ["7-crate modular workspace", "Full MCP support"],
    score: 8.3,
    year: "2025",
    links: { github: "https://github.com/francisreubenr-rvu" },
  },
  {
    id: "vulnforge",
    name: "VulnForge",
    tagline: "RAG-augmented vulnerability detection and analysis system",
    description:
      "Predecessor to EMET. Combines static analysis, Nuclei template execution, and a vector-retrieval RAG pipeline over CVE/NVD corpora for AI-generated remediation. Established the core LangChain + FastAPI architecture that EMET extended.",
    tier: "standard",
    domain: "security",
    domains: ["Cybersecurity", "AI / ML"],
    tech: ["Python", "FastAPI", "LangChain", "Nuclei", "pgvector", "Gemini"],
    metrics: ["RAG over CVE corpus", "Nuclei integration"],
    score: 7.8,
    year: "2024",
    links: { github: "https://github.com/francisreubenr-rvu/Emet" },
  },
  {
    id: "moodsense",
    name: "MoodSense",
    tagline: "Real-time emotion detection dashboard via facial analysis",
    description:
      "Browser-based emotion recognition using facial landmark analysis. Classifies valence and arousal in real time and renders an analytics dashboard with historical mood trends, session insights, and exportable data.",
    tier: "standard",
    domain: "ml-ai",
    domains: ["AI / ML", "Full-Stack"],
    tech: ["Python", "OpenCV", "DeepFace", "React", "FastAPI"],
    metrics: ["Real-time inference", "7 emotion classes"],
    score: 7.6,
    year: "2024",
    links: { github: "#" },
  },
  {
    id: "meowbot",
    name: "MeowBot",
    tagline: "Personality-rich desktop companion on Raspberry Pi Pico W",
    description:
      "Animated desktop companion on a 1.3\" OLED. NTP-synced clock, Claude Code usage tracking, DeepSeek/OpenRouter balance display, motivational quotes, Bible verses, and random dance sequences every 15–30 minutes. Web dashboard with 7/14/30/90-day historical charts.",
    tier: "standard",
    domain: "systems",
    domains: ["Embedded Systems", "IoT"],
    tech: ["MicroPython", "Raspberry Pi Pico W", "OLED SSD1306", "WiFi", "Node.js", "Claude SDK"],
    metrics: ["1.3\" OLED display", "Real-time API tracking", "90-day historical data"],
    score: 7.5,
    year: "2025",
    links: { github: "#" },
  },
  {
    id: "polaris",
    name: "Polaris",
    tagline: "Unified academic intelligence with cryptographic data sovereignty",
    description:
      "Bicameral academic platform aggregating Linways, Camu, and Moodle into a single surface with OAuth 2.0/OIDC + PKCE against institutional IdPs. Envelope encryption, offline-first conflict resolution, and privacy-by-design under DPDPA/GDPR/FERPA. Google Workspace Edu and Microsoft Entra ID bridges.",
    tier: "standard",
    domain: "fullstack",
    domains: ["Full-Stack", "Privacy / Security"],
    tech: ["Node.js", "Express", "Supabase", "OAuth 2.0 / OIDC", "PKCE", "Envelope Encryption"],
    metrics: ["DPDPA / GDPR / FERPA compliant", "Multi-IdP support", "Offline-first sync"],
    score: 7.5,
    year: "2025",
    links: { github: "#" },
  },
  {
    id: "brio",
    name: "Brio",
    tagline: "Production-quality learning platform built on MySQL",
    description:
      "Course project that exceeds spec: JWT authentication, 13-table MySQL schema with triggers/views/transactions, Kanban board UI, live SQL execution dashboard, animated architecture visualizer, and curated Markdown content. Demonstrates full relational database mastery.",
    tier: "standard",
    domain: "fullstack",
    domains: ["Full-Stack", "Databases"],
    tech: ["Express.js", "MySQL", "JWT", "bcrypt", "Vanilla JS", "Tailwind CSS"],
    metrics: ["13-table schema", "Live SQL REPL", "Triggers + views + transactions"],
    score: 7.4,
    year: "2025",
    links: { github: "https://github.com/francisreubenr-rvu/Brio." },
  },
  {
    id: "pumps",
    name: "Pumps",
    tagline: "Gym workout tracker with progress analytics",
    description:
      "Track workouts, sets, reps, and weights with progress visualization over time. Routine template management, real-time Supabase sync, and responsive UI. Most actively developed project with 81 commits.",
    tier: "standard",
    domain: "fullstack",
    domains: ["Full-Stack"],
    tech: ["Next.js", "Supabase", "Tailwind CSS", "shadcn/ui"],
    metrics: ["81 commits", "Vercel deployed", "Real-time sync"],
    score: 7.2,
    year: "2024",
    links: { github: "https://github.com/francisreubenr-rvu/pumps" },
  },
  {
    id: "chords",
    name: "Chords",
    tagline: "Hybrid semantic music recommender with taste-signal blending",
    description:
      "Seed by song or mood. Weighted ranking across sonic, emotional, contextual, language, popularity, and taste signals via a two-stage retrieve → rerank pipeline. ReccoBeats for audio feature extraction, Apple/iTunes RSS for catalog freshness. Runs fully local or Supabase-backed.",
    tier: "standard",
    domain: "ml-ai",
    domains: ["AI / ML", "Full-Stack"],
    tech: ["TypeScript", "Vite", "Supabase", "pgvector", "ReccoBeats API", "Vitest"],
    metrics: ["6-signal weighted ranking", "Local-first + Supabase modes", "25 commits"],
    score: 7.2,
    year: "2024",
    links: { github: "https://github.com/francisreubenr-rvu/resonance" },
  },

  // ── COMPACT ───────────────────────────────────────────────────────────────
  {
    id: "nagarseva",
    name: "NagarSeva",
    tagline: "Civic issue reporting platform bridging citizens and municipal bodies",
    description:
      "Civic technology for public-interest applications. Citizens report local issues; municipal dashboards triage and resolve them. Built via AI-assisted spec-to-code workflow.",
    tier: "compact",
    domain: "fullstack",
    domains: ["Full-Stack", "Civic Tech"],
    tech: ["Next.js 14", "TypeScript", "PostgreSQL"],
    score: 6.5,
    year: "2025",
    links: { github: "https://github.com/francisreubenr-rvu/BridgeNeed" },
  },
  {
    id: "math",
    name: "MaTH",
    tagline: "Empirical study: RAG vs. baseline LLM on linear algebra",
    description:
      "Case study measuring accuracy delta of RAG against a baseline LLM on linear algebra questions using local Ollama inference. Proper experimental loop with CSV result logging and statistical analysis.",
    tier: "compact",
    domain: "research",
    domains: ["Research", "AI / ML"],
    tech: ["Python", "Jupyter", "Ollama", "llama3.2:3b", "nomic-embed-text", "NumPy"],
    score: 6.5,
    year: "2024",
    links: { github: "#" },
  },
  {
    id: "la-rag",
    name: "Linear Algebra RAG",
    tagline: "LaTeX-typeset academic mini-project with reproducible experiments",
    description:
      "Formal academic paper extending MaTH into a hypothesis-driven, peer-quality methodology. Includes comparative baselines, V1/V2 result sets, and documented enhanced experiment variant.",
    tier: "compact",
    domain: "research",
    domains: ["Research", "AI / ML"],
    tech: ["LaTeX", "Python", "Jupyter", "RAG pipeline"],
    score: 6.4,
    year: "2024",
    links: { paper: "#" },
  },
  {
    id: "flip",
    name: "flip",
    tagline: "Content automation with browser scraping and screenshot pipelines",
    description:
      "Next.js 14 app with Supabase backend and a suite of Puppeteer-driven scripts for Pinterest extraction, tab screenshot automation, and programmatic browser automation.",
    tier: "compact",
    domain: "fullstack",
    domains: ["Full-Stack", "Automation"],
    tech: ["Next.js 14", "Supabase", "Puppeteer", "TypeScript"],
    metrics: ["31 commits", "Vercel deployed"],
    score: 6.2,
    year: "2024",
    links: { github: "#" },
  },
  {
    id: "fox-ledger",
    name: "Fox · Ledger",
    tagline: "Dark neobrutalist personal finance dashboard",
    description:
      "Financial portfolio tracking with Chart.js visualizations and a custom CSS design system using Syne + Space Mono typography. FD tracking, trend visualization, neobrutalist aesthetic.",
    tier: "compact",
    domain: "fullstack",
    domains: ["Full-Stack", "Finance"],
    tech: ["Vanilla JS", "Chart.js", "CSS", "Vercel"],
    score: 6.0,
    year: "2024",
    links: { github: "https://github.com/francisreubenr-rvu/ledger" },
  },
  {
    id: "billsplitter",
    name: "BillSplitter",
    tagline: "Cross-platform expense splitting app",
    description:
      "Lightweight bill-splitting utility for iOS, Android, and Web via Expo. Haptic feedback, biometric auth support, and persistent storage.",
    tier: "compact",
    domain: "fullstack",
    domains: ["Mobile", "Full-Stack"],
    tech: ["React Native", "Expo 54", "TypeScript", "Async Storage"],
    metrics: ["13 commits", "iOS / Android / Web"],
    score: 5.9,
    year: "2024",
    links: { github: "#" },
  },
  {
    id: "kcet-explorer",
    name: "KCET Explorer",
    tagline: "Interactive analysis tool for Karnataka entrance exam data",
    description:
      "PDF extraction pipeline producing 8.7 MB of structured data from multi-round KCET results. Interactive HTML explorer with cutoff tracking, session analysis, and Excel integration.",
    tier: "compact",
    domain: "research",
    domains: ["Data Analysis", "Tools"],
    tech: ["Python", "PDF extraction", "Pandas", "HTML / JS"],
    metrics: ["8.7 MB dataset", "Multi-round analysis"],
    score: 5.8,
    year: "2024",
    links: { github: "https://github.com/francisreubenr-rvu/kcet-cutoff-explorer" },
  },
  {
    id: "gpacalc",
    name: "GPACalc",
    tagline: "GPA calculator with 3D visualizations",
    description:
      "Clean and fast GPA computation utility with React Three Fiber 3D visualizations, Framer Motion animations, and PDF export. Deployed to GitHub Pages.",
    tier: "compact",
    domain: "fullstack",
    domains: ["Tools", "Full-Stack"],
    tech: ["React", "Vite", "Three.js", "React Three Fiber", "Framer Motion"],
    metrics: ["9 commits", "GitHub Pages"],
    score: 5.7,
    year: "2024",
    links: { demo: "#" },
  },
  {
    id: "opus",
    name: "Opus",
    tagline: "PC optimizer — Dell Hackathon submission",
    description:
      "System optimization tool submitted to Dell's hackathon competition. Formal PDF technical documentation and competition-grade deliverables.",
    tier: "compact",
    domain: "systems",
    domains: ["Systems", "Tools"],
    tech: ["Systems Programming"],
    score: 5.5,
    year: "2024",
    links: { github: "https://github.com/francisreubenr-rvu/OPUS---the-Adaptive-Intelligence-System" },
  },
  {
    id: "asl-device",
    name: "ASL / ISL Device",
    tagline: "Embedded sign language recognition with ESP32-CAM + Raspberry Pi",
    description:
      "Hardware variant of SignBridge: ESP32-CAM captures hand gestures and streams to a Raspberry Pi inference pipeline for ISL recognition, targeting low-cost, offline-capable assistive devices.",
    tier: "compact",
    domain: "systems",
    domains: ["Embedded Systems", "AI / ML"],
    tech: ["ESP32-CAM", "Raspberry Pi", "Python", "OpenCV", "MicroPython"],
    score: 5.5,
    year: "2024",
    links: { github: "#" },
  },
];

export const featuredProjects = projects.filter((p) => p.tier === "featured");
export const standardProjects = projects.filter((p) => p.tier === "standard");
export const compactProjects = projects.filter((p) => p.tier === "compact");
