import discord = require('discord.js');
import configLoader = require('./config-loader');
import logLoader = require('./log-loader');
import winston = require('winston');
import commandHandler = require('./command-handler');

const logger:winston.Logger = logLoader.createLogger();
var prefix = configLoader.default.getPrefix();
const client = new discord.Client();

client.on('ready', ()=>{
    logger.info(`Bot active with the usertag: "${client.user.tag}"`);
    logger.debug(client.user.toString());
    if(client.guilds.size == 0){
        logger.info(`You can invite the bot with this link:`);
        client.generateInvite().then((url: string)=>logger.info(url));
    }
});

client.on('message', (msg: discord.Message)=>{
    if(msg.author.bot) return;
    if(msg.content.startsWith(prefix)){
        var args = msg.content.slice(1).split(/\s/);
        var command = args[0];
        commandHandler.default.emit('command', msg, command, args);
    }
    else if(msg.isMentioned(client.user)){
        var args = msg.content.split(/\s/).slice(1);
        var command = args[0];
        commandHandler.default.emit('command', msg, command, args);
    }
});

client.login(configLoader.default.getBotToken());