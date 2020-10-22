"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
exports.checkJwt = (req, res, next) => {
    const token = req.headers['auth'];
    let jwtPayload;
    try {
        jwtPayload = jwt.verify(token, 'TODO_SECRET');
        res.locals.jwtPayload = jwtPayload;
    }
    catch (error) {
        return res.status(401).send();
    }
    const { userId, username } = jwtPayload;
    const newToken = jwt.sign({ userId, username }, 'TODO_SECRET', { expiresIn: '1h' });
    res.setHeader('token', newToken);
    next();
};
//# sourceMappingURL=jwt.js.map