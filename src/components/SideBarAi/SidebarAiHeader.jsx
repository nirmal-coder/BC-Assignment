import aiImage from "../../assets/ai-logo.png";
import { TbLayoutSidebarLeftExpandFilled } from "react-icons/tb";
import { useAiSidebar } from "../../context/AiSidebarContext";

const SidebarAiHeader = () => {
  const { toggleAiSidebar } = useAiSidebar();
  return (
    <div className="w-full border-b-[1px] border-gray-200 flex justify-between items-center px-4">
      <div className="flex gap-x-3 p-3">
        <img
          src={aiImage}
          alt="ai-image-logo"
          className="w-6 h-6 animate-spin360"
        />
        <p className="text-base text-gray-800 font-bold">Ai Copilot</p>
      </div>
      <button
        className="bg-transparent border-0 lg:hidden"
        onClick={() => toggleAiSidebar()}
      >
        <TbLayoutSidebarLeftExpandFilled className="w-6 h-6 font-extralight " />
      </button>
    </div>
  );
};

export default SidebarAiHeader;
