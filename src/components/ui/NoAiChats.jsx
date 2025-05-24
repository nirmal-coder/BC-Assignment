import AiLogo from "../../assets/ai-logo.png";

const NoAiChats = () => {
  return (
    <div className="w-full h-[65vh] flex justify-center items-center my-5 p-2">
      <div className="text-center">
        <img
          src={AiLogo}
          alt="ailogo"
          className="w-50px h-[50px] mx-auto animate-spin360Once"
        />
        <h3 className="text-gray-600 text-base font-bold">Welcome!</h3>
        <p className="text-gray-400 text-sm font-medium">
          I'm your AI Copilot — ready to assist you.
        </p>
      </div>
    </div>
  );
};

export default NoAiChats;
