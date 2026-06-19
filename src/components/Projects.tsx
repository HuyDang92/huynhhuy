import Slider from "react-slick";
import { Image } from "antd";
import { Icon } from "@iconify/react/dist/iconify.js";
import "slick-carousel/slick/slick.css";
import { useRef } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import { useIsMobile } from "../hooks/useIsMobile";

const SliderComponent = (Slider as any).default || Slider;

function Projects() {
   const slider = useRef<any>(null);
   const { projects } = usePortfolio();
   const isMobile = useIsMobile(1024);

   const settings = {
      dots: false,
      infinite: true,
      slidesToShow: isMobile ? 1 : 2,
      slidesToScroll: 1,
      autoplay: false,
      nextArrow: <></>,
      prevArrow: <></>,
   };

   return (
      <div className="projects w-[95vw] lg:w-300  relative z-0 mx-auto mt-40">
         <h1 className="lg:text-6xl text-4xl md:mb-20 mb-10">Projects</h1>
         <div className="slider-container relative">
            <button
               className="absolute -left-5 md:-left-16 top-1/2 -translate-y-1/2 z-10 text-[#49D1FF] hover:scale-110 duration-200 focus:outline-none"
               onClick={() => slider?.current?.slickPrev()}
            >
               <Icon icon="mdi:chevron-left" className="text-5xl md:text-[5rem]" />
            </button>

            <button
               className="absolute -right-5 md:-right-16 top-1/2 -translate-y-1/2 z-10 text-[#49D1FF] hover:scale-110 duration-200 focus:outline-none"
               onClick={() => slider?.current?.slickNext()}
            >
               <Icon icon="mdi:chevron-right" className="text-5xl md:text-[5rem]" />
            </button>
            <SliderComponent ref={slider} {...settings}>
               {projects.map((project, index) => (
                  <div key={index} className="px-4">
                     <div className="flex flex-col gap-6">
                        {/* Image */}
                        <div className="rounded-xl bg-[#49D1FF] w-full max-w-[340px] p-2 shrink-0 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(73,209,255,0.6)]">
                           <Image src={project?.thumb} className="w-full h-auto rounded-xl" alt="" />
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1">
                        <div className="md:text-5xl text-3xl text-[#49D1FF] mb-5">{project?.name}</div>
                        <div>
                           <h3 className="">Description</h3>
                           <p className="font-sans font-semibold mb-4">{project?.description}</p>
                           <h3 className="">Role</h3>
                           <p className="font-sans font-semibold mb-4">{project?.role}</p>
                           <h3 className="">Technologies Used</h3>
                           <p className="font-sans font-semibold mb-4">{project?.technologies}</p>
                        </div>
                        <div className="flex flex-wrap gap-4 items-center justify-start mt-4">
                           {project?.type === "app" && (
                              <>
                                 <a href={project?.ios} target="_blank">
                                    <button className="p-3 w-40 border-4 border-[#49D1FF] hover:bg-transparent hover:text-[#49D1FF] duration-200 rounded-md bg-[#49D1FF] text-white focus:outline-none">
                                       IOS
                                    </button>
                                 </a>
                                 <a href={project?.android} target="_blank">
                                    <button className="p-3 w-40 border-4 border-[#49D1FF] hover:bg-transparent hover:text-[#49D1FF] duration-200 rounded-md bg-[#49D1FF] text-white focus:outline-none">
                                       Android
                                    </button>
                                 </a>
                              </>
                           )}
                           {project?.type === "web" && (
                              <a href={project?.link} target="_blank">
                                 <button className="p-3 w-40 border-4 border-[#49D1FF] hover:bg-transparent hover:text-[#49D1FF] duration-200 rounded-md bg-[#49D1FF] text-white focus:outline-none">
                                    Link
                                 </button>
                              </a>
                           )}
                        </div>
                        </div>
                     </div>
                  </div>
               ))}
            </SliderComponent>
         </div>
      </div>
   );
}

export default Projects;
