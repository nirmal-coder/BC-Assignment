import { motion } from "motion/react";

const AnimatedText = ({ text }) => (
  <div>
    {text.split("").map((char, index) => (
      <motion.span
        key={index}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.05 }}
        className="text-sm text-gray-700 text-wrap"
      >
        {char}
      </motion.span>
    ))}
  </div>
);

export default AnimatedText;
