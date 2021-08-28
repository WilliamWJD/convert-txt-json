const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

module.exports ={
    upload() {
        return {
            storage: multer.diskStorage({
                destination: path.resolve(__dirname, "..", "..", "tmp", "uploads"),
                filename: (req, file, cb) => {
                    const fileHash = crypto.randomBytes(16).toString('hex');
                    const filename = `${fileHash}-${file.originalname}`
                    return cb(null, filename);
                }
            })
        }
    }
}