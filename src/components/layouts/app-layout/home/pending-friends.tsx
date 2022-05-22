import { useState } from 'react';
import useUser from '../../../../utils/hooks/use-user';
import FriendDto from '../../../../utils/types/dtos/friend';
import { IconSize, SearchIcon } from '../../../icons';
import TextField from '../../../inputs/text-field';

const PendingFriends = () => {
  const { user } = useUser();
  const pendingFriends = user?.friendRequests
    .filter((f) => !f.accepted)
    .sort(
      (a, b) =>
        new Date(a.requestedAt).getTime() - new Date(b.requestedAt).getTime(),
    );
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
            Pending - {pendingFriends?.length}
          </p>
          {pendingFriends?.map((pendingFriend, index) => (
            <div
              key={index}
              className="flex h-14 w-full cursor-pointer items-center justify-start space-x-2 rounded-lg py-4 px-2 hover:bg-slate-600"
            >
              <div className="h-8 w-8 rounded-full bg-orange-600"></div>
              <div className="flex flex-col space-y-[1px]">
                <span className="text-sm font-bold">
                  {getPendingFriendUsername(pendingFriend)}
                </span>
                <span className="text-xs font-medium text-slate-300">
                  {getPendingFriendText(pendingFriend)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PendingFriends;
