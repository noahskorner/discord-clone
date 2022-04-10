import { Request, Response, NextFunction } from 'express';
import RoleEnum from '../../utils/enums/roles';
import UserRole from '../db/models/user-role.model';

const authorize = (permittedRoles: RoleEnum[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (req.user == null) return res.sendStatus(401);
    const userId = req.user.id;

    const userRoles = await UserRole.findAll({
      where: {
        userId,
      },
    });

    const roles = userRoles.map((userRole) => userRole.role as RoleEnum);

    if (permittedRoles.some((permittedRole) => roles.includes(permittedRole)))
      return next();
    else return res.sendStatus(403);
  };
};

export default authorize;
