import { useState } from 'react';
import useUser from '../../../../utils/hooks/use-user';
import TextField from '../../../inputs/text-field';

const PendingFriends = () => {
  const { user } = useUser();
  const [searchText, setSearchText] = useState('');

  return (
    <div className="flex h-full w-full justify-start">
      <div className="w-full px-6 py-4">
        <TextField value={searchText} onInput={setSearchText} />
      </div>
    </div>
  );
};

export default PendingFriends;
