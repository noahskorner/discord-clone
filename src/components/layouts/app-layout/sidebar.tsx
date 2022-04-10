import useWindowSize from '../../../utils/hooks/use-window-size';

const Sidebar = () => {
  const { heightStyle } = useWindowSize();

  return (
    <div
      style={{ height: heightStyle }}
      className="w-full md:w-sidebar bg-slate-800 overflow-hidden rounded-r-3xl md:rounded-r-none relative"
    >
      <div className="h-header shadow-header"></div>
      <div className="h-body overflow-y-auto space-y-2"></div>
      <div className="h-14 bg-slate-1000 absolute bottom-0 left-0 right-0"></div>
    </div>
  );
};

export default Sidebar;
