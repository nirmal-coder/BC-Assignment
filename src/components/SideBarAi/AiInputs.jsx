import { IoMdArrowUp } from "react-icons/io";
import { useActiveChat } from "../../context/ActiveChatContext";
import { v4 as uuidv4 } from "uuid";

const AiInputs = () => {
  const {
    activeId,

    setIndex,
    activeMsg,

    setUserMsg,

    aiInput,
    setAiInput,
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

  const handleSendAi = () => {
    if (aiInput === "") {
      return null;
    }
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

  return (
    <div className="bg-transparent w-[90%] flex justify-center absolute bottom-5 left-3 right-3 shadow-sm gap-y-3 border-2 rounded-lg border-gray-200">
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
          className="border border-gray-200 rounded-[50%] transition-transform duration-150 active:scale-75 text-gray-800"
          onClick={handleSendAi}
        >
          <IoMdArrowUp className="mx-2 font-bold text-lg md:text-xl " />
        </button>
      </div>
    </div>
  );
};

export default AiInputs;
