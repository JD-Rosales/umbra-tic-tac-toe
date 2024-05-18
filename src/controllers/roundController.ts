import { Request, Response } from 'express';
import roundServices from '../services/roundServices';
import z from 'zod';
import errorHandler from '../lib/error-handler';

export const saveRoundEnd = async (req: Request, res: Response) => {
  try {
    const { sessionId, winnerId } = req.body;

    const Schema = z.object({
      sessionId: z
        .string({ required_error: 'Game session is required.' })
        .min(1, { message: 'Game session is required.' }),
      winnerId: z.string().optional(),
    });

    const validator = Schema.parse({ sessionId, winnerId });

    const roundEnd = await roundServices.saveRoundEnd(validator);

    return res.status(201).json(roundEnd);
  } catch (error) {
    return errorHandler(error, res);
  }
};
