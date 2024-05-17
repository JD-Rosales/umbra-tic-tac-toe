import { Request, Response } from 'express';
import sessionService from '../services/sessionServices';
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

    const game = await sessionService.startNewSession(validator);

    return res.status(201).json(game);
  } catch (error) {
    return errorHandler(error, res);
  }
};

export const loadSession = async (req: Request, res: Response) => {
  try {
    const sessionId = req.params.sessionId;

    console.log(sessionId);

    const Schema = z.object({
      sessionId: z
        .string({ required_error: 'Invalid game session.' })
        .min(1, { message: 'Invalid game session.' }),
    });

    const validator = Schema.parse({ sessionId });

    const session = await sessionService.loadSession(validator.sessionId);

    console.log(session);

    return res.status(200).json(session);
  } catch (error) {
    return errorHandler(error, res);
  }
};
