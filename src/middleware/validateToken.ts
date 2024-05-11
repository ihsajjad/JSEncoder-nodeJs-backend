import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userId: string;
      userRole: string;
    }
  }
}

export const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = await req.cookies["auth_token"];
  if (!token) return res.status(401).json({ message: "Invalid token" });

  jwt.verify(
    token,
    process.env.JWT_SECRET_KEY as string,
    async (
      error: VerifyErrors | null,
      decoded: JwtPayload | string | undefined
    ) => {
      if (error) return res.status(401).json({ message: "Invalid token" });

      // set the user's info to the req for authorization
      const userId = await (decoded as JwtPayload)?.userId;
      const userRole = await (decoded as JwtPayload)?.userRole;

      req.userId = userId;
      req.userRole = userRole;

      next();
    }
  );
};
