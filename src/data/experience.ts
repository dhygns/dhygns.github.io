export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
}

export interface Education {
  school: string;
  degree: string;
  period: string;
  location: string;
  bullets: string[];
}

export const experience: Experience[] = [
  {
    company: "Wooster Games",
    role: "Lead Software Developer",
    period: "Jun 2025 — Present",
    location: "Brooklyn, NY, United States",
    bullets: [
      "Led performance optimization across core gameplay systems — runtime efficiency, memory, and VR stability",
      "Designed and implemented gameplay features and interactive systems for a live VR multiplayer title",
      "Improved purchase, map, and navigation UX flows for player clarity",
      "Planned and delivered the Reactor update end-to-end — system design, gameplay logic, interactive object implementation",
      "Designed and implemented the core Fishing System, including mechanics, progression, and multiple rod variations",
    ],
  },
  {
    company: "Epitone",
    role: "Senior Lead Software Developer · Head of Software (Korea)",
    period: "May 2022 — Jun 2025",
    location: "Carlsbad, CA · Incheon, Republic of Korea",
    bullets: [
      "Led development of a custom VR/AR rendering engine for automotive AR HUDs using Vulkan",
      "Built high-performance rendering prototypes for AR/VR using Unity 3D",
      "Implemented native rendering plugins (Vulkan, OpenGL, DirectX 11) into Unity 3D's native graphics pipeline",
      "Achieved low-latency system integration via shared memory and TCP/IP sockets",
      "Prototyped AR-glasses content (LUMUS) for real-time automotive display environments",
      "Played a critical role in international demos and B2B with OEMs and defense contractors in France, Korea, and the USA",
      "Oversaw full-cycle SW project management with Jira / GitHub / Agile",
    ],
  },
  {
    company: "Spatial Systems Inc",
    role: "Software Programmer",
    period: "Jan 2018 — Mar 2022",
    location: "New York, NY, United States",
    bullets: [
      "Built interactive 3D environments for the Metaverse web app (spatial.io) using Three.js",
      "Developed cross-platform AR/VR apps for Oculus, Magic Leap, NReal, HoloLens 1/2 using Unity 3D",
      "Created real-time visual effects with custom shaders inside Unity's rendering pipeline",
      "Collaborated in distributed teams using GitHub, Linear, and Azure DevOps",
      "Led end-to-end SDLC ownership — requirements, system design, implementation, automated testing, deployment, maintenance",
    ],
  },
  {
    company: "Samsung Electronics",
    role: "Expert Software Programmer",
    period: "Feb 2015 — Jan 2018",
    location: "Seoul, Republic of Korea",
    bullets: [
      "Designed and implemented Interactive Media Art and Ambient Mode using Arduino, openFrameworks, GLSL — contributed to iF Design Award win",
      "Developed a texture-synthesis prototype with Three.js (in collaboration with research labs); concept later adopted in 'Disappearing Act' at Samsung First Look 2018",
      "Engineered Ambient Mode + generative art for Tizen OS using OpenGL ES + Three.js",
      "Prototyped interactive mobile apps with Three.js + Box2D, featured at CES 2016 and exhibited at Samsung Media Square",
    ],
  },
];

export const education: Education[] = [
  {
    school: "Tech University of Korea (formerly Korea Polytechnic University)",
    degree: "B.S. in Game & Multimedia Engineering",
    period: "Mar 2009 — Jan 2015",
    location: "Gyeonggi do, Republic of Korea",
    bullets: [
      "Specialized in Game Engineering with a strong CS foundation",
      "Core: Algorithms, Computer Graphics, 3D Game Programming, Game Software Engineering, AI, Network Game Programming, Capstone Design",
      "Additional: STL, C++, Windows Programming, Game Engine Development, Advanced 3D Modeling, Linux Development",
      "Completed two capstone design projects in game development and real-time system design",
    ],
  },
];
