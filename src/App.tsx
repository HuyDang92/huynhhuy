import { Icon } from "@iconify/react/dist/iconify.js";
import Header from "./components/Header";
import Skills from "./components/Skills";
import Earth from "./components/Earth";
import TypingTextEffect from "./components/TypingText";
import Footer from "./components/Footer";

function App() {
   return (
      <>
         <Header />
         <div>
            <div className="mt-[90px]" id="smooth-content">
               <div className="w-[1400px] relative z-0 mx-auto h-[600px] mb-20">
                  <img src="/banner.webp" alt="" className="rounded-3xl h-full w-full object-cover" />
                  <div className="absolute top-10 w-full z-0 text-center left-1/2 -translate-x-1/2 text-white">
                     <h1 className="text-7xl ">Hi, I'm Dang Huynh Huy</h1>
                     <TypingTextEffect text={`I'm a front-end developer`} />
                  </div>
               </div>
               <div className="aboutMe" id="aboutMe">
                  <div className="absolute h-[470px] overflow-hidden flex w-full z-0 text-white">
                     <div className="w-[60%] p-16">
                        <h1 className="text-6xl mb-5">About me</h1>
                        <p className="h-[270px] overflow-y-auto font-sans font-semibold text-lg">
                           I enjoy innovating more than anything, and I learn through the challenges of creating. I graduated with a Software Engineer
                           and soon after became a Front-end engineer, which opened the door to pursuing my passions and interests. I love expanding
                           my knowledge of growing technologies. Through doing what I love I've become great at what I do. I've excelled at
                           architecting Web applications, always with scalability and user experience in mind. I love connecting with great people,
                           hearing new perspectives, and exploring creative ideas, so please reach out to me (danghuynhhuy@gmail.com) if you want to
                           talk about upcoming opportunities, growing technologies, or even just want to chat.
                        </p>
                        <div className="flex items-center mt-4 gap-3">
                           <Icon icon="ph:mouse-simple-bold" className="text-2xl" />
                           <span className="">SCROLL</span>
                        </div>
                     </div>
                     <img src="/me.png" className="" alt="" />
                  </div>
               </div>
               <div className="story my-20 w-[75rem] relative mx-auto">
                  <h1 className="text-6xl text-center">Story</h1>
                  <p className="text-center">Interact with the map below to uncover my story</p>
                  <div className="w-full flex mt-14">
                     <div className="w-1/2">
                        <Earth />
                     </div>
                     <div className="w-1/2 text-[#1D232A] space-y-2 rounded-3xl bg-gradient-to-b from-[#E6F9FF] to-white p-10">
                        <p>
                           <h3 className="text-3xl">Location</h3>
                           <p className="font-sans font-semibold">Go Vap, Ho Chi Minh</p>
                        </p>
                        <p>
                           <h3 className="text-3xl">When</h3>
                           <p className="font-sans font-semibold">2021 - Present</p>
                        </p>
                        <p>
                           <h3 className="text-3xl">Description</h3>
                           <p className="font-sans font-semibold">
                              I was born and raised in Long An Province, a peaceful and beautiful place. After completing high school, I moved to Ho
                              Chi Minh City to live and work. With a burning passion for programming, I pursued this path and eventually decided to
                              become a Front-end Developer because I enjoy working with colors, images, and interfaces.{" "}
                           </p>
                        </p>
                     </div>
                  </div>
               </div>
               <Skills />
               <div className="pt-40">
                  <div className="contact rounded-3xl text-white text-center p-20 flex flex-col justify-center">
                     <h1 className="text-6xl ">Contact Me</h1>
                     <p className="font-sans w-[80%] mx-auto my-5">
                        If you are looking for someone to fill an open Front-end position or would simply like to consult me on full-stack engineering
                        decisions, please do not hesitate to contact me.
                     </p>
                     <div className="flex gap-4 items-center justify-center">
                        <a href="mailto:danghuynhhuy776@gmail.com" target="_blank">
                           <button className="hover:bg-white duration-200 hover:text-[#FF5858] p-3 w-[20rem] border-4 border-white rounded-md bg-transparent focus:outline-none font-medium">
                              danghuynhhuy776@gmail.com
                           </button>
                        </a>
                        <a href="https://drive.google.com/file/d/1zEnZVIsUiLTPiOyv6QypsO3avA-zjlvg/view" target="_blank">
                           <button className="p-3 w-[20rem] border-4 border-white hover:bg-transparent hover:text-white duration-200 rounded-md bg-white text-[#FF5858] focus:outline-none">
                              RESUME
                           </button>
                        </a>{" "}
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

export default App;
