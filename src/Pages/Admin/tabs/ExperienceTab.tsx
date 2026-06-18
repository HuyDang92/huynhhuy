import { useAdminData } from "../../../context/AdminDataContext";
import { ExperienceItem } from "../../../lib/portfolioData";
import SaveButton from "../components/SaveButton";

const EMPTY: Omit<ExperienceItem, "id"> = {
   company: "",
   logoUrl: "",
   role: "",
   startDate: "",
   endDate: "",
   description: "",
   current: false,
};

function ExperienceCard({ item, onChange, onDelete }: { item: ExperienceItem; onChange: (updated: ExperienceItem) => void; onDelete: () => void }) {
   const set = (key: keyof ExperienceItem, value: string | boolean) => onChange({ ...item, [key]: value });

   return (
      <div className="bg-gray-50 border border-gray-300 rounded-2xl p-5 space-y-4">
         <div className="grid grid-cols-2 gap-4">
            {(["company", "role", "startDate", "endDate"] as const).map((key) => (
               <div key={key}>
                  <label className="text-gray-600 text-xs mb-1 block capitalize">{key.replace(/([A-Z])/g, " $1")}</label>
                  <input
                     type="text"
                     value={item[key] as string}
                     onChange={(e) => set(key, e.target.value)}
                     disabled={key === "endDate" && item.current}
                     className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 text-gray-900 text-sm focus:outline-none focus:border-[#FF5858]/60 transition-colors disabled:opacity-40"
                     placeholder={key === "endDate" ? "or check current" : ""}
                  />
               </div>
            ))}
         </div>
         <div>
            <label className="text-gray-600 text-xs mb-1 block">Company Logo URL</label>
            <input
               type="text"
               value={item.logoUrl || ""}
               onChange={(e) => set("logoUrl", e.target.value)}
               className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 text-gray-900 text-sm focus:outline-none focus:border-[#FF5858]/60 transition-colors"
               placeholder="https://example.com/logo.png"
            />
         </div>
         <div>
            <label className="text-gray-600 text-xs mb-1 block">Description</label>
            <textarea
               rows={10}
               value={item.description}
               onChange={(e) => set("description", e.target.value)}
               className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 text-gray-900 text-sm focus:outline-none focus:border-[#FF5858]/60 transition-colors resize-y"
            />
         </div>
         <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer text-gray-600 text-sm">
               <input type="checkbox" checked={item.current} onChange={(e) => set("current", e.target.checked)} className="accent-[#FF5858]" />
               Currently working here
            </label>
            <button onClick={onDelete} className="text-[#FF5858] hover:text-[#ff4040] text-sm transition-colors">
               Delete
            </button>
         </div>
      </div>
   );
}

export default function ExperienceTab() {
   const { experience, setExperienceLocal, saveExperience } = useAdminData();

   const addItem = () => setExperienceLocal([...experience, { ...EMPTY, id: crypto.randomUUID() }]);

   const updateItem = (id: string, updated: ExperienceItem) => setExperienceLocal(experience.map((i) => (i.id === id ? updated : i)));

   const deleteItem = (id: string) => setExperienceLocal(experience.filter((i) => i.id !== id));

   return (
      <div className="w-full space-y-5">
         <div className="flex items-center justify-between">
            <h2 className="text-gray-900 text-xl font-semibold">Experience</h2>
            <button
               onClick={addItem}
               className="border border-[#FF5858]/40 hover:bg-[#FF5858]/10 text-[#FF5858] rounded-xl px-4 py-2 text-sm font-bold transition-colors"
            >
               + Add
            </button>
         </div>

         {experience.length === 0 && (
            <div className="text-gray-600 text-sm py-8 text-center border border-gray-200 rounded-2xl">
               No experience entries yet. Click "+ Add" to create one.
            </div>
         )}

         {experience.map((item) => (
            <ExperienceCard key={item.id} item={item} onChange={(updated) => updateItem(item.id, updated)} onDelete={() => deleteItem(item.id)} />
         ))}

         {experience.length > 0 && <SaveButton tabKey="experience" onClick={() => saveExperience(experience)} />}
      </div>
   );
}
