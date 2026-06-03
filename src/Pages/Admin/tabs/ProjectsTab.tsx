import { useAdminData } from "../../../context/AdminDataContext";
import { ProjectItem } from "../../../lib/portfolioData";
import SaveButton from "../components/SaveButton";

const EMPTY: Omit<ProjectItem, "id"> = {
  thumb: "", name: "", date: "", description: "", role: "",
  technologies: "", type: "web", link: "", ios: "", android: "",
};

function ProjectCard({
  item,
  onChange,
  onDelete,
}: {
  item: ProjectItem;
  onChange: (updated: ProjectItem) => void;
  onDelete: () => void;
}) {
  const set = (key: keyof ProjectItem, value: string) =>
    onChange({ ...item, [key]: value });

  return (
    <div className="bg-[#1D232A] border border-white/10 rounded-2xl p-5 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-[#9ca3af] text-xs mb-1 block">Name</label>
          <input type="text" value={item.name} onChange={(e) => set("name", e.target.value)}
            className="w-full bg-[#25262A] border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-[#FF5858]/60 transition-colors" />
        </div>
        <div>
          <label className="text-[#9ca3af] text-xs mb-1 block">Date</label>
          <input type="text" value={item.date} onChange={(e) => set("date", e.target.value)}
            className="w-full bg-[#25262A] border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-[#FF5858]/60 transition-colors" />
        </div>
      </div>
      <div>
        <label className="text-[#9ca3af] text-xs mb-1 block">Thumbnail URL</label>
        <input type="text" value={item.thumb} onChange={(e) => set("thumb", e.target.value)}
          className="w-full bg-[#25262A] border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-[#FF5858]/60 transition-colors" />
      </div>
      <div>
        <label className="text-[#9ca3af] text-xs mb-1 block">Description</label>
        <textarea rows={2} value={item.description} onChange={(e) => set("description", e.target.value)}
          className="w-full bg-[#25262A] border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-[#FF5858]/60 transition-colors resize-y" />
      </div>
      <div>
        <label className="text-[#9ca3af] text-xs mb-1 block">Role</label>
        <textarea rows={2} value={item.role} onChange={(e) => set("role", e.target.value)}
          className="w-full bg-[#25262A] border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-[#FF5858]/60 transition-colors resize-y" />
      </div>
      <div>
        <label className="text-[#9ca3af] text-xs mb-1 block">Technologies</label>
        <input type="text" value={item.technologies} onChange={(e) => set("technologies", e.target.value)}
          className="w-full bg-[#25262A] border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-[#FF5858]/60 transition-colors" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-[#9ca3af] text-xs mb-1 block">Type</label>
          <select value={item.type} onChange={(e) => set("type", e.target.value)}
            className="w-full bg-[#25262A] border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-[#FF5858]/60 transition-colors">
            <option value="web">Web</option>
            <option value="app">App</option>
          </select>
        </div>
        {item.type === "web" && (
          <div>
            <label className="text-[#9ca3af] text-xs mb-1 block">Link</label>
            <input type="text" value={item.link ?? ""} onChange={(e) => set("link", e.target.value)}
              className="w-full bg-[#25262A] border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-[#FF5858]/60 transition-colors" />
          </div>
        )}
      </div>
      {item.type === "app" && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[#9ca3af] text-xs mb-1 block">iOS Link</label>
            <input type="text" value={item.ios ?? ""} onChange={(e) => set("ios", e.target.value)}
              className="w-full bg-[#25262A] border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-[#FF5858]/60 transition-colors" />
          </div>
          <div>
            <label className="text-[#9ca3af] text-xs mb-1 block">Android Link</label>
            <input type="text" value={item.android ?? ""} onChange={(e) => set("android", e.target.value)}
              className="w-full bg-[#25262A] border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-[#FF5858]/60 transition-colors" />
          </div>
        </div>
      )}
      <div className="flex justify-end">
        <button onClick={onDelete} className="text-[#FF5858] hover:text-[#ff4040] text-sm transition-colors">Delete project</button>
      </div>
    </div>
  );
}

export default function ProjectsTab() {
  const { projects, setProjectsLocal, saveProjects } = useAdminData();

  const addItem = () =>
    setProjectsLocal([...projects, { ...EMPTY, id: crypto.randomUUID() }]);

  const updateItem = (id: string, updated: ProjectItem) =>
    setProjectsLocal(projects.map((i) => (i.id === id ? updated : i)));

  const deleteItem = (id: string) =>
    setProjectsLocal(projects.filter((i) => i.id !== id));

  return (
    <div className="w-full space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-white text-xl font-semibold">Projects</h2>
        <button onClick={addItem} className="border border-[#FF5858]/40 hover:bg-[#FF5858]/10 text-[#FF5858] rounded-xl px-4 py-2 text-sm transition-colors">
          + Add
        </button>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {projects.map((item) => (
          <ProjectCard
            key={item.id}
            item={item}
            onChange={(updated) => updateItem(item.id, updated)}
            onDelete={() => deleteItem(item.id)}
          />
        ))}
      </div>
      <SaveButton tabKey="projects" onClick={() => saveProjects(projects)} />
    </div>
  );
}
