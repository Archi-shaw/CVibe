const express = require('express');
const {
    createResume ,
    getUserResumes,
    getResumeById,
    updateResume,
    deleteResume,
}
 = require('../controllers/resumeController');
 const {protect} = require('../middlewares/authMiddleware');
 const {uploadResumeImages } = require('../controllers/uploadImages');

 const router = express.Router();

router.post('/', protect,createResume);
router.get('/', protect,getUserResumes);
router.get('/:id', protect, getResumeById);
router.put('/:id', protect, updateResume);
router.delete('/:id', protect, deleteResume);
router.post('/:id/upload-images', protect, uploadResumeImages);

module.exports = router;

