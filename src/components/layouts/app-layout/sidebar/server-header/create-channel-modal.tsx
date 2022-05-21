import IconButton from '../../../../inputs/icon-button';
import Modal from '../../../../utils/modal';
import React, { useState, KeyboardEvent } from 'react';
import Spinner from '../../../../inputs/spinner';
import TextField from '../../../../inputs/text-field';
import ChannelType from '../../../../../utils/enums/channel-type';
import ChannelTypeButtons from './channel-type-buttons';
import handleServiceError from '../../../../../utils/services/handle-service-error';
import useToasts from '../../../../../utils/hooks/use-toasts';
import ChannelValidator from '../../../../../server/validators/server/channel';
import CreateChannelRequest from '../../../../../utils/types/requests/server/channel/create-channel';
import ErrorInterface from '../../../../../utils/types/interfaces/error';
import ChannelService from '../../../../../services/channel-service';
import useServer from '../../../../../utils/hooks/use-server';
import { ERROR_UNKOWN } from '../../../../../utils/constants/errors';
import useApp from '../../../../../utils/hooks/use-app';
import { CloseIcon, PoundIcon, VolumeUpIcon } from '../../../../icons';

const CreateChannelModal = () => {
  const [channelName, setChannelName] = useState('new-channel');
  const [channelType, setChannelType] = useState(ChannelType.TEXT);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ErrorInterface[]>([]);
  const nameErrors = errors.filter((error) => error.field === 'name');

  const { showCreateChannelModal, setShowCreateChannelModal } = useApp();
  const { danger } = useToasts();
  const { server, setChannels } = useServer();

  const createChannel = async () => {
    if (server == null) {
      setErrors([ERROR_UNKOWN]);
      return;
    }

    const payload = {
      type: channelType,
      name: channelName,
    } as CreateChannelRequest;

    const errors = ChannelValidator.create(payload);
    if (errors.length > 0) {
      setErrors(errors);
      return;
    }

    setLoading(true);
    try {
      const response = await ChannelService.create(server.id, payload);
      const channel = response.data;
      setChannels([...server.channels, channel]);
      setShowCreateChannelModal(false);
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

  const handleChannelNameInput = (value: string) => {
    setChannelName(value);
  };
  const handleCloseModalBtnClick = () => {
    setShowCreateChannelModal(false);
  };
  const handleCreateChannelBtnClick = async () => {
    await createChannel();
  };
  const handleKeyDown = async (event: KeyboardEvent) => {
    if (event.key === 'Enter') await createChannel();
  };

  return (
    <Modal
      showModal={showCreateChannelModal}
      setShowModal={setShowCreateChannelModal}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        onKeyDown={handleKeyDown}
        className="flex w-full max-w-md flex-col justify-between rounded-md bg-slate-800"
      >
        <div className="relative z-10 flex justify-end pr-4 pt-4">
          <IconButton onClick={handleCloseModalBtnClick}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className="space-y-4 px-4">
          <div className="relative -top-4 space-y-2 text-center">
            <h2 className="text-2xl font-extrabold capitalize">
              Create {channelType.toLowerCase()} Channel
            </h2>
          </div>
          <ChannelTypeButtons
            channelType={channelType}
            setChannelType={setChannelType}
          />
          <TextField
            label="Channel name"
            errors={nameErrors}
            value={channelName}
            onInput={handleChannelNameInput}
            icon={
              channelType === ChannelType.TEXT ? (
                <PoundIcon />
              ) : (
                <VolumeUpIcon />
              )
            }
          />
        </div>
        <div className="relative bottom-0 mt-8 flex w-full items-center justify-between rounded-b-md bg-slate-700 p-4">
          <button
            onClick={handleCloseModalBtnClick}
            className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white"
          >
            Close
          </button>
          <button
            onClick={handleCreateChannelBtnClick}
            className="flex items-center justify-center rounded-md bg-indigo-500 py-2 px-4 text-sm hover:bg-indigo-700"
          >
            <span className={`${loading && 'opacity-0'}`}>Create</span>
            {loading && <Spinner size="sm" className="absolute" />}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CreateChannelModal;
