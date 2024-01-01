// Components
import { SiOpenaigym } from 'react-icons/si';
import ThemeToggle from './ThemeToggle';

const SidebarHeader = () => {
  return (
    <div className="flex items-center mb-4 pl-4">
      <SiOpenaigym className="w-10 h-10 text-primary mr-3" />
      <h2 className="text-xl font-extrabold text-primary mr-8 ">TourGemini</h2>
      <ThemeToggle />
    </div>
  );
};

export default SidebarHeader;
