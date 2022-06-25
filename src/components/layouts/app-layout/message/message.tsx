import DateUtils from '../../../../utils/date-utils';
import MessageType from '../../../../utils/enums/message-type';
import MessageDto from '../../../../utils/types/dtos/message';
import ProfileImage from '../profile-image';
import ServerInviteMessage from './server-invite-message';

interface MessageProps {
  message: MessageDto;
}

const Message = ({ message }: MessageProps) => {
  return message.type == MessageType.DIRECT ? (
    <div className="flex w-full items-center justify-start space-x-4 p-2 px-4 hover:bg-slate-800/60">
      <div className="flex h-full items-center justify-start">
        <ProfileImage height={36} width={36} />
      </div>
      <div className="leading-wide space-y-1 text-sm">
        <span className="flex items-center space-x-1">
          <p className="font-semibold">{message.sender.username}</p>
          <p className="text-xxs text-slate-400">
            {DateUtils.getFormattedDate(message.createdAt)}
          </p>
        </span>
        <p className="font-light">{message.body}</p>
      </div>
    </div>
  ) : message.type == MessageType.SERVER_INVITE ? (
    <ServerInviteMessage message={message} />
  ) : (
    <>Message type not configured.</>
  );
};

export default Message;
