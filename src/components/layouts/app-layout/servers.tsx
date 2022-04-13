import useWindowSize from '../../../utils/hooks/use-window-size';
import Tooltip from '../../feedback/tooltip';
import LogoIcon from '../../icons/logo.svg';
import PlusIcon from '../../icons/plus.svg';

const Servers = () => {
  const { heightStyle } = useWindowSize();

  return (
    <div
      style={{ height: heightStyle }}
      className="w-servers bg-slate-900 space-y-2 scrollbar-none px-2 py-3 flex flex-col items-center relative z-40"
    >
      <Tooltip text="Home" direction="left">
        <button className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex justify-center items-center">
          <LogoIcon />
        </button>
      </Tooltip>
      <div className="w-8 h-[2px] bg-slate-800"></div>
      <Tooltip text="Add a Server" direction="left">
        <button className="w-12 h-12 rounded-full hover:rounded-2xl bg-slate-800 text-green-600 hover:bg-green-600 hover:text-white flex justify-center items-center">
          <PlusIcon />
        </button>
      </Tooltip>
    </div>
  );
};

export default Servers;
