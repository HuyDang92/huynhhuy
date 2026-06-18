import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
      <div className="skills mt-20 w-[95vw] lg:w-[1200px] relative mx-auto p-4 md:p-8 flex flex-col md:flex-row gap-8 items-stretch">
         {/* Cybernetic ambient glow decoration */}
         <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#49D1FF]/5 rounded-full blur-3xl pointer-events-none" />
         <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#ec4899]/5 rounded-full blur-3xl pointer-events-none" />

         {/* Left: Category Sidebar */}
         <div className="w-full md:w-5/12 lg:w-4/12 flex flex-col gap-3">
            <div className="mb-4">
               <h3 className="text-xs uppercase tracking-[0.2em] dark:text-[#49D1FF] text-blue-600 font-bold">Categories</h3>
               <div className="h-[2px] w-12 bg-linear-to-r from-[#49D1FF] to-[#ec4899] mt-2" />
            </div>
            {skills.map((cat, idx) => {
               const isActive = activeIdx === idx;
               return (
                  <button
                     key={cat.id}
                     onClick={() => setActiveIdx(idx)}
                     className={`w-full text-left font-['Bungee'] font-semibold duration-300 px-6 py-4 text-base md:text-lg rounded-xl flex justify-between items-center cursor-pointer transition-all border outline-none
                        ${
                           isActive
                              ? "text-white bg-linear-to-r from-[#49D1FF] to-blue-600 border-[#49D1FF] shadow-[0_0_25px_rgba(73,209,255,0.5)] translate-x-1"
                              : "text-blue-900 bg-white border-blue-100 shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1)] dark:text-white/85 dark:bg-white/5 dark:border-white/10 dark:shadow-none hover:text-[#49D1FF] hover:border-[#49D1FF] hover:bg-blue-50 dark:hover:bg-white/10 hover:translate-x-1"
                        }
                     `}
                  >
                     <span className="truncate">{cat.label}</span>
                     <Icon
                        icon={ICON_MAP[cat.id] ?? DEFAULT_ICON}
                        className={`text-xl transition-transform duration-300 ${isActive ? "scale-125 rotate-12" : ""}`}
                     />
                  </button>
               );
            })}
         </div>

         {/* Right: Skills Grid */}
         <div className="flex-1 flex flex-col justify-between p-2 md:p-4 rounded-2xl">
            <div>
               <div className="flex justify-between items-end mb-6 border-b border-blue-200 dark:border-blue-500/20 pb-4">
                  <h1 className="md:text-5xl text-3xl font-bold tracking-tight bg-linear-to-r from-[#49D1FF] via-blue-500 to-[#ec4899] bg-clip-text text-transparent">Skills</h1>
                  <span className="text-xs font-['Bungee'] uppercase tracking-widest dark:text-[#49D1FF]/70 text-blue-600 font-semibold">
                     {activeCategory.items.length} items
                  </span>
               </div>

               <div className="min-h-[250px]">
                  <AnimatePresence mode="wait">
                     <motion.div
                        key={activeCategory.id}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        variants={{
                           hidden: { opacity: 0 },
                           show: {
                              opacity: 1,
                              transition: {
                                 staggerChildren: 0.04,
                                 delayChildren: 0.05,
                              },
                           },
                        }}
                        className="flex gap-3 flex-wrap"
                     >
                        {activeCategory.items.map((skill) => (
                           <motion.div
                              key={skill.name}
                              variants={{
                                 hidden: { opacity: 0, scale: 0.8, y: 15 },
                                 show: {
                                    opacity: 1,
                                    scale: 1,
                                    y: 0,
                                    transition: {
                                       type: "spring",
                                       stiffness: 300,
                                       damping: 20,
                                    },
                                 },
                              }}
                              whileHover={{
                                 scale: 1.05,
                                 y: -3,
                                 boxShadow: "0 12px 25px -8px rgba(73, 209, 255, 0.45)",
                                 borderColor: "#49D1FF",
                              }}
                              whileTap={{ scale: 0.95 }}
                              className="flex items-center gap-3 rounded-xl px-4 py-3 border border-blue-100 bg-white shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1)] dark:border-white/10 dark:bg-white/5 dark:shadow-none dark:text-white md:text-xl text-sm font-['Bungee'] font-medium cursor-pointer transition-colors duration-200 text-blue-900"
                           >
                              {skill.logoUrl && (
                                 <img
                                    src={skill.logoUrl}
                                    alt=""
                                    className="w-6 h-6 object-contain"
                                    onError={(e) => {
                                       (e.target as HTMLImageElement).style.display = "none";
                                    }}
                                 />
                              )}
                              <span className="capitalize">{skill.name}</span>
                           </motion.div>
                        ))}
                     </motion.div>
                  </AnimatePresence>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Skills;
