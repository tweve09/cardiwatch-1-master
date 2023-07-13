var express = require('express');
var router = express.Router();
const { 
  isAdmin,
  redirectLoggedInUser,
  checkUserRole } = require('../my-middleware/authmiddleware');
const { 
  getPatients,
  getUsers,
  addUserPost,
  addUserGet,
  userLoginGet,
  userLoginPost,
  userLogout,
  addPatientGet,
  addPatientPost,
  getAdminPage,
  deleteUserPost,
  deletePatientPost,
  getDevices,
} = require('../controllers/users-route');


/* GET users listing. */
router.get("/",isAdmin,getAdminPage)
router.get("/list", isAdmin,getUsers)
router.get('/patients', isAdmin, getPatients)

/* Registering new user */
router.get("/adduser", addUserGet);
router.post("/adduser",addUserPost);
router.post("/adduser/delete",deleteUserPost);

/* Registering new patient */
router.get("/addpatient",isAdmin,addPatientGet);
router.post("/addpatient",isAdmin,addPatientPost);
router.post("/addpatient/delete",deletePatientPost);

/* user login */
router.get('/login',redirectLoggedInUser,userLoginGet);
router.post('/login',checkUserRole,userLoginPost);

/* user logout */
router.get('/logout', userLogout);

/* devices */
router.get("/devices", getDevices)

module.exports = router;
