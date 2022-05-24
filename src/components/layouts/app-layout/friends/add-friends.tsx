import { ChangeEvent, useState, KeyboardEvent } from 'react';
import isEmail from 'validator/lib/isEmail';
import FriendValidator from '../../../../server/validators/user/friend';
import FriendService from '../../../../services/friend-service';
import useToasts from '../../../../utils/hooks/use-toasts';
import useUser from '../../../../utils/hooks/use-user';
import handleServiceError from '../../../../utils/services/handle-service-error';
import ErrorInterface from '../../../../utils/types/interfaces/error';
import CreateFriendRequest from '../../../../utils/types/requests/user/friend/create-friend';
import Spinner from '../../../inputs/spinner';

const AddFriends = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailErrors, setEmailErrors] = useState<ErrorInterface[]>([]);
  const [inputFocused, setInputFocused] = useState(false);
  const { success, danger } = useToasts();
  const { user, addFriendRequest } = useUser();

  const createFriendRequest = async () => {
    const payload = {
      addresseeEmail: email,
    } as CreateFriendRequest;

    const errors = FriendValidator.create(payload);
    if (errors.length > 0) {
      setEmailErrors(
        errors.filter((e: ErrorInterface) => e.field === 'addresseeEmail'),
      );

      errors
        .filter((e: ErrorInterface) => e.field !== 'addresseeEmail')
        .forEach((e) => danger(e.message));

      return;
    }

    setLoading(true);
    try {
      const response = await FriendService.create(user!.id, payload);
      addFriendRequest(response.data);
      success(`Sent friend request to ${payload.addresseeEmail}!`);
    } catch (error) {
      const { errors } = handleServiceError(error);
      if (errors.length > 0) {
        errors.forEach((error) => {
          danger(error.message);
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEmailInputFocus = () => {
    setInputFocused(true);
  };
  const handleEmailInputBlur = () => {
    setInputFocused(false);
  };
  const handleEmailInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handleSendFriendRequestBtnClick = async () => {
    await createFriendRequest();
  };
  const handleKeyDown = async (event: KeyboardEvent) => {
    if (event.key === 'Enter') await createFriendRequest();
  };

  const isDisabled = !isEmail(email);

  return (
    <div
      onKeyDown={handleKeyDown}
      className="flex h-full w-full flex-col justify-start"
    >
      <div className="space-y-4 border-b border-slate-600  px-8 py-4">
        <div className="space-y-2">
          <h2 className="font-bold uppercase">Add Friend</h2>
          <p className="text-sm text-slate-300">
            You can add a friend with their Email.
          </p>
        </div>
        <div
          className={`${
            inputFocused
              ? 'ring-1 ring-indigo-600'
              : emailErrors.length > 0
              ? 'ring-1 ring-red-600'
              : ''
          } flex h-12 items-center justify-between rounded-lg bg-slate-900 pr-2`}
        >
          <input
            onFocus={handleEmailInputFocus}
            onBlur={handleEmailInputBlur}
            onChange={handleEmailInputChange}
            type="text"
            name=""
            id=""
            className="h-full w-full rounded-lg bg-slate-900 px-4"
            placeholder="Enter an email"
          />
          <button
            onClick={handleSendFriendRequestBtnClick}
            disabled={isDisabled}
            className={`${
              isDisabled ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
            } flex items-center justify-center whitespace-nowrap rounded-md p-2 text-xs`}
          >
            <span className={`${loading && 'opacity-0'}`}>
              Send Friend Request
            </span>
            {loading && <Spinner size={'sm'} className="absolute" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddFriends;
