const Bootcamps = require('../models/Bootcamps')
// const Bootcamp = require('../models/Bootcamps')
const ErrorResponse = require('../utils/errorResponse')
const asyncWrapper = require('../middleware/asyncHandler')
// @desc   Get all bootcamps
// @route  GET /api/v1/bootcamps
// @access Public
exports.getBootcamps = asyncWrapper(async (req, res, next)=>{
        const bootcamps = await Bootcamps.find()
        res.status(200).send({success:true, count:bootcamps.length, data:bootcamps})        
   
});

// @desc   Get all single bootcamp
// @route  GET /api/v1/bootcamps/:id
// @access Public
exports.getBootcamp = asyncWrapper( async (req, res, next)=>{
        const bootcamp = await Bootcamps.findById(req.params.id)
        if(!bootcamp){
            return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)) 
        }
        res.status(200).send({success:true,data:bootcamp})        
   
})

// @desc   Create new bootcamp
// @route  POST  /api/v1/bootcamps/
// @access Private
exports.createBootcamp = asyncWrapper( async (req, res, next)=>{
        const bootcamp = await Bootcamps.create(req.body)
        res.status(201).send({success:true, data: bootcamp})
})


// @desc   Update bootcamp
// @route  PUT  /api/v1/bootcamps/:id
// @access Private
exports.updateBootcamp = asyncWrapper( async (req, res, next)=>{
        const bootcamp = Bootcamps.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true})
        if(!bootcamp){
            return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)) 
        }
        res.status(200).send({success:true,data:bootcamp})
})

// @desc   Delete bootcamp
// @route  DELETE  /api/v1/bootcamps/:id
// @access Private
exports.deleteBootcamp = asyncWrapper( async (req, res, next)=>{

        const bootcamp = Bootcamps.findByIdAndDelete(req.params.id)
        if(!bootcamp){
            return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)) 
        }
        res.status(200).send({success:true,data:{}})
    
})