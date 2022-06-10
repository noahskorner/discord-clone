import DateUtils from '../../../../utils/date-utils';
import useDirectMessage from '../../../../utils/hooks/use-direct-message';
import ProfileImage from '../profile-image';

const DirectMessages = () => {
  const { messages } = useDirectMessage();

  return (
    <>
      {messages.map((message) => {
        return (
          <div
            key={message.id}
            className="flex w-full items-center justify-start space-x-4 p-2 px-4 hover:bg-slate-800/60"
          >
            <ProfileImage height={36} width={36} />
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
        );
      })}
    </>
  );
};

export default DirectMessages;
