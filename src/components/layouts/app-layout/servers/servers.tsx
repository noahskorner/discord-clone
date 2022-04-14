import useWindowSize from '../../../../utils/hooks/use-window-size';
import Tooltip from '../../../feedback/tooltip';
import LogoIcon from '../../../icons/logo.svg';
import CreateServerModal from './create-server-modal';

const Servers = () => {
  const { heightStyle } = useWindowSize();

  return (
    <div
      style={{ height: heightStyle }}
      className="scrollbar-none relative z-40 flex w-servers flex-col items-center space-y-2 bg-slate-900 px-2 py-3"
    >
      <Tooltip text="Home" direction="left">
        <button className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white">
          <LogoIcon />
        </button>
      </Tooltip>
      <div className="h-[2px] w-8 bg-slate-800"></div>
      <CreateServerModal />
    </div>
  );
};

export default Servers;
