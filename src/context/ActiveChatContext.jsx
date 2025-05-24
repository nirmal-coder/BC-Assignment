import { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const ActiveChat = createContext();

export const ActiveChatProvider = ({ children }) => {
  const [activeId, setActive] = useState({
    id: "",
    name: "Start a conversation",
    isOpened: null,
    status: "not-seleted",
    chats: [],
    profilePic: {},
    timeSinceSent: 0,
  });
  const [index, setIndex] = useState(0);
  const [activeMsg, setActiveMsg] = useState("");
  const [userMsg, setUserMsg] = useState({});
  const [mainInput, setMainInput] = useState("");
  const [aiInput, setAiInput] = useState("");

  const handleActiveChat = (id) => {
    setActive(id);
  };

  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours || 12;

    const strHours = hours < 10 ? "0" + hours : hours;
    const strMinutes = minutes < 10 ? "0" + minutes : minutes;

    return `${strHours}:${strMinutes}${ampm}`;
  };

  useEffect(() => {
    if (!(activeId.id in userMsg)) {
      let firstMessage = activeId?.chats?.[index]?.messages?.[index] ?? null; // safe fallback

      setUserMsg((prev) => ({
        ...prev,
        [activeId.id]: {
          mainChat: firstMessage
            ? [
                {
                  ...firstMessage,
                  id: uuidv4(),
                  btnShow: false,
                  time: formatTime(new Date()),
                },
              ]
            : [],
          aiChat: [],
        },
      }));

      setIndex(0);
      setActiveMsg(firstMessage);
    }
  }, [activeId]);

  const handleIndex = () => {
    if (index < activeId?.chats?.[0]?.messages.length - 1) {
      setIndex((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const actMsg = activeId?.chats?.[0]?.messages?.[index] ?? null;

    setActiveMsg(actMsg);
    const id = activeId.id;

    setTimeout(() => {
      if (actMsg?.sender === "agent") {
        setUserMsg((prev) => ({
          ...prev,
          [id]: {
            mainChat: prev[id].mainChat,
            aiChat: [
              ...prev[id].aiChat,
              {
                ...activeId?.chats?.[0]?.messages?.[index],
                id: uuidv4(),
                btnShow: false,
                time: formatTime(new Date()),
                relatedArticles: [...activeId?.chats?.[0]?.relatedArticles],
              },
            ],
          },
        }));
      } else {
        setUserMsg((prev) => ({
          ...prev,
          [id]: {
            mainChat: [
              ...prev[id].mainChat,
              {
                ...activeId?.chats?.[0]?.messages?.[index],
                id: uuidv4(),
                time: formatTime(new Date()),
                btnShow: false,
              },
            ],
            aiChat: prev[id].aiChat,
          },
        }));
      }
    }, 2000);
  }, [index]);

  return (
    <ActiveChat.Provider
      value={{
        activeId,
        setActive: handleActiveChat,
        index,
        setIndex: handleIndex,
        activeMsg,
        setActiveMsg,
        userMsg,
        setUserMsg,
        mainInput,
        setMainInput,
        aiInput,
        setAiInput,
      }}
    >
      {children}
    </ActiveChat.Provider>
  );
};

export const useActiveChat = () => useContext(ActiveChat);
