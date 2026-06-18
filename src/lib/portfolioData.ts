import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export interface AboutData {
   name: string;
   bio: string;
   location: string;
   when: string;
   storyDescription: string;
   email: string;
   resumeLink: string;
}

export interface SkillItem {
   name: string;
   logoUrl?: string;
}

export interface SkillCategory {
   id: string;
   label: string;
   items: SkillItem[];
}

export type SkillsData = SkillCategory[];

export interface ExperienceItem {
   id: string;
   company: string;
   logoUrl?: string;
   role: string;
   startDate: string;
   endDate: string;
   description: string;
   current: boolean;
}

export interface ProjectItem {
   id: string;
   thumb: string;
   name: string;
   date: string;
   description: string;
   role: string;
   technologies: string;
   type: "web" | "app";
   link?: string;
   ios?: string;
   android?: string;
}

export interface SettingsData {
   siteTitle: string;
   contactEmail: string;
   resumeLink: string;
   githubUrl: string;
   linkedinUrl: string;
   instagramUrl: string;
}

export const DEFAULT_ABOUT: AboutData = {
   name: "",
   bio: "",
   location: "",
   when: "",
   storyDescription: "",
   email: "",
   resumeLink: "",
};

export const DEFAULT_SKILLS: SkillsData = [
   { id: "technical", label: "Technical", items: [] },
   { id: "projectManagement", label: "Project Management", items: [] },
   { id: "libraries", label: "Libraries", items: [] },
   { id: "frameworks", label: "Frameworks", items: [] },
   { id: "tools", label: "Tools", items: [] },
   { id: "others", label: "Others", items: [] },
];

const OLD_LABELS: Record<string, string> = {
   technical: "Technical",
   frameworks: "Frameworks",
   libraries: "Libraries",
   tools: "Tools",
   projectManagement: "Project Management",
   others: "Others",
};

export const DEFAULT_PROJECTS: ProjectItem[] = [];
export const DEFAULT_EXPERIENCE: ExperienceItem[] = [];

export const DEFAULT_SETTINGS: SettingsData = {
   siteTitle: "",
   contactEmail: "",
   resumeLink: "",
   githubUrl: "",
   linkedinUrl: "",
   instagramUrl: "",
};

function normalizeSkillItem(raw: unknown): SkillItem {
   if (typeof raw === "string") return { name: raw };
   if (raw && typeof raw === "object" && "name" in raw) return raw as SkillItem;
   return { name: String(raw) };
}

function normalizeSkills(raw: unknown): SkillsData {
   if (!raw || typeof raw !== "object") return DEFAULT_SKILLS;
   const r = raw as Record<string, unknown>;

   // New format: { categories: [...] }
   if (Array.isArray(r.categories)) {
      return (r.categories as Record<string, unknown>[]).map((c) => ({
         id: String(c.id ?? crypto.randomUUID()),
         label: String(c.label ?? c.id ?? "Category"),
         items: Array.isArray(c.items) ? c.items.map(normalizeSkillItem) : [],
      }));
   }

   // Legacy format: { technical: [...], frameworks: [...], ... }
   const keys = Object.keys(r).filter((k) => Array.isArray(r[k]));
   if (keys.length > 0) {
      return keys.map((k) => ({
         id: k,
         label: OLD_LABELS[k] ?? k,
         items: (r[k] as unknown[]).map(normalizeSkillItem),
      }));
   }

   return DEFAULT_SKILLS;
}

// ── Firestore helpers ──────────────────────────────────────────────────────────

async function getDoc_<T>(docId: string, fallback: T): Promise<T> {
   try {
      const snap = await getDoc(doc(db, "portfolio", docId));
      return snap.exists() ? (snap.data() as T) : fallback;
   } catch {
      return fallback;
   }
}

async function setDoc_<T extends object>(docId: string, data: T): Promise<void> {
   await setDoc(doc(db, "portfolio", docId), data);
}

export const getAbout = () => getDoc_<AboutData>("about", DEFAULT_ABOUT);
export const setAbout = (data: AboutData) => setDoc_("about", data);

export const getSkills = async (): Promise<SkillsData> => {
   try {
      const snap = await getDoc(doc(db, "portfolio", "skills"));
      return normalizeSkills(snap.exists() ? snap.data() : null);
   } catch {
      return DEFAULT_SKILLS;
   }
};
export const setSkills = (data: SkillsData) => setDoc_("skills", { categories: data });

export const getExperience = async (): Promise<ExperienceItem[]> => {
   const d = await getDoc_<{ items: ExperienceItem[] }>("experience", { items: DEFAULT_EXPERIENCE });
   return d.items ?? DEFAULT_EXPERIENCE;
};
export const setExperience = (items: ExperienceItem[]) => setDoc_("experience", { items });

export const getProjects = async (): Promise<ProjectItem[]> => {
   const d = await getDoc_<{ items: ProjectItem[] }>("projects", { items: DEFAULT_PROJECTS });
   return d.items ?? DEFAULT_PROJECTS;
};
export const setProjects = (items: ProjectItem[]) => setDoc_("projects", { items });

export const getSettings = () => getDoc_<SettingsData>("settings", DEFAULT_SETTINGS);
export const setSettings = (data: SettingsData) => setDoc_("settings", data);
