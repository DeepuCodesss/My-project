"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  Bot, BriefcaseBusiness, ChevronRight, CircleUserRound, Code2, Download,
  Folder, Globe2, Mail, Minus, Monitor, MousePointer2, Network,
  NotebookPen, Search, Server, Settings2, Sparkles, TerminalSquare,
  Trash2, X, Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Waves } from "@/components/ui/wave-background";

type AppId = "projects" | "automation" | "os" | "github" | "resume" | "contact" | "experiments" | "trash";

const LocalLogo = ({ file }: { file: string }) => <img src={`/logo for deepos/${file}`} alt="" loading="lazy" decoding="async" />;
const ProjectsLogo = () => <LocalLogo file="project logo.png" />;
const ClaudeLogo = () => <LocalLogo file="claude logo .png" />;
const LinuxLogo = () => <LocalLogo file="Linux_logo.jpg" />;
const GithubLogo = () => <LocalLogo file="github logo.png" />;
const ResumeLogo = () => <LocalLogo file="resume logo.png" />;
const GmailLogo = () => <LocalLogo file="gmail logo.png" />;
const ExperimentsLogo = () => <LocalLogo file="experiment logo.jpg" />;
const RecycleLogo = () => <LocalLogo file="recycling bin logo .jpg" />;

const apps: { id: AppId; label: string; icon: React.ElementType; tone: string }[] = [
  { id: "projects", label: "Projects", icon: ProjectsLogo, tone: "red" },
  { id: "automation", label: "AI Automation", icon: ClaudeLogo, tone: "violet" },
  { id: "os", label: "Operating System", icon: LinuxLogo, tone: "blue" },
  { id: "github", label: "GitHub", icon: GithubLogo, tone: "slate" },
  { id: "resume", label: "Resume", icon: ResumeLogo, tone: "amber" },
  { id: "contact", label: "Contact", icon: GmailLogo, tone: "green" },
  { id: "experiments", label: "Experiments", icon: ExperimentsLogo, tone: "pink" },
  { id: "trash", label: "Recycle Bin", icon: RecycleLogo, tone: "slate" },
];


const projects = [
  { name: "NEXORITHM", type: "AI / Web Platform", description: "An intelligent workspace for turning noisy ideas into sharp, useful systems.", stack: ["Next.js", "AI", "Prisma"], color: "#ef4444" },
  { name: "AURIX", type: "Music Platform", description: "A focused listening experience built around discovery, mood, and movement.", stack: ["React", "Node", "Postgres"], color: "#a78bfa" },
  { name: "LEGITCLUB", type: "Community Platform", description: "A warm, social product that makes finding your people feel effortless.", stack: ["TypeScript", "UX", "Motion"], color: "#f59e0b" },
  { name: "Portfolio Website", type: "Personal System", description: "This living interface — a small window into how I think and build.", stack: ["Next.js", "Framer", "CSS"], color: "#22c55e" },
];

function Window({ id, title, onClose, onFocus, children, focused }: { id: AppId; title: string; onClose: () => void; onFocus: () => void; children: React.ReactNode; focused: boolean }) {
  return (
    <motion.div layoutId={`window-${id}`} initial={{ opacity: 0, scale: 0.88, y: 18 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.94, y: 12 }} transition={{ type: "spring", stiffness: 230, damping: 24 }} className={`deep-window ${focused ? "is-focused" : ""}`} onMouseDown={onFocus}>
      <div className="window-bar">
        <div className="window-controls"><button aria-label="Close" onClick={onClose}><X size={12} /></button><button aria-label="Minimize"><Minus size={12} /></button><button aria-label="Maximize"><span /></button></div>
        <span className="window-title">{title}</span>
        <span className="window-status"><span className="status-dot" /> DEEPOS</span>
      </div>
      <div className="window-content">{children}</div>
    </motion.div>
  );
}

