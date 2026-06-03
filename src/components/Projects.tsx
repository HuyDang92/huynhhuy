import Slider from "react-slick";
import { Image } from "antd";
import "slick-carousel/slick/slick.css";
import { useRef } from "react";
import { usePortfolio } from "../context/PortfolioContext";

const SliderComponent = (Slider as any).default || Slider;

const settings = {
   dots: false,
   infinite: true,
   slidesToShow: 1,
   slidesToScroll: 1,
   autoplay: false,
   nextArrow: <></>,
   prevArrow: <></>,
};

function Projects() {
   const slider = useRef<any>(null);
   const { projects } = usePortfolio();

   return (
      <div className="projects w-[95vw] lg:w-300  relative z-0 mx-auto mt-40">
         <h1 className="lg:text-6xl text-4xl md:mb-20 mb-10">Projects</h1>
         <div className="slider-container overflow-hidden">
            <SliderComponent ref={slider} {...settings}>
               {projects.map((project, index) => (
                  <div key={index} className="">
                     <div className="rounded-xl bg-[#49D1FF] w-fit p-2">
                        <Image src={project?.thumb} width={320} className="rounded-xl" alt="" />
                     </div>
                     <div className="md:text-5xl text-3xl mt-5 text-[#49D1FF] mb-5">{project?.name}</div>
                     <div>
                        <h3 className="">Description</h3>
                        <p className="font-sans font-semibold mb-4">{project?.description}</p>
                        <h3 className="">Role</h3>
                        <p className="font-sans font-semibold mb-4">{project?.role}</p>
                        <h3 className="">Technologies Used</h3>
                        <p className="font-sans font-semibold mb-4">{project?.technologies}</p>
                     </div>
                     <div className="flex gap-4 items-center justify-start">
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
               ))}
            </SliderComponent>
            <div className="flex justify-center gap-5 mt-5">
               <button
                  className="p-3 w-40 border-4 border-[#49D1FF] hover:bg-transparent hover:text-[#49D1FF] duration-200 rounded-md bg-[#49D1FF] text-white focus:outline-none"
                  onClick={() => slider?.current?.slickPrev()}
               >
                  Prev
               </button>
               <button
                  className="p-3 w-40 border-4 border-[#49D1FF] hover:bg-transparent hover:text-[#49D1FF] duration-200 rounded-md bg-[#49D1FF] text-white focus:outline-none"
                  onClick={() => slider?.current?.slickNext()}
               >
                  Next
               </button>
            </div>
         </div>
      </div>
   );
}

export default Projects;
