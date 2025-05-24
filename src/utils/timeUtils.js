import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const formatTimeAgo = (secondsAgo) => {
  const timestamp = new Date(Date.now() - secondsAgo * 1000);
  return dayjs(timestamp).fromNow();
};
