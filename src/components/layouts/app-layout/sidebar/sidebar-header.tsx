import useServer from '../../../../utils/hooks/use-server';
import ChevronDownIcon from '../../../icons/chevron-down.svg';

const SidebarHeader = () => {
  const { server } = useServer();
  return (
    <button className="flex h-full w-full items-center justify-between py-2 px-4 hover:bg-slate-600">
      <h5 className="max-w-80 truncate text-sm font-bold">{server?.name}</h5>
      <ChevronDownIcon />
    </button>
  );
};

export default SidebarHeader;
