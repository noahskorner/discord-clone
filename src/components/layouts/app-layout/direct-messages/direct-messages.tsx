import useDirectMessage from '../../../../utils/hooks/use-direct-message';
import Message from '../message';

const DirectMessages = () => {
  const { messages } = useDirectMessage();

  return (
    <>
      {Array.from(messages).map((message) => {
        return <Message key={message.id} message={message} />;
      })}
    </>
  );
};

export default DirectMessages;
