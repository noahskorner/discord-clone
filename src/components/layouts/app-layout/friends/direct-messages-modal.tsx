import { Dispatch, SetStateAction, useState } from 'react';
import useUser from '../../../../utils/hooks/use-user';
import TextField from '../../../inputs/text-field';
import NoFriendsFound from './no-friends-found';
import { CSSTransition } from 'react-transition-group';

interface DirectMessagesModalProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

const DirectMessagesModal = ({
  showModal,
  setShowModal,
}: DirectMessagesModalProps) => {
  const { friends } = useUser();
  const [searchText, setSearchText] = useState('');
  const filteredFriends = friends.filter((f) =>
    f.username.includes(searchText),
  );

  const handleClickAway = () => {
    setShowModal(false);
  };

  return (
    <CSSTransition
      in={showModal}
      timeout={200}
      classNames="fade-in"
      unmountOnExit
    >
      <>
        <div className="absolute left-[12.125rem] top-6 z-[51] w-[27.5rem] space-y-3 rounded-md border border-slate-900 bg-slate-700 shadow-lg">
          <div className="space-y-3 p-4">
            <div>
              <h3 className="text-xl font-semibold text-white">
                Select Friends
              </h3>
              <p className="text-xs text-slate-300">
                You can add 9 more friends.
              </p>
            </div>
            <TextField
              value={searchText}
              onInput={setSearchText}
              placeholder="Type the username of a friend"
            />
            {filteredFriends.length > 0 ? '' : <NoFriendsFound />}
            {filteredFriends.map((friend) => {
              return (
                <button
                  key={friend.id}
                  className="flex w-full items-center justify-between py-1 px-2 hover:bg-slate-600"
                >
                  <div className="flex items-center justify-start space-x-2">
                    <div className="h-8 w-8 rounded-full bg-red-600"></div>
                    <span className="text-sm font-extralight">
                      {friend.username}
                    </span>
                  </div>
                  <div className="h-6 w-6 rounded border border-slate-500"></div>
                </button>
              );
            })}
          </div>
          <div className="border-t border-slate-600 p-4">
            <button className="hover-bg-indigo-700 fond-semibold w-full rounded bg-indigo-600 py-2 text-sm text-white hover:bg-indigo-700">
              Create Group DM
            </button>
          </div>
        </div>
        <div
          onClick={handleClickAway}
          className="fixed top-0 left-0 right-0 bottom-0 z-50"
        ></div>
      </>
    </CSSTransition>
  );
};

export default DirectMessagesModal;
