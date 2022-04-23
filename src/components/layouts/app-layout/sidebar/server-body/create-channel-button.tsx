import useApp from '../../../../../utils/hooks/use-app';
import Tooltip from '../../../../feedback/tooltip';
import PlusIcon from '../../../../icons/sm/plus.svg';

const CreateChannelButton = () => {
  const { setShowCreateChannelModal } = useApp();

  const handleCreateChannelButtonClick = () => {
    setShowCreateChannelModal(true);
  };
  return (
    <Tooltip text="Create Channel" direction="top" size="sm">
      <button
        onClick={handleCreateChannelButtonClick}
        className="text-slate-300 hover:text-white"
      >
        <PlusIcon />
      </button>
    </Tooltip>
  );
};

export default CreateChannelButton;