function Projects() {
  const links: Record<string, { source?: string; live?: string }> = {
    NEXORITHM: { source: "https://github.com/DeepuCodesss/NEXORITHM", live: "https://nexorithm.dev" },
    AURIX: { source: "https://github.com/DeepuCodesss/AURIX", live: "https://aurix-sepia.vercel.app/" },
    LEGITCLUB: { live: "https://legitclub.xyz" },
  };
  return <div className="projects-view"><div className="view-heading"><div><span className="eyebrow">/workspace/projects</span><h2>Things I&apos;ve shipped.</h2></div><span className="count-label">04 objects</span></div><div className="project-grid">{projects.map((project, index) => { const link = links[project.name]; return <motion.article key={project.name} className="project-card" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.07 }}><div className="project-card-top"><span className="project-index">0{index + 1}</span><span className="project-signal" style={{ backgroundColor: project.color }} /></div><span className="project-type">{project.type}</span><h3>{project.name}</h3><p>{project.description}</p><div className="stack-row">{project.stack.map(item => <span key={item}>{item}</span>)}</div><div className="card-links">{link?.source && <a href={link.source} target="_blank" rel="noreferrer"><Code2 size={13} /> Source</a>}{link?.live && <a href={link.live} target="_blank" rel="noreferrer">Live demo <ChevronRight size={13} /></a>}</div></motion.article>; })}</div></div>;
}

function Automation() {
  const nodes = [{ name: "Content discovery", icon: Search, state: "Scanning 12 sources" }, { name: "AI clip detection", icon: Sparkles, state: "Processing media" }, { name: "Auto editing", icon: Zap, state: "Ready for review" }, { name: "Publishing pipeline", icon: Globe2, state: "2 scheduled" }];
  return <div className="automation-view"><div className="view-heading"><div><span className="eyebrow">/systems/automation</span><h2>Workflows, in motion.</h2></div><span className="live-pill"><span /> Live system</span></div><div className="automation-stage"><div className="flow-lines"><i /><i /><i /></div>{nodes.map((node, index) => <motion.div key={node.name} className="automation-node" initial={{ opacity: 0, x: index % 2 ? 18 : -18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * .1 }}><div className="node-icon"><node.icon size={16} /></div><div><strong>{node.name}</strong><span><b />{node.state}</span></div><ChevronRight size={14} className="node-arrow" /></motion.div>)}</div><div className="activity-line"><span>WORKFLOW STATUS</span><span>98.4% uptime</span><span className="activity-bars"><i /><i /><i /><i /><i /></span></div></div>;
}

function OperatingSystem() {
  return <div className="os-view"><div className="view-heading"><div><span className="eyebrow">/deepos/architecture</span><h2>Built from first principles.</h2></div><span className="count-label">v0.8.4 / alpha</span></div><div className="architecture"><div className="arch-main"><div className="arch-node active"><Server size={15} /><span>DeepOS Kernel</span><small>Orchestration core</small></div><div className="arch-branch"><div><Code2 size={14} /><span>Bootloader</span></div><div><Network size={14} /><span>Memory map</span></div><div><Settings2 size={14} /><span>Drivers</span></div></div><div className="arch-node"><Folder size={15} /><span>Filesystem</span><small>Persistent workspace</small></div></div><div className="progress-card"><div><span>Current progress</span><strong>72%</strong></div><div className="progress-track"><i /></div><p>Shipping the parts that make the system feel alive.</p><div className="roadmap"><span><b className="done" />Interface layer</span><span><b className="done" />Window manager</span><span><b />Native runtime</span></div></div></div></div>;
}

function Terminal() { return <div className="terminal-view"><div className="terminal-copy"><span className="eyebrow">deepak@deepos:~</span><h2>A quiet place to build.</h2></div><div className="terminal-lines"><p><b>$</b> whoami</p><p className="terminal-answer">Deepak Kumar</p><p><b>$</b> status</p><p className="terminal-answer green">Available for Freelance</p><p><b>$</b> current</p><p className="terminal-answer">Building an Operating System</p><p><b>$</b> focus</p><p className="terminal-answer">Artificial Intelligence<br />Backend Engineering<br />Automation</p><p><b>$</b> ls <span className="cursor" /></p><div className="terminal-files"><span>Portfolio</span><span>Operating-System</span><span>Automation</span><span>MusicPlatform</span><span>NEXORITHM</span></div></div></div>; }

