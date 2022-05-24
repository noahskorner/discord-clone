import { Dispatch, SetStateAction, useState } from 'react';
import useUser from '../../../../utils/hooks/use-user';
import TextField from '../../../inputs/text-field';
import NoFriendsFound from './no-friends-found';
import { CSSTransition } from 'react-transition-group';
import handleServiceError from '../../../../utils/services/handle-service-error';
import useToasts from '../../../../utils/hooks/use-toasts';
import DirectMessageService from '../../../../services/direct-message-service';
import CreateDirectMessageRequest from '../../../../utils/types/requests/user/direct-message/create-direct-message';
import { CheckIcon } from '../../../icons';
import FriendDto from '../../../../utils/types/dtos/friend';

interface DirectMessagesModalProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

const DirectMessagesModal = ({
  showModal,
  setShowModal,
}: DirectMessagesModalProps) => {
  const { user } = useUser();
  const { errorListToToasts } = useToasts();
  const { friends } = useUser();
  const [searchText, setSearchText] = useState('');
  const filteredFriends = friends.filter((f) =>
    f.username.includes(searchText),
  );
  const [selectedFriends, setSelectedFriends] = useState<FriendDto[]>([]);

  const handleClickAway = () => {
    setShowModal(false);
  };

  const handleAddFriendBtnClick = async (friend: FriendDto) => {
    if (!selectedFriends.some((f) => f.friendId === friend.friendId))
      setSelectedFriends((prev) =>
        prev == null ? [friend] : [...prev, friend],
      );
    else
      setSelectedFriends((prev) =>
        prev.filter((f) => f.friendId !== friend.friendId),
      );
  };

  const handleCreateGroupDmBtnClick = async () => {
    try {
      const payload: CreateDirectMessageRequest = {
        userId: user!.id,
        friendIds: selectedFriends.map((f) => f.friendId),
      };
      const response = await DirectMessageService.create(payload);
      console.log(response);
    } catch (error) {
      const { errors } = handleServiceError(error);
      errorListToToasts(errors);
    }
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
                  onClick={() => handleAddFriendBtnClick(friend)}
                  key={friend.friendId}
                  className="flex w-full items-center justify-between py-1 px-2 hover:bg-slate-600"
                >
                  <div className="flex items-center justify-start space-x-2">
                    <div className="h-8 w-8 rounded-full bg-red-600"></div>
                    <span className="text-sm font-extralight">
                      {friend.username}
                    </span>
                  </div>
                  <div className="h-6 w-6 rounded border border-slate-500">
                    {selectedFriends.some(
                      (f) => f.friendId === friend.friendId,
                    ) && (
                      <CheckIcon className="relative left-[1px] text-slate-300" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
          <div className="border-t border-slate-600 p-4">
            <button
              onClick={handleCreateGroupDmBtnClick}
              className="hover-bg-indigo-700 fond-semibold w-full rounded bg-indigo-600 py-2 text-sm text-white hover:bg-indigo-700"
            >
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
