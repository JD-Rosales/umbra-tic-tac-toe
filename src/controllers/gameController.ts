import { Request, Response } from 'express';
import { startNewGame as newGame } from '../services/gameServices';

export const startNewGame = async (req: Request, res: Response) => {
  try {
    const game = await newGame({ player1: 'player1', player2: 'player2' });

    return res.status(201).json(game);
  } catch (error) {
    return res.status(500).json({ message: 'test' });
  }
};
