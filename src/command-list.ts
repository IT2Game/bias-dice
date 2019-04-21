import * as discord from 'discord.js';
import * as logLoader from './log-loader';
import * as configLoader from './config-loader';
import * as fs from 'fs';
import * as path from 'path';
import randomNum = require('random-number-csprng');


type CommandProgression = (msg: discord.Message, args: string[]) => void;

var logger = logLoader.createLogger();

interface Command{
    name: string,
    alias: (string|RegExp)[],
    description: string,
    func: CommandProgression
}

export var commands: Command[] = [];

commands.push({     // help command
    name: 'help',
    alias: ['cmd', 'commands'],
    description: 'lists a bunch of commands',
    func: function(msg: discord.Message, args: string[]){
        var embed: discord.RichEmbed = new discord.RichEmbed(); // creats embed
        embed.setTitle('Commands');     // sets title
        embed.setDescription('Here you see some commands...'); // sets description
        commands.forEach(command => {   // adds commands into list
            embed.addField(command.name, command.description); // adds field
        });
        msg.channel.send(embed).then(()=>logger.debug('command list sent'), ()=>logger.warn('bot wasn\'t able to send command list!'));
    }
});

commands.push({
    name: 'info',
    alias: [],
    description: 'gives information about the bot and it\'s creator',
    func: function(msg: discord.Message, args: string[]){
        var embed = JSON.parse(fs.readFileSync(path.normalize(path.join(__dirname, '..', 'infoEmbed.json')),'utf-8'));
        msg.channel.send(embed).then(()=>logger.debug('info page sent'), ()=>logger.warn('bot wasn\'t able to send info page!'));
    } 
});

commands.push({
    name: 'random',
    alias: ['rng', 'rand'],
    description: 'generates random number\nUsage: `<prefix>rand (limit)`\nDefault limit is 100\n~~still WIP, chances for low numbers are decreased~~',
    func: function(msg: discord.Message, args: string[]){
        var embed: discord.RichEmbed = new discord.RichEmbed();
        embed.setTitle('RNG');
        embed.setAuthor(msg.member.nickname, msg.author.avatarURL);
        var limit: number;
        if(args.length > 1){
            limit = parseInt(args[1]);
        }
        else{
            
            limit = 100;
        }
        
        randomNum(1, limit*100).then((baseNumber:number)=>{
            baseNumber= baseNumber/100;
            var num = Math.round((baseNumber > limit * 0.5 ? baseNumber : baseNumber * 2));
            if(num <= 0) num = 1;
            if(num > limit) num = limit;
            embed.setDescription(`You rolled a \`${num}\`!`);
            msg.channel.send(embed).then(()=>logger.debug('generated random number'), ()=>logger.warn(`bot wasn't able to send random number!`));
        });

    }
})