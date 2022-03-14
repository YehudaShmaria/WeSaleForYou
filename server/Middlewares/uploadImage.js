const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cd) {
        cd(null, './uploads/' + file.fieldname + '/')
    },
    filename: function (req, file, cd) {
        cd(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
})

const fileFilter = (req, file, cd) => {
    if (!(file.mimetype).includes("image/")) {
        req.noImage = true;
        cd(null, false);
    }
    else
        cd(null, true);
}

let uploads = multer({
    storage: storage,
    fileFilter: fileFilter
});

module.exports = uploads;
