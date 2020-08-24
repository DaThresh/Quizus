class Errors {
    fatal(error, message){
        Errors.log(error, message);
        process.exit(0);
    }

    error(error, message){
        Errors.log(error, message);
    }

    static log(error, message){
        Logger.error(message);
        console.error(error);
    }
}

module.exports = new Errors();