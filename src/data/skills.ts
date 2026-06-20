// skills.ts — sincronizado con proyectos reales del portfolio

export const skillGroups = [
  {
    category: "Frontend",
    color: "from-violet-500 to-purple-600",
    glow: "shadow-violet-500/30",
    skills: [
      { name: "React.js",      level: 90, icon: "Atom"     },
      { name: "JavaScript",    level: 92, icon: "FileJson"  },
      { name: "TypeScript",    level: 75, icon: "Braces"    },
      { name: "HTML5 / CSS3",  level: 95, icon: "Globe"     },
      { name: "Tailwind CSS",  level: 88, icon: "Palette"   },
      { name: "Vite",          level: 85, icon: "Zap"       },
    ],
  },
  {
    category: "Backend",
    color: "from-cyan-500 to-blue-600",
    glow: "shadow-cyan-500/30",
    skills: [
      { name: "Node.js",    level: 78, icon: "Server"  },
      { name: "Express.js", level: 75, icon: "Train"   },
      { name: "Firebase",   level: 85, icon: "Flame"   },
      { name: "MongoDB",    level: 65, icon: "Leaf"    },
      { name: "API REST",   level: 85, icon: "Plug"    },
      { name: "PostgreSQL", level: 60, icon: "Terminal"},
    ],
  },
  {
    category: "Herramientas",
    color: "from-emerald-500 to-teal-600",
    glow: "shadow-emerald-500/30",
    skills: [
      { name: "Git / GitHub",      level: 88, icon: "GitBranch" },
      { name: "Netlify / Vercel",  level: 90, icon: "Rocket"    },
      { name: "Responsive Design", level: 92, icon: "Smartphone"},
      { name: "UI / UX",           level: 78, icon: "Target"    },
      { name: "Handlebars",        level: 65, icon: "Monitor"   },
      { name: "Socket.io",         level: 55, icon: "Zap"       },
    ],
  },
];
