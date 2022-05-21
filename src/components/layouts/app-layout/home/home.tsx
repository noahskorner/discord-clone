import HomeState from '../../../../utils/enums/home-state';
import useHome from '../../../../utils/hooks/use-home';
import AddFriend from './add-friend';
import Wumpus from './wumpus';

const Home = () => {
  const { state: homeState } = useHome();

  return (
    <div className="flex h-full w-full items-center justify-center">
      {homeState === HomeState.ADD_FRIEND ? <AddFriend /> : <Wumpus />}
    </div>
  );
};

export default Home;
