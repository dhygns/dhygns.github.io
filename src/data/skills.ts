export interface SkillTier {
  name: string;
  blurb: string;
  groups: { label: string; items: string[] }[];
}

export const skills: SkillTier[] = [
  {
    name: "Core Expertise",
    blurb: "Daily tools — what I reach for first to ship.",
    groups: [
      { label: "Languages", items: ["C++", "C#"] },
      { label: "Game Engine & Rendering", items: ["Unity 3D"] },
      { label: "Shader Programming", items: ["GLSL", "CG (Unity Shader)"] },
      { label: "Project & Source Control", items: ["Git", "GitHub"] },
    ],
  },
  {
    name: "Proficient Experience",
    blurb: "Production-tested across multiple shipped projects.",
    groups: [
      { label: "Graphics APIs", items: ["Vulkan API"] },
      { label: "Shader Programming", items: ["HLSL"] },
      {
        label: "Software Architecture",
        items: ["Object-Oriented Design", "Custom library development", "Algorithm optimization"],
      },
      {
        label: "Project & Source Control",
        items: ["GitLab", "Jira Software", "Linear", "Confluence"],
      },
      {
        label: "Team Leadership",
        items: ["Technical mentorship", "Agile-based team management", "Cross-disciplinary integration"],
      },
    ],
  },
  {
    name: "Additional",
    blurb: "Adjacent stacks and supporting techniques used as needed.",
    groups: [
      { label: "Graphics APIs", items: ["DirectX 11", "OpenGL"] },
      {
        label: "Frontend / Web",
        items: ["React", "Three.js", "JavaScript", "Flutter"],
      },
      {
        label: "Scripting & Tools",
        items: ["Shell scripting", "Build automation"],
      },
      {
        label: "Game Math",
        items: ["Vector / Matrix", "Interpolation", "Simulation"],
      },
      {
        label: "Data Sharing",
        items: ["DMA-BUF", "Shared memory (SystemV / POSIX)"],
      },
      {
        label: "Networking",
        items: ["TCP/IP", "Shared resource sync"],
      },
    ],
  },
];
