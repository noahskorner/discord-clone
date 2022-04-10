import useWindowSize from '../../../utils/hooks/use-window-size';

const Servers = () => {
  const { heightStyle } = useWindowSize();

  return (
    <div
      style={{ height: heightStyle }}
      className="w-servers bg-slate-900 overflow-y-auto space-y-2 scrollbar-none"
    ></div>
  );
};

export default Servers;
