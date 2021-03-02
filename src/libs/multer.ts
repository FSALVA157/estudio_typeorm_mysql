import  * as multer  from "multer";
import { v4 as uuid } from "uuid";
import * as path from 'path';


const storage = multer.diskStorage({
    destination: path.join(__dirname,'../../uploads'),
    filename: (req, file, cb) => {
       
        cb(null, uuid() + path.extname(file.originalname))
    }
});

export default multer({storage});

