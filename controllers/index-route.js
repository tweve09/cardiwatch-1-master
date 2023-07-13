const db = require("../config/db")

const displayPatients = (req, res, next)=>{
    const user = req.user
    db.query("SELECT * FROM cardiwatchdb.patient_table", (err, results)=>{
        if(err) throw err

        const modifiedData = results.map((row, index) => {
            return { sn: index + 1, ...row }
          })

        res.render("patients-page", {
            results: modifiedData,
            user: user
          });
      });
}

const patientDetails = (req, res, next)=>{
    const user = req.user
    patient_id = req.params.patientId

    const sql = "SELECT *  FROM cardiwatchdb.patient_table WHERE id = ?"
    db.query(sql,[patient_id], (err, results)=>{
        if(err) throw err
        res.render("home", {
            user: user,
            results: results
        })
    })
}

const getPatientDatabase = (req, res, next)=>{
    const user = req.user
    const patient_id = req.body.patient_id
    db.query("SELECT * FROM cardiwatchdb.patient_table WHERE id = ?", [patient_id], (err, results)=>{
        if(err) throw err
        var patient = results
        db.query("SELECT ecg,heart_rate, DATE_FORMAT(created_at, '%a-%M %d %H:%i') AS formatted_time FROM cardiwatchdb.health_data WHERE patient_id = ?", [patient_id], (err, results)=>{
            if(err) throw err
            const modifiedData = results.map((row, index) => {
                return { sn: index + 1, ...row }
              });
            res.render("patient-database", {
                user: user,
                results: modifiedData,
                patient: patient
            })
        })

    })
}

const patientBradycardia = (req,res, next)=>{
    const user = req.user
    const patient_id = req.body.patient_id
    db.query("SELECT * FROM cardiwatchdb.patient_table WHERE id = ?", [patient_id], (err, results)=>{
        if(err) throw err
        var patient = results
        db.query("SELECT ecg,heart_rate, DATE_FORMAT(created_at, '%a-%M %d %H:%i') AS formatted_time FROM cardiwatchdb.health_data WHERE patient_id = ? AND heart_rate < 60", [patient_id], (err, results)=>{
            if(err) throw err
            const modifiedData = results.map((row, index) => {
                return { sn: index + 1, ...row }
              });
            res.render("patient-database-bradycardia", {
                user: user,
                results: modifiedData,
                patient: patient
            })
        })

    })

}

const patientTachycardia = (req, res, next)=>{
    const user = req.user
    const patient_id = req.body.patient_id
    db.query("SELECT * FROM cardiwatchdb.patient_table WHERE id = ?", [patient_id], (err, results)=>{
        if(err) throw err
        var patient = results
        db.query("SELECT ecg,heart_rate, DATE_FORMAT(created_at, '%a-%M %d %H:%i') AS formatted_time FROM cardiwatchdb.health_data WHERE patient_id = ? AND heart_rate > 100", [patient_id], (err, results)=>{
            if(err) throw err
            const modifiedData = results.map((row, index) => {
                return { sn: index + 1, ...row }
              });
            res.render("patient-database-tachycardia", {
                user: user,
                results: modifiedData,
                patient: patient
            })
        })

    })

}

const getPatientHRgraph = (req, res, next)=>{
    const user = req.user
    res.render("patient-heart-rate", {
        user: user
    })
}

const trialGet = (req, res, next)=>{
    res.render("trial")
}


module.exports = {
    displayPatients,
    patientDetails,
    getPatientDatabase,
    trialGet,
    patientBradycardia,
    patientTachycardia,
    getPatientHRgraph
}