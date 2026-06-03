import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
  AboutData, SkillsData, ExperienceItem, ProjectItem, SettingsData,
  DEFAULT_ABOUT, DEFAULT_SKILLS, DEFAULT_EXPERIENCE, DEFAULT_PROJECTS, DEFAULT_SETTINGS,
  getAbout, getSkills, getExperience, getProjects, getSettings,
  setAbout, setSkills, setExperience, setProjects, setSettings,
} from "../lib/portfolioData";

interface AdminDataState {
  about: AboutData;
  skills: SkillsData;
  experience: ExperienceItem[];
  projects: ProjectItem[];
  settings: SettingsData;
  loading: boolean;
  saving: boolean;
  savedKey: string | null;
  errorKey: string | null;
  saveAbout: (data: AboutData) => Promise<void>;
  saveSkills: (data: SkillsData) => Promise<void>;
  saveExperience: (data: ExperienceItem[]) => Promise<void>;
  saveProjects: (data: ProjectItem[]) => Promise<void>;
  saveSettings: (data: SettingsData) => Promise<void>;
  setAboutLocal: (data: AboutData) => void;
  setSkillsLocal: (data: SkillsData) => void;
  setExperienceLocal: (data: ExperienceItem[]) => void;
  setProjectsLocal: (data: ProjectItem[]) => void;
  setSettingsLocal: (data: SettingsData) => void;
}

const AdminDataContext = createContext<AdminDataState | null>(null);

export function AdminDataProvider({ children }: { children: React.ReactNode }) {
  const [about, setAboutState] = useState<AboutData>(DEFAULT_ABOUT);
  const [skills, setSkillsState] = useState<SkillsData>([...DEFAULT_SKILLS]);
  const [experience, setExperienceState] = useState<ExperienceItem[]>(DEFAULT_EXPERIENCE);
  const [projects, setProjectsState] = useState<ProjectItem[]>(DEFAULT_PROJECTS);
  const [settings, setSettingsState] = useState<SettingsData>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedKey, setSavedKey] = useState<string | null>(null);
  const [errorKey, setErrorKey] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all([getAbout(), getSkills(), getExperience(), getProjects(), getSettings()])
      .then(([a, sk, ex, pr, se]) => {
        if (cancelled) return;
        setAboutState(a);
        setSkillsState(sk);
        setExperienceState(ex);
        setProjectsState(pr);
        setSettingsState(se);
        setLoading(false);
      })
      .catch(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  const withSave = useCallback(async (key: string, fn: () => Promise<void>) => {
    setSaving(true);
    setErrorKey(null);
    try {
      await fn();
      setSavedKey(key);
      setTimeout(() => setSavedKey(null), 2000);
    } catch (err) {
      console.error(`[Admin] Failed to save "${key}":`, err);
      setErrorKey(key);
      setTimeout(() => setErrorKey(null), 3000);
    } finally {
      setSaving(false);
    }
  }, []);

  return (
    <AdminDataContext.Provider value={{
      about, skills, experience, projects, settings, loading, saving, savedKey, errorKey,
      saveAbout: (d) => withSave("about", () => setAbout(d)),
      saveSkills: (d) => withSave("skills", () => setSkills(d)),
      saveExperience: (d) => withSave("experience", () => setExperience(d)),
      saveProjects: (d) => withSave("projects", () => setProjects(d)),
      saveSettings: (d) => withSave("settings", () => setSettings(d)),
      setAboutLocal: setAboutState,
      setSkillsLocal: setSkillsState,
      setExperienceLocal: setExperienceState,
      setProjectsLocal: setProjectsState,
      setSettingsLocal: setSettingsState,
    }}>
      {children}
    </AdminDataContext.Provider>
  );
}

export function useAdminData() {
  const ctx = useContext(AdminDataContext);
  if (!ctx) throw new Error("useAdminData must be used inside AdminDataProvider");
  return ctx;
}
