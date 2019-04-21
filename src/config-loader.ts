import fs = require('fs');
import path = require('path');

interface ConfigInterface{
    bot: {
        token: string
    },
    logger:{
        level: string
    }
}

class ConfigLoader{
    private config: ConfigInterface;
    constructor (){
        this.config = JSON.parse(fs.readFileSync(path.normalize(path.join(__dirname, '..', 'config.json')),'utf-8'));
    }

    public getBotToken(){
        return this.config.bot.token;
    }

    public getLogLevel(){
        return this.config.logger.level;
    }

    public getPrefix(){
        return "/";
    }
}

export default new ConfigLoader();
