import { IoMdArrowUp } from "react-icons/io";
import { useActiveChat } from "../../context/ActiveChatContext";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { GiClick } from "react-icons/gi";

const AiInputs = () => {
  const {
    activeId,

    setIndex,
    activeMsg,

    setUserMsg,

    aiInput,
    setAiInput,
  } = useActiveChat();

  const [showTouch, setShowTouch] = useState(aiInput ? true : false);

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

  const handleSendAi = () => {
    if (aiInput === "") {
      return null;
    }
    setShowTouch(false);
    const id = activeId.id;
    setUserMsg((prev) => ({
      ...prev,
      [id]: {
        mainChat: prev[id].mainChat,
        aiChat: [
          ...prev[id].aiChat,
          {
            ...activeMsg,
            id: uuidv4(),
            btnShow: false,
            time: formatTime(new Date()),
          },
        ],
      },
    }));

    setAiInput("");

    setIndex();
  };

  useEffect(() => {
    if (aiInput) {
      setShowTouch(true);
    } else {
      setShowTouch(false);
    }
  }, [aiInput]);

  return (
    <div className="bg-transparent w-[90%] flex justify-center shadow-sm gap-y-3 border-2 rounded-lg border-gray-200 mb-5">
      <div className="h-12  w-full flex justify-between items-center shadow-lg bg-white rounded-lg">
        <input
          type="text"
          name="AiInput"
          id="AiInput"
          readOnly
          value={aiInput ?? ""}
          className="w-[90%] outline-none pl-2 cursor-not-allowed text-sm"
          placeholder="Editing disabled"
        />
        <button
          className="border border-gray-200 rounded-[50%] transition-transform duration-150 active:scale-75 text-gray-800 relative"
          onClick={handleSendAi}
        >
          <IoMdArrowUp className="mx-2 font-bold text-lg md:text-xl " />
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
              <GiClick className="text-gray-700 animate-pulse-blink" />
            </motion.div>
          )}
        </button>
      </div>
    </div>
  );
};

export default AiInputs;
