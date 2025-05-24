import NoChatImage from "../../assets/conversation-concept-illustration.png";

const NoOpenedChat = () => {
  return (
    <div className="w-[90%] h-full flex justify-center items-center flex-col">
      <img src={NoChatImage} alt="no chats opened" className="300px" />
      <p className="text-base font-semibold text-gray-600 text-center">
        No messages have been opened yet. Select a conversation to get started.
      </p>
    </div>
  );
};

export default NoOpenedChat;
