import { createContext, useContext, useState } from "react";
import mockData from "../data/mockData.json";

export const OriginalMockData = createContext();

export const OringalMockDataProvider = ({ children }) => {
  const [data, setData] = useState(mockData);
  const [ChatIsOpenFilter, setChatIsOpenFilter] = useState(data);
  return (
    <OriginalMockData.Provider
      value={{ data, setData, ChatIsOpenFilter, setChatIsOpenFilter }}
    >
      {children}
    </OriginalMockData.Provider>
  );
};

export const useOriginalMockData = () => useContext(OriginalMockData);

export default OriginalMockData;
