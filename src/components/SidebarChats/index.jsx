import { TbLayoutSidebarRightExpandFilled } from "react-icons/tb";
import ChatCard from "./ChatCard";
import { useSidebar } from "../../context/SidebarContext";
import { useSwipeGesture } from "../../hooks/useSwipeGesture";
import { useOriginalMockData } from "../../context/OriginalMockData";
import {
  filterChatsByOpenState,
  sortChatsByWaitingTime,
} from "../../hooks/useChatFilter";
import ChatsFilter from "./ChatsFilter";
import NoOpenedChat from "../ui/NoOpenedChat";

const Chats = () => {
  const { isOpen, toggleSidebar, setIsOpen } = useSidebar();
  const { data, ChatIsOpenFilter, setChatIsOpenFilter } = useOriginalMockData();

  useSwipeGesture(
    () => {
      setIsOpen(true);
    }, // Swipe right
    () => {
      setIsOpen(false);
    } // Swipe left
  );

  const handleIsOpened = (e) => {
    setChatIsOpenFilter(filterChatsByOpenState(data, e.target.value));
  };

  const HandleWaiting = (e) => {
    setChatIsOpenFilter((prev) => sortChatsByWaitingTime(prev, e.target.value));
  };

  return (
    <>
      <div
        className={`${
          !isOpen ? "w-0 opacity-0" : "w-9/12"
        } scroll-container h-screen border-r-2 bg-white border-gray-200 overflow-y-scroll overflow-x-hidden scroll-smooth fixed top-0 left-0 bottom-0 z-20 transition-all duration-500  
        
        md:w-30% md:static md:z-1 md:rounded-none
        
        `}
      >
        {/* header  */}
        <div className="w-full  border-b-[1px] border-gray-200 flex justify-between items-center p-3 px-5">
          <h2 className="text-base text-gray-800 font-bold">Your Inbox</h2>
          <button
            className="bg-transparent border-0 lg:hidden"
            onClick={() => toggleSidebar()}
          >
            <TbLayoutSidebarRightExpandFilled className="w-6 h-6 font-extralight" />
          </button>
        </div>
        {/* chats filters*/}
        <ChatsFilter
          handleIsOpened={handleIsOpened}
          HandleWaiting={HandleWaiting}
        />

        {/* chats body */}
        <ul className="list-none pl-0 w-full">
          {ChatIsOpenFilter.length === 0 ? (
            <NoOpenedChat />
          ) : (
            ChatIsOpenFilter.map((each) => (
              <ChatCard cardData={each} key={each.id} />
            ))
          )}
        </ul>
      </div>
      {/* overlay for remaining space of side bar */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-10 md:hidden"
          onClick={() => toggleSidebar()}
        ></div>
      )}
    </>
  );
};

export default Chats;
