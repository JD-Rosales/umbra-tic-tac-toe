import express from 'express';
import { loadSession, startNewSession } from '../controllers/sessionController';

const sessionRouter = express.Router();

sessionRouter.get('/:sessionId', loadSession);
sessionRouter.post('/', startNewSession);

export default sessionRouter;
