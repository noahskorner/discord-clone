import { Dispatch, SetStateAction, useState } from 'react';
import useUser from '../../../../../../utils/hooks/use-user';
import TextField from '../../../../../inputs/text-field';
import NoFriendsFound from '../../no-friends-found/no-friends-found';
import { CSSTransition } from 'react-transition-group';
import handleServiceError from '../../../../../../utils/services/handle-service-error';
import useToasts from '../../../../../../utils/hooks/use-toasts';
import DirectMessageService from '../../../../../../services/direct-message-service';
import CreateDirectMessageRequest from '../../../../../../utils/types/requests/user/direct-message/create-direct-message';
import { CheckIcon, CloseIcon, IconSize } from '../../../../../icons';
import FriendDto from '../../../../../../utils/types/dtos/friend';
import { createPortal } from 'react-dom';
import Spinner from '../../../../../inputs/spinner';
import { useRouter } from 'next/router';

interface DirectMessagesModalProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

const DirectMessagesModal = ({
  showModal,
  setShowModal,
}: DirectMessagesModalProps) => {
  const { user, addDirectMessage } = useUser();
  const { errorListToToasts } = useToasts();
  const { friends } = useUser();
  const [searchText, setSearchText] = useState('');
  const [selectedFriends, setSelectedFriends] = useState<FriendDto[]>([]);
  const filteredFriends = friends.filter(
    (f) =>
      f.username.includes(searchText) &&
      !selectedFriends.some((e) => e.friendId === f.friendId),
  );
  const [loading, setLoading] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const router = useRouter();

  const handleClickAway = () => {
    setShowModal(false);
  };

  const handleAddOrRemoveFriendBtnClick = async (friend: FriendDto) => {
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
    setLoading(true);
    try {
      const payload: CreateDirectMessageRequest = {
        userId: user!.id,
        friendIds: selectedFriends.map((f) => f.friendId),
      };

      const response = await DirectMessageService.create(payload);
      const directMessage = response.data;

      addDirectMessage(directMessage);
      setShowModal(false);
      router.push(`/direct-messages/${directMessage.id}`);
    } catch (error) {
      const { errors } = handleServiceError(error);
      errorListToToasts(errors);
    } finally {
      setLoading(false);
    }
  };

  const disabled = loading || selectedFriends.length < 1;

  return createPortal(
    <>
      <CSSTransition
        in={showModal}
        timeout={200}
        classNames="fade-in"
        unmountOnExit
      >
        <>
          <div className="absolute top-[8.5rem] left-[17rem] z-10 w-[27.5rem] space-y-3 rounded-md border border-slate-900 bg-slate-700 font-sans shadow-lg">
            <div className="space-y-3 p-4">
              <div>
                <h3 className="text-xl font-semibold text-white">
                  Select Friends
                </h3>
                <p className="text-xs text-slate-300">
                  You can add 9 more friends.
                </p>
              </div>
              <div
                className={`${isSearchFocused && 'ring-1 ring-indigo-600'} ${
                  selectedFriends.length && 'pl-1'
                } flex w-full items-center space-x-1 rounded-md bg-slate-900`}
              >
                {selectedFriends.map((friend) => {
                  return (
                    <button
                      onClick={() => handleAddOrRemoveFriendBtnClick(friend)}
                      className="flex h-full items-center space-x-1 whitespace-nowrap rounded-sm bg-slate-600 px-1 py-2 text-xs font-light text-slate-200"
                      key={friend.friendId}
                    >
                      <span>{friend.username}</span>
                      <CloseIcon size={IconSize.sm} />
                    </button>
                  );
                })}
                <TextField
                  value={searchText}
                  onInput={setSearchText}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  placeholder="Type the username of a friend"
                  showActiveState={false}
                />
              </div>
              {filteredFriends.length > 0 ? '' : <NoFriendsFound />}
              {filteredFriends.map((friend) => {
                return (
                  <button
                    onClick={() => handleAddOrRemoveFriendBtnClick(friend)}
                    key={friend.friendId}
                    className="flex w-full items-center justify-between py-1 px-2 hover:bg-slate-600"
                  >
                    <div className="flex items-center justify-start space-x-2">
                      <div className="h-8 w-8 rounded-full bg-red-600"></div>
                      <span className="text-sm font-extralight text-white">
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
                disabled={disabled}
                onClick={handleCreateGroupDmBtnClick}
                className={`${
                  disabled
                    ? 'bg-indigo-400'
                    : 'bg-indigo-600 hover:bg-indigo-700'
                } hover-bg-indigo-700 fond-semibold relative flex w-full items-center justify-center rounded py-2 text-sm text-white`}
              >
                <span className={`${loading ? 'opacity-0' : ''}`}>
                  Create Group DM{' '}
                  {`(${selectedFriends.length > 0 && selectedFriends.length})`}
                </span>
                {loading && <Spinner size="sm" className="absolute" />}
              </button>
            </div>
          </div>
          <div
            onClick={handleClickAway}
            className="fixed top-0 left-0 right-0 bottom-0 z-0"
          ></div>
        </>
      </CSSTransition>
    </>,
    document.getElementsByTagName('body')[0],
  );
};

export default DirectMessagesModal;
