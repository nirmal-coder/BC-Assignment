import { useState } from "react";
import { useActiveChat } from "../../context/ActiveChatContext";
import { useSidebar } from "../../context/SidebarContext";
import { useScreenWidth } from "../../hooks/useScreenWidth";
import { useOriginalMockData } from "../../context/OriginalMockData";
import { formatTimeAgo } from "../../utils/timeUtils";

const ChatCard = (props) => {
  const { cardData } = props;
  const { name, chats, isChatOpened, profilePic, timeSinceSent, id } = cardData;
  const [msg, setMsg] = useState(chats[0].messages[0].text);

  // const msg = chats[0].messages[0].text;
  const firstLetter = name.split(" ")[0].split("")[0];
  const { setActive, setMainInput, setAiInput } = useActiveChat();
  const { toggleSidebar } = useSidebar();
  const { setData, data, setChatIsOpenFilter } = useOriginalMockData();

  const width = useScreenWidth();

  const handleOnclick = () => {
    setActive(cardData);
    setMainInput("");
    setAiInput("");

    setData((prev) =>
      [...prev].map((each) => {
        if (each.id === cardData.id) {
          return {
            ...each,
            isChatOpened: true,
          };
        } else {
          return each;
        }
      })
    );
    setChatIsOpenFilter((prev) =>
      [...prev].map((each) => {
        if (each.id === cardData.id) {
          return {
            ...each,
            isChatOpened: true,
          };
        } else {
          return each;
        }
      })
    );

    if (!(width >= 1024)) {
      toggleSidebar();
    }
  };
  const time = formatTimeAgo(timeSinceSent);

  return (
    <li
      className="w-full flex justify-between p-2 cursor-pointer bg-white hover:bg-gray-200 
      transition-transform duration-150 active:scale-[.98] text-gray-800"
      onClick={handleOnclick}
    >
      <div className="w-[80%] gap-x-3 flex items-center">
        {/* profile pic */}
        <div className={`w-[35px] h-[35px]  flex justify-center items-center`}>
          {profilePic.isPresent ? (
            <img
              src={profilePic.imgUrl}
              alt="profile_pic"
              className="w-[35px] h-[35px] rounded-[50%] object-cover"
            />
          ) : (
            <span
              className={`w-full h-full bg-purple-600 text-white flex justify-center items-center rounded-[50%]`}
            >
              {firstLetter}
            </span>
          )}
        </div>
        {/* name and msg */}
        <div className="w-[65%]">
          <h4
            className={`w-full truncate overflow-hidden whitespace-nowrap text-sm md:text-base font-semibold  ${
              isChatOpened ? "text-gray-500" : "text-gray-700"
            }`}
          >
            {name}
          </h4>
          <p className="w-full truncate overflow-hidden whitespace-nowrap text-xm md:text-base font-normal text-gray-500">
            {msg}
          </p>
        </div>
      </div>
      {/* notification and time of sending */}
      <div className="w-[20%] flex flex-col items-center">
        {!isChatOpened && (
          <span className="bg-green-300 px-1 flex justify-center items-center rounded-[50%] w-4 h-4 text-xs">
            1
          </span>
        )}
        <p className="w-full text-xs truncate overflow-hidden whitespace-nowrap text-gray-600 mt-auto">
          {time}
        </p>
      </div>
    </li>
  );
};

export default ChatCard;
