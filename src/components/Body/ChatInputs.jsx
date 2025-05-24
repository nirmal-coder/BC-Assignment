import { useEffect, useRef, useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoMdSend } from "react-icons/io";
import { MdMessage, MdOutlineGTranslate } from "react-icons/md";
import { useActiveChat } from "../../context/ActiveChatContext";
import { v4 as uuidv4 } from "uuid";
import { GiClick } from "react-icons/gi";
import { motion } from "motion/react";

const ChatInputs = () => {
  const [showLanguages, setShowLanguages] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showTouch, setShowTouch] = useState(false);
  const languages = [
    "english",
    "tamil",
    "telugu",
    "malayalam",
    "hindi",
    "kannada",
  ];

  const menus = [
    {
      id: "rephrase",
      name: "rephrase",
    },
    {
      id: "myToneOfVoice",
      name: "My Tone Of Voice",
    },
    {
      id: "moreFriendly",
      name: "More Friendly",
    },
    {
      id: "moreFormal",
      name: "More Formal",
    },
    {
      id: "fixGrammar",
      name: "Fix Grammar",
    },
  ];
  const {
    activeId,

    setIndex,
    activeMsg,

    setUserMsg,
    mainInput,
    setMainInput,
  } = useActiveChat();

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

  const handleMainInput = () => {
    if (mainInput === "") {
      return null;
    }
    const id = activeId.id;
    setUserMsg((prev) => ({
      ...prev,
      [id]: {
        mainChat: [
          ...prev[id].mainChat,
          {
            ...activeMsg,
            id: uuidv4,
            time: formatTime(new Date()),
            text: mainInput,
          },
        ],
        aiChat: prev[id].aiChat,
      },
    }));

    setMainInput("");

    setIndex();
  };

  const handleTranslateFun = (e) => {
    setShowLanguages(false);

    if (mainInput === "") {
      return null;
    } else if (e.target.id === "english") {
      setMainInput(activeMsg.text);
    } else {
      const lang = e.target.id;
      const translate = activeMsg.response.translate[lang];
      setMainInput(translate);
    }
  };

  const handleLanguage = () => {
    setShowMenu(false);
    setShowLanguages((prev) => !prev);
  };
  const handleMenu = () => {
    setShowLanguages(false);
    setShowMenu((prev) => !prev);
  };

  const handleMenuFun = (e) => {
    setShowMenu(false);

    if (mainInput === "") {
      return null;
    } else {
      const menu = e.target.id;
      const translate = activeMsg.response[menu];
      setMainInput(translate);
    }
  };

  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset height
      textarea.style.height = `${textarea.scrollHeight}px`; // Set new height
    }
  }, [mainInput]);

  useEffect(() => {
    if (mainInput) {
      setShowTouch(true);
    } else {
      setShowTouch(false);
    }
  }, [mainInput]);

  return (
    <>
      <div className="w-11/12 mx-auto  shadow-lg rounded-lg bg-white p-3 border-2 border-gray-200 mb-3">
        <div className="w-full flex justify-between gap-x-3 items-center">
          <div className="flex gap-x-3 items-center">
            <MdMessage />
            <p>Chat </p>
          </div>
          <div className="flex gap-x-3 items-center text-base">
            <div className="relative">
              <button
                onClick={handleLanguage}
                aria-label="Toggle Language Menu"
                className="focus:outline-none transition-transform duration-150 active:scale-75 text-gray-800"
              >
                <MdOutlineGTranslate className="text-2xl text-gray-800" />
              </button>
              {showLanguages && (
                <div className="absolute bottom-full mb-2 right-0 bg-white border border-gray-300 rounded-md shadow-lg z-50 w-40">
                  <ul>
                    {languages.map((lang) => (
                      <li
                        key={lang}
                        id={lang}
                        className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer capitalize"
                        onClick={handleTranslateFun}
                      >
                        {lang}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {showLanguages && (
                <div
                  className="fixed top-0 right-0 bottom-0 left-0 bg-transparent z-1"
                  onClick={handleLanguage}
                ></div>
              )}
            </div>
            <button
              onClick={handleMenu}
              aria-label="Toggle Menu"
              className="focus:outline-none transition-transform duration-150 active:scale-75 text-gray-800"
            >
              <HiDotsHorizontal />
            </button>
            {showMenu && (
              <div className="absolute bottom-full mb-2 right-0 bg-white border border-gray-300 rounded-md shadow-lg z-50 w-40">
                <ul>
                  {menus.map((menu) => (
                    <li
                      key={menu.id}
                      id={menu.id}
                      className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer capitalize"
                      onClick={handleMenuFun}
                    >
                      {menu.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {showMenu && (
              <div
                className="fixed top-0 right-0 bottom-0 left-0 bg-transparent z-1"
                onClick={handleMenu}
              ></div>
            )}
          </div>
        </div>
        <div className="w-full min-h-12 flex items-center justify-between border-0">
          <textarea
            ref={textareaRef}
            name="agentInput"
            id="agentInput"
            readOnly
            value={mainInput ?? ""}
            className="w-[90%] h-[32px] max-h-40 pl-2 outline-none cursor-not-allowed text-sm resize-none overflow-hidden bg-transparent"
            placeholder="Editing disabled"
          />
          <button
            onClick={handleMainInput}
            className="transition-transform duration-150 active:scale-75 text-gray-800 relative text-lg"
          >
            <IoMdSend className="text-lg lg:text-2xl" />
            {showTouch && (
              <motion.div
                initial={{ y: 300, opacity: 0, scale: 0.8 }}
                animate={{ y: 0, opacity: 1, scale: [0.8, 1.2, 0.8] }}
                transition={{
                  y: { type: "spring", stiffness: 60 },
                  opacity: { duration: 0.5 },
                  scale: {
                    duration: 1.2,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                  },
                }}
                className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 text-2xl"
              >
                <GiClick className="text-gray-700 animate-pulse-blink text-2xl" />
              </motion.div>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatInputs;
