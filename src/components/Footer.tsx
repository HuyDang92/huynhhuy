import { Icon } from "@iconify/react/dist/iconify.js";
const list = [
   {
      icon: "mage:email-fill",
      link: "mailto:danghuynhhuy776@gmail.com",
   },
   {
      icon: "bi:instagram",
      link: "https://www.instagram.com/dhhuy_0/",
   },
   {
      icon: "ri:linkedin-fill",
      link: "https://www.linkedin.com/in/dang-huynh-huy-55b78b29a/",
   },
   {
      icon: "ant-design:github-filled",
      link: "https://github.com/HuyDang92",
   },
];
function Footer() {
   return (
      <footer className="bg-[#25262A] p-10 py-16 flex justify-center">
         <div className="flex flex-col items-center justify-center gap-3 text-center text-white">
            <Icon icon="lucide:layout-dashboard" className="text-5xl mb-5" />
            <h1 style={{ textShadow: "0px 0px 2px #fff" }} className="text-white text-3xl">
               Dang Huynh Huy
            </h1>
            <p className="mb-4">Thank you for reading, I hope to hear from you!</p>
            <div className="flex gap-4">
               {list.map((item, index) => (
                  <a href={item?.link} className="text-3xl rounded-full p-3 hover:bg-black/30 duration-200" target="_blank" key={index}>
                     <Icon icon={item?.icon} />
                  </a>
               ))}
            </div>
         </div>
      </footer>
   );
}

export default Footer;