function Resume() { return <div className="resume-view"><div className="resume-paper"><div className="resume-name">DEEPAK<br /><span>KUMAR</span></div><div className="resume-role">Product engineer &amp; systems thinker</div><div className="resume-rule" /><div className="resume-cols"><div><small>PROFILE</small><p>I build full-stack products, AI systems, and expressive digital experiences.</p></div><div><small>SELECTED SKILLS</small><p>Frontend systems<br />Backend architecture<br />AI automation<br />Product design</p></div></div><div className="resume-footer">DEEPAK.K / 2026</div></div><div className="resume-actions"><span className="eyebrow">/documents/resume.pdf</span><h2>The longer version.</h2><p>A snapshot of the work behind the interface.</p><a className="deep-button" href="/resume.pdf" download><Download size={14} /> Download resume</a></div></div>; }

function Contact() { return <div className="contact-view"><span className="eyebrow">/inbox/new-message</span><h2>Let&apos;s build<br /><em>something together.</em></h2><p>Have an idea that deserves a thoughtful system around it? I&apos;d love to hear what you&apos;re working on.</p><div className="contact-links"><a href="mailto:deepakmangal94164@gmail.com"><Mail size={15} /> Email me <ChevronRight size={14} /></a><a href="https://github.com/DeepuCodesss/" target="_blank" rel="noreferrer"><Code2 size={15} /> GitHub <ChevronRight size={14} /></a><a href="https://www.linkedin.com/in/deeepucodes/" target="_blank" rel="noreferrer"><CircleUserRound size={15} /> LinkedIn <ChevronRight size={14} /></a></div></div>; }

function Experiments() { return <div className="experiments-view"><div className="view-heading"><div><span className="eyebrow">/lab/unreleased</span><h2>Ideas in the wild.</h2></div></div><div className="experiment-list"><div><span>01</span><strong>Ambient interfaces</strong><small>Researching how software can get out of the way.</small></div><div><span>02</span><strong>Local-first AI</strong><small>Private tools that feel like they belong to you.</small></div><div><span>03</span><strong>Music as a map</strong><small>Prototyping new ways to navigate a feeling.</small></div></div></div>; }

function WindowBody({ id }: { id: AppId }) { if (id === "projects") return <Projects />; if (id === "automation") return <Automation />; if (id === "os") return <OperatingSystem />; if (id === "github") return <Terminal />; if (id === "resume") return <Resume />; if (id === "contact") return <Contact />; if (id === "experiments") return <Experiments />; return <div className="empty-view"><Trash2 size={28} /><h2>Nothing here.</h2><p>The bin is empty, for now.</p></div>; }

