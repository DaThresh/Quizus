const chalk = require('chalk');

class Logger {
    log(message){
        console.log(Logger.getTimestamp() + ' ' + message);
    }

    info(message){
        console.log(chalk.cyan(Logger.getTimestamp() + ' ' + message));
    }
    
    request(request){
        console.log(Logger.getTimestamp() + ' Incoming ' + request.method + ' request at ' + request.path);
    }

    error(message){
        console.error(chalk.red(Logger.getTimestamp() + " " + message));
    }

    static getTimestamp(){
        let timestamp = new Date();
        let date = (timestamp.getMonth() + 1) + "/" + timestamp.getDate() + "/" + timestamp.getFullYear();
        let time = timestamp.getHours() + ":" + timestamp.getMinutes() + ":" + timestamp.getSeconds();
        return date + " " + time;
    }
}

module.exports = new Logger();