export interface Award {
  title: string;
  organization: string;
  year: number;
  project?: string;
  href?: string;
  blurb: string;
}

export interface Certificate {
  title: string;
  organization: string;
  date: string;
  blurb: string;
}

export const awards: Award[] = [
  {
    title: "iF Design Award 2024 — Discipline: Professional Concept",
    organization: "iF International Forum Design GmbH",
    year: 2024,
    project: "Live Window — Safety Driving Windshield Display",
    href: "https://ifdesign.com/en/winner-ranking/project/livewindow-safety-driving-windshield-display/618663",
    blurb:
      "AR Head-Up Display recognized for forward-thinking design with high real-world potential — combining lightfield rendering, eye tracking, and Vulkan-backed rendering.",
  },
  {
    title: "Stellantis Venture Awards 2024",
    organization: "Stellantis",
    year: 2024,
    project: "Live Window — Epitone",
    href: "https://www.stellantis.com/en/news/press-releases/2024/july/2024-venture-awards-celebrate-startups-partnering-with-stellantis-to-enhance-customer-experience",
    blurb:
      "Recognized for partnership with Stellantis to enhance customer experience through automotive AR HUD systems.",
  },
  {
    title: "iF Design Award 2018 — Discipline: Professional Concept",
    organization: "iF International Forum Design GmbH",
    year: 2018,
    project: "Air Quality Visualization (Samsung)",
    blurb:
      "UX concept for visualizing indoor + outdoor air quality on a home display, with distance-adaptive presentation.",
  },
];

export const certificates: Certificate[] = [
  {
    title: "Samsung Software Certificate — Expert Level",
    organization: "Samsung Electronics SoFTech",
    date: "Oct 24, 2015",
    blurb:
      "Recognizes advanced expertise in software development — algorithmic problem-solving, optimized implementation under time constraints, and deep CS fundamentals.",
  },
];
