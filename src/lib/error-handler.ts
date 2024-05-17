import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

const errorHandler = async (error: unknown, res: Response) => {
  console.log(error);
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return res.json(400).json({ message: error.message });
  } else if (error instanceof ZodError) {
    return res.status(403).json({ message: error.issues[0].message });
  } else if (error instanceof Error) {
    return res.status(500).json({ message: error.message });
  } else {
    return res
      .status(500)
      .json({ message: 'An unexpected error has occured.' });
  }
};

export default errorHandler;
