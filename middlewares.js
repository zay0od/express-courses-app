function log(req, res, next) {
    console.log("Logger...")
    next()//to go to the next middleware
}

function auth(req, res, next) {
    console.log("Authenticating...")
    next()//to go to the next middleware
}


module.exports = { log, auth }
