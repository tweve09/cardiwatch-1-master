const express = require('express')
const { checkUserRole, IsAuth } = require('../my-middleware/authmiddleware')
const { 
    displayPatients,
    patientDetails, 
    getPatientDatabase,
    trialGet,
    patientBradycardia,
    patientTachycardia,
    getPatientHRgraph
     } = require('../controllers/index-route')

const { nodemcuPost } = require('../controllers/socket-conf')
var router = express.Router()

/* GET home page. */
router.get('/',IsAuth,checkUserRole,displayPatients)
router.get("/detail/patient/:patientId",patientDetails)
router.get("/detail/heart-rate", getPatientHRgraph)
router.post("/detail/database",getPatientDatabase)
router.post("/detail/database/bradycardia",patientBradycardia)
router.post("/detail/database/tachycardia", patientTachycardia)
router.get('/trial',trialGet)

/* handle data from nodemcu */
router.post('/nodemcu',nodemcuPost )

module.exports = router;
