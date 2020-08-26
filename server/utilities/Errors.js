class Errors {
    fatal(error, message){
        Errors.log(error, message);
        process.exit(0);
    }

    error(error, message = ''){
        Errors.log(error, message);
    }

    response(response, error, code = 400){
        if(error instanceof Error) error = error.message;
        response.status(code).json({
            message: 'error',
            error: error
        });
    }

    static log(error, message){
        if(message !== '') Logger.error(message);
        console.error(error);
    }
}

module.exports = new Errors();