export default function ScrollAnimationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: false, amount: 0.35 });
  const [booted] = useState(true);
  const [windows, setWindows] = useState<AppId[]>([]);
  const [focused, setFocused] = useState<AppId | null>(null);
  const [time, setTime] = useState("");
  useEffect(() => { if (!inView) setWindows([]); }, [inView]);
  useEffect(() => {
    const openFromHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash === "resume" || hash === "contact") {
        sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        open(hash as AppId);
      }
    };

    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let frame = 0;
    const updateComposition = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const rect = section.getBoundingClientRect();
        const progress = Math.min(1, Math.max(0, (window.innerHeight * 0.72 - rect.top) / (window.innerHeight * 0.9)));
        section.style.setProperty("--deepos-intro-y", `${Math.round(progress * 105)}px`);
        section.style.setProperty("--deepos-intro-opacity", `${1 - progress * 0.4}`);
        section.style.setProperty("--deepos-intro-scale", `${1 - progress * 0.04}`);
        section.style.setProperty("--deepos-intro-blur", `${(progress * 2).toFixed(2)}px`);
        section.style.setProperty("--deepos-monitor-y", `${Math.round(progress * -48)}px`);
        section.style.setProperty("--deepos-scale", `${1 + progress * 0.035}`);
        section.style.setProperty("--deepos-glow", `${0.2 + progress * 0.22}`);
      });
    };
    updateComposition();
    window.addEventListener("scroll", updateComposition, { passive: true });
    window.addEventListener("resize", updateComposition);
    return () => { if (frame) cancelAnimationFrame(frame); window.removeEventListener("scroll", updateComposition); window.removeEventListener("resize", updateComposition); };
  }, []);
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let frame = 0;
    let clientX = 0;
    let clientY = 0;
    const onPointerMove = (event: PointerEvent) => {
      clientX = event.clientX;
      clientY = event.clientY;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const rect = section.getBoundingClientRect();
        const x = ((clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((clientY - rect.top) / rect.height - 0.5) * 2;
        section.style.setProperty("--deepos-cursor-x", `${(x * 3).toFixed(2)}px`);
        section.style.setProperty("--deepos-cursor-y", `${(y * 2).toFixed(2)}px`);
        section.style.setProperty("--deepos-light-x", `${clientX - rect.left}px`);
        section.style.setProperty("--deepos-light-y", `${clientY - rect.top}px`);
      });
    };
    section.addEventListener("pointermove", onPointerMove);
    return () => { if (frame) cancelAnimationFrame(frame); section.removeEventListener("pointermove", onPointerMove); };
  }, []);
  useEffect(() => { const update = () => setTime(new Intl.DateTimeFormat("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date())); update(); const timer = setInterval(update, 30000); return () => clearInterval(timer); }, []);
  const open = (id: AppId) => { if (id === "trash") return; setWindows(current => current.includes(id) ? current : [...current, id]); setFocused(id); };
  const close = (id: AppId) => { setWindows(current => current.filter(item => item !== id)); setFocused(current => current === id ? null : current); };
  return <section id="workspace" ref={sectionRef} className={`deepos-section ${booted ? "is-booted" : ""}`}><div className="deepos-ambient" /><div className="deepos-intro"><span className="eyebrow">A DIGITAL WORKSPACE / 08</span><h1>Enter<br /><span>DeepOS.</span></h1><p>Scroll into my workspace.</p></div><div className="monitor-shell"><div className="monitor-camera" /><div className="monitor-screen"><AnimatePresence mode="wait">{!booted ? <motion.div key="boot" className="boot-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><div className="deep-logo">D<span>•</span></div><div className="boot-copy"><p>Booting DeepOS<span className="loading-dots">...</span></p><p>Loading workspace</p><p>Preparing development environment</p></div><div className="boot-progress"><i /></div><small>DEEPOS / 0.8.4</small></motion.div> : <motion.div key="desktop" className="desktop" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><Waves className="desktop-waves" strokeColor="#f1d8d4" backgroundColor="transparent" pointerSize={0.25} /><div className="desktop-top"><span><span className="top-led" /> DEEPOS</span><span className="desktop-state">WORKSPACE ACTIVE&nbsp;&nbsp; / &nbsp;&nbsp;{time}</span></div><div className="desktop-icons">{apps.map(({ id, label, icon: Icon }, index) => <motion.button key={id} className={`desktop-icon icon-${apps.find(app => app.id === id)?.tone ?? "red"}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * .045 }} onDoubleClick={() => open(id)} onClick={() => open(id)}><span className="icon-tile"><Icon size={20} strokeWidth={1.5} /></span><span>{label}</span></motion.button>)}</div><AnimatePresence>{windows.map(id => <Window key={id} id={id} title={apps.find(app => app.id === id)?.label ?? id} onClose={() => close(id)} onFocus={() => setFocused(id)} focused={focused === id}><WindowBody id={id} /></Window>)}</AnimatePresence><div className="desktop-footer"><div className="dock"><span className="dock-logo">D</span><span className="dock-divider" />{windows.map(id => { const Icon = apps.find(app => app.id === id)?.icon ?? Folder; return <button key={id} onClick={() => setFocused(id)} className={focused === id ? "dock-active" : ""}><Icon size={15} /></button>; })}</div><div className="desktop-footer-right"><span>{time}</span></div></div></motion.div>}</AnimatePresence></div></div></section>;
}
