// import catchAsync from '../../../middleware/catch-async';
// import { Request, Response } from 'express';
// import { ERROR_UNKOWN } from '../../../../utils/constants/errors';

// class ServerInviteController {
//   private _serverInviteService: ServerInviteService;

//   constructor() {
//     this._serverInviteService = new ServerInviteService();
//   }

//   public create = catchAsync(async (req: Request, res: Response) => {
//     const userId = req.user.id;
//     const { serverId, addUserId } = req.body;

//     try {
//       const success = await this._serverInviteService.create({});

//       return res.sendStatus(201);
//     } catch (e: any) {
//       switch (e.type) {
//         default:
//           return res.status(500).json([ERROR_UNKOWN]);
//       }
//     }
//   });
// }
