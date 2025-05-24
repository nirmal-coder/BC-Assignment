import { useEffect, useRef, useState } from "react";
import { useActiveChat } from "../../context/ActiveChatContext";
import agentImg from "../../assets/agent-logo.svg";
import "./index.css";
import { useAiSidebar } from "../../context/AiSidebarContext";
import { useScreenWidth } from "../../hooks/useScreenWidth";

import { PulseLoader } from "react-spinners";

const ListOfChat = () => {
  const {
    activeId,

    activeMsg,

    userMsg,
    setUserMsg,

    setAiInput,
  } = useActiveChat();
  const [loading, setLoading] = useState(false);
  const { id, name, profilePic } = activeId;
  const { mainChat = [] } = userMsg[id] || {};
  const { setIsAiOpen } = useAiSidebar();
  const width = useScreenWidth();
  const chatContainerRef = useRef(null);

  const firstLetter = name ? name.charAt(0).toUpperCase() : "U";

  const selectTextOnClick = (event) => {
    const eventId = event.target.id;
    const range = document.createRange();
    range.selectNodeContents(event.target);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    setUserMsg((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        mainChat: [...prev[id].mainChat].map((each) => {
          if (each.id === eventId) {
            return { ...each, btnShow: !each.btnShow };
          }
          return each;
        }),
      },
    }));
  };

  const handleOpenCopilot = (event) => {
    const eventId = event.target.id;
    if (width < 1024) {
      setIsAiOpen(true);
    }
    setAiInput(activeMsg.text);
    setTimeout(() => {
      setUserMsg((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          mainChat: [...prev[id].mainChat].map((each) => {
            if (each.id === eventId) {
              return { ...each, btnShow: !each.btnShow };
            }
            return each;
          }),
        },
      }));
    }, 1000);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }

    if (
      mainChat.length != 1 &&
      mainChat.length % 2 === 0 &&
      mainChat.length !== activeId.chats[0]?.messages?.length
    ) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [mainChat]);

  return (
    <div className="w-full h-[70vh] overflow-y-scroll" ref={chatContainerRef}>
      {mainChat.map((each) => {
        if (each.sender === "user") {
          return (
            <div
              className="w-10/12 p-2 my-3 mb-6 animate-fade-in-up "
              key={each.text}
            >
              <div className="p-2 bg-gray-300 text-gray-900 rounded-lg relative ml-[32px] cursor-pointer transition-all duration-100">
                <p
                  className="text-sm "
                  onClick={selectTextOnClick}
                  id={each.id}
                >
                  {each.text}
                </p>

                {profilePic.isPresent ? (
                  <img
                    src={profilePic.imgUrl}
                    alt="profile_pic"
                    className="w-[25px] h-[25px] rounded-[50%] object-cover absolute bottom-0 left-[-35px]"
                  />
                ) : (
                  <span
                    className={`w-[25px] h-[25px] rounded-[50%] object-cover absolute bottom-0 left-[-35px] bg-purple-600 text-white flex justify-center items-center `}
                  >
                    {firstLetter}
                  </span>
                )}
                {each.btnShow && (
                  <button
                    className="gradient-button absolute bottom-[-45px] right-[10px] transition-transform duration-150 active:scale-75 text-gray-800"
                    onClick={handleOpenCopilot}
                    id={each.id}
                  >
                    Ask Copilot
                  </button>
                )}
              </div>
              <p className="text-gray-600 text-xs text-right">{each.time}</p>
            </div>
          );
        } else if (each.sender === "agent") {
          return (
            <div className="w-10/12 p-2 my-3 ml-auto" key={each.text}>
              <div className="p-2 bg-blue-200 text-gray-900 rounded-lg relative mr-[32px] animate-fade-in-up">
                <p className="text-sm ">{each.text}</p>

                <img
                  src={agentImg}
                  alt="profile_pic"
                  className="w-[25px] h-[25px] rounded-[50%] object-cover absolute bottom-0 right-[-35px]"
                />
              </div>
              <div className="w-full flex justify-end my-2">
                <p className="text-gray-600 text-xs text-right mr-10">
                  {each.time}
                </p>
              </div>
            </div>
          );
        }
      })}
      {loading && (
        <div className="ml-5">
          <PulseLoader size={8} speedMultiplier={0.5} color="#95bdfc" />
        </div>
      )}
    </div>
  );
};

export default ListOfChat;
