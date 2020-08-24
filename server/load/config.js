const yml = require('js-yaml');
const fs = require('fs');

try {
    let file = fs.readFileSync(DIR + '/config.yml', 'utf8');
    let values = yml.safeLoad(file);

    global.PORT = values.port;
    global.ENV = values.env;

    let database = values.database;
    global.DATABASE = {
        NAME: database.name,
        HOST: database.host,
        PORT: database.port,
        USERNAME: database.username,
        PASSWORD: database.password,
        SRV: database.srv,
        OPTIONS: database.options ? database.options : {}
    }

    let logging = values.logging;
    global.LOGGING = {
        SKIP: logging.skip ? logging.skip : []
    }

} catch (error) {
    Errors.fatal(error, "Failed loading in configuration YML file");
}