const db = require("../config/db")
var data = {}

const nodemcuPost = (req, res, next)=>{
    const {device_id, heart_rate, Ecg_datapoints} = req.body
    /* saving data object */
    data = {
        "device_id": device_id,
        "heart_rate": heart_rate,
        "Ecg_datapoints": Ecg_datapoints
    }

    db.query('INSERT INTO cardiwatchdb.health_data (heart_rate, ecg, patient_id) VALUES ( ?, ?, ?)', [heart_rate, String(Ecg_datapoints), device_id], (err, results)=>{
        if(err) throw err
        res.json({
            message: "Data received succefully"
          })
    })
}

function clearData(data){
    Object.keys(data).forEach(function(prop){
        delete data[prop];
    });
    console.log("Data cleared")
}

function getData(){
    return data
}



module.exports = {
    nodemcuPost,
    getData,
    clearData
}