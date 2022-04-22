import Tooltip from '../../../../feedback/tooltip';
import PlusIcon from '../../../../icons/sm/plus.svg';

const ServerBody = () => {
  return (
    <div className="w-full px-2 py-4">
      <div className="flex items-center justify-between">
        <button className="w-full text-left text-xs font-semibold uppercase text-slate-300">
          Text channels
        </button>
        <Tooltip text="Create Channel" direction="top" size="sm">
          <button className="text-slate-300 hover:text-white">
            <PlusIcon />
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default ServerBody;
