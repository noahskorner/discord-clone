import useApp from '../../../../../utils/hooks/use-app';
import Modal from '../../../../utils/modal';
import { useState } from 'react';
import IconButton from '../../../../inputs/icon-button';
import { CloseIcon, IconSize, SearchIcon } from '../../../../icons';
import useServer from '../../../../../utils/hooks/use-server';
import TextField from '../../../../inputs/text-field';
import useUser from '../../../../../utils/hooks/use-user';
import handleServiceError from '../../../../../utils/services/handle-service-error';
import useToasts from '../../../../../utils/hooks/use-toasts';
import ServerInviteService from '../../../../../services/server-invite-service';
import InviteValidator from '../../../../../server/validators/server/invite/invite.validator';
import Spinner from '../../../../inputs/spinner';
import NoFriendsFound from './no-friends-found';
import { useRouter } from 'next/router';
import ProfileImage from '../../profile-image';
import FriendDto from '../../../../../utils/types/dtos/friend';
const InvitePeopleModal = () => {
  const router = useRouter();
  const { showInvitePeopleModal, setShowInvitePeopleModal } = useApp();
  const { server } = useServer();
  const [searchText, setSearchText] = useState('');
  const { friends, addServerInvite, user } = useUser();
  const { success, errorListToToasts } = useToasts();
  const filteredFriends = friends.filter((f) => {
    return (
      f.username.includes(searchText) &&
      user != null &&
      server != null &&
      !(
        user.serverInvites.filter(
          (e) =>
            e.addressee.id === f.id ||
            (e.requester.id === f.id && e.serverId === server.id),
        ).length > 0
      )
    );
  });
  const [loading, setLoading] = useState(false);

  const handleCloseModalBtnClick = () => {
    setShowInvitePeopleModal(false);
  };
  const handleInviteBtnClick = async (friend: FriendDto) => {
    if (server == null) return;

    const payload = { addresseeId: friend.id };

    const validationErrors = InviteValidator.create(payload);
    if (validationErrors.length) {
      errorListToToasts(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await ServerInviteService.create(server?.id, payload);
      addServerInvite(response.data);
      success(
        `Hooray you did it!`,
        `Successfully invited ${friend.username} to ${server.name}`,
      );
    } catch (e) {
      const { errors } = handleServiceError(e);
      errorListToToasts(errors);
    } finally {
      setLoading(false);
    }
  };
  const handleAddFriendsBtnClick = () => {
    setShowInvitePeopleModal(false);
    router.push('/friends/add');
  };

  return (
    <Modal
      showModal={showInvitePeopleModal}
      setShowModal={setShowInvitePeopleModal}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="flex w-full max-w-md flex-col justify-between rounded-md bg-slate-800"
      >
        <div className="relative z-10 flex justify-end pt-2 pr-2">
          <IconButton onClick={handleCloseModalBtnClick}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className="h-full space-y-4 px-4 pb-6 shadow">
          <h2 className="font-bold">Invite friends to {server?.name}</h2>
          <TextField
            value={searchText}
            onInput={setSearchText}
            placeholder="Search for friends"
            trailingIcon={<SearchIcon size={IconSize.sm} />}
          />
        </div>
        <div className="p-2">
          {filteredFriends.length > 0 ? (
            filteredFriends.map((friend) => {
              return (
                <div
                  key={friend.id}
                  className="invite-btn flex items-center justify-between rounded-md py-2 px-4 hover:bg-slate-700"
                >
                  <div className="flex items-center space-x-2">
                    <ProfileImage height={32} width={32} />
                    <p>{friend.username}</p>
                  </div>
                  <button
                    onClick={() => handleInviteBtnClick(friend)}
                    className="flex items-center justify-center rounded border border-green-600 px-5 py-[0.35rem] text-xs font-medium text-white hover:bg-green-600"
                  >
                    <span className={`${loading ? 'opacity-0' : ''}`}>
                      Invite
                    </span>
                    {loading && <Spinner size="sm" />}
                  </button>
                </div>
              );
            })
          ) : (
            <div className="space-y-4">
              <NoFriendsFound />
              <button
                onClick={handleAddFriendsBtnClick}
                className="center w-full cursor-pointer rounded bg-indigo-600 py-2 text-sm text-white hover:bg-indigo-800"
              >
                Add Friends
              </button>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default InvitePeopleModal;
