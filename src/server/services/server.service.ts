import ServerDTO from '../../utils/types/dtos/server';
import ErrorInterface from '../../utils/types/interfaces/error';
import Server from '../db/models/server.model';
import User from '../db/models/user.model';

const ERROR_USER_NOT_FOUND: ErrorInterface = {
  message: 'User creating this server was not found.',
};

class ServerService {
  public create = async (
    name: string,
    createdById: number,
  ): Promise<{ errors?: ErrorInterface[]; server?: ServerDTO }> => {
    const user = await User.findByPk(createdById);
    if (user == null) return { errors: [ERROR_USER_NOT_FOUND] };

    const server = await Server.create(
      { name, createdById },
      { include: ['createdBy'] },
    );
    server.createdBy = user;

    return { server: new ServerDTO(server) };
  };
}

export default ServerService;
