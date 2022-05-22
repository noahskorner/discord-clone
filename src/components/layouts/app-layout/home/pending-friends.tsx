import { useState } from 'react';
import FriendService from '../../../../services/friend-service';
import useToasts from '../../../../utils/hooks/use-toasts';
import useUser from '../../../../utils/hooks/use-user';
import handleServiceError from '../../../../utils/services/handle-service-error';
import FriendDto from '../../../../utils/types/dtos/friend';
import Tooltip from '../../../feedback/tooltip';
import { CheckIcon, CloseIcon, IconSize, SearchIcon } from '../../../icons';
import TextField from '../../../inputs/text-field';

const PendingFriends = () => {
  const { user, pendingFriendRequests, replaceFriendRequest } = useUser();
  const { errorListToToasts } = useToasts();
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');

  const getPendingFriendUsername = (friend: FriendDto) => {
    return friend.requester.id !== user?.id
      ? friend.requester.username
      : friend.addressee.username;
  };
  const getPendingFriendText = (friend: FriendDto) => {
    return friend.requester.id === user?.id
      ? 'Outgoing Friend Request'
      : 'Incoming Friend Request';
  };

  const handleAcceptFriendRequestBtnClick = async (friendId: number) => {
    setLoading(true);
    try {
      const response = await FriendService.update(user!.id, friendId);
      replaceFriendRequest(response.data);
    } catch (error) {
      const { errors } = handleServiceError(error);
      errorListToToasts(errors);
    } finally {
      setLoading(false);
    }
  };
  const handleRemoveFriendRequestBtnClick = (friendId: number) => {
    console.log(friendId);
  };

  return (
    <div className="flex h-full w-full justify-start">
      <div className="w-full space-y-6 px-6 py-4">
        <TextField
          value={searchText}
          onInput={setSearchText}
          trailingIcon={<SearchIcon size={IconSize.sm} />}
          placeholder="Search"
        />
        <div>
          <p className="w-full border-b border-slate-600 pb-4 text-xs font-extrabold uppercase text-slate-300">
            Pending - {pendingFriendRequests.length}
          </p>
          {pendingFriendRequests.map((pendingFriendRequest, index) => (
            <div
              key={index}
              className="flex h-14 w-full cursor-pointer items-center justify-between rounded-lg py-4 px-2 hover:bg-slate-600"
            >
              <div className="flex items-center justify-start space-x-2">
                <div className="h-8 w-8 rounded-full bg-orange-600"></div>
                <div className="flex flex-col space-y-[1px]">
                  <span className="text-sm font-bold">
                    {getPendingFriendUsername(pendingFriendRequest)}
                  </span>
                  <span className="text-xs font-medium text-slate-300">
                    {getPendingFriendText(pendingFriendRequest)}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-end space-x-2">
                <Tooltip size="sm" text={'Accept'} direction={'top'}>
                  <button
                    disabled={loading}
                    onClick={() =>
                      handleAcceptFriendRequestBtnClick(pendingFriendRequest.id)
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-300 hover:bg-slate-900 hover:text-green-600"
                  >
                    <CheckIcon size={IconSize.md} />
                  </button>
                </Tooltip>
                <Tooltip size="sm" text={'Ignore'} direction={'top'}>
                  <button
                    disabled={loading}
                    onClick={() =>
                      handleRemoveFriendRequestBtnClick(pendingFriendRequest.id)
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-300 hover:bg-slate-900 hover:text-red-600"
                  >
                    <CloseIcon size={IconSize.md} />
                  </button>
                </Tooltip>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PendingFriends;
