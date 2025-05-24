import React from "react";
import Chats from "../components/SidebarChats";
import Body from "../components/Body";
import SideBarAi from "../components/SideBarAi";

const Inbox = () => {
  return (
    <div className="md:w-screen md:max-h-screen md:flex md:items-start">
      <Chats />
      <Body />
      <SideBarAi />
    </div>
  );
};

export default Inbox;
