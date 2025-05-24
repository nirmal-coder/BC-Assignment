const ChatsFilter = ({ handleIsOpened, HandleWaiting }) => {
  return (
    <div className="w-full flex justify-between p-3 items-center mb-2">
      <select
        name="opened"
        id="opened"
        className="font-medium text-sm outline-none"
        onChange={handleIsOpened}
      >
        <option value="all" defaultValue={"all"}>
          All
        </option>
        <option value="opened" className="bg-white hover:bg-slate-200">
          opened
        </option>
        <option value="not-opened">Not opened</option>
      </select>
      <select
        name="waiting"
        id="waiting"
        className="font-medium text-xs outline-none"
        onChange={HandleWaiting}
      >
        <option value="short by Waiting" className="text-sm" default hidden>
          short by Waiting
        </option>
        <option value="Waiting shortest" className="text-sm">
          Waiting shortest
        </option>
        <option value="Waiting longest" className="text-sm">
          Waiting longest
        </option>
      </select>
    </div>
  );
};

export default ChatsFilter;
