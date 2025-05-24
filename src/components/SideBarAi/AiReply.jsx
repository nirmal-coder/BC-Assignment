import AiLogo from "../../assets/ai-logo.png";
import { FaEdit } from "react-icons/fa";
import AnimatedText from "./AnimatedText";
import RelatedArticles from "./RelatedArticles";

const AiReply = ({ text, time, handleAddComposer, articles = [] }) => (
  <>
    <div className="w-10/12 p-2 my-3 ml-auto">
      <div className="p-2 bg-blue-200 text-gray-900 rounded-lg relative mr-[32px] animate-fade-in-up">
        <AnimatedText text={text} />
        <button
          className="bg-blue-50 text-xs rounded-md my-2 py-1 px-2 flex items-center gap-x-2 transition-transform duration-150 active:scale-90 text-gray-800"
          onClick={handleAddComposer}
        >
          <FaEdit />
          Add to composer
        </button>
        <img
          src={AiLogo}
          alt="AI"
          className="w-[25px] h-[25px] rounded-full object-cover absolute bottom-0 right-[-35px]"
        />
      </div>
      <div className="w-full flex justify-end mt-2">
        <p className="text-gray-600 text-xs text-right mr-10">{time}</p>
      </div>
    </div>
    {articles.length > 0 && <RelatedArticles articles={articles} />}
  </>
);

export default AiReply;
