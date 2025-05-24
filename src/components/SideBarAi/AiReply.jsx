import AiLogo from "../../assets/ai-logo.png";
import { FaEdit } from "react-icons/fa";
import AnimatedText from "./AnimatedText";
import RelatedArticles from "./RelatedArticles";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { GiClick } from "react-icons/gi";

const AiReply = ({ text, time, handleAddComposer, articles = [] }) => {
  const [showTouch, setShowTouch] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShowTouch(false);
    }, 4000);
  }, []);
  return (
    <>
      <div className="w-10/12 p-2 my-3 ml-auto">
        <div className="p-2 bg-blue-200 text-gray-900 rounded-lg relative mr-[32px] animate-fade-in-up">
          <AnimatedText text={text} />
          <button
            className="bg-blue-50 text-xs rounded-md my-2 py-1 px-2 flex items-center gap-x-2 transition-transform duration-150 active:scale-90 text-gray-800 relative"
            onClick={handleAddComposer}
          >
            <FaEdit />
            Add to composer
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
};

export default AiReply;
