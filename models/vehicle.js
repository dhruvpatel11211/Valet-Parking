var mongoose = require("mongoose");

var VehicleSchema = new mongoose.Schema({
    vehicle_no: String,
    vehicle_model:String,
    vehicle_type:String,
    phone: {
        type: String,
        validate: {
            validator: function (v) {
                return /^\d{10}$/.test(v);
            },
            message: '{VALUE} is not a valid 10 digit number!'
        }
    },
    check_in:{
        type:Date,
        default:Date.now()
    },
    customer_name:String
});



module.exports=mongoose.model("Vehicle",VehicleSchema);
