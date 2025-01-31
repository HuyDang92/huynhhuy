import Slider from "react-slick";
import { Image } from "antd";

import "slick-carousel/slick/slick.css";
import { useRef } from "react";
// import "slick-carousel/slick/slick-theme.css";

const settings = {
   dots: false,
   infinite: true,
   slidesToShow: 1,
   slidesToScroll: 1,
   autoplay: false,
   nextArrow: <></>,
   prevArrow: <></>,
};
const projects = [
   {
      thumb: "/metaverse.png",
      name: "Wing metaverse",
      date: "Mar 2024 - Present",
      description:
         "Website for learning English combined with playing online games in real-time, with the ability to make direct calls with each other. Chat with the latest AI ChatGPT to support learning, and engage in global activities.",
      role: "Website for learning English combined with playing online games in real-time, with the ability to make direct calls with each other. Features include rendering maps, rooms for moving characters set up in real-time, designing and maintaining the source code and the website, connect Socket, call video RTC,",
      technologies: "ReactJS, Typescript, Redux Toolkit, React Query, Axios, FireBase, TailwindCSS, AntDesign, Framer Motion Zoom SDK, WebRTC...",
      link: "https://debate.englishwing.com/play",
   },
   {
      thumb: "/xth.png",
      name: "FPT Polytechnic hands-on workshop",
      date: "May 2023 – March 2024",
      description: "A large web system for managing projects of lecturers and helping students to register to participate in learning",
      role: `Build user interface, connect APIs from Back-end team, optimize source code and website performance.
Perform some main functions such as authentication (JWT), notification (Real Time), set up API controller (Redux Toolkit), handle interface and logic of other functions of the website.`,
      technologies: " ReactJS, Typescript, ReduxToolkit, RTK Query, TailwindCSS, Material Tailwind, AntDesign, Ag-grid, Echarts",
      link: "https://xuongthuchanh.poly.edu.vn/",
   },
   {
      thumb: "/rdt.png",
      name: "Reading Time",
      date: "May 2023 – July 2024",
      description:
         "An online education system with 1-on-1 sessions with teachers, helping students practice their reading skills, and engage in global activities.",
      role: `SetUp source, build user interface, connect APIs from Back-end team, optimize source code and website performance.
Perform some main functions such as authentication (JWT), connect Socket, call video ZoomSDK, set up API controller (Redux Toolkit), handle interface and logic of other functions of the website.`,
      technologies: "ReactJS, Typescript, ReduxToolkit, React Query, TailwindCSS, Material Tailwind, AntDesign, Ag-grid, Echarts",
      link: "https://www.readingtime.vn/",
   },
   {
      thumb: "/writing.png",
      name: "Wing writing",
      date: "June 2023 – August 2024",
      description:
         "The learning website helps students practice writing skills, enhancing their writing ability in combination with AI ChatGPT 4.0 to improve skills.",
      role: `SetUp source, build user interface, connect APIs from Back-end team, optimize source code and website performance.
      Perform some main functions such as authentication (JWT), connect Socket, set up API controller (Redux Toolkit), handle interface and logic of other functions of the website.`,
      technologies: "ReactJS, Typescript, Redux Toolkit, React Query, TailwindCSS, AntDesign, ThreeJS. Framer Motion",
      link: "https://dev.writing.englishwing.online/",
   },
   {
      thumb: "/vieclam.png",
      name: "Fpoly recruitment",
      date: "June 2023 – August 2024",
      description: "Recruitment website finds jobs for students and employers",
      role: `Build user interface, connect APIs from Back-end team, optimize source code and website performance.
Perform some main functions such as authentication (JWT), set up API controller, handle interface and logic of other functions of the website.`,
      technologies: "ReactJS, Typescript, Zustand, React Query, TailwindCSS, DaisyUI, AntDesign, Echarts",
      link: "https://vieclam.io.vn/",
   },
];
function Projects() {
   const slider = useRef<any>(null);

   return (
      <div className="projects w-[75rem]  relative z-0 mx-auto mt-40">
         <h1 className="text-6xl mb-20">Projects</h1>
         <div className="slider-container overflow-hidden">
            <Slider ref={slider} {...settings}>
               {projects.map((project, index) => (
                  <div key={index} className="">
                     <div className="rounded-xl bg-[#49D1FF] w-fit p-2">
                        <Image src={project?.thumb} width={250} className="rounded-xl" alt="" />
                     </div>
                     <div className="text-5xl mt-5 text-[#49D1FF] mb-5">{project?.name}</div>
                     {/* <p className="text-[#49D1FF] text-xl mb-5">{project?.date}</p> */}
                     <p>
                        <h3 className="">Description</h3>
                        <p className="font-sans font-semibold mb-4">{project?.description}</p>
                        <h3 className="">Role</h3>
                        <p className="font-sans font-semibold mb-4">{project?.role}</p>
                        <h3 className="">Technologies Used</h3>
                        <p className="font-sans font-semibold mb-4">{project?.technologies}</p>
                     </p>
                     <div className="flex gap-4 items-center justify-start">
                        <a href={project?.link} target="_blank">
                           <button className="p-3 w-[10rem] border-4 border-[#49D1FF] hover:bg-transparent hover:text-[#49D1FF] duration-200 rounded-md bg-[#49D1FF] text-white focus:outline-none">
                              Link
                           </button>
                        </a>
                     </div>
                  </div>
               ))}
            </Slider>
            <div className="flex justify-center gap-5 mt-5">
               <button
                  className="p-3 w-[10rem] border-4 border-[#49D1FF] hover:bg-transparent hover:text-[#49D1FF] duration-200 rounded-md bg-[#49D1FF] text-white focus:outline-none"
                  onClick={() => slider?.current?.slickPrev()}
               >
                  Prev
               </button>
               <button
                  className="p-3 w-[10rem] border-4 border-[#49D1FF] hover:bg-transparent hover:text-[#49D1FF] duration-200 rounded-md bg-[#49D1FF] text-white focus:outline-none"
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
