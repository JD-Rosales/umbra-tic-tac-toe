import { Request, Response } from 'express';
import { startNewSession as newSession } from '../services/sessionServices';
import z from 'zod';
import errorHandler from '../lib/error-handler';

export const startNewSession = async (req: Request, res: Response) => {
  try {
    const { player1, player2 } = req.body;

    const Schema = z.object({
      player1: z
        .string({ required_error: 'Player 1 name is required.' })
        .min(1, { message: 'Player 1 name is required.' }),
      player2: z
        .string({ required_error: 'Player 2 name is required.' })
        .min(1, { message: 'Player 2 name is required.' }),
    });

    const validator = Schema.parse({ player1, player2 });

    const game = await newSession(validator);

    return res.status(201).json(game);
  } catch (error) {
    return errorHandler(error, res);
  }
};
