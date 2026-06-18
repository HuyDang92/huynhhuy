import { Icon } from "@iconify/react";
import React from "react";
import { Link } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";

const list = [
   {
      id: 1,
      name: "Home",
      icon: "bx:bx-user",
      idDiv: "aboutMe",
   },
   {
      id: 2,
      name: "Story",
      icon: "bx:bx-book",
      idDiv: "story",
   },
   {
      id: 3,
      name: "Skills",
      icon: "bx:bx-code-alt",
      idDiv: "skills",
   },
   {
      id: 4,
      name: "Experience",
      icon: "bx:bx-briefcase",
      idDiv: "experience",
   },
   {
      id: 5,
      name: "Projects",
      icon: "bx:bx-shopping-bag",
      idDiv: "projects",
   },
   {
      id: 6,
      name: "Interests",
      icon: "bx:bx-heart",
      idDiv: "interests",
   },
   {
      id: 7,
      name: "Contact Me",
      icon: "bx:bx-mail-send",
      idDiv: "contact",
   },
];

function Header() {
   const [theme, setTheme] = React.useState("dark");
   const [open, setOpen] = React.useState(false);
   const toggleTheme = () => {
      setTheme(theme === "dark" ? "light" : "dark");
   };
   React.useEffect(() => {
      document.querySelector("html")?.setAttribute("data-theme", theme);
   }, [theme]);
   return (
      <div className="w-full flex justify-center">
         <header className="h-[90px] w-[95vw] lg:max-w-[1400px] fixed top-0 left-0 right-0 z-50 mx-auto flex justify-between items-center">
            <h1 style={{ textShadow: "0px 0px 2px #000" }} className="text-3xl">
               D.H.HUY
            </h1>
            <label className="swap swap-rotate bg-white/30 p-1 rounded-lg">
               <input onChange={toggleTheme} checked={theme === "dark"} type="checkbox" className="theme-controller" value="synthwave" />

               {/* sun icon */}
               <svg className="swap-off h-10 w-10 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
               </svg>

               {/* moon icon */}
               <svg className="swap-on h-10 w-10 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
               </svg>
            </label>
            <button
               onClick={() => setOpen(true)}
               aria-label="open menu"
               className="hover:scale-110 hover:bg-white/20 transition-all rounded-full px-2 py-1 cursor-pointer"
            >
               <Icon icon="lucide:layout-dashboard" className="text-4xl" />
            </button>

            <AnimatePresence>
               {open && (
                  <motion.div
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     transition={{ duration: 0.25 }}
                     onClick={() => setOpen(false)}
                     className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
                  >
                     <motion.nav
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", stiffness: 280, damping: 26 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-md rounded-3xl border border-white/20 bg-white/10 dark:bg-white/5 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.35)] p-6 sm:p-8"
                     >
                        {/* glass glow accents */}
                        <div className="absolute -top-16 -left-16 w-40 h-40 bg-[#49D1FF]/30 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-[#ec4899]/30 rounded-full blur-3xl pointer-events-none" />

                        <div className="relative flex items-center justify-between mb-6">
                           <h2 className="text-2xl bg-linear-to-r from-[#49D1FF] to-[#ec4899] bg-clip-text text-transparent">Menu</h2>
                           <button
                              onClick={() => setOpen(false)}
                              aria-label="close menu"
                              className="rounded-full p-2 text-white/70 hover:text-white hover:bg-white/15 transition-colors cursor-pointer"
                           >
                              <Icon icon="lucide:x" className="text-2xl" />
                           </button>
                        </div>

                        <ul className="relative grid grid-cols-2 gap-3">
                           {list.map((item) => (
                              <li key={item.id}>
                                 <Link
                                    activeClass="active"
                                    to={item.idDiv}
                                    spy={true}
                                    smooth={true}
                                    offset={-120}
                                    duration={500}
                                    onClick={() => setOpen(false)}
                                    className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white/85 cursor-pointer transition-all hover:border-[#49D1FF]/60 hover:bg-white/10 hover:text-[#49D1FF]"
                                 >
                                    <Icon icon={item.icon} className="text-xl text-[#49D1FF] transition-transform group-hover:scale-125" />
                                    <span className="truncate">{item.name}</span>
                                 </Link>
                              </li>
                           ))}
                        </ul>
                     </motion.nav>
                  </motion.div>
               )}
            </AnimatePresence>
         </header>
      </div>
   );
}

export default Header;
