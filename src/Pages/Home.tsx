import { Icon } from "@iconify/react/dist/iconify.js";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Header from "../components/Header";
import Skills from "../components/Skills";
import TypingTextEffect from "../components/TypingText";
import Footer from "../components/Footer";
import Projects from "../components/Projects";
import Stars3D from "../components/Stars3D";
import Earth from "../components/Earth";
import { usePortfolio } from "../context/PortfolioContext";
import CustomCursor from "../components/CustomCursor";
import RobotModal from "../components/RobotModal";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function Home() {
   const containerRef = useRef<HTMLDivElement>(null);
   const { about, settings } = usePortfolio();

   useGSAP(
      () => {
         // Banner text entrance
         gsap.from(".banner-title", {
            y: -40,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            delay: 0.3,
         });
         gsap.from(".banner-subtitle", {
            y: 20,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            delay: 0.6,
         });

         // Banner image parallax on scroll
         gsap.to(".banner-img", {
            yPercent: 12,
            ease: "none",
            scrollTrigger: {
               trigger: ".banner-section",
               start: "top top",
               end: "bottom top",
               scrub: 1.5,
            },
         });

         // About section - text slides from left, image from right
         gsap.from(".about-text", {
            x: -80,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
               trigger: ".aboutMe",
               start: "top 80%",
               toggleActions: "play none none none",
            },
         });
         gsap.from(".about-img", {
            x: 80,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
               trigger: ".aboutMe",
               start: "top 80%",
               toggleActions: "play none none none",
            },
         });

         // Generic section reveals with stagger
         const revealEls = gsap.utils.toArray<HTMLElement>(".gsap-reveal");
         revealEls.forEach((el) => {
            gsap.fromTo(
               el,
               { opacity: 0, y: 55 },
               {
                  opacity: 1,
                  y: 0,
                  duration: 0.85,
                  ease: "power3.out",
                  scrollTrigger: {
                     trigger: el,
                     start: "top 88%",
                     toggleActions: "play none none none",
                  },
               },
            );
         });

         // Contact section scale-in
         gsap.fromTo(
            ".contact",
            { scale: 0.93, opacity: 0 },
            {
               scale: 1,
               opacity: 1,
               duration: 1,
               ease: "power3.out",
               scrollTrigger: {
                  trigger: ".contact",
                  start: "top 85%",
                  toggleActions: "play none none none",
               },
            },
         );
      },
      { scope: containerRef },
   );

   return (
      <>
         <CustomCursor />
         <Header />
         <div ref={containerRef}>
            <div className="mt-[90px]" id="smooth-content">
               {/* Banner */}
               <div className="banner-section w-[95vw] lg:max-w-[1400px] relative z-0 mx-auto h-[300px] md:h-[400px] lg:h-[600px] mb-20 overflow-hidden rounded-3xl bg-gradient-to-tr from-[#03020c] via-[#0c0835] to-[#04020e]">
                  <RobotModal />
                  <div className="absolute top-10 w-full z-10 text-center left-1/2 -translate-x-1/2 text-white pointer-events-none">
                     <h1 className="banner-title lg:text-7xl text-2xl md:text-5xl drop-shadow-lg">Hi, I'm {about.name}</h1>
                     <div className="banner-subtitle drop-shadow-md font-bold">
                        <TypingTextEffect text={`I'm a front-end developer`} />
                     </div>
                  </div>
               </div>

               {/* About */}
               <div className="aboutMe" id="aboutMe">
                  <div className="absolute h-[470px] md:overflow-hidden flex md:flex-row flex-col w-full z-0 text-white">
                     <div className="about-text md:w-[60%] md:p-16 p-5">
                        <h1 className="lg:text-6xl md:text-5xl text-2xl mb-5">About me</h1>
                        <p className="h-[270px] overflow-y-auto font-sans font-semibold md:text-lg">{about.bio}</p>
                        <div className="flex items-center mt-4 gap-3">
                           <Icon icon="ph:mouse-simple-bold" className="text-2xl" />
                           <span className="">SCROLL</span>
                        </div>
                     </div>
                     <img src="/me.png" className="about-img md:w-auto w-60 mx-auto" alt="" />
                  </div>
               </div>

               {/* Story */}
               <div className="story my-20 w-[95vw] lg:w-300 relative mx-auto gsap-reveal">
                  <h1 className="text-6xl text-center">Story</h1>
                  <p className="text-center">Interact with the map below to uncover my story</p>
                  <div className="w-full flex flex-col md:flex-row items-center gap-6 mt-14">
                     <div className="md:w-1/2 w-full h-[350px] md:h-[500px]">
                        <Earth />
                     </div>
                     <div className="md:w-1/2 w-full text-[#1D232A] space-y-2 rounded-3xl bg-linear-to-b from-[#E6F9FF] to-white p-5 md:p-10">
                        <div>
                           <h3 className="text-3xl">Location</h3>
                           <p className="font-sans font-semibold">{about.location}</p>
                        </div>
                        <div>
                           <h3 className="text-3xl">When</h3>
                           <p className="font-sans font-semibold">{about.when}</p>
                        </div>
                        <div>
                           <h3 className="text-3xl">Description</h3>
                           <p className="font-sans font-semibold">{about.storyDescription}</p>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Skills */}
               <div className="gsap-reveal">
                  <Skills />
               </div>

               {/* Projects */}
               <div className="gsap-reveal">
                  <Projects />
               </div>

               {/* Contact */}
               <div className="pt-40">
                  <div className="contact rounded-3xl text-white text-center md:p-20 p-10 flex flex-col justify-center">
                     <h1 className="md:text-6xl text-4xl">Contact Me</h1>
                     <p className="font-sans w-full lg:w-[80%] mx-auto my-5">
                        If you are looking for someone to fill an open Front-end position or would simply like to consult me on full-stack engineering
                        decisions, please do not hesitate to contact me.
                     </p>
                     <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
                        <a href={`mailto:${settings.contactEmail}`} target="_blank">
                           <button className="hover:bg-white duration-200 hover:text-[#FF5858] p-3 w-[20rem] border-4 border-white rounded-md bg-transparent focus:outline-none font-medium">
                              {settings.contactEmail}
                           </button>
                        </a>
                        <a href={settings.resumeLink} target="_blank">
                           <button className="p-3 w-[20rem] border-4 border-white hover:bg-transparent hover:text-white duration-200 rounded-md bg-white text-[#FF5858] focus:outline-none">
                              RESUME
                           </button>
                        </a>
                     </div>
                  </div>
               </div>

               <div className="pt-32"></div>
               <Footer />
            </div>
         </div>
      </>
   );
}

export default Home;
