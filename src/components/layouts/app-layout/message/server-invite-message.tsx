import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import ServerUserService from '../../../../services/server-user-service';
import DateUtils from '../../../../utils/date-utils';
import useDirectMessage from '../../../../utils/hooks/use-direct-message';
import useToasts from '../../../../utils/hooks/use-toasts';
import useUser from '../../../../utils/hooks/use-user';
import handleServiceError from '../../../../utils/services/handle-service-error';
import MessageDto from '../../../../utils/types/dtos/message';
import Spinner from '../../../inputs/spinner';
import ProfileImage from '../profile-image';

interface ServerInviteMessageProps {
  message: MessageDto;
}

const ServerInviteMessage = ({ message }: ServerInviteMessageProps) => {
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const userIsRequester = user?.id === message.sender.userId;
  const { errorListToToasts } = useToasts();
  const { acceptServerInviteMessage } = useDirectMessage();
  const router = useRouter();

  const handleJoinServerBtnClick = async () => {
    if (message.serverInvite == null) return;

    setLoading(true);
    try {
      await ServerUserService.create(message.server!.id, {
        serverInviteId: message.serverInvite.id,
      });

      acceptServerInviteMessage(message.id);
      router.push(`/servers/${message.server!.id}`);
    } catch (e: any) {
      const { errors } = handleServiceError(e);
      errorListToToasts(errors);
    } finally {
      setLoading(false);
    }
  };

  const header = `You${
    userIsRequester ? ' ' : ' were '
  }sent an invite to join a server`;

  return (
    <div className="flex items-center justify-start space-x-2 py-2 px-2 hover:bg-slate-800/60 sm:space-x-4 sm:px-4">
      <div className="flex h-full flex-shrink-0 items-start justify-start">
        <ProfileImage height={36} width={36} />
      </div>
      <div className="leading-wide max-w-md flex-grow space-y-1 text-sm">
        <span className="flex items-center space-x-1">
          <p className="font-semibold">{message.sender.username}</p>
          <p className="text-xxs text-slate-400">
            {DateUtils.getFormattedDate(message.createdAt)}
          </p>
        </span>
        <div className="flex flex-col space-y-4 rounded bg-slate-800 p-4">
          <h6 className="text-xs font-bold uppercase text-slate-300">
            {header}
          </h6>
          <div className="flex items-center justify-between space-x-4 sm:space-x-12 md:space-x-24">
            <div className="flex items-center space-x-2">
              <div className="center hidden h-12 w-12 flex-shrink-0 rounded-xl bg-slate-700 text-xl uppercase text-slate-300 sm:flex">
                {message.server?.name.charAt(0)}
              </div>
              <h5 className="sm:text-md overflow-hidden text-ellipsis font-semibold">
                {message.server?.name}
              </h5>
            </div>
            {userIsRequester || message.serverInvite?.accepted ? (
              <Link href={`/servers/${message.server?.id}`} passHref>
                <span className="center cursor-pointer rounded bg-green-700 px-5 py-3 text-xs hover:bg-green-900">
                  Joined
                </span>
              </Link>
            ) : (
              <button
                disabled={loading}
                onClick={handleJoinServerBtnClick}
                className="center rounded  bg-green-700 px-5 py-3 text-xs hover:bg-green-900"
              >
                <span className={`${loading ? 'opacity-0' : ''}`}>Join</span>
                {loading && <Spinner size="sm" className="absolute" />}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServerInviteMessage;
