import HomeState from '../../../../utils/enums/home-state';
import useHome from '../../../../utils/hooks/use-home';
import AddFriend from './add-friend';
import PendingFriends from './pending-friends';
import Wumpus from './wumpus';

const Home = () => {
  const { state: homeState } = useHome();

  return (
    <div className="flex h-full w-full items-center justify-center">
      {homeState === HomeState.PENDING ? (
        <PendingFriends />
      ) : homeState === HomeState.ADD_FRIEND ? (
        <AddFriend />
      ) : (
        <Wumpus />
      )}
    </div>
  );
};

export default Home;
