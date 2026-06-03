import { useState } from "react";
import {
  DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent,
  PointerSensor, closestCenter, useSensor, useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove, horizontalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useDroppable } from "@dnd-kit/core";
import { useAdminData } from "../../../context/AdminDataContext";
import { SkillCategory, SkillItem, SkillsData } from "../../../lib/portfolioData";
import SaveButton from "../components/SaveButton";

type SkillWithId = SkillItem & { _id: string };
type CatLocal = Omit<SkillCategory, "items"> & { items: SkillWithId[]; editing: boolean };

function stripMeta(cats: CatLocal[]): SkillsData {
  return cats.map(({ editing: _, items, ...rest }) => ({
    ...rest,
    items: items.map(({ _id: __, ...item }) => item),
  }));
}

function hydrate(data: SkillsData): CatLocal[] {
  return data.map((cat) => ({
    ...cat,
    editing: false,
    items: cat.items.map((item) => ({ ...item, _id: crypto.randomUUID() })),
  }));
}

// ── Sortable skill tag ───────────────────────────────────────────────────────
function SortableTag({
  skill, onRemove, onEditLogo,
}: {
  skill: SkillWithId; onRemove: () => void; onEditLogo: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: skill._id });

  return (
    <span
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.3 : 1 }}
      className="flex items-center gap-1.5 bg-[#25262A] border border-white/10 text-white rounded-lg px-3 py-1 text-sm select-none"
    >
      <span {...listeners} {...attributes} className="cursor-grab active:cursor-grabbing text-[#4b5563] hover:text-[#9ca3af] text-xs mr-0.5" title="Drag">⠿</span>
      {skill.logoUrl && <img src={skill.logoUrl} alt="" className="w-4 h-4 object-contain rounded-sm" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />}
      {skill.name}
      <button onClick={onEditLogo} className="text-[#9ca3af] hover:text-[#FF5858] ml-0.5 text-xs transition-colors">{skill.logoUrl ? "🖼" : "＋"}</button>
      <button onClick={onRemove} className="text-[#9ca3af] hover:text-[#FF5858] text-xs transition-colors">✕</button>
    </span>
  );
}

function DragTag({ skill }: { skill: SkillWithId }) {
  return (
    <span className="flex items-center gap-1.5 bg-[#FF5858]/20 border border-[#FF5858]/40 text-white rounded-lg px-3 py-1 text-sm shadow-xl cursor-grabbing">
      {skill.logoUrl && <img src={skill.logoUrl} alt="" className="w-4 h-4 object-contain rounded-sm" />}
      {skill.name}
    </span>
  );
}

