import PlusIconSm from '../../../icons/sm/plus.svg';
import PlusIcon from '../../../icons/plus.svg';
import IconButton from '../../../inputs/icon-button';
import CloseIcon from '../../../icons/close.svg';
import CameraIcon from '../../../icons/camera.svg';
import Modal from '../../../utils/modal';
import TextField from '../../../inputs/text-field';
import useUser from '../../../../utils/hooks/use-user';
import useModal from '../../../../utils/hooks/use-modal';
import { useState } from 'react';
import Tooltip from '../../../feedback/tooltip';
import ServerService from '../../../../services/server-service';
import CreateServerRequest from '../../../../utils/types/requests/server/create-server';
import ServerValidator from '../../../../server/validators/server.validator';
import ErrorInterface from '../../../../utils/types/interfaces/error';
import handleServiceError from '../../../../utils/services/handle-service-error';
import Spinner from '../../../inputs/spinner';
import useToasts from '../../../../utils/hooks/use-toasts';

const CreateServerModal = () => {
  const { showModal, setShowModal } = useModal();
  const { success } = useToasts();
  const { user } = useUser();
  const [serverName, setServerName] = useState(
    user?.username ? `${user.username}'s server` : '',
  );
  const [errors, setErrors] = useState<ErrorInterface[]>([]);
  const serverNameErrors = errors.filter((error) => error.field === 'name');
  const [loading, setLoading] = useState(false);

  const handleServerNameInput = (value: string) => {
    setErrors((prev) => prev.filter((error) => error.field !== 'name'));
    setServerName(value);
  };
  const handleAddServerButtonClick = () => {
    setShowModal(true);
  };
  const handleCloseModalButtonClick = () => {
    setShowModal(false);
  };
  const handleCreateButtonClick = async () => {
    const payload = { name: serverName } as CreateServerRequest;
    const errors = ServerValidator.create(payload);
    if (errors.length > 0) {
      setErrors(errors);
      return;
    }

    setLoading(true);
    try {
      const response = await ServerService.create(payload);
      const server = response.data;
      success(
        'Successfully created server!',
        `${server.name} will be a great place`,
      );
      setShowModal(false);
    } catch (error) {
      const { errors } = handleServiceError(error);
      setErrors(errors);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Tooltip text="Add a Server" direction="left">
        <button
          onClick={handleAddServerButtonClick}
          className="w-12 h-12 rounded-full hover:rounded-2xl bg-slate-800 text-green-600 hover:bg-green-600 hover:text-white flex justify-center items-center"
        >
          <PlusIcon />
        </button>
      </Tooltip>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <div
          onClick={(event) => event.stopPropagation()}
          className="w-full max-w-md bg-slate-800 rounded-md flex flex-col justify-between"
        >
          <div className="flex justify-end relative z-10 pr-4 pt-4">
            <IconButton onClick={handleCloseModalButtonClick}>
              <CloseIcon />
            </IconButton>
          </div>
          <div className="space-y-4 px-4">
            <div className="text-center space-y-2 relative -top-4">
              <h2 className="text-2xl font-extrabold">Customise your server</h2>
              <p className="text-slate-300 text-sm">
                Give your new server a personality with a name and an icon. You
                can always change it later.
              </p>
            </div>
            <div className="flex justify-center">
              <button className="w-20 h-20 border border-slate-300 border-dashed rounded-full flex flex-col items-center justify-center text-slate-300 space-y-1 relative">
                <CameraIcon />
                <h6 className="text-xs uppercase font-bold">Upload</h6>
                <span className="w-6 h-6 bg-indigo-600 flex justify-center items-center text-white rounded-full absolute -right-1 -top-1">
                  <PlusIconSm />
                </span>
              </button>
            </div>
            <TextField
              label="Server name"
              value={serverName}
              errors={serverNameErrors}
              onInput={handleServerNameInput}
            />
          </div>
          <div className="w-full p-4 bg-slate-700 relative bottom-0 mt-8 rounded-b-md flex justify-between items-center">
            <button
              onClick={handleCloseModalButtonClick}
              className="text-sm font-medium text-slate-300 px-4 py-2"
            >
              Close
            </button>
            <button
              onClick={handleCreateButtonClick}
              className="py-2 px-4 bg-indigo-500 hover:bg-indigo-700 rounded-md text-sm"
            >
              <span className={`${loading && 'opacity-0 w-0'}`}>Create</span>
              {loading && <Spinner size="sm" />}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CreateServerModal;
