import HomeState from '../../../../utils/enums/home-state';
import useHome from '../../../../utils/hooks/use-home';

interface HomeButtonProps {
  state: HomeState;
  children: JSX.Element | string;
}

const HomeButton = ({ state, children }: HomeButtonProps) => {
  const { state: homeState, setState: setHomeState } = useHome();

  const handleHomeButtonClick = () => {
    setHomeState(state);
  };

  return (
    <button
      onClick={handleHomeButtonClick}
      className={`${
        homeState === state
          ? 'bg-slate-600 font-semibold text-white'
          : 'text-slate-300 hover:bg-slate-600/20 hover:font-medium hover:text-white'
      } rounded-md px-2 py-1 text-sm font-medium`}
    >
      {children}
    </button>
  );
};

export default HomeButton;
