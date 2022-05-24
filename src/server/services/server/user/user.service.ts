// import ErrorEnum from '../../../../utils/enums/errors';
// import ServerRoleEnum from '../../../../utils/enums/server-roles';
// import ServerUserDto from '../../../../utils/types/dtos/server-user';
// import SystemError from '../../../../utils/types/interfaces/system-error';
// import ServerUser from '../../../db/models/server-user.model';

// const ERROR_USER_NOT_IN_SERVER = new SystemError(ErrorEnum.ADD_SERVER_USER_INSUFFICIENT_PERMISSIONS, errors: [
//     {
//         message: "Must belong to server to invite users to it."
//     }
// ])

// class ServerUserService {
//   public async addUserToServer({
//     userId,
//     serverId,
//     addUserId,
//   }: {
//     userId: number;
//     serverId: number;
//     addUserId: number;
//   }): Promise<ServerUserDto> {
//     const userAlreadyInServer = ServerUser.findOne({
//       where: {
//         serverId: serverId,
//         userId: addUserId,
//       },
//     });
//     if (!userAlreadyInServer) throw new

//     return new ServerUserDto();
//   }
// }

// export default ServerUserService;
