const multer = require('multer');
const path = require('path');

// Configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // console.log('Uploading file to:', uploadPath);
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        // console.log('Generated Filename:', uniqueName);
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// File filter to allow only images and PDFs
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', 'Only images and PDFs are allowed!'), false);

        // cb(new Error('Unsupported file type'), false);
    }
};

const upload = multer({ 
    storage: storage, 
    fileFilter: fileFilter 
});

// Accept only `image` and `pdfFile` fields
const uploadFields = upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'pdfFile', maxCount: 1 }
]);

module.exports = uploadFields;
