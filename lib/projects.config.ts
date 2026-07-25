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

export const projects: Project[] = [
  {
    id: "nexorithm",
    title: "Nexorithm",
    eyebrowLabel: "Featured",
    description:
      "Nexorithm is India's first skill-reward coding platform, designed to make practice feel motivating. The platform rewards users for solving even very easy questions, helping them build consistency, climb rankings, and keep coming back to solve more.",
    tags: ["React", "Next.js", "Tailwind"],
    screenshotUrl: "/projects/NEXORITHM.png",
    videoUrl: "/Video/nexorithm.mp4",
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
    screenshotUrl: "/projects/AURIX.png",
    videoUrl: "/Video/aurix.mp4",
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
    screenshotUrl: "/projects/legitclub.png",
    videoUrl: "/Video/legitclub.mp4",
    width: 1080,
    height: 2400,
    liveUrl: "https://legitclub.xyz",
    allowLivePreview: false,
    mockupVariant: "phone",
    repoUrl: undefined,
    mockDomain: "legitclub.xyz",
  },
];
