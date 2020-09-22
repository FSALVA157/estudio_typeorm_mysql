"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
class DocumentacionController {
    all(request, response, next) {
        return response.sendFile(path.join(__dirname, 'views/index.html'));
        //return  this.userRepository.findOne(request.params.id);
    }
}
exports.DocumentacionController = DocumentacionController;
//# sourceMappingURL=DocumentacionController.js.map