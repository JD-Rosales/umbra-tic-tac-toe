import express from 'express';
import { startNewGame } from '../controllers/gameController';

const gameRouter = express.Router();

gameRouter.post('/', startNewGame);

export default gameRouter;
