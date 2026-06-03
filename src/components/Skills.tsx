import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { motion } from "framer-motion";
import { usePortfolio } from "../context/PortfolioContext";

const ICON_MAP: Record<string, string> = {
   technical: "mingcute:code-fill",
   frameworks: "iconoir:database-solid",
   libraries: "fluent:library-16-filled",
   tools: "carbon:branch",
   projectManagement: "heroicons:cpu-chip-20-solid",
   others: "mdi:tag-plus",
};

const DEFAULT_ICON = "mdi:tag-plus";

function Skills() {
   const [activeIdx, setActiveIdx] = useState(0);
   const { skills } = usePortfolio();

   if (!skills.length) return null;

   const activeCategory = skills[activeIdx] ?? skills[0];

   return (
      <div className="skills mt-20 w-[95vw] lg:w-300 relative mx-auto p-3 lg:p-8 lg:py-12 flex gap-5 md:gap-10 items-start rounded-3xl bg-[#25262A]">
         <div className="md:w-1/2 flex flex-col gap-1.5">
            {skills.map((cat, idx) => (
               <div
                  key={cat.id}
                  onClick={() => setActiveIdx(idx)}
                  className={`${
                     activeIdx === idx ? "py-7 text-[#FF7777]" : "text-white"
                  } duration-300 px-6 py-4 text-xl rounded-xl bg-[#2D2E33] flex justify-between items-center cursor-pointer`}
               >
                  <span className="md:block hidden">{cat.label}</span>
                  <Icon icon={ICON_MAP[cat.id] ?? DEFAULT_ICON} />
               </div>
            ))}
         </div>
         <div className="w-1/2 text-white">
            <h1 className="md:text-6xl text-3xl">Skills</h1>
            <div className="flex gap-3 flex-wrap mt-5">
               {activeCategory.items.map((skill, index) => (
                  <motion.div
                     initial={{ scale: 0.5 }}
                     animate={{ scale: 1 }}
                     transition={{ delay: 0, duration: 0.3, type: "spring", stiffness: 250, damping: 20 }}
                     key={index}
                     className="flex items-center gap-2 rounded-lg p-2 py-1 border-2 border-white md:text-xl text-sm"
                  >
                     {skill.logoUrl && (
                        <img
                           src={skill.logoUrl}
                           alt=""
                           className="w-5 h-5 object-contain"
                           onError={(e) => {
                              (e.target as HTMLImageElement).style.display = "none";
                           }}
                        />
                     )}
                     {skill.name}
                  </motion.div>
               ))}
            </div>
         </div>
      </div>
   );
}

export default Skills;
