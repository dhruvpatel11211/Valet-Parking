var express = require("express");
var Vehicle = require("../models/vehicle");


var router = express.Router();

function diff_hours(dt2, dt1) 
 {

  var diff =(dt2.getTime() - dt1.getTime()) / 1000;
  diff /= (60 * 60);
  return Math.abs(Math.round(diff));
  
 }

router.get("/", function (req, res) {
    Vehicle.find({}, function (err, allVehicles) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("index", { Vehicles: allVehicles });
        }
    });
});
router.get("/checkin",function(req,res){
    res.render("checkin");
});
router.post("/checkin", function (req, res) {
    const newVehicle = {
        vehicle_no: req.body.vehicle_no,
        vehicle_model: req.body.vehicle_model,
        vehicle_type: req.body.vehicle_type,
        phone: req.body.phone,
        customer_name: req.body.customer_name,
        check_in:Date.now()
    };
    Vehicle.create(newVehicle, (err, Vehicle) => {
        if (err) {
            console.log(err);
            req.flash("error", err.message);
            return res.redirect("/");
        }
        else {
            console.log("Saved successfully");
            req.flash("success", "Vehicle added Successfully ");
            return res.redirect("/");
        }
    })
});

router.get("/checkout/:id", async (req, res) => {
    Vehicle.findById(req.params.id, function (err, foundVehicle) {
        if (err) {
            console.log(err);
        }
        else {
            
            var date1 = new Date(foundVehicle.check_in);
            var date2 = new Date();
            var duration=diff_hours(date1, date2);
            var toPay=duration*20;
            if(foundVehicle.vehicle_type=="8 wheeler")
            {
                toPay=toPay*3;
            }
            else if(foundVehicle.vehicle_type=="4 wheeler")
            {
                toPay=toPay*2;
            }
            else if(foundVehicle.vehicle_type=="2 wheeler")
            {
                toPay=toPay;
            }
            res.render("checkout", { vehicle: foundVehicle ,checkOutTime: date2,duration:duration,toPay:toPay});
        }
    });
});

router.get("/pay/:id",function(req,res){
    Vehicle.findByIdAndDelete(req.params.id,function(err){
        if(err)
        {
            req.flash("error","Payment not successfull");
            res.redirect("/");
        }
        else{
            req.flash("success","Payment successfull");
            res.redirect("/");
        }
    });
});

router.get("/refund/:id",function(req,res){
    Vehicle.findByIdAndDelete(req.params.id,function(err){
        if(err)
        {
            req.flash("error","Refund not successfull");
            res.redirect("/");
        }
        else{
            req.flash("success","Refund successfull");
            res.redirect("/");
        }
    });
});
module.exports = router;