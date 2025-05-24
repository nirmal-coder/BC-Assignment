import { useAiSidebar } from "../../context/AiSidebarContext";
import { useSwipeGestureAi } from "../../hooks/useSwipeGestureAi";
import AiChat from "./AiChat";
import AiInputs from "./AiInputs";
import SidebarAiHeader from "./SidebarAiHeader";

const SideBarAi = () => {
  const { isAiOpen, toggleAiSidebar, setIsAiOpen } = useAiSidebar();

  useSwipeGestureAi(() => {
    setIsAiOpen(true);
  });
  return (
    <>
      <div
        className={`${
          !isAiOpen ? "w-0 opacity-0" : "w-9/12"
        } scroll-container h-screen border-l-2   rounded-md overflow-y-scroll fixed top-0 right-0 bottom-0 z-20 transition-all duration-500 bg-gradient-to-b  from-white via-blue-50 to-purple-50
        
        md:w-30% md:z-1 md:rounded-none md:relative`}
      >
        {/* header  */}
        <SidebarAiHeader />
        <AiChat />

        <AiInputs />
      </div>
      {/* overlay for remaining space of side bar */}
      {isAiOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-10 md:hidden"
          onClick={() => toggleAiSidebar()}
        ></div>
      )}
    </>
  );
};

export default SideBarAi;
