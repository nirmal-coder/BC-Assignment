export const filterChatsByOpenState = (data, state) => {
  if (state === "opened") return data.filter((chat) => chat.isChatOpened);
  if (state === "not-opened") return data.filter((chat) => !chat.isChatOpened);
  return data;
};

export const sortChatsByWaitingTime = (data, order) => {
  return [...data].sort((a, b) =>
    order === "Waiting longest"
      ? b.timeSinceSent - a.timeSinceSent
      : a.timeSinceSent - b.timeSinceSent
  );
};
