import { usePortfolio } from "../context/PortfolioContext";
import { Icon } from "@iconify/react";

function Experience() {
   const { experience } = usePortfolio();

   if (!experience || experience.length === 0) return null;

   return (
      <div id="experience" className="experience mt-28 w-[95vw] lg:w-300 relative mx-auto p-3 lg:p-8 flex flex-col items-center">
         <h1 className="lg:text-6xl text-4xl mb-14 text-center">Work Experience</h1>
         
         <div className="relative w-full max-w-4xl">
            {/* Vertical timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 border-l-2 border-dashed border-[#49D1FF]/40 -translate-x-1/2" />

            <div className="space-y-12">
               {experience.map((item, idx) => {
                  const isEven = idx % 2 === 0;

                  return (
                     <div key={item.id} className="relative flex flex-col md:flex-row md:justify-between items-start md:items-center w-full">
                        {/* Timeline Node point */}
                        <div className="absolute left-4 md:left-1/2 w-6 h-6 rounded-full bg-[#050414] border-4 border-[#49D1FF] -translate-x-1/2 z-10 flex items-center justify-center shadow-[0_0_10px_rgba(73,209,255,0.8)] animate-pulse" />

                        {/* Card Container */}
                        <div className={`w-full md:w-[48%] pl-12 md:pl-0 ${isEven ? "md:mr-auto" : "md:ml-auto"}`}>
                           <div
                              className="bg-white border border-blue-100 dark:bg-white/5 dark:border-white/10 backdrop-blur-md p-8 rounded-2xl shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1)] dark:shadow-none hover:border-[#49D1FF] hover:shadow-[0_0_25px_rgba(73,209,255,0.2)]"
                           >
                              <div className="flex items-center gap-3 mb-2">
                                 {item.logoUrl ? (
                                    <img src={item.logoUrl} alt={item.company} className="w-12 h-12 object-contain rounded-md bg-white p-1" />
                                 ) : (
                                    <div className="w-12 h-12 rounded-md bg-blue-50 dark:bg-white/10 flex items-center justify-center text-[#49D1FF]">
                                       <Icon icon="bx:bx-briefcase" className="text-2xl" />
                                    </div>
                                 )}
                                 <div>
                                    <h3 className="text-2xl font-bold text-blue-900 dark:text-white">{item.role}</h3>
                                    <p className="text-base font-sans font-semibold text-[#49D1FF]">{item.company}</p>
                                 </div>
                              </div>
                              <div className="text-sm text-blue-500 dark:text-blue-300 font-sans mb-3">
                                 {item.startDate} - {item.current ? "Present" : item.endDate}
                              </div>
                              <p className="text-base text-blue-800/80 dark:text-white/70 font-sans leading-relaxed">{item.description}</p>
                           </div>
                        </div>
                     </div>
                  );
               })}
            </div>
         </div>
      </div>
   );
}

export default Experience;
