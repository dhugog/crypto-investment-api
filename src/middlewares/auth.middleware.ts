import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

const { JWT_SECRET = '' } = process.env;

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = header.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    (req as any).session = decoded;
    next();
    return;
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
