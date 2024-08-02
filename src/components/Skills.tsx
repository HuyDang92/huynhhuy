import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { motion } from "framer-motion";

const titles = [
   {
      id: 1,
      name: "Technical",
      icon: "mingcute:code-fill",
   },
   {
      id: 2,
      name: "Frameworks",
      icon: "iconoir:database-solid",
   },
   {
      id: 3,
      name: "Libraries",
      icon: "fluent:library-16-filled",
   },
   {
      id: 4,
      name: "Tools",
      icon: "carbon:branch",
   },
   {
      id: 5,
      name: "Project Management",
      icon: "heroicons:cpu-chip-20-solid",
   },
   {
      id: 6,
      name: "Others",
      icon: "mdi:tag-plus",
   },
];
const technical = ["HTML5", "CSS3", "SCSS", "JavaScript", "TypeScript", "PHP", "NoSQL"];
const frameworks = ["ReactJS", "NextJS", "Angular"];
const libraries = [
   "Redux",
   "Redux Toolkit",
   "Bootstrap",
   "TailwindCSS",
   "Material-UI",
   "Ant Design",
   "FireBase",
   "Animation GSAP",
   "Framer Motion",
   "WebRTC",
   "SocketIO",
];
const projectManagement = ["GitHub", "Trello", "Google Drive"];
const tools = ["Git", "VS Code", "Figma", "Postman"];
const others = ["English (Toeic 650)", "Team work ", "Responsive Design", "Restful API"];

const switchSkills = (id: number) => {
   switch (id) {
      case 1:
         return technical;
      case 2:
         return frameworks;
      case 3:
         return libraries;
      case 4:
         return tools;
      case 5:
         return projectManagement;
      case 6:
         return others;
   }
};
function Skills() {
   const [active, setActive] = useState<number>(1);
   return (
      <div className="skills mt-20 w-[75rem] relative mx-auto p-8 py-12 flex gap-10 items-start rounded-3xl bg-[#25262A]">
         <div className="w-1/2 flex flex-col gap-1.5">
            {titles.map((title) => (
               <div
                  key={title?.id}
                  onClick={() => setActive(title?.id)}
                  className={`${
                     active === title?.id ? "py-7 text-[#FF7777]" : "text-white"
                  } duration-300 px-6 py-4 text-xl  rounded-xl bg-[#2D2E33] flex justify-between items-center`}
               >
                  <span>{title?.name}</span>
                  <Icon icon={title?.icon} />
               </div>
            ))}
         </div>
         <div className="w-1/2 text-white">
            <h1 className="text-6xl">Skills</h1>
            <div className="flex gap-3 flex-wrap mt-5">
               {switchSkills(active)?.map((skill, index) => (
                  <motion.div
                     initial={{ scale: 0.5 }}
                     animate={{ scale: 1 }}
                     transition={{
                        delay: 0,
                        duration: 0.3,
                        type: "spring",
                        stiffness: 250,
                        damping: 20,
                     }}
                     key={index}
                     className="rounded-lg p-2 py-1 border-2 border-white"
                  >
                     {skill}
                  </motion.div>
               ))}
            </div>
         </div>
      </div>
   );
}

export default Skills;
