import { createContext, useContext, useState } from "react";
import { useScreenWidth } from "../hooks/useScreenWidth";

const AiSidebarContext = createContext();

export const AiSidebarProvider = ({ children }) => {
  const width = useScreenWidth();
  const isLargeScreen = width >= 1024;
  const [isAiOpen, setIsAiOpen] = useState(isLargeScreen);
  const toggleAiSidebar = () => {
    setIsAiOpen((prev) => !prev);
  };
  return (
    <AiSidebarContext.Provider
      value={{ isAiOpen, toggleAiSidebar, setIsAiOpen }}
    >
      {children}
    </AiSidebarContext.Provider>
  );
};

export const useAiSidebar = () => useContext(AiSidebarContext);
