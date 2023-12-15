const express = require('express');
const addJobController = require('../controllers/AddJobController');
const authenticateToken = require('../middleware/authenticationMiddleware');

const router = express.Router();

router.post('/add/new', authenticateToken, addJobController.addJobDetials);
router.post('/assign', authenticateToken, addJobController.assignJobToHrByAccountManager);
router.get('/account-manager/:username', authenticateToken, addJobController.getAccountManagerJobs);
router.get('/hr/:username', authenticateToken, addJobController.getHRJobs);
router.post('/candidate/add', authenticateToken, addJobController.addCandidateDetailsForJob);
router.get('/candidate/:jobId', authenticateToken, addJobController.getJobCandidates);
router.put('/candidate/status/update', authenticateToken, addJobController.updateCandidateOfferStatus);

module.exports = router;
