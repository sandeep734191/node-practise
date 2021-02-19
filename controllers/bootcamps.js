const ErrorResponse=require('../utils/errorResponse');
const Bootcamp = require("../models/Bootcamp");

// @desc      get all bootcamps
// @route     GET api/v1/bootcamps/
// @access    public
exports.getBootCamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find().sort({name:1});
    res.status(200).json({ success: true, data: bootcamps });
  } catch(err) {
    next(err)
  }
};

// @desc      get single bootcamps
// @route     GET api/v1/bootcamps/:id
// @access    public
exports.getBootCamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp) {
      return next(new ErrorResponse('Bootcamp not found with ${id}',404))
    }
    res.status(200).json({ success: true, data: bootcamp });
  } catch(err) {
    next(err)
  }
};

// @desc      delete  bootcamp
// @route     DELETE api/v1/bootcamps/:id
// @access    private
exports.deleteBootCamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
        // console.log(req.body);
        res.status(200).json({ success: true, data: {} });
      } catch(err) {
        next(err)
      }
};

// @desc      create  bootcamp
// @route     POST api/v1/bootcamps/
// @access    private
exports.createBootCamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);
    // console.log(req.body);
    res.status(200).json({ success: true, data: bootcamp });
  } catch(err) {
    next(err)
  }
};

// @desc      update all bootcamps
// @route     PUT api/v1/bootcamps/:id
// @access    public
exports.updateBootCamps = async (req, res, next) => {
  console.log("reached here update method");
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    // console.log(req.body);
    if (!bootcamp) {
      return res.status(400).json({ success: false });
    }
    console.log("bootcamp is not null")
    res.status(200).json({ success: true, data: bootcamp });
  } catch(err) {
      // console.log('error in try block')
    next(err)
  }
};