// ── Category card ────────────────────────────────────────────────────────────
function CategoryCard({
  cat, onLabelChange, onLabelCommit, onToggleEdit, onDelete,
  onRemoveSkill, onAddSkill, onEditLogo, logoEdit, onCommitLogo, onCancelLogo,
}: {
  cat: CatLocal;
  onLabelChange: (v: string) => void;
  onLabelCommit: () => void;
  onToggleEdit: () => void;
  onDelete: () => void;
  onRemoveSkill: (i: number) => void;
  onAddSkill: (item: SkillItem) => void;
  onEditLogo: (i: number) => void;
  logoEdit: { idx: number; val: string } | null;
  onCommitLogo: (val: string) => void;
  onCancelLogo: () => void;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: cat.id });
  const [name, setName] = useState("");
  const [logoUrl, setLogoUrl] = useState("");

  const handleAdd = () => {
    const n = name.trim();
    if (n) { onAddSkill({ name: n, logoUrl: logoUrl.trim() || undefined }); setName(""); setLogoUrl(""); }
  };

  return (
    <div className={`bg-[#1D232A] border rounded-2xl p-4 space-y-3 transition-colors ${isOver ? "border-[#FF5858]/50 bg-[#FF5858]/5" : "border-white/10"}`}>
      {/* Category header */}
      <div className="flex items-center gap-2">
        {cat.editing ? (
          <input
            autoFocus
            value={cat.label}
            onChange={(e) => onLabelChange(e.target.value)}
            onBlur={onLabelCommit}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === "Escape") onLabelCommit(); }}
            className="flex-1 bg-[#25262A] border border-[#FF5858]/50 rounded-lg px-3 py-1 text-[#FF5858] text-sm font-medium focus:outline-none"
          />
        ) : (
          <p className="flex-1 text-[#FF5858] text-sm font-medium truncate">{cat.label}</p>
        )}
        <button onClick={onToggleEdit} title="Rename" className="text-[#4b5563] hover:text-white text-xs transition-colors px-1">✏️</button>
        <button onClick={onDelete} title="Delete category" className="text-[#4b5563] hover:text-[#FF5858] text-xs transition-colors px-1">🗑</button>
      </div>

      {/* Skills drop zone */}
      <div ref={setNodeRef} className="min-h-[2rem]">
        <SortableContext items={cat.items.map((s) => s._id)} strategy={horizontalListSortingStrategy}>
          <div className="flex flex-wrap gap-2">
            {cat.items.map((skill, i) => (
              <div key={skill._id} className="relative">
                <SortableTag
                  skill={skill}
                  onRemove={() => onRemoveSkill(i)}
                  onEditLogo={() => onEditLogo(i)}
                />
                {logoEdit?.idx === i && (
                  <div className="absolute top-full left-0 mt-1 z-20 bg-[#25262A] border border-white/10 rounded-xl p-3 w-64 shadow-xl space-y-2">
                    <p className="text-[#9ca3af] text-xs font-medium">Logo URL — "{skill.name}"</p>
                    <input
                      autoFocus type="text" value={logoEdit.val}
                      onChange={(e) => onCommitLogo(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter" || e.key === "Escape") onCancelLogo(); }}
                      placeholder="https://..."
                      className="w-full bg-[#1D232A] border border-white/10 rounded-lg px-3 py-1.5 text-white text-xs focus:outline-none focus:border-[#FF5858]/60"
                    />
                    <button onClick={onCancelLogo} className="w-full bg-[#FF5858] hover:bg-[#ff4040] text-white rounded-lg py-1 text-xs transition-colors">Done</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </SortableContext>
      </div>

      {/* Add skill */}
      <div className="space-y-2 pt-1">
        <div className="flex gap-2">
          <input type="text" value={name} onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()} placeholder="Skill name"
            className="flex-1 bg-[#25262A] border border-white/10 rounded-xl px-4 py-2 text-white text-sm placeholder-[#4b5563] focus:outline-none focus:border-[#FF5858]/60 transition-colors"
          />
          <button onClick={handleAdd} className="bg-[#FF5858] hover:bg-[#ff4040] text-white rounded-xl px-4 py-2 text-sm transition-colors">Add</button>
        </div>
        <input type="text" value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} placeholder="Logo URL (optional)"
          className="w-full bg-[#25262A] border border-white/10 rounded-xl px-4 py-2 text-white text-sm placeholder-[#4b5563] focus:outline-none focus:border-[#FF5858]/60 transition-colors"
        />
      </div>
    </div>
  );
}

// ── Main tab ─────────────────────────────────────────────────────────────────
export default function SkillsTab() {
  const { skills, setSkillsLocal, saveSkills } = useAdminData();
  const [cats, setCats] = useState<CatLocal[]>(() => hydrate(skills));
  const [activeSkill, setActiveSkill] = useState<SkillWithId | null>(null);
  const [logoEdit, setLogoEdit] = useState<{ catId: string; idx: number; val: string } | null>(null);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const sync = (next: CatLocal[]) => { setCats(next); setSkillsLocal(stripMeta(next)); };

  const findCatBySkill = (skillId: string) => cats.find((c) => c.items.some((s) => s._id === skillId));

  // ── Category CRUD ──
  const addCategory = () => {
    const next = [...cats, { id: crypto.randomUUID(), label: "New Category", items: [], editing: true }];
    sync(next);
  };

  const updateLabel = (catId: string, label: string) =>
    setCats(cats.map((c) => c.id === catId ? { ...c, label } : c));

  const commitLabel = (catId: string) =>
    sync(cats.map((c) => c.id === catId ? { ...c, editing: false, label: c.label.trim() || "Category" } : c));

  const toggleEdit = (catId: string) =>
    setCats(cats.map((c) => c.id === catId ? { ...c, editing: !c.editing } : c));

  const deleteCategory = (catId: string) => sync(cats.filter((c) => c.id !== catId));

  // ── Skill CRUD ──
  const removeSkill = (catId: string, i: number) =>
    sync(cats.map((c) => c.id === catId ? { ...c, items: c.items.filter((_, idx) => idx !== i) } : c));

  const addSkill = (catId: string, item: SkillItem) =>
    sync(cats.map((c) => c.id === catId ? { ...c, items: [...c.items, { ...item, _id: crypto.randomUUID() }] } : c));

  const commitLogo = (val: string) => {
    if (!logoEdit) return;
    const next = cats.map((c) =>
      c.id === logoEdit.catId
        ? { ...c, items: c.items.map((s, i) => i === logoEdit.idx ? { ...s, logoUrl: val || undefined } : s) }
        : c
    );
    setLogoEdit({ ...logoEdit, val });
    setCats(next);
    setSkillsLocal(stripMeta(next));
  };

  // ── DnD ──
  const handleDragStart = ({ active }: DragStartEvent) => {
    const cat = findCatBySkill(active.id as string);
    setActiveSkill(cat?.items.find((s) => s._id === active.id) ?? null);
  };

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    if (!over) return;
    const activeId = active.id as string;
    const overId = over.id as string;
    const sourceCat = findCatBySkill(activeId);
    const targetCat = cats.find((c) => c.id === overId) ?? findCatBySkill(overId);
    if (!sourceCat || !targetCat || sourceCat.id === targetCat.id) return;

    const moved = sourceCat.items.find((s) => s._id === activeId)!;
    const overIdx = targetCat.items.findIndex((s) => s._id === overId);
    const newTarget = [...targetCat.items];
    newTarget.splice(overIdx >= 0 ? overIdx : newTarget.length, 0, moved);

    setCats(cats.map((c) => {
      if (c.id === sourceCat.id) return { ...c, items: c.items.filter((s) => s._id !== activeId) };
      if (c.id === targetCat.id) return { ...c, items: newTarget };
      return c;
    }));
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    setActiveSkill(null);
    if (!over) return;
    const activeId = active.id as string;
    const overId = over.id as string;
    const sourceCat = findCatBySkill(activeId);
    if (!sourceCat) return;

    const overInSame = sourceCat.items.findIndex((s) => s._id === overId);
    if (overInSame !== -1) {
      const oldIdx = sourceCat.items.findIndex((s) => s._id === activeId);
      if (oldIdx !== overInSame) {
        sync(cats.map((c) => c.id === sourceCat.id ? { ...c, items: arrayMove(c.items, oldIdx, overInSame) } : c));
      }
      return;
    }
    sync([...cats]);
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-white text-xl font-semibold">Skills</h2>
        <div className="flex items-center gap-3">
          <p className="text-[#4b5563] text-xs hidden xl:block">Drag ⠿ to move skills between categories</p>
          <button onClick={addCategory} className="border border-[#FF5858]/40 hover:bg-[#FF5858]/10 text-[#FF5858] rounded-xl px-4 py-2 text-sm transition-colors">
            + Add Category
          </button>
        </div>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter}
        onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {cats.map((cat) => (
            <CategoryCard
              key={cat.id}
              cat={cat}
              onLabelChange={(v) => updateLabel(cat.id, v)}
              onLabelCommit={() => commitLabel(cat.id)}
              onToggleEdit={() => toggleEdit(cat.id)}
              onDelete={() => deleteCategory(cat.id)}
              onRemoveSkill={(i) => removeSkill(cat.id, i)}
              onAddSkill={(item) => addSkill(cat.id, item)}
              onEditLogo={(i) => setLogoEdit({ catId: cat.id, idx: i, val: cat.items[i].logoUrl ?? "" })}
              logoEdit={logoEdit?.catId === cat.id ? logoEdit : null}
              onCommitLogo={commitLogo}
              onCancelLogo={() => setLogoEdit(null)}
            />
          ))}
        </div>
        <DragOverlay>{activeSkill && <DragTag skill={activeSkill} />}</DragOverlay>
      </DndContext>

      <SaveButton tabKey="skills" onClick={() => saveSkills(stripMeta(cats))} />
    </div>
  );
}
