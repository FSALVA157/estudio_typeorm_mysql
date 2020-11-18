import { Router } from 'express';
import CalculosController from '../controller/CalculosController';



const router = Router();

    router.get('/calcmonto/:ius',CalculosController.monto);
    router.get('/calccargo',CalculosController.cargos);
    router.get('/calcplan',CalculosController.plan);
    


export default router;