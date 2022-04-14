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
import useServers from '../../../../utils/hooks/use-servers';

const CreateServerModal = () => {
  const { showModal, setShowModal } = useModal();
  const { setServers } = useServers();
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
      setServers((prev) => [...prev, server]);
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
          className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-green-600 hover:rounded-2xl hover:bg-green-600 hover:text-white"
        >
          <PlusIcon />
        </button>
      </Tooltip>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <div
          onClick={(event) => event.stopPropagation()}
          className="flex w-full max-w-md flex-col justify-between rounded-md bg-slate-800"
        >
          <div className="relative z-10 flex justify-end pr-4 pt-4">
            <IconButton onClick={handleCloseModalButtonClick}>
              <CloseIcon />
            </IconButton>
          </div>
          <div className="space-y-4 px-4">
            <div className="relative -top-4 space-y-2 text-center">
              <h2 className="text-2xl font-extrabold">Customise your server</h2>
              <p className="text-sm text-slate-300">
                Give your new server a personality with a name and an icon. You
                can always change it later.
              </p>
            </div>
            <div className="flex justify-center">
              <button className="relative flex h-20 w-20 flex-col items-center justify-center space-y-1 rounded-full border border-dashed border-slate-300 text-slate-300">
                <CameraIcon />
                <h6 className="text-xs font-bold uppercase">Upload</h6>
                <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-white">
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
          <div className="relative bottom-0 mt-8 flex w-full items-center justify-between rounded-b-md bg-slate-700 p-4">
            <button
              onClick={handleCloseModalButtonClick}
              className="px-4 py-2 text-sm font-medium text-slate-300"
            >
              Close
            </button>
            <button
              onClick={handleCreateButtonClick}
              className="rounded-md bg-indigo-500 py-2 px-4 text-sm hover:bg-indigo-700"
            >
              <span className={`${loading && 'w-0 opacity-0'}`}>Create</span>
              {loading && <Spinner size="sm" />}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CreateServerModal;
