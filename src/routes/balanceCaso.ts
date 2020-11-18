import { Router } from "express";
import BalanceCasoController from '../controller/BalanceCasoController';



const router = Router();

router.get('/caso/:id',BalanceCasoController.estado);

export default router;