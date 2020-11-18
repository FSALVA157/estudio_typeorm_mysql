"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const BalanceCasoController_1 = require("../controller/BalanceCasoController");
const router = express_1.Router();
router.get('/caso/:id', BalanceCasoController_1.default.estado);
exports.default = router;
//# sourceMappingURL=balanceCaso.js.map