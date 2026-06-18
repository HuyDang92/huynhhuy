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
      <footer className="dark:bg-slate-950/80 bg-white/40 backdrop-blur-md border-t dark:border-white/10 border-[#49D1FF]/15 p-10 py-16 flex justify-center">
         <div className="flex flex-col items-center justify-center gap-3 text-center dark:text-white text-slate-800">
            <Icon icon="lucide:layout-dashboard" className="text-5xl mb-5" />
            <h1 className="text-3xl font-bold">
               {settings.siteTitle || "Dang Huynh Huy"}
            </h1>
            <p className="mb-4 font-sans font-semibold">Thank you for reading, I hope to hear from you!</p>
            <div className="flex gap-4">
               {list.filter(item => item.link).map((item, index) => (
                  <a href={item.link} className="text-3xl rounded-full p-3 hover:bg-black/10 dark:hover:bg-white/10 duration-200" target="_blank" rel="noreferrer" key={index}>
                     <Icon icon={item.icon} />
                  </a>
               ))}
            </div>
         </div>
      </footer>
   );
}

export default Footer;
