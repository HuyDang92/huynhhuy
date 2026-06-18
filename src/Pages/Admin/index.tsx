import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated, logout, getSessionTimeLeft } from "../../lib/adminAuth";
import { AdminDataProvider, useAdminData } from "../../context/AdminDataContext";
import AboutTab from "./tabs/AboutTab";
import SkillsTab from "./tabs/SkillsTab";
import ExperienceTab from "./tabs/ExperienceTab";
import ProjectsTab from "./tabs/ProjectsTab";
import SettingsTab from "./tabs/SettingsTab";

type Tab = "about" | "skills" | "experience" | "projects" | "settings";

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: "about", label: "About", icon: "👤" },
  { id: "skills", label: "Skills", icon: "⚡" },
  { id: "experience", label: "Experience", icon: "💼" },
  { id: "projects", label: "Projects", icon: "🗂️" },
  { id: "settings", label: "Settings", icon: "⚙️" },
];

function formatTime(ms: number) {
  const m = Math.floor(ms / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function AdminShell() {
  const [activeTab, setActiveTab] = useState<Tab>("about");
  const [timeLeft, setTimeLeft] = useState(getSessionTimeLeft());
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { loading } = useAdminData();

  useEffect(() => {
    if (!isAuthenticated()) { navigate("/login-admin"); return; }
    const interval = setInterval(() => {
      const t = getSessionTimeLeft();
      setTimeLeft(t);
      if (t <= 0) { logout(); navigate("/login-admin"); }
    }, 1000);
    return () => clearInterval(interval);
  }, [navigate]);

  const handleLogout = () => { logout(); navigate("/login-admin"); };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-[#FF5858] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-gray-600 text-sm">Loading data…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:relative inset-y-0 left-0 z-30 w-60 h-full bg-white border-r border-gray-200 flex flex-col flex-shrink-0 transform transition-transform duration-200 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="px-6 py-5 border-b border-gray-200">
          <span className="text-2xl font-bold text-gray-900 tracking-tight">cap<span className="text-[#FF5858]">y</span></span>
          <p className="text-gray-500 text-xs mt-0.5">Admin Panel</p>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${activeTab === tab.id ? "bg-[#FF5858]/15 text-[#FF5858]" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"}`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="px-4 py-4 border-t border-gray-200 space-y-3">
          <div className="flex items-center gap-2 px-2">
            <div className={`w-2 h-2 rounded-full ${timeLeft > 5 * 60000 ? "bg-green-500" : "bg-yellow-500"} animate-pulse`} />
            <span className="text-gray-600 text-xs">{formatTime(timeLeft)} remaining</span>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-[#FF5858] text-sm transition-colors rounded-xl hover:bg-[#FF5858]/5">
            <span>→</span> Log out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden lg:ml-0 ml-0">
        <header className="h-14 flex-shrink-0 bg-white border-b border-gray-200 flex items-center px-4 gap-4">
          <button className="lg:hidden text-gray-600 hover:text-gray-900" onClick={() => setSidebarOpen(true)}>☰</button>
          <h1 className="text-gray-900 font-medium text-sm capitalize">{activeTab}</h1>
          <div className="ml-auto">
            <a href="/" target="_blank" className="text-gray-600 hover:text-gray-900 text-xs transition-colors">↗ View portfolio</a>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-y-auto">
          {activeTab === "about" && <AboutTab />}
          {activeTab === "skills" && <SkillsTab />}
          {activeTab === "experience" && <ExperienceTab />}
          {activeTab === "projects" && <ProjectsTab />}
          {activeTab === "settings" && <SettingsTab />}
        </main>
      </div>
    </div>
  );
}

export default function Admin() {
  return (
    <AdminDataProvider>
      <AdminShell />
    </AdminDataProvider>
  );
}
