import { Icon } from "@iconify/react/dist/iconify.js";
import Header from "./components/Header";

function App() {
   return (
      <div className="">
         <Header />
         <div className="w-[1400px] relative mx-auto h-[600px] mb-20">
            <img src="/banner.webp" alt="" className="rounded-3xl h-full w-full object-cover" />
            <div className="absolute top-10 w-full z-0 text-center left-1/2 -translate-x-1/2 text-white">
               <h1 className="text-7xl ">Hi, I'm Dang huynh huy</h1>
               <p className="text-xl mt-2">I'm a front-end developer</p>
            </div>
         </div>
         <div className="aboutMe">
            <div className="absolute h-[470px] overflow-hidden flex w-full z-0 text-white">
               <div className="w-[60%] p-16">
                  <h1 className="text-6xl mb-5">About me</h1>
                  <p className="h-[270px] overflow-y-auto font-sans font-semibold text-lg">
                     I enjoy innovating more than anything, and I learn through the challenges of creating. I graduated with a BS in Computer Science
                     in 2016 and soon after became a full-stack engineer, which opened the door to pursuing my passions and interests. I love
                     expanding my knowledge of growing technologies - whether they lie in software, mechanics, or electronics - and applying it to
                     building existing and innovative solutions. Through doing what I love I've become great at what I do. Co-founding two startups
                     has given me more experience across all facets of business and product development than I could've ever hoped for. Not only have
                     I learned from my individual mistakes and accomplishments, but the guidance from many differing perspectives has been extremely
                     valuable to my growth. Throughout my professional career I've been heavily involved in planning and executing core business
                     strategies / marketing efforts as well as facilitating the growth of invaluable partnerships and networks. But more importantly,
                     I've excelled at architecting full-stack (MERN) applications, from conceptualization to users and revenue, always with
                     scalability and user experience in mind. I love connecting with great people, hearing new perspectives, and exploring creative
                     ideas, so please reach out to me (me@marcoprouve.com) if you want to talk about upcoming opportunities, growing technologies, or
                     even just want to chat.
                  </p>
                  <div className="flex items-center mt-4 gap-3">
                     <Icon icon="ph:mouse-simple-bold" className="text-2xl" />
                     <span className="">SCROLL</span>
                  </div>
               </div>
               <img src="/avt.png" className="" alt="" />
            </div>
         </div>
         <div className="my-20 w-[75rem] relative mx-auto">
            <h1 className="text-6xl text-center">Story</h1>
            <p className="text-center">Interact with the map below to uncover my story</p>
            <div className="w-full flex mt-14">
               <div className="w-1/2"></div>
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
                        I'm currently living in Marina Del Rey, CA, having moved here in 2020 during the pandemic. With the beach being so close,
                        adventures at every corner, and sunshine year-round, I couldn't be happier being where I am.
                     </p>
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
}

export default App;
