import Link from 'next/link';
import useApp from '../../../../utils/hooks/use-app';
import useServers from '../../../../utils/hooks/use-servers';
import useWindowSize from '../../../../utils/hooks/use-window-size';
import Tooltip from '../../../feedback/tooltip';
import { IconSize, LogoIcon } from '../../../icons';
import CreateServerModal from './create-server-modal';

const Servers = () => {
  const { isHomePage } = useApp();
  const { heightStyle } = useWindowSize();
  const { servers } = useServers();

  return (
    <div
      style={{ height: heightStyle }}
      className="scrollbar-none relative flex w-servers flex-col items-center space-y-2 bg-slate-900 px-2 py-3"
    >
      <div className="relative">
        {isHomePage && (
          <div className="absolute top-1 bottom-1 -left-3 w-1 rounded-r-lg bg-white"></div>
        )}
        <Tooltip text="Home" direction="left">
          <Link href="/" passHref>
            <span
              className={`${
                isHomePage
                  ? 'rounded-2xl bg-indigo-600'
                  : 'hover:rounded-2xl hover:bg-indigo-600'
              } flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-slate-700 text-white`}
            >
              <LogoIcon size={IconSize.lg} />
            </span>
          </Link>
        </Tooltip>
      </div>
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
