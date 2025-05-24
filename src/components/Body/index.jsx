import { useActiveChat } from "../../context/ActiveChatContext";
import SelectedChat from "../ui/SelectedChat";
import BodyHeader from "./BodyHeader";
import ChatInputs from "./ChatInputs";
import ListOfChat from "./ListOfChat";

const Body = () => {
  const currentChat = useActiveChat();
  const { activeId } = currentChat;
  const { status } = activeId;

  return (
    <div className="w-screen h-screen-dvh flex flex-col justify-between">
      <BodyHeader />
      {status === "not-seleted" ? (
        <div className="scroll-container w-full h-screen flex justify-center items-center">
          <SelectedChat />
        </div>
      ) : (
        <ListOfChat />
      )}
      <ChatInputs />
    </div>
  );
};

export default Body;
