export type Project = {
  id: string;
  title: string;
  eyebrowLabel: string;
  description: string;
  tags: string[];
  screenshotUrl: string;
  videoUrl?: string;
  width: number;
  height: number;
  liveUrl: string;
  livePreviewUrl?: string;
  allowLivePreview?: boolean;
  mockupVariant?: "browser" | "phone";
  repoUrl?: string;
  mockDomain: string;
};

export const SITE_PROFILE = {
  name: "Deepak Kumar",
  role: "Product Engineer",
  subtitles: ["Full-Stack Developer", "AI Systems Builder", "Systems Thinker"],
  headline: "Product Engineer building full-stack products, AI systems, and thoughtful digital experiences.",
  email: "deepakmangal94164@gmail.com",
  whatsappUrl: "https://wa.me/919350432714?text=Hi%20Deepak%2C%0A%0AI%20found%20your%20portfolio%20and%20I%27m%20interested%20in%20discussing%20a%20project%20with%20you.",
  githubUrl: "https://github.com/DeepuCodesss/",
  linkedinUrl: "https://www.linkedin.com/in/deeepucodes/",
  resumeUrl: "/resume.pdf",
  resumeDownloadName: "Deepak-Kumar-Resume.pdf",
  canonicalUrl: "https://deepak-kumar.dev",
};

export const projects: Project[] = [
  {
    id: "nexorithm",
    title: "Nexorithm",
    eyebrowLabel: "Featured",
    description:
      "Nexorithm is India's first skill-reward coding platform, designed to make practice feel motivating. The platform rewards users for solving even very easy questions, helping them build consistency, climb rankings, and keep coming back to solve more.",
    tags: ["React", "Next.js", "Tailwind"],
    screenshotUrl: "/projects/nexorithm.webp",
    videoUrl: "/video/nexorithm.mp4",
    width: 1920,
    height: 869,
    liveUrl: "https://nexorithm.dev",
    livePreviewUrl: "https://nexorithm.dev",
    allowLivePreview: true,
    repoUrl: "https://github.com/DeepuCodesss/NEXORITHM",
    mockDomain: "nexorithm.dev",
  },
  {
    id: "aurix",
    title: "AURIX",
    eyebrowLabel: "Security / AI",
    description:
      "Live Attack Detection Dashboard & Neural Cyber Defense. AURIX focuses on real-time threat visibility, intelligent detection, and a clean dashboard experience for monitoring active security signals.",
    tags: ["Next.js", "AI", "Cybersecurity"],
    screenshotUrl: "/projects/aurix.webp",
    videoUrl: "/video/aurix.mp4",
    width: 1920,
    height: 920,
    liveUrl: "https://aurix-sepia.vercel.app/",
    allowLivePreview: false,
    repoUrl: "https://github.com/DeepuCodesss/AURIX",
    mockDomain: "aurix-sepia.vercel.app",
  },
  {
    id: "legitclub",
    title: "Legit Club",
    eyebrowLabel: "Special / Mobile",
    description:
      "A pure-skills gambling experience designed for mobile-first play. Legit Club is a special project focused on a fast, direct interface and a phone-native presentation.",
    tags: ["Mobile", "UI", "Gaming"],
    screenshotUrl: "/projects/legitclub.webp",
    videoUrl: "/video/legitclub.mp4",
    width: 1080,
    height: 2400,
    liveUrl: "https://legitclub.xyz",
    allowLivePreview: false,
    mockupVariant: "phone",
    repoUrl: undefined,
    mockDomain: "legitclub.xyz",
  },
];

