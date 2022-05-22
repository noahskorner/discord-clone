import { useState } from 'react';
import useUser from '../../../../utils/hooks/use-user';
import { IconSize, SearchIcon } from '../../../icons';
import TextField from '../../../inputs/text-field';

const AllFriends = () => {
  const { friends } = useUser();
  const [searchText, setSearchText] = useState('');
  const filteredFriends = friends.filter((friend) =>
    friend.username.includes(searchText),
  );

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
            All Friends - {filteredFriends.length}
          </p>
          {filteredFriends.map((friend) => (
            <div
              key={friend.id}
              className="flex h-14 w-full cursor-pointer items-center justify-between rounded-lg py-4 px-2 hover:bg-slate-600"
            >
              <div className="flex items-center justify-start space-x-2">
                <div className="h-8 w-8 rounded-full bg-yellow-500"></div>
                <div className="flex flex-col space-y-[1px]">
                  <span className="text-sm font-bold">{friend.username}</span>
                  <span className="text-xs font-medium text-slate-300">
                    Offline
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-end space-x-2"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllFriends;
