import agentImg from "../../assets/agent-logo.svg";

const ChatMessage = ({ text, time }) => (
  <div className="w-10/12 p-2 my-3">
    <div className="p-2 bg-gray-300 text-gray-900 rounded-lg relative ml-[32px] cursor-pointer transition-all duration-100 animate-fade-in-up">
      <p className="text-sm">{text}</p>
      <img
        src={agentImg}
        alt="profile"
        className="w-[25px] h-[25px] rounded-full object-cover absolute bottom-0 left-[-35px]"
      />
    </div>
    <p className="text-gray-600 text-xs text-right">{time}</p>
  </div>
);

export default ChatMessage;
