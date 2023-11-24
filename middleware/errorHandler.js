const {constants} = require("../constants.js");

const errorHandler =(err,req,res,next)=>{
    const statusCode = res.statusCode? res.statusCode : 500;
    console.log(statusCode);
    if(statusCode == constants.VALIDATION_ERROR){
        res.json({
            title: "validation failed",
            message: err.message,
            stackTrace:err.stack
        });
    } else if(statusCode == constants.UNAUTHORIZED){
        res.json({
            title: "UNAUTHORIZED",
            message: err.message,
            stackTrace:err.stack
        });
    } else if(statusCode == constants.NOT_FOUND){
        res.json({
            title: "NOT_FOUND",
            message: err.message,
            stackTrace:err.stack
        });
    } else if(statusCode == constants.SERVER_ERROR){
        res.json({
            title: "SERVER_ERROR",
            message: err.message,
            stackTrace:err.stack
        });
    }else {
        console.log("No Error , all Good")
    }
    // if(err)
    // res.json({message :err.message,stackTrace : err.stack});
}

module.exports = errorHandler;