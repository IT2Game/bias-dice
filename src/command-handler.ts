import * as discord from 'discord.js';
import * as events from 'events';
import * as commandList from './command-list';

var emitter = new events.EventEmitter();

emitter.on('command', (msg: discord.Message, command: string, args: string[])=>{
    var found_command = 
        commandList.commands.find(
            element => element.name == command ||
            (()=>{
                for(let i = 0; i < element.alias.length; i++){
                    let regEx: RegExp = new RegExp(element.alias[i]);
                    if(regEx.test(command)) return true;
                }
                return false;
            })()
        );
    if(found_command){
        found_command.func(msg, args);
    }
});

export default emitter;