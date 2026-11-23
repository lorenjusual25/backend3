import multer from 'multer';
import { AppError } from '../utils/error.js';
import { ERROR_CODES } from '../utils/errorDictionary.js';
import { FILE_SIZE_MB } from '../constants/document.constants.js';
import {config} from '../config/env.config.js';
import fs from 'node:fs'
import { randomUUID } from 'node:crypto';
const folder = config.nodeEnv === 'test' ? 'uploads/test/documents' : 'uploads/documents' 
fs.mkdirSync(folder, { recursive: true })
const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, folder)
    },
    filename: (req,file,cb) => {
        cb(null, `${Date.now()}-${randomUUID()}.png`)
    }
})
function fileFilter (req, file, cb) {
    if (file.mimetype === "image/png") {
      return cb(null,true)  
    } else {
      cb(new AppError(ERROR_CODES.INVALID_FILE_TYPE))
    }
}
const upload = multer({ 
    storage,
    fileFilter,
    limits: {
        fileSize: FILE_SIZE_MB,
        files: 1
    }
})
export default upload;