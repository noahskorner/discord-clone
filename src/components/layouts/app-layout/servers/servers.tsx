import useServer from '../../../../utils/hooks/use-server';
import useServers from '../../../../utils/hooks/use-servers';
import useWindowSize from '../../../../utils/hooks/use-window-size';
import Tooltip from '../../../feedback/tooltip';
import { IconSize, LogoIcon } from '../../../icons';
import CreateServerModal from './create-server-modal';

const Servers = () => {
  const { heightStyle } = useWindowSize();
  const { servers } = useServers();
  const { loadServer } = useServer();

  const handleHomeButtonClick = async () => {
    await loadServer(null);
  };
  const handleServerButtonClick = async (serverId: number) => {
    await loadServer(serverId);
  };

  return (
    <div
      style={{ height: heightStyle }}
      className="scrollbar-none relative flex w-servers flex-col items-center space-y-2 bg-slate-900 px-2 py-3"
    >
      <Tooltip text="Home" direction="left">
        <button
          onClick={handleHomeButtonClick}
          className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white"
        >
          <LogoIcon size={IconSize.lg} />
        </button>
      </Tooltip>
      <div className="h-[2px] w-8 bg-slate-800"></div>
      {servers.map((server) => {
        return (
          <Tooltip key={server.id} text={server.name} direction="left">
            <button
              onClick={() => handleServerButtonClick(server.id)}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-white hover:rounded-2xl"
            ></button>
          </Tooltip>
        );
      })}
      <CreateServerModal />
    </div>
  );
};

export default Servers;
