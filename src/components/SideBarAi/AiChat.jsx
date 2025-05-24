import { useEffect, useRef, useState } from "react";
import { useActiveChat } from "../../context/ActiveChatContext";
import { useAiSidebar } from "../../context/AiSidebarContext";
import { useScreenWidth } from "../../hooks/useScreenWidth";

import { PulseLoader } from "react-spinners";

import NoAiChats from "../ui/NoAiChats";
import ChatMessage from "./ChatMessage";
import AiReply from "./AiReply";

const AiChat = () => {
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);
  const { activeId, activeMsg, userMsg, setUserMsg, setMainInput } =
    useActiveChat();
  const id = activeId.id;

  const { aiChat = [] } = userMsg[id] || {};
  const { setIsAiOpen } = useAiSidebar();
  const width = useScreenWidth();

  const handleAddComposer = () => {
    setMainInput(activeMsg.text);
    if (width < 768) {
      setIsAiOpen(false);
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [aiChat]);

  useEffect(() => {
    if (
      aiChat.length % 2 !== 0 &&
      aiChat.length !== activeId.chats[0]?.messages?.length
    ) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [aiChat]);

  if (aiChat.length === 0) {
    return <NoAiChats />;
  }
  return (
    <div
      className="w-full h-[80vh] overflow-y-scroll pb-0"
      ref={chatContainerRef}
    >
      {aiChat.map((each) =>
        each.sender === "user" ? (
          <ChatMessage key={each.text} text={each.text} time={each.time} />
        ) : (
          <AiReply
            key={each.text}
            text={each.text}
            time={each.time}
            handleAddComposer={handleAddComposer}
            articles={activeId.chats[0]?.relatedArticles || []}
          />
        )
      )}
      {loading && (
        <div className="w-full flex justify-end pr-5 my-5">
          <PulseLoader size={8} speedMultiplier={0.5} color="#95bdfc" />
        </div>
      )}
    </div>
  );
};

export default AiChat;
