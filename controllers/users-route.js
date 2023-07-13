const passport = require("passport");
const bcrypt = require('bcrypt');
const db = require("../config/db");

/* Admin page */
const getAdminPage = (req, res, next)=>{
    const user = req.user;
    db.query("SELECT COUNT(id) AS total_rows FROM cardiwatchdb.user_table", (err, result)=>{
      if(err) throw err
      const physicians = result[0].total_rows - 1
      db.query("SELECT COUNT(id) AS total_rows FROM cardiwatchdb.patient_table", (err, result)=>{
        if(err) throw err
        const patients = result[0].total_rows
        res.render("admin-page1", {
          user: user,
          physicians: physicians,
          patients: patients
        })
      })
    })
}

const getUsers = (req, res, next)=>{
  const user = req.user;
  db.query("SELECT * FROM cardiwatchdb.user_table WHERE role = ?",["user"], (err, results)=>{
    if (err) throw err
    const modifiedData = results.map((row, index) => {
      return { sn: index + 1, ...row }
    });
    res.render("admin-page", {
        results: modifiedData,
        user: user
    
    })
  })
}

const getPatients = (req, res, next)=>{
  const user = req.user;
  db.query("SELECT * FROM cardiwatchdb.patient_table", (err, results)=>{
    if(err) throw err

    const modifiedData = results.map((row, index) => {
      return { sn: index + 1, ...row }
    });
    
    res.render("admin-page3", {
      results: modifiedData,
      user: user
    });
    
  });
}


/* users controllers */
const addUserGet = (req, res, next)=>{
  const user = req.user
  res.render("register-user", {
    message: "",
    code: "",
    user: user
  });
}

const addUserPost = async (req, res, next)=>{
  const user = req.user
  const { first_name, last_name,username, password, confirm_password} = req.body;

  const salt = await bcrypt.genSalt(10);

  db.query("SELECT username FROM cardiwatchdb.user_table WHERE username = ?", [username], (error, results)=>{
    if (error) throw error;

    if (results.length > 0){
      res.render("register-user", {
        message: "Email arleady taken by another physician account.",
        code: 0,
        user: user
      });
    }else if(password !== confirm_password){
      res.render("register-user", {
        message: "Passwords doesn't match.",
        code: 0,
        user: user
      });
    }else{
       bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          console.error(err)
         /*  res.status(500).send('Internal server error') */
        } else {
          const hashed_password = hash
          const sql = 'INSERT INTO cardiwatchdb.user_table (username, password, first_name, last_name) VALUES (?, ?, ?, ?)';
          db.query(sql, [username, hashed_password, first_name, last_name], (err, results) => {
          if (err) throw err;
          res.render("register-user", {
            message: "Physician account created succefully!",
            code: 1,
            user: user
          });
          }); 
        }
      })
 
    }
   
  })
}

const userLoginGet = (req, res, next)=>{
  res.render('login', {
    message: req.flash('error')
  });
}

const userLoginPost =  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true,
  })


const userLogout = (req, res, next)=>{
  req.logout((error)=>{
    if(error){
      console.log(error);
    }
    return res.render("login", {
      message: "You are logged out."
    })
  });
}


const deleteUserPost = (req, res, next)=>{
  const user_id = req.body.user_id
  console.log(user_id)
  const sql = "DELETE FROM cardiwatchdb.user_table WHERE id = ?"
  db.query(sql,[user_id], (err, result)=>{
    if(err) throw err;
    res.redirect("/users/list")
  })
}


/* Patient controllers */
const addPatientGet = (req, res, next)=>{
  const user = req.user;
  res.render("register-patient", {
    message: "",
    user: user
  });
}

const addPatientPost = (req, res, next)=>{
  const user = req.user;
  const {first_name, last_name, sex, age,residence, contact} = req.body;
  const sql = "INSERT INTO cardiwatchdb.patient_table (first_name, last_name, sex, age, residence, contact) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(sql, [first_name, last_name, sex, age, residence, contact], (err, result)=>{
    if(err) throw err;
    res.render("register-patient", {
      message: "Patient registered succefully",
      user: user
    });
  });
}


const deletePatientPost = (req, res, next)=>{
  const user_id = req.body.user_id
  const sql = "DELETE FROM cardiwatchdb.patient_table WHERE id = ?"
  db.query(sql,[user_id], (err, result)=>{
    if(err) throw err;
    res.redirect("/users/patients")
  })  
}


const getDevices = (req, res, next)=>{
  const user = req.user;
  db.query("SELECT * FROM cardiwatchdb.patient_table", (err, results)=>{
    if(err) throw err

    const modifiedData = results.map((row, index) => {
      return { sn: index + 1, ...row }
    });

    res.render("admin-page4", {
      user: user,
      results: modifiedData
    })
  })
}

module.exports = {
    addUserPost,
    addUserGet,
    userLoginGet,
    userLoginPost,
    userLogout,
    getAdminPage,
    addPatientGet,
    addPatientPost,
    deleteUserPost,
    deletePatientPost,
    getUsers,
    getPatients,
    getDevices,
}