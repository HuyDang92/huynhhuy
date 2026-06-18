import { Icon } from "@iconify/react/dist/iconify.js";
import { usePortfolio } from "../context/PortfolioContext";

function Footer() {
   const { settings } = usePortfolio();

   const list = [
      {
         icon: "mage:email-fill",
         link: settings.contactEmail ? `mailto:${settings.contactEmail}` : "",
      },
      {
         icon: "ri:linkedin-fill",
         link: settings.linkedinUrl,
      },
      {
         icon: "ant-design:github-filled",
         link: settings.githubUrl,
      },
   ];

   return (
      <footer className="bg-[#25262A] p-10 py-16 flex justify-center">
         <div className="flex flex-col items-center justify-center gap-3 text-center text-white">
            <Icon icon="lucide:layout-dashboard" className="text-5xl mb-5" />
            <h1 style={{ textShadow: "0px 0px 2px #fff" }} className="text-white text-3xl">
               {settings.siteTitle || "Dang Huynh Huy"}
            </h1>
            <p className="mb-4">Thank you for reading, I hope to hear from you!</p>
            <div className="flex gap-4">
               {list.filter(item => item.link).map((item, index) => (
                  <a href={item.link} className="text-3xl rounded-full p-3 hover:bg-black/30 duration-200" target="_blank" rel="noreferrer" key={index}>
                     <Icon icon={item.icon} />
                  </a>
               ))}
            </div>
         </div>
      </footer>
   );
}

export default Footer;
