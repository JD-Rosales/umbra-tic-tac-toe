import express from 'express';
import { saveRoundEnd } from '../controllers/roundController';

const roundRouter = express.Router();

roundRouter.post('/', saveRoundEnd);

export default roundRouter;
