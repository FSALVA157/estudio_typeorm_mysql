"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const multer = require("multer");
const uuid_1 = require("uuid");
const path = require("path");
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../../uploads'),
    filename: (req, file, cb) => {
        cb(null, uuid_1.v4() + path.extname(file.originalname));
    }
});
exports.default = multer({ storage });
//# sourceMappingURL=multer.js.map