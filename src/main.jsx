import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ActiveChatProvider } from "./context/ActiveChatContext";
import { SidebarProvider } from "./context/SidebarContext";
import { AiSidebarProvider } from "./context/AiSidebarContext.jsx";
import { OringalMockDataProvider } from "./context/OriginalMockData.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <OringalMockDataProvider>
      <ActiveChatProvider>
        <AiSidebarProvider>
          <SidebarProvider>
            <App />
          </SidebarProvider>
        </AiSidebarProvider>
      </ActiveChatProvider>
    </OringalMockDataProvider>
  </StrictMode>
);
