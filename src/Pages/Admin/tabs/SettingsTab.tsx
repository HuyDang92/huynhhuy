import { useAdminData } from "../../../context/AdminDataContext";
import { SettingsData } from "../../../lib/portfolioData";
import SaveButton from "../components/SaveButton";

export default function SettingsTab() {
  const { settings, setSettingsLocal, saveSettings } = useAdminData();

  const set = (key: keyof SettingsData, value: string) =>
    setSettingsLocal({ ...settings, [key]: value });

  const fields: { key: keyof SettingsData; label: string }[] = [
    { key: "siteTitle", label: "Site Title" },
    { key: "contactEmail", label: "Contact Email" },
    { key: "resumeLink", label: "Resume Google Drive Link" },
    { key: "githubUrl", label: "GitHub URL" },
    { key: "linkedinUrl", label: "LinkedIn URL" },
  ];

  return (
    <div className="w-full space-y-5">
      <h2 className="text-white text-xl font-semibold">Settings</h2>
      <div className="bg-[#1D232A] border border-white/10 rounded-2xl p-5 space-y-5">
        <p className="text-[#FF5858] text-sm font-medium">Site Configuration</p>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          {fields.map(({ key, label }) => (
            <div key={key}>
              <label className="text-[#9ca3af] text-sm mb-1.5 block">{label}</label>
              <input
                type="text"
                value={settings[key]}
                onChange={(e) => set(key, e.target.value)}
                className="w-full bg-[#25262A] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#FF5858]/60 transition-colors"
              />
            </div>
          ))}
        </div>
      </div>
      <SaveButton tabKey="settings" onClick={() => saveSettings(settings)} />
    </div>
  );
}
