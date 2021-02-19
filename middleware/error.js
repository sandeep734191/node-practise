const ErrorResponse = require("../utils/errorResponse");
const errorHandler = (err, req, res, next) => {
  console.log(err.stack.red);
  console.log(err.name);
  let error = { ...err };
  error.message = err.message;

  //mongoose  bad objectid
  if (err.name === "CastError") {
    const message = `bootcamp not found with id with value ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  if(err.code==11000){
    const message = `duplicate field value entered`;
    error = new ErrorResponse(message, 400);
  }

  if(err.name==='ValidationError'){
    const message = Object.values(err.errors).map((x)=>x.message)
    error=new ErrorResponse(message,400)
  }
  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "server error",
  });
};

module.exports = errorHandler;
