import express from 'express';
import {
  getAllSessionHistory,
  loadSession,
  startNewSession,
} from '../controllers/sessionController';

const sessionRouter = express.Router();

sessionRouter.get('/', getAllSessionHistory);
sessionRouter.get('/getSession/:sessionId', loadSession);
sessionRouter.post('/', startNewSession);

export default sessionRouter;
