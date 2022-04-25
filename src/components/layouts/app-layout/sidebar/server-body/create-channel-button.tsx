import useApp from '../../../../../utils/hooks/use-app';
import Tooltip from '../../../../feedback/tooltip';
import { IconSize, PlusIcon } from '../../../../icons';

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
        <PlusIcon size={IconSize.sm} />
      </button>
    </Tooltip>
  );
};

export default CreateChannelButton;
