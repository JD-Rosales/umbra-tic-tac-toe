import express from 'express';
import { startNewSession } from '../controllers/sessionController';

const sessionRouter = express.Router();

sessionRouter.post('/', startNewSession);

export default sessionRouter;
