import { createContext, useContext, useState } from "react";
import { useScreenWidth } from "../hooks/useScreenWidth";

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const width = useScreenWidth();
  const isLargeScreen = width >= 1024;
  const [isOpen, setIsOpen] = useState(isLargeScreen);
  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar, setIsOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
