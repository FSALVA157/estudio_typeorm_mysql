"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CalculosController_1 = require("../controller/CalculosController");
const router = express_1.Router();
router.get('/calcmonto/:ius', CalculosController_1.default.monto);
router.get('/calccargo', CalculosController_1.default.cargos);
router.get('/calcplan', CalculosController_1.default.plan);
exports.default = router;
//# sourceMappingURL=calculos.js.map