import { useActiveChat } from "../../context/ActiveChatContext";
import { HiOutlineBars3BottomLeft } from "react-icons/hi2";
import { MdCall } from "react-icons/md";
import aiImage from "../../assets/ai-logo.png";

import { useSidebar } from "../../context/SidebarContext";
import { useAiSidebar } from "../../context/AiSidebarContext";
import { IoVideocam } from "react-icons/io5";

const BodyHeader = () => {
  const currentChat = useActiveChat();
  const { activeId } = currentChat;
  const { name } = activeId;

  const { toggleSidebar, isOpen } = useSidebar();
  const { toggleAiSidebar, isAiOpen } = useAiSidebar();
  return (
    <div className="w-full flex justify-between items-center p-3 px-5 border-b-[1px] border-gray-200">
      <div className="flex items-center">
        {!isOpen && (
          <button className="bg-transparent border-0" onClick={toggleSidebar}>
            <HiOutlineBars3BottomLeft className="w-6 h-6 font-extralight mr-2" />
          </button>
        )}
        <h3 className=" text-xs sm:text-sm md:text-base text-gray-700 font-bold ">
          {name}
        </h3>
      </div>
      <div className="flex items-center gap-x-4">
        <button className="transition-transform duration-150 active:scale-75 text-gray-800 hover:scale-105">
          <IoVideocam className="bg-gray-200 p-1 rounded-sm text-2xl" />
        </button>
        <button className="transition-transform duration-150 active:scale-75 text-gray-800 hover:scale-105">
          <MdCall className="bg-gray-200 p-1 rounded-sm text-2xl" />
        </button>

        {!isAiOpen && (
          <img
            src={aiImage}
            alt="copilot"
            className="w-5 h-5 lg:hidden animate-spin360"
            onClick={toggleAiSidebar}
          />
        )}
      </div>
    </div>
  );
};

export default BodyHeader;
