export const profile = {
  name: "Rangga Gibran",
  tagline: "Full-Stack Software Engineer",
  location: "Pekanbaru, Indonesia",
  summary:
    "Seasoned engineer crafting dependable experiences across modern web stacks, cloud-native backends, and cross-platform mobile apps.",
  bio:
    "I architect resilient systems, ship fast user experiences, and lead teams through ambiguous, high-impact projects. Blending product sense with hands-on engineering lets me spot opportunities, design elegant solutions, and deliver quality at speed.",
  specialties: [
    {
      title: "Full-Stack Web",
      detail: "Type-safe React/Next.js frontends backed by Node/Nest, Go, or serverless stacks.",
      stack: ["React", "Next.js", "Node.js", "NestJS", "PostgreSQL"],
    },
    {
      title: "Cross-Platform Mobile",
      detail: "Flutter apps that share 90% of code while keeping native polish and performance.",
      stack: ["Flutter", "Dart", "Firebase", "App Store Ops"],
    },
    {
      title: "Game & Realtime Systems",
      detail: "Low-latency services powering dedicated Minecraft networks and realtime features.",
      stack: ["Java", "Netty", "Redis", "Kubernetes"],
    },
  ],
  metrics: [
    { value: "9+", label: "Years building software", caption: "Enterprise, startup, and freelance" },
    { value: "40+", label: "Products & features shipped", caption: "Web, mobile, and platform" },
    { value: "99.95%", label: "Service reliability", caption: "Uptime on managed workloads" },
  ],
  experiences: [
    {
      company: "Universitas Riau (UNRI)",
      role: "IT Specialist & Software Engineer",
      period: "2020 — 2023",
      location: "Pekanbaru, ID",
      bullets: [
        "Led full-stack rebuild of campus service portal used by 35K+ students and staff.",
        "Automated infrastructure monitoring and asset inventory, cutting outage response time by 45%.",
        "Mentored a squad of 6 student developers on clean architecture and delivery best practices.",
      ],
    },
    {
      company: "Minecraft Game Server Collective",
      role: "Game Server Developer (Java)",
      period: "2024",
      location: "Remote",
      bullets: [
        "Scaled a custom Bukkit/Paper stack that sustained 5K concurrent players with dynamic sharding.",
        "Designed gameplay automation pipeline (matchmaking, anti-cheat, economy) with Kotlin + Redis streams.",
        "Shipped live-ops dashboards enabling designers to tweak balance without restarts.",
      ],
    },
  ],
  skillTags: [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "NestJS",
    "Go",
    "PostgreSQL",
    "MongoDB",
    "Flutter",
    "Dart",
    "AWS",
    "Terraform",
    "Docker",
    "Kubernetes",
    "CI/CD",
  ],
  portfolio: [
    {
      title: "Website Absensi Sekolah",
      category: "Web Application",
      description: "Sistem absensi digital untuk sekolah dengan fitur pengenalan wajah, laporan realtime, dan dashboard admin yang komprehensif.",
      image: "/projects/absensi-sekolah.png",
      tags: ["React", "Node.js", "PostgreSQL", "Face Recognition"],
    },
    {
      title: "Vexia Studio",
      category: "Business Website",
      description: "Website profesional untuk Vexia Studio - penyedia jasa pembuatan website berkualitas tinggi oleh Rangga Gibran. Menampilkan portfolio, layanan, dan sistem pemesanan terintegrasi.",
      image: "/projects/vexia-studio.png",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    },
    {
      title: "Aplikasi Admin (Mahasiswa)",
      category: "Dashboard System",
      description: "Dashboard admin untuk pengelolaan data mahasiswa dengan fitur CRUD lengkap, export data, dan visualisasi statistik.",
      image: "/projects/admin-mahasiswa.png",
      tags: ["Next.js", "TypeScript", "Prisma", "Chart.js"],
    },
  ],
  contact: {
    email: "admin@rnggagib.me",
    status: "Open to remote-first product teams and outcome-driven engagements.",
    schedule: "Available for fractional CTO, consulting, or full-time leadership roles.",
  },
  github: {
    username: "ranggagibran",
    profileUrl: "https://github.com/ranggagibran",
  },
};

export type Profile = typeof profile;
