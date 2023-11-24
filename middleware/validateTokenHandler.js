const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req?.headers?.authorization || req?.Auth?.authorization;
    console.log(`authHeader ${authHeader}`);
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
            if(err){
                res.status(401);
                throw new Error("User is not authorized");
            }
            // console.log(decoded);
            req.user = decoded.user;
            next();
        })
        if(!token){
            res.status(401);
            throw new Error("User is not authorized , token is missing");
        }
    } else {
        console.log(`failure in validate`);
        res.status(401);
        throw new Error("not Authorized , not valid token");
    }
    // } catch(err){
    //     res.status(500);
    //     throw new Error("Error in ValidToken lol"+err);
    // }

});

module.exports = validateToken;
