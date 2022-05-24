import Link from 'next/link';
import useServers from '../../../../utils/hooks/use-servers';
import useWindowSize from '../../../../utils/hooks/use-window-size';
import Tooltip from '../../../feedback/tooltip';
import { IconSize, LogoIcon } from '../../../icons';
import CreateServerModal from './create-server-modal';

const Servers = () => {
  const { heightStyle } = useWindowSize();
  const { servers } = useServers();

  return (
    <div
      style={{ height: heightStyle }}
      className="scrollbar-none relative flex w-servers flex-col items-center space-y-2 bg-slate-900 px-2 py-3"
    >
      <Tooltip text="Home" direction="left">
        <Link href="/" passHref>
          <span className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-slate-700 text-white hover:rounded-2xl hover:bg-indigo-600">
            <LogoIcon size={IconSize.lg} />
          </span>
        </Link>
      </Tooltip>
      <div className="h-[2px] w-8 bg-slate-800"></div>
      {servers.map((server) => {
        return (
          <Tooltip key={server.id} text={server.name} direction="left">
            <Link
              href={`/servers/${server.id}/channels/${server.channels[0].id}`}
              passHref
            >
              <span className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-green-600 text-white hover:rounded-2xl"></span>
            </Link>
          </Tooltip>
        );
      })}
      <CreateServerModal />
    </div>
  );
};

export default Servers;
