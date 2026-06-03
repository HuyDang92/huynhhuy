import React, { createContext, useContext, useEffect, useState } from "react";
import {
  AboutData, SkillsData, ExperienceItem, ProjectItem,
  DEFAULT_ABOUT, DEFAULT_SKILLS, DEFAULT_EXPERIENCE, DEFAULT_PROJECTS,
  getAbout, getSkills, getExperience, getProjects,
} from "../lib/portfolioData";

interface PortfolioState {
  about: AboutData;
  skills: SkillsData;
  experience: ExperienceItem[];
  projects: ProjectItem[];
  loading: boolean;
}

const defaultState: PortfolioState = {
  about: DEFAULT_ABOUT,
  skills: DEFAULT_SKILLS,
  experience: DEFAULT_EXPERIENCE,
  projects: DEFAULT_PROJECTS,
  loading: true,
};

const PortfolioContext = createContext<PortfolioState>(defaultState);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<PortfolioState>(defaultState);

  useEffect(() => {
    let cancelled = false;

    Promise.all([getAbout(), getSkills(), getExperience(), getProjects()])
      .then(([about, skills, experience, projects]) => {
        if (!cancelled) {
          // Single setState = single re-render, no flickering
          setState({ about, skills, experience, projects, loading: false });
        }
      })
      .catch(() => {
        if (!cancelled) setState((prev) => ({ ...prev, loading: false }));
      });

    // Cleanup prevents StrictMode double-fetch from applying stale results
    return () => { cancelled = true; };
  }, []);

  return (
    <PortfolioContext.Provider value={state}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  return useContext(PortfolioContext);
}
