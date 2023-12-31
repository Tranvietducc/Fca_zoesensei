const logger = require("../logger");
var { join } = require('path');
/**
 * It checks if the process is running in PM2, if it isn't, it installs PM2, starts it, and exits the
 * process.
 * @returns the logger.Normal function.
 */

function PM2Mode () {
    if (!process.env.PM2) {
        const { execSync } = require('child_process');
        logger.Normal(globalThis.Fca.Require.Language.ExtraUpTime.PM2);
        execSync('npm i pm2', { stdio: 'inherit'}); //ey zo how about sudo in linux 🐧
        execSync(`pm2 start ${join(__dirname, "/PM2/ecosystem.config.js")} --no-daemon`, { stdio: 'inherit' }); //That's not the end.
        process.exit();
    }
    else return logger.Normal(globalThis.Fca.Require.Language.ExtraUpTime.InPm2Mode);
}

/* It's checking if the process is running in PM2, if it isn't, it installs PM2, starts it, and exits
the process. */
module.exports = function() {
    var Logger = globalThis.Fca.Require.logger;
    switch (process.platform) {
        case 'win32':
            var Value = globalThis.Fca.Require.FastConfig;
                if (Value.Uptime) {
                    return PM2Mode();
                }
            break;
        case 'darwin':
            var Value = globalThis.Fca.Require.FastConfig;
            if (Value.Uptime) {
                return PM2Mode();
            }
            break;
        case 'linux':
            if (process.env.REPL_SLUG) {
                var Value = globalThis.Fca.Require.FastConfig;
                var Fetch = globalThis.Fca.Require.Fetch;
                    if (Value.Uptime) {
                        logger.Normal(globalThis.Fca.Require.Language.ExtraUpTime.Uptime);//
                        return setInterval(function() {
                            Fetch.get(`https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`);
                        },10*1000);
                    }
                else return;
            }
            else { 
                var Value = globalThis.Fca.Require.FastConfig;
                if (Value.Uptime) {
                    return PM2Mode();
                }
            }  
            break;
        default:
        Logger.Warning(globalThis.Fca.Require.Language.ExtraUpTime.NotSupport);
    }
};