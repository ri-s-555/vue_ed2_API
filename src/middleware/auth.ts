import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

// Интерфейс для декодированного токена
interface DecodedToken {
  id: string;
  role: string;
  iat: number;
  exp: number;
}

// Расширение Request для включения пользователя
interface AuthRequest extends Request {
  user?: DecodedToken;
}

export default function(req: AuthRequest, res: Response, next: NextFunction) {
  // Получение токена из заголовка
  const token = req.header('x-auth-token');

  // Проверка наличия токена
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Верификация токена
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret') as DecodedToken;

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Token is not valid' });
  }
}