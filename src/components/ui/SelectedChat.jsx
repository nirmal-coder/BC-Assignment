import selectChatImage from "../../assets/selectChat.svg";

const SelectedChat = () => {
  return (
    <div className="w-full h-[50%] md:w-3/5 text-center leading-5 flex flex-col items-center">
      <img src={selectChatImage} alt="selectChat" className="w-[40%] mx-auto" />
      <p className="text-gray-600 text-base font-bold">No chat selected. </p>

      <p className="text-gray-400 text-sm font-medium">
        choose a conversation to get started
      </p>
    </div>
  );
};

export default SelectedChat;
