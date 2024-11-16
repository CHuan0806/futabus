const { message } = require('antd');
const Bus = require("../models/busModel");

const router = require('express').Router();
const AuthMiddleware = require("../middlewares/AuthMiddleware");
//add-bus

router.post('/add-bus', async(req, res)=>{
try {
    const existingBus = await Bus.findOne({ number: req.body.number});
    if(existingBus){
        return res.status(200).send({
            success:false,
            message: ' Bus already exists',
         });
    }
    const newBus = new Bus(req.body);
     await newBus.save();
     return res.status(200).send({
        success: true,
        message: 'Bus added successfully',
     })

} catch (error) {
    res.status(500).send({ success:false, message:error.message});
    
}
    
});

//update-bus

router.post("/update-bus", AuthMiddleware, async(req,res)=>{
    try{
        await Bus.findByIdAndUpdate(req.body._id,req.body);
        return res.status(200).send({
            success: true,
            message: "Bus updated successfully"
        });
    }catch(error){
        res.status(500).send({ success: false, message: error.message});
    }
});

//delete-bus
router.post("/delete-bus", AuthMiddleware, async(req,res)=>{
    try {
        await Bus.findByIdAndDelete(req.body._id);
        return res.status(200).send({
            success:true,
            message: "Bus deleted successfully",
        });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message});
    }
});

//get-all-buses
router.post("/get-all-buses", AuthMiddleware, async(req,res) =>{
    try{
        
        const buses = await Bus.find(req.body.filters);
        return res.status(200).send({
            success: true,
            message : "Buses fetched successfully",
            data: buses,
        });
    }catch(error){
         res.status(500).send({ 
            success:false,
            message:error.message
         })
    }
});

//get-bus-by-id

router.post("/get-bus-by-id", AuthMiddleware,async(req,res)=>{
    try {
        const bus = await Bus.findById(req.body._id);
        return res.status(200).send({
            success: true,
            message: "Bus fetched successfully",
            data: bus, 
        });
    } catch (error) {
        res.status(500).send({ 
            success:false,
            message:error.message
         });
        
    }
})


module.exports = router;