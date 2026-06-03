import { useAdminData } from "../../../context/AdminDataContext";
import { AboutData } from "../../../lib/portfolioData";
import SaveButton from "../components/SaveButton";

export default function AboutTab() {
  const { about, setAboutLocal, saveAbout } = useAdminData();

  const set = (key: keyof AboutData, value: string) =>
    setAboutLocal({ ...about, [key]: value });

  const field = (key: keyof AboutData, label: string, multiline?: boolean, rows = 4) => (
    <div key={key}>
      <label className="text-[#9ca3af] text-sm mb-1.5 block">{label}</label>
      {multiline ? (
        <textarea
          rows={rows}
          value={about[key]}
          onChange={(e) => set(key, e.target.value)}
          className="w-full bg-[#1D232A] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#FF5858]/60 transition-colors resize-y"
        />
      ) : (
        <input
          type="text"
          value={about[key]}
          onChange={(e) => set(key, e.target.value)}
          className="w-full bg-[#1D232A] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#FF5858]/60 transition-colors"
        />
      )}
    </div>
  );

  return (
    <div className="w-full space-y-5">
      <h2 className="text-white text-xl font-semibold">About</h2>

      {/* Row 1: name + email */}
      <div className="grid grid-cols-2 gap-5">
        {field("name", "Name")}
        {field("email", "Email")}
      </div>

      {/* Row 2: location + when */}
      <div className="grid grid-cols-2 gap-5">
        {field("location", "Location")}
        {field("when", "When (e.g. 2021 - Present)")}
      </div>

      {/* Resume link full width */}
      {field("resumeLink", "Resume Link")}

      {/* Bio + Story side by side */}
      <div className="grid grid-cols-2 gap-5">
        {field("bio", "Bio", true, 6)}
        {field("storyDescription", "Story Description", true, 6)}
      </div>

      <SaveButton tabKey="about" onClick={() => saveAbout(about)} />
    </div>
  );
}